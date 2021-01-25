import React, { useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { Q_GET_PHOTOBOOKS } from '../queries/photobook';
import PhotobookInFeed from '../components/PhotobookInFeed';
import Loading from '../components/Loading';
import './feed.css';



const Feed = () => {
    const { loading, data } = useQuery(Q_GET_PHOTOBOOKS);
    // const [getFeed, { data }] = useLazyQuery(Q_GET_PHOTOBOOKS);
    // useEffect(() => {
    //     getFeed();
    // }, []);
    // useEffect(() => {
    //     if (data) {
    //         //console.log(data);
    //     }
    // }, [data])
    return (
        <div className='feed'>
            {
                loading ?
                    <Loading></Loading> :
                    data.getPhotobooks.map(({ user: { username }, cover_image_id, cover_text, id, created_at, likesCount, commentsCount }) => (
                        <PhotobookInFeed key={id} username={username} id={id}
                            cover_image_id={cover_image_id}
                            cover_text={cover_text}
                            created_at={created_at}
                            likesCount={likesCount}
                            commentsCount={commentsCount} />
                    ))
            }
        </div>
    );
};

export default Feed; 