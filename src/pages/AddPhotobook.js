import React, { useState } from 'react';
import Slide from '../components/Slide';
import CoverPage from '../components/CoverPage';
import Notification from '../components/Notification';
import { checkForNullEntries } from '../util/util';
import './addphotobook.css';




const AddPhotobook = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [openCoverPage, setOpenCoverPage] = useState(false);
    const [spawnNotify, setSpawnNotify] = useState(false);
    const [photobookId, setPhotobookId] = useState('');
    const [slides, setSlides] = useState([
        {
            img_file: null,
            img_data: '',
            text_data: ''
        }
    ]);
    function addPhotobookGlobal() {
        // addPhotobook();
        checkForNullEntries(slides);
        if (slides.length === 1 && slides[0].img_data === '') {
            setSpawnNotify(true);
            setCurrentIndex(0);
        } else {

            setOpenCoverPage(true);
        }
    }




    const resetPhotobook = () => {
        setOpenCoverPage(false);
        setSlides([
            {
                img_data: '',
                text_data: '',
                img_file: null
            }
        ]); //reset slides 
        setCurrentIndex(0);
    };

    const prevSlide = () => {
        if (currentIndex == 0) {
            setCurrentIndex(slides.length - 1);
        } else {
            setCurrentIndex(c => c - 1);
        }
    };
    const nextSlide = () => {
        setCurrentIndex(c => (c + 1) % slides.length);
    };
    const deleteSlide = () => {
        if (slides.length > 1) {
            setSlides(slides.filter((s, index) => index != currentIndex));
            if (slides.length > 0) {

                setCurrentIndex(c => slides.length - 2);
            }
        }
    };
    const addSlide = () => {
        setSlides(s => [...s, { img_data: '', text_data: '', img_file: null }]);

        setCurrentIndex(c => slides.length);
    };
    const addSlideText = (index, new_text_data) => {
        setSlides(s_l => s_l.map((s, i) => i === index ? {
            img_data: s.img_data, text_data: new_text_data, img_file: s.img_file
        } : s));
    };
    const addImg = (slideIndex, imgIndex, new_img_data, new_img_file) => {
        let index = slideIndex + imgIndex;
        if (index < slides.length) {
            setSlides(s_l => s_l.map((s, i) => i === index ? {
                img_data: new_img_data,
                text_data: s.text_data,
                img_file: new_img_file
            } : s));
        } else {
            setSlides(s => [...s, { img_data: new_img_data, text_data: '', img_file: new_img_file }]);
        }

    };
    return (
        <>
            <div className='add-photobook-container'>
                <div className='slides-container'>
                    {
                        slides.map((slide, i) => (
                            <Slide
                                key={i}
                                img_data={slide.img_data}
                                addImg={addImg}
                                slideIndex={i}
                                offset={i - currentIndex}
                                text_data={slide.text_data}
                                addSlideText={addSlideText}
                                adding={true}
                                len={slides.length}>
                            </Slide>
                        ))
                    }
                </div>

                <button
                    style={{
                        position: 'absolute',
                        left: '-50px',
                        top: '50%',
                        transform: 'translateY(-50%)'
                    }}
                    className='add-photobook-button' onClick={() => prevSlide()}>
                    <span>&lt;</span>
                </button>
                <button
                    style={{
                        position: 'absolute',
                        right: '-50px',
                        top: '50%',
                        transform: 'translateY(-50%)'
                    }}
                    className='add-photobook-button' onClick={() => nextSlide()}>
                    <span>&#62;</span>
                </button>
                <div className='mutation-buttons'>
                    <button className='add-photobook-button' onClick={() => deleteSlide()}>
                        <span>-</span>
                    </button>
                    <button className='add-photobook-button' onClick={() => addSlide()}>
                        <span>+</span>
                    </button>
                    <button className='add-photobook-button' onClick={() => addPhotobookGlobal()}>
                        <span>&#x2713;</span>
                    </button>
                </div>
                {openCoverPage && <CoverPage photobookId={photobookId}
                    reset={resetPhotobook} slides={slides} setOpenCoverPage={setOpenCoverPage} />}
                {/* <CoverPage /> */}
            </div >
            {
                spawnNotify &&
                <Notification texts={['No images were provided']} setSpawnNotify={setSpawnNotify} divColor={'#FF2525'} />
            }

        </>
    );
};

export default AddPhotobook; 
