import { useState } from 'react';

export const useForm = (callback, initialState = {}) => {
    const [values, setValues] = useState(initialState);

    const clearValues = () => {
        for (let inputKey of Object.keys(values)) {
            values[inputKey] = '';
        }
    };
    const onChange = event => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };
    const onSubmit = event => {
        event.preventDefault();
        callback();
    };
    return {
        onChange,
        onSubmit,
        clearValues,
        values
    };
};




