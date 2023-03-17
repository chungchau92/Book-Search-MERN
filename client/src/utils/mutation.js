import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUSer($name: String!, $email: String!, $password: String!) {
        addUser(name: $name, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook(authors: [String]!, description: String!, title: String!, bookId: String!, image: String!, link: String!) {
        _id
        username
        email
        bookCount
        savedBook {
            bookId
            authors
            description
            title
            image
            link
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook(BookId: String!) {
        _id
        username
        email
        bookCount
        savedBook{
            BookId
            authors
            description
            title
            image
            link
        }
    }
`;