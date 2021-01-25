import { gql } from '@apollo/client';

const M_REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword 
            }
        ) {
            id 
            email 
            username 
            created_at
        }
    }
`;

const M_LOGIN_USER = gql`
    mutation login(
        $email: String!
        $password: String!
    ) {
        login(
            email: $email
            password: $password
        ) {
            id 
            email 
            username 
            created_at
            token
        }
    }
`;

const M_CONFIRM_USER = gql`
    mutation confirm(
        $token: String!
    ) {
        confirm(token: $token) 
    }
`;



export {
    M_REGISTER_USER,
    M_LOGIN_USER,
    M_CONFIRM_USER
};
