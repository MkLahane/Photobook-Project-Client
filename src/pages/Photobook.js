import React, { useState, useContext, useRef } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useQuery, useMutation } from '@apollo/client';
import { Q_GET_PHOTOBOOK, M_LIKE_PHOTOBOOK, M_CREATE_COMMENT } from '../queries/photobook';
import SlideInFeed from '../components/SlideInFeed';
import { useForm } from '../util/hooks';
import Notification from '../components/Notification';
import DeleteButton from '../components/DeleteButton';
import Comment from '../components/Comment';
import Loading from '../components/Loading';
import { ReactComponent as LikeIcon } from '../icons/likeIcon.svg';
import { ReactComponent as CommentIcon } from '../icons/commentIcon.svg';
import './photobook.css';


const Photobook = (props) => {
    const photobookId = props.match.params.id;
    const { onSubmit, values, clearValues } = useForm(addCommentGlobal, {
        comment: ''
    });

    function addCommentGlobal() {
        setCommentBody('');
        addComment();

    }
    const [spawnNotify, setSpawnNotify] = useState(false);
    const [notifyColor, setNotifyColor] = useState('');
    const [notifyText, setNotifyText] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { user } = useContext(AuthContext);
    const { data } = useQuery(Q_GET_PHOTOBOOK, {
        variables: {
            photobookId
        },
        onError(err) {
            console.log(err);
        }
    });
    const [activeInput, setActiveInput] = useState(false);
    const [commentBody, setCommentBody] = useState('');
    const [loading, setLoading] = useState(false);
    const commentInputRef = useRef(null);
    const [likePhotobook] = useMutation(M_LIKE_PHOTOBOOK, {
        update() {
            //console.log(result);
        },
        onError(err) {
            setNotifyColor('#FF2525');
            setNotifyText([err.message]);
            setSpawnNotify(true);
        },
        variables: {
            photobookId
        }
    });
    const [addComment] = useMutation(M_CREATE_COMMENT, {
        update() {
            setActiveInput(false);
            commentInputRef.current.blur();
        }, onError(err) {
            setNotifyColor('#FF2525');
            setNotifyText([err.message]);
            setSpawnNotify(true);
        },
        variables: {
            photobookId,
            body: commentBody
        }
    });
    const prevSlide = () => {
        if (currentIndex == 0) {
            setCurrentIndex(data.getPhotobook.photos.length - 1);
        } else {
            setCurrentIndex(c => c - 1);
        }
    };
    const nextSlide = () => {
        setCurrentIndex(c => (c + 1) % data.getPhotobook.photos.length);
    };
    const checkIfLiked = (likes) => {
        return likes.filter(like => like.user.username === user.username).length === 1;
    }
    const goThereAfterDelete = () => {
        props.history.push('/');
    };
    if (data) {
        const { photos, id, user: { username }, likesCount, commentsCount, likes, comments } = data.getPhotobook;
        return (
            <>
                <div className='photobook-parent-div'>
                    <div className='photobook-container'>
                        <div className='slides-container'>
                            {
                                photos.map((slide, i) => (
                                    <SlideInFeed
                                        key={i}
                                        img_id={slide.img_id}
                                        offset={i - currentIndex}
                                        text_data={slide.text_data}>
                                    </SlideInFeed>
                                ))
                            }
                        </div>
                        {/* {
                            user.username === username &&
                            // <DeleteButton
                            //     photobookId={id}
                            //     setLoading={setLoading}
                            //     goThere={goThereAfterDelete}
                            //     divStyle={{
                            //         position: 'absolute',
                            //         right: '0px',
                            //         margin: '20px',
                            //         top: '210px',
                            //     }}
                            //     buttonStyle={{
                            //         fontSize: '5rem',
                            //         width: '150px'
                            //     }} />
                        } */}
                    </div >
                    <div className='slide-buttons'>
                        <button
                            className='add-photobook-button' onClick={() => prevSlide()}>
                            <span>&lt;</span>
                        </button>
                        <button
                            className='add-photobook-button' onClick={() => nextSlide()}>
                            <span>&#62;</span>
                        </button>
                    </div>
                    <div className='photobook-status'>
                        <div className='photobook-user'>
                            <h1>{username}</h1>
                            <span></span>
                        </div>

                        <div className='photobook-button-status'>
                            <button className='like-button'>
                                <LikeIcon className={checkIfLiked(likes) ? 'photobook-liked' :
                                    'photobook-not-liked'}
                                    onClick={() => likePhotobook()}></LikeIcon>
                                <label>{likes.length}</label>
                            </button>
                            <button>
                                <CommentIcon className={showComments ?
                                    'show-comments' : 'hide-comments'}
                                    onClick={() => setShowComments(!showComments)}
                                >
                                </CommentIcon>
                                <label>{comments.length}</label>
                            </button>
                        </div>
                    </div>

                    {
                        showComments &&
                        <div className='photobook-comments'>
                            <h1>Comments:</h1>
                            <div className='add-comment'>
                                <form onSubmit={onSubmit}>
                                    <div className='form-field'>
                                        <input
                                            ref={commentInputRef}
                                            value={commentBody}
                                            autoComplete='off'
                                            onFocus={() => setActiveInput(true)}
                                            onBlur={(e) => {
                                                e.target.value.trim() === '' ? setActiveInput(false) : setActiveInput(true)
                                            }}
                                            onChange={(e) => setCommentBody(e.target.value)}
                                        ></input>
                                        <label style={{
                                            borderBottom: activeInput ? '2px dashed #2BFF7B' : '3px dashed white'
                                        }}>
                                            <span style={{
                                                transform: activeInput ? 'translateY(-250%)' : 'translateY(0px)',
                                                color: activeInput ? '#2BFF7B' : 'white',
                                                fontSize: activeInput ? '1rem' : '1.6rem'
                                            }}
                                            >Add comment here...</span>
                                        </label>
                                    </div>
                                </form>
                                <button
                                    className='add-comment-button'
                                    onClick={addCommentGlobal}
                                >
                                    <span>Comment</span>
                                </button>
                            </div>
                            {
                                comments.map(comment => (
                                    <div key={comment.id} className='photobook-comment'>
                                        <Comment
                                            comment={comment}
                                            photobookId={id}
                                        />
                                    </div>
                                ))
                            }

                        </div>
                    }
                </div>
                {
                    spawnNotify &&
                    <Notification texts={notifyText} setSpawnNotify={setSpawnNotify}
                        divColor={notifyColor} />
                }
                {loading && <Loading />}
            </>
        );
    } else {
        return (
            <div><Loading /></div>
        );
    }
};

export default Photobook; 