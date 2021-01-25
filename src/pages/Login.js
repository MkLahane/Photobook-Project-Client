import React, { useState, useContext, useRef } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import FormField from '../components/FormField';
import { useMutation } from '@apollo/client';
import { M_LOGIN_USER } from '../queries/user';
import { useForm } from '../util/hooks';
import Notification from '../components/Notification';
import './login.css';


const Login = (props) => {
    const context = useContext(AuthContext);
    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const { onChange, onSubmit, values, clearValues } = useForm(loginUserGlobal, {
        email: '',
        password: ''
    });
    const [spawnNotify, setSpawnNotify] = useState(false);
    const [notifyColor, setNotifyColor] = useState('');
    const [notifyText, setNotifyText] = useState([]);


    const [loginUser, { loading }] = useMutation(M_LOGIN_USER, {
        update(_, { data: { login: userData } }) { //gets triggered after successful mutation 
            context.login(userData);
            props.history.push('/');
        },
        onError(err) {
            const errors = err.graphQLErrors[0].extensions.exception.errors;
            values['password'] = '';
            passwordInputRef.current.focus();
            setNotifyColor('#FF2525');
            setNotifyText(Object.values(errors));
            setSpawnNotify(true);
        },
        variables: values
    });
    function loginUserGlobal() {
        loginUser();
    }
    return (
        <>
            <div className='login-div'>
                <form onSubmit={onSubmit}>
                    <FormField inputName='Email' inputType='text'
                        inputRef={emailInputRef}
                        inputKey='email' onInputChange={onChange} values={values} />
                    <FormField inputName='Password' inputType='password'
                        inputRef={passwordInputRef}
                        inputKey='password' onInputChange={onChange} values={values} />
                    <button>
                        <span>Log In</span>
                    </button>
                </form>
            </div >
            {
                spawnNotify &&
                <Notification texts={notifyText} setSpawnNotify={setSpawnNotify} divColor={notifyColor} />
            }
        </>
    );
};

export default Login; 