import React, { useRef } from 'react';

const UnControlledField = () => {

    const nameRef = useRef('')
    const passRef = useRef('')

    const handleForm = (e) => {
        e.preventDefault()

        console.log(nameRef.current.value);
        console.log(passRef.current.value);
    }

    return (
        <div>
            <h2>Un-Controlled Field - Form</h2>
            <form onSubmit={handleForm}>
                <input ref={nameRef} type="text" name='name' placeholder='Your Name' />
                <input type="email" name="email" placeholder='Your Email' defaultValue={"example@mail.com"} />
                <input ref={passRef} type="password" name="password" placeholder='Your Password' />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default UnControlledField;