import React, { useState } from 'react';

const ControlledField = () => {

    const [name, setName] = useState("")
    const [pass, setPass] = useState("")
    const [error, setError] = useState("")

    const handleForm = (e) => {
        e.preventDefault()

        console.log(e.target.name.value);
        console.log(e.target.email.value);
        console.log(e.target.password.value);

        if (name.length < 3) {
            setError("Please Enter A Valid Name")
        }
        else {
            setError("")
        }

        if (pass.length < 6) {
            setError("Please Enter A Valid Password")
        }
        else {
            setError('')
        }
    }

    const handleName = (e) => {
        e.preventDefault()

        console.log(e.target.value);
        setName(e.target.value)

        // if (name.length === 0) {
        //     setError("Please Enter A Valid Name")
        // }
        // else {
        //     setError("")
        // }
    }

    const handlePass = (e) => {
        e.preventDefault()

        let value = e.target.value;
        console.log(value);
        setPass(value)
    }

    return (
        <div>
            <h2>Controlled Feild - Form</h2>
            <form onSubmit={handleForm}>
                <input onChange={handleName} type="text" name='name' placeholder='Your Name' />
                <input type="email" name="email" placeholder='Your Email' defaultValue={"example@mail.com"} />
                <input onChange={handlePass} type="password" name="password" required placeholder='Your Password' />
                <button type="submit">Submit</button>
            </form>
            <p style={{ color: "red" }}>{error}</p>
        </div>
    );
};

export default ControlledField;