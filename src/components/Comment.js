import React, { useContext } from 'react';
import { useMutation } from '@apollo/client';
import DeleteButton from './DeleteButton';
import { M_LIKE_COMMENT } from '../queries/photobook';
import { AuthContext } from '../contexts/AuthContext';
import { ReactComponent as LikeIcon } from '../icons/likeIcon.svg';
import './comment.css';

const Comment = ({ comment, photobookId }) => {
    const { user } = useContext(AuthContext);
    //console.log(comment);
    const checkIfLiked = (likes) => {
        return likes.filter(like => like.user.username === user.username).length === 1;
    }
    const [likeComment] = useMutation(M_LIKE_COMMENT, {
        update() {
        },
        onError(err) {
            console.log(err);
        },
        variables: {
            commentId: comment.id,
            photobookId
        }
    });
    return (
        <>
            <div className='user-data' style={{
                fontSize: '2rem',
                display: 'inline-block'
            }}>
                <p>{comment.user.username}</p>
                <span></span>
            </div>
            <div className='comment-body'><span>{comment.body}</span></div>

            <DeleteButton
                divStyle={{
                    display: 'flex',
                    marginLeft: 'auto',
                    flexDirection: 'row-reverse',
                    justifyContent: 'space-around',
                    alignItems: 'center'
                }}
                commentId={comment.id}
                showDelete={comment.userId === user.id}
                photobookId={photobookId}
            >
                <button
                    style={{
                        padding: '10px',
                        margin: '0 10px',
                        outline: 'none',
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        fontSize: '2rem',
                        fontFamily: 'custom_font',
                        color: 'white'
                    }}
                    className={checkIfLiked(comment.likes) ? 'comment-liked' :
                        'comment-not-liked'}
                    onClick={likeComment}
                >
                    <LikeIcon
                        style={{ marginRight: '20px' }}
                    ></LikeIcon>
                    <label>{comment.likesCount}</label>
                </button>
            </DeleteButton>
        </>
    );
};

export default Comment; 