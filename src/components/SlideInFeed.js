import React from 'react';
import { Image } from 'cloudinary-react';
import noImageSrc from '../icons/noImage.png';


const SlideInFeed = ({ img_id, offset, text_data }) => {
    const slideOpacity = Math.abs(offset) == 1 ? 0.5 : 0;
    const rotDir = (offset < 0) ? -1 : 1;
    return (
        <div
            className={offset === 0 ? 'active-slide-div' : 'slide-div'}
            style={{
                '--offset': offset,
                '--slideOpacity': slideOpacity,
                '--rotDir': rotDir
            }}
        >

            {img_id !== '' ?
                <Image cloudName={process.env.REACT_APP_CLOUD_NAME} publicId={img_id} />

                :
                <img className='no-image'
                    style={{ width: '100px', height: '100px' }}
                    src={noImageSrc} />
            }

            {
                (offset === 0 &&
                    <>
                        {text_data.trim() !== '' &&
                            < div className='text-data-overlay'>
                                <div className='cover-text'>
                                    <p>{text_data}</p>
                                </div>
                            </div>
                        }
                        <div className='current-slide-background'>
                            {img_id !== '' && <Image cloudName={process.env.REACT_APP_CLOUD_NAME} publicId={img_id} />}
                        </div>
                    </>
                )
            }
        </div >

    );
}

export default SlideInFeed;