const { User } = require("../models");

const { signToken, authMiddleware } = require("../utils/auth");

const resolvers = {
    Query: {
        me: async ( parent, args, context) => {
            return User.findOne({})
        }
    },
    Mutation: {
        login: async ( req, res) => {

        }
    }
}