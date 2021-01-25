import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { M_DELETE_PHOTOBOOK, Q_GET_PHOTOBOOKS, M_DELETE_COMMENT } from '../queries/photobook';
import './deleteButton.css';

const DeleteButton = (props) => {
    const { photobookId, setLoading, buttonStyle, divStyle, goThere, commentId } = props;
    const [deletePhotobook] = useMutation(commentId ? M_DELETE_COMMENT : M_DELETE_PHOTOBOOK, {
        update(proxy, result) {
            if (commentId === undefined) {
                const deletedPhotobookId = result.data.deletePhotobook.id;
                const data = proxy.readQuery({
                    query: Q_GET_PHOTOBOOKS
                }); //this query will access the inmemory cache on the client
                const newData = data.getPhotobooks.filter(d => d.id !== deletedPhotobookId);
                proxy.writeQuery({
                    query: Q_GET_PHOTOBOOKS,
                    data: {
                        getPhotobooks: newData,
                    },
                });
                setLoading(false);
                if (goThere) {
                    goThere();
                }
            }
        },
        onError(err) {
            //console.log(err);
        },
        variables: {
            photobookId,
            commentId
        }
    });
    function deletePhotobookGlobal() {
        if (!commentId) {
            setLoading(true);
        }
        deletePhotobook();
    }
    return (
        <div style={divStyle}>
            <button
                onClick={deletePhotobookGlobal}
                className='delete-button'
                style={buttonStyle}
            >
                <span>X</span>
            </button>
            {props.children}
        </div>
    );
};

export default DeleteButton; 