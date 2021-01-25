import React, { useState } from 'react';
import FormField from '../components/FormField';
import { useMutation } from '@apollo/client';
import { M_REGISTER_USER } from '../queries/user';
import { useForm } from '../util/hooks';
import Notification from '../components/Notification';


import './register.css';

const Register = (props) => {
    const { onChange, onSubmit, values, clearValues } = useForm(registerUserGlobal, {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [spawnNotify, setSpawnNotify] = useState(false);
    const [notifyColor, setNotifyColor] = useState('');
    const [notifyText, setNotifyText] = useState([]);
    const [onClose, setOnClose] = useState(false);

    function registerUserGlobal() {
        registerUser();
    }


    const [registerUser, { loading }] = useMutation(M_REGISTER_USER, {
        update(_, result) { //gets triggered after successful mutation 
            console.log(result);
            setNotifyColor('#2BFF7B');
            setNotifyText(['Confirmation link sent to your email id!']);
            setSpawnNotify(true);
            setOnClose('/');
            clearValues();

        },
        onError(err) {
            const errors = err.graphQLErrors[0].extensions.exception.errors;
            setNotifyColor('#FF2525');
            setNotifyText(Object.values(errors));
            setSpawnNotify(true);
        },
        variables: values
    });
    return (
        <>
            <div className='register-div'>
                <form onSubmit={onSubmit}>
                    <FormField inputName='Username' inputType='text'
                        inputKey='username' onInputChange={onChange}
                        values={values} />
                    <FormField inputName='Email' inputType='text'
                        inputKey='email' onInputChange={onChange}
                        values={values} />
                    <FormField inputName='Password' inputType='password'
                        inputKey='password' onInputChange={onChange}
                        values={values} />
                    <FormField inputName='Confirm Password' inputType='password'
                        inputKey='confirmPassword' onInputChange={onChange}
                        values={values} />
                    <button>
                        <span>Sign Up</span>
                    </button>

                </form>
            </div>
            {
                spawnNotify &&
                <Notification texts={notifyText} setSpawnNotify={setSpawnNotify}
                    onClose={onClose} divColor={notifyColor} />
            }

        </>
    );
};

export default Register; 