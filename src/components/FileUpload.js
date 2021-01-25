import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './fileUpload.css';

const acceptedFileTypes = [
    'image/x-png', 'image/png', 'image/jpg', 'image/jpeg', 'image/gif'
];

const FileUpload = ({ slideIndex, addImg }) => {
    const [uploadClass, setUploadClass] = useState('file-normal');
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        maxSize: 40000000000000000000000000,
        maxFiles: 50,
        multiple: true,
        onDrop: (acceptedFiles) => {
            if (acceptedFiles && acceptedFiles.length > 0) {
                for (let i = 0; i < acceptedFiles.length; i++) {
                    let file = acceptedFiles[i];
                    if (acceptedFileTypes.includes(file.type)) {
                        const reader = new FileReader();
                        reader.addEventListener('load', () => {
                            // console.log(reader.result);
                            addImg(slideIndex, i, reader.result, file);
                        }, false);

                        reader.readAsDataURL(file);
                    }
                }
            }
            setUploadClass('file-normal');
        },
        onDragEnter: () => {
            setUploadClass('file-uploading');
        },
        onDragLeave: () => {
            setUploadClass('file-normal');
        }
    });
    return (
        <div className={uploadClass} {...getRootProps()} style={{ outline: 'none' }} >
            <input {...getInputProps()} />
            <p>Drop files here</p>
        </div>
    );
};

export default FileUpload;