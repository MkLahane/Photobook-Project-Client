import React, { useState, useRef } from 'react';

const FormField = ({ inputName, inputType, inputKey, onInputChange, values, inputRef }) => {
    const [activeInput, setActiveInput] = useState(false);

    return (
        <div className='form-field'>
            <input
                ref={inputRef}
                type={inputType}
                name={inputKey}
                value={values[inputKey]}
                autoComplete='off'
                onFocus={() => setActiveInput(true)}
                onBlur={(e) => {
                    e.target.value.trim() === '' ? setActiveInput(false) : setActiveInput(true)
                }}
                onChange={onInputChange}
            ></input>
            <label style={{
                borderBottom: activeInput ? '2px dashed #2BFF7B' : '3px dashed white'
            }}>
                <span style={{
                    transform: activeInput ? 'translateY(-250%)' : 'translateY(0px)',
                    color: activeInput ? '#2BFF7B' : 'white',
                    fontSize: activeInput ? '1rem' : '1.6rem'
                }}
                >{inputName}</span>
            </label>
        </div>
    );
};

export default FormField;