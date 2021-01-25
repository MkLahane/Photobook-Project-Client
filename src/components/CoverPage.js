import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useMutation } from '@apollo/client';
import { M_CREATE_PHOTOBOOK, Q_GET_PHOTOBOOKS } from '../queries/photobook';
import SingleFileUpload from './SingleFileUpload';
import Notification from './Notification';
import editTextSrc from '../icons/editIcon.png';
import noImageSrc from '../icons/noImage.png';
import Loading from '../components/Loading';
import './coverpage.css';



const CoverPage = ({ photobookId, reset, slides, setOpenCoverPage }) => {
    const [spawnNotify, setSpawnNotify] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [notifyColor, setNotifyColor] = useState('');
    const [coverPageText, setCoverPageText] = useState('');
    const inputRef = useRef(null);
    const [photobookData, setPhotobookData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [onClose, setOnClose] = useState(null);
    const [coverPageImg, setCoverPageImg] = useState({
        img_data: '',
        img_file: '',
        img_id: ''
    });
    const [errText, setErrText] = useState([]);
    useEffect(() => {
        if (photobookData.length > 0) {
            addPhotobookGlobal();
        }
    }, [photobookData])
    const [addPhotobook] = useMutation(M_CREATE_PHOTOBOOK, {
        update(proxy, result) { //gets triggered after successful mutation 
            setErrText(['Photobook Added successfully']);
            setNotifyColor('#2BFF7B');
            setSpawnNotify(true);
            setOnClose('/')
            setLoading(false);
            setCoverPageText('');
            setCoverPageImg({
                img_file: '',
                img_data: '',
                img_id: ''
            });
            const data = proxy.readQuery({
                query: Q_GET_PHOTOBOOKS
            }); //this query will access the inmemory cache on the client
            if (data) {
                proxy.writeQuery({
                    query: Q_GET_PHOTOBOOKS,
                    data: {
                        getPhotobooks: [result.data.createPhotobook, ...data.getPhotobooks],
                    },
                });
            } else {
                proxy.writeQuery({
                    query: Q_GET_PHOTOBOOKS,
                    data: {
                        getPhotobooks: [result.data.createPhotobook],
                    },
                });
            }
        },
        onError(err) {
            setNotifyColor('#FF2525');
            setErrText([err.message]);
            setSpawnNotify(true);
            setCoverPageText('');
        },
        variables: {
            photobookInput: photobookData,
            cover_text: coverPageText,
            cover_image_id: coverPageImg.img_id
        }
    });
    const getCoverImg = (result, img_file) => {
        setCoverPageImg({
            ...coverPageImg,
            img_data: result,
            img_file: img_file
        });
    };
    function addPhotobookGlobal() {
        // console.log('#############');
        // console.log(photobookData);
        // console.log(coverPageText);
        // console.log(coverPageImg);
        addPhotobook();
        //reset();

    }
    const uploadPhotobook = async () => {
        setLoading(true);
        slides.push({
            cover_text: coverPageText,
            cover_image_id: coverPageImg.img_file
        });

        setIsEditing(false);
        console.log(slides);
        const uploads = slides.map((slide, index) => {
            const formData = new FormData();
            if (index !== slides.length - 1) {
                formData.append('file', slide.img_file);
            } else {
                formData.append('file', slide.cover_image_id);
            }
            formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET);
            //formData.append('api_key', REACT_APP_API_KEY);
            formData.append('api_key', process.env.REACT_APP_API_KEY);
            return axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
                formData
            ).then(response => {
                const data = response.data;
                //console.log(data.public_id);
                if (index === slides.length - 1) {
                    setCoverPageImg({
                        img_data: '',
                        img_file: '',
                        img_id: data.public_id
                    });
                    setCoverPageText(slide.cover_text);
                    return { cover_text: slide.cover_text, cover_image_id: data.public_id };
                }
                return { text_data: slide.text_data, img_id: data.public_id };
            });
        });
        axios.all(uploads).then((data) => {
            setPhotobookData(data.filter((d, i) => i !== data.length - 1));
        });
    };
    return (
        <div className='cover-page-div'>
            {loading && <Loading />}
            <button className='add-photobook-button' style={{
                position: 'absolute',
                right: '0px',
                top: '0px'
            }} onClick={() => setOpenCoverPage(false)}>
                <span>X</span>
            </button>
            <div className='image-text-div'>
                <input
                    style={{
                        width: isEditing ? '300px' : '0px'
                    }}
                    value={coverPageText}
                    onChange={(e) => setCoverPageText(e.target.value)}
                    onKeyDown={(e) => (e.key === 'Enter' &&
                        inputRef.current.value.trim() !== '') ?
                        uploadPhotobook() : null}
                    ref={inputRef}
                    type='text' autoComplete='off'
                    className='image-text-input' />

                <a onClick={() => {
                    if (inputRef.current != null) {
                        if (inputRef.current.value.trim() !== '') {
                            uploadPhotobook();

                        } else {
                            setIsEditing(!isEditing);
                        }
                    } else {
                        setIsEditing(!isEditing);
                    }
                }}>
                    <img src={editTextSrc} />
                </a>
            </div>

            {coverPageImg.img_data !== '' ?
                <img src={coverPageImg.img_data} style={{
                    zIndex: '-1',
                    objectFit: 'contain',
                    width: '300px',
                    height: '300px'
                }} />

                :
                <img className='no-image'
                    style={{
                        width: '100px',
                        height: '100px',
                        zIndex: '-1'
                    }}
                    src={noImageSrc} />
            }

            <SingleFileUpload
                addImg={getCoverImg} />
            {
                spawnNotify &&
                <Notification
                    texts={errText}
                    setSpawnNotify={setSpawnNotify}
                    onClose={onClose}
                    divColor={notifyColor} />
            }

        </div >
    );
};

export default CoverPage;