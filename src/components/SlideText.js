import React, { useState, useRef } from 'react';
import editTextSrc from '../icons/editIcon.png';

const SlideText = ({ slideIndex, slideText, addSlideText }) => {
    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef(null);
    const [textVal, setTextVal] = useState(slideText);

    return (
        <div className='image-text-div'>


            <input
                style={{
                    width: isEditing ? '300px' : '0px'
                }}
                value={slideText ? slideText : ''}
                onChange={(e) => addSlideText(slideIndex, e.target.value)}
                ref={inputRef}
                type='text' autoComplete='off'
                className='image-text-input' />

            <a onClick={() => {
                if (inputRef.current != null) {
                    if (inputRef.current.value.trim() !== '') {
                        setIsEditing(true);
                    } else {
                        setIsEditing(!isEditing);
                        inputRef.current.focus();
                    }
                } else {
                    setIsEditing(!isEditing);
                    inputRef.current.focus();
                }
            }}>
                <img src={editTextSrc} />
            </a>
        </div>
    );
};

export default SlideText;