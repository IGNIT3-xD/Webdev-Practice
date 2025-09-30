import React from 'react';

const Etarget = () => {

    const handleForm = (e) => {
        e.preventDefault()

        console.log(e.target.name.value);
        console.log(e.target.email.value);
        console.log(e.target.password.value);
    }

    return (
        <div>
            <h2>E Target - Form</h2>
            <form onSubmit={handleForm}>
                <input type="text" name='name' placeholder='Your Name' />
                <input type="email" name="email" placeholder='Your Email' />
                <input type="password" name="password" placeholder='Your Password' required />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Etarget;