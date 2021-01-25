import React from 'react';
import SlideText from './SlideText';
import FileUpload from './FileUpload';
import noImageSrc from '../icons/noImage.png';


const Slide = ({ slideIndex, img_data, offset, len, addImg, text_data, addSlideText, adding }) => {
    const slideOpacity = Math.abs(offset) == 1 ? 0.5 : 0;
    const rotDir = (offset < 0) ? -1 : 1;
    console.log(rotDir);
    return (
        <div
            className={offset === 0 ? 'active-slide-div' : 'slide-div'}
            style={{
                '--offset': offset,
                '--slideOpacity': slideOpacity,
                '--rotDir': rotDir
            }}
        >

            {img_data !== '' ?
                <img src={img_data} />

                :
                <img className='no-image'
                    style={{ width: '100px', height: '100px' }}
                    src={noImageSrc} />
            }



            {
                (offset === 0 && adding) && (
                    <>
                        <div className='upload-div'>
                            <FileUpload
                                slideIndex={slideIndex}
                                addImg={addImg}
                                multiple={true}
                            />
                        </div>
                        <SlideText
                            addSlideText={addSlideText}
                            slideText={text_data}
                            slideIndex={slideIndex} />
                    </>
                )

            }
        </div >

    );
}

export default Slide; 