const { User, Book } = require("../models");
const { AuthenticationError } = require("apollo-server-express");

const { signToken, authMiddleware } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("saveBooks");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addUser: async (parent, { username, password, email }) => {
      const user = await User.create({ username, password, email });
      const token = signToken(user);
      return { user, token };
    },
    saveBook: async (parent, { authors, description, title, bookId, image, link }, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: {
              saveBooks: authors, description, title, image, link, bookId,
            },
          },
          { new: true }
        );
        return user
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeBook: async ( parent, { bookId }, context) => {
      if(context.user) {
        const user = await User.findByIdAndUpdate(
          { _id: context.user._id},
          { $pull: { saveBooks: {bookId}}},
          {new: true}
        )
        return user
      }
      throw new AuthenticationError("You need to be logged in!");
    }
  },
};
