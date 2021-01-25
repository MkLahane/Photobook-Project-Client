import React, { useState, useEffect } from 'react';
import Notification from '../components/Notification';
import { useMutation } from '@apollo/client';
import { M_CONFIRM_USER } from '../queries/user';



const RegistrationConfirmation = (props) => {
    const [notifyText, setNotifyText] = useState(false);
    const [notifyColor, setNotifyColor] = useState('');
    const [onClose, setOnClose] = useState('');

    const token = props.match.params.token;

    const [confirmUser, { loading }] = useMutation(M_CONFIRM_USER, {
        update(_, { data: { confirm } }) {
            console.log(confirm);
            setNotifyText([confirm]);
            setOnClose('/login');
            setNotifyColor('#2BFF7B');

        },
        onError(err) {
            setNotifyText([err.graphQLErrors[0].message]);
            setOnClose('/register');
            setNotifyColor('#FF2525');

        },
        variables: {
            token
        }
    });
    useEffect(() => {
        confirmUser();
    }, []);

    return (
        <div>
            {notifyText.length > 0 && <Notification texts={notifyText} divColor={notifyColor} onClose={onClose} />}
        </div>
    );
}

export default RegistrationConfirmation;


