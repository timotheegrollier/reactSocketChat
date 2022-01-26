import React, { useRef, useState, useEffect } from 'react';
import Nav from '../components/Nav';
import axios from "axios";


const Signup = () => {
    const password = useRef()
    const confirmPassword = useRef()
    const pseudo = useRef()
    const terms = useRef()
    const [errors, setErrors] = useState()
    const [uniqueErrors, setUniqueErrors] = useState()
    const newUser = (e) => {
        e.preventDefault()
        const user = {
            pseudo: pseudo.current.value,
            password: password.current.value,
            confirmPass:confirmPassword.current.value,
            createdAt: new Date(),
            terms: terms.current.checked
        }
            axios.post('/api/secure/signup', user)
                .then(res => {
                    console.log(res);
                    setErrors()
                    setUniqueErrors()
                })
                .catch(error => {
                    if (error.response.status === 422) {
                        setErrors(error.response.data.errors)
                        console.log(error.response.data.errors)
                    }
                    if (error.response.data.error){
                            setUniqueErrors("Pseudo must be unique")
                    }else{
                        setUniqueErrors(error.response.data.termsError)
                    }
                    console.log(error.response);
                })
        
    }


    useEffect(() => {
        if (uniqueErrors) {
            setErrors()
        } else {
            setUniqueErrors()
        }
    })

    return (
        <div id='signup'>
            <Nav></Nav>
            <h1 className='text-center'>Signup</h1>
            <form action="" onSubmit={newUser}>
                <label htmlFor="pseudo">Pseudo :</label>
                <input type="text" name="pseudo" ref={pseudo} className='form-control' />
                <label htmlFor="password">Password :</label>
                <input ref={password} type="password" name="password" className='form-control' />
                <label htmlFor="password">Confirm password :</label>
                <input ref={confirmPassword} type="password" name="confirmPassword" className='form-control' />
                <label className="form-check-label d-flex align-items-center checkterms" htmlFor="acceptTerms">Accept terms of use ?
                    <input ref={terms} type="checkbox" className="form-check-input p1" name='acceptTerms' id='acceptTerms' />
                </label>
                <button type="submit" className='btn btn-success col-6 col-sm-3'>Signup</button>
            </form>
            {errors && (
                <p className='text-danger text-center h-5 error'>
                    {errors[0].msg}
                </p>
            )}
            {uniqueErrors && (
                <p className='text-danger text-center h-5 error'>
                    {uniqueErrors}
                </p>
            )}
        </div>
    );
};

export default Signup;