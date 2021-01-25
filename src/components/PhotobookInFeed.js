import React, { useContext, useState } from 'react';
import { Image } from 'cloudinary-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { ReactComponent as LikeIcon } from '../icons/likeIcon.svg';
import { ReactComponent as CommentIcon } from '../icons/commentIcon.svg';
import Loading from './Loading';
import DeleteButton from './DeleteButton';




const PhotobookInFeed = ({ id, username, cover_image_id, cover_text, likesCount, commentsCount }) => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    return (
        <div className='photobook-in-feed'>
            {loading && <Loading />}
            <Link to={`/photobook/${id}`}>
                <div className='overlay-for-data'>
                    <div className='cover-text'>
                        <p>{cover_text}</p>
                    </div>
                </div>
            </Link>
            <div className='user-data'>
                <p>{username}</p>
                <span></span>
            </div>
            <div className='cover-image-in-feed'>
                <Image cloudName={process.env.REACT_APP_CLOUD_NAME} publicId={cover_image_id} />

            </div>
            <div className='photobook-info-feed'>
                <div style={{ marginLeft: 'auto' }}>
                    <LikeIcon></LikeIcon>
                    <p>{likesCount}</p>
                </div>
                <div>
                    <CommentIcon></CommentIcon>
                    <p>{commentsCount}</p>
                </div>
                {
                    user.username === username &&
                    <DeleteButton
                        photobookId={id}
                        setLoading={setLoading}
                        width='200px'
                    />
                }
            </div>
        </div>
    );
};

export default PhotobookInFeed;