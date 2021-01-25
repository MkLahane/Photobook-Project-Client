import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './fileUpload.css';

const acceptedFileTypes = [
    'image/x-png', 'image/png', 'image/jpg', 'image/jpeg', 'image/gif'
];

const SingleFileUpload = ({ addImg }) => {

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        maxSize: 40000000000000000000000000,
        multiple: false,
        onDrop: (acceptedFiles) => {
            if (acceptedFiles && acceptedFiles.length > 0) {
                const file = acceptedFiles[0];
                if (acceptedFileTypes.includes(file.type)) {
                    const reader = new FileReader();
                    reader.addEventListener('load', () => {
                        // console.log(reader.result);
                        addImg(reader.result, file);
                    }, false);
                    reader.readAsDataURL(file);
                }
            }

        },
        onDragEnter: () => {

        }

    });
    return (
        <div
            className='file-uploading' {...getRootProps()} style={{
                outline: 'none',
                border: '2px dashed white'
            }}>
            <input {...getInputProps()} />
            <p>Drop a cover page image here..</p>
        </div>
    );
};

export default SingleFileUpload;