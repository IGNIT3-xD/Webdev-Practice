import React from 'react';
import useInputField from './UseInputField';

const CustomHook = () => {

    const [name, handleName] = useInputField("")
    const [pass, handlePass] = useInputField("")

    const handleForm = (e) => {
        e.preventDefault()

        console.log(name, pass);
    }

    return (
        <div>
            <h2>Custom Hook - Form</h2>
            <form onSubmit={handleForm}>
                <input onChange={handleName} type="text" name='name' placeholder='Your Name' />
                <input type="email" name="email" placeholder='Your Email' />
                <input onChange={handlePass} type="password" name="password" placeholder='Your Password' />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CustomHook;