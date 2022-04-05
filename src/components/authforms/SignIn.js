import { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Box, Button, TextField } from '@mui/material';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { app } from '../../firebase-config'


import 'react-toastify/dist/ReactToastify.css';
import '../../index.css'


export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    let navigate = useNavigate();

    const handleAction = () => {
        const authentication = getAuth();

        signInWithEmailAndPassword(authentication, email, password)
            .then((response) => {
                navigate('/profile')
                sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
            })
            .catch((error) => {
                if (error.code === 'auth/wrong-password') {
                    toast.error('Please check the Password');
                }
                if (error.code === 'auth/user-not-found') {
                    toast.error('Please check the Email');
                }
            })

    }

    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')

        if (authToken) {
            navigate('/profile')
        }
    }, [])

    return (
        <>
            <h1 className="pagetitle">
                Sign in to access 'death' records.
            </h1>
            <div className="container">
                <div className="heading-container">
                    <h3>
                        Signin Form
                    </h3>
                </div>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="email"
                        label="Enter Email"
                        variant="outlined"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        type="password"
                        id="outlined-password-input"
                        label="Enter Password"
                        variant="outlined"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Box>
                <div className="signinbox">
                    <div className="signinitem">
                        <h4>Need an account? </h4>
                        <Link to='/signup'>Sign Up</Link>
                    </div>
                    <div className="signinitem">
                        <h4>Forgot Password? </h4>
                        <Link to='/resetpassword'>Reset Password</Link>
                    </div>
                </div>
                <Button variant="contained" onClick={handleAction}>Sign In</Button>
            </div>
        </>
    );
}