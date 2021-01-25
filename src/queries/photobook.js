import { gql } from '@apollo/client';

const Q_GET_PHOTOBOOKS = gql` {
    getPhotobooks {
        userId
        id
        likesCount
        created_at
        cover_text
        cover_image_id
        commentsCount
        user {
            id
            username
        }
        
    }
    
}`;

const Q_GET_PHOTOBOOK = gql` 
  query($photobookId: ID!) {
    getPhotobook(photobookId: $photobookId) {
        id
        userId
        likesCount
        commentsCount
        photos {
            img_id
            text_data
            id
            photobookId
        }
        user {
            email
            username
        }
        cover_image_id
        cover_text
        comments {
            id
            body
            likesCount
            userId
            likes {
                user {
                    username
                }
            }
            user {
                username
            }
        }
        likes {
            id
            user {
                username
            }
        }
    }
}`;

const M_DELETE_PHOTOBOOK = gql` 
    mutation deletePhotobook($photobookId: ID!) {
        deletePhotobook(photobookId: $photobookId) {
            id
        }
    }

`;



const M_CREATE_PHOTOBOOK = gql`
    mutation createPhotobook($photobookInput: [PhotoInput]!, $cover_image_id: String!,
                             $cover_text: String!) {
        createPhotobook(photobookInput: $photobookInput,
                        cover_image_id: $cover_image_id,
                        cover_text: $cover_text) {
            userId
            id
            likesCount
            cover_text
            cover_image_id
            created_at
            user {
                id
                username
            }
        }
    }
`;

const M_LIKE_PHOTOBOOK = gql` 
    mutation likePhoto($photobookId: ID!) {
        likePhotobook(photobookId:$photobookId) {
            id
            likes {
                id
                user {
                    username
                }
            }
        }
    }
`;

const M_LIKE_COMMENT = gql` 
    mutation likeComment($commentId: ID!, $photobookId: ID!) {
        likeComment(commentId: $commentId, photobookId:$photobookId) {
            id
            comments {
                id
                body
                likesCount
                likes {
                    user {
                        username
                    }
                }
                
            }
            
        }
    }
`;

const M_CREATE_COMMENT = gql`
    mutation createComment($photobookId: ID!, $body: String!) {
        createComment(photobookId: $photobookId, body: $body) {
            id 
            comments {
                id 
                body 
                user {
                    username
                }
            }
        }
    }
`;

const M_DELETE_COMMENT = gql`
    mutation deleteComment($commentId: ID!, $photobookId: ID!) {
        deleteComment(commentId: $commentId, photobookId: $photobookId) {
            id
            comments {
                id 
                user {
                    username
                }
            }
        }
    }
`;



export {
    M_CREATE_PHOTOBOOK,
    Q_GET_PHOTOBOOKS,
    Q_GET_PHOTOBOOK,
    M_LIKE_PHOTOBOOK,
    M_CREATE_COMMENT,
    M_DELETE_PHOTOBOOK,
    M_DELETE_COMMENT,
    M_LIKE_COMMENT
};
