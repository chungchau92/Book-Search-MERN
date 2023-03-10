const { User, Book } = require("../models");
const { AuthenticationError } = require('apollo-server-express');


const { signToken, authMiddleware } = require("../utils/auth");


const resolvers = {
    Query: {
        me: async ( parent, args, context) => {
            if(context.user) {
                return User.findOne({_id: context.user._id })
            }
            throw new AuthenticationError("You need to be logged in!");
        }
    },
    Mutation: {
        addUser: async ( parent, { username, password, email}) => {
            const user = User.create({ username, password, email})
            const token = signToken(user);
            return { user, token};
        },
        login: async ( parent, { email, password}) => {
            const user = await User.findOne({ email })

            if(!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw) {
                throw new AuthenticationError("Incorrect credentials")
            }

            const token = signToken(user);

            return { token, user }
        },
    }
}

module.exports = resolvers