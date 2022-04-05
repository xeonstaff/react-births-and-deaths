import { useState, useEffect } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useNavigate } from "react-router-dom";

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { app } from '../../firebase-config'

import 'react-toastify/dist/ReactToastify.css';
import '../../index.css'

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    let navigate = useNavigate();

    const handleAction = () => {
        const authentication = getAuth();

        createUserWithEmailAndPassword(authentication, email, password)
            .then((response) => {
                navigate('/profile')
                sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
            })
            .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    toast.error('Email Already in Use');
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
            <div className="container toast">
                <div className="heading-container">
                    <h3>
                        Signup Form
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
                <Button variant="contained" onClick={handleAction}>Sign Up</Button>
            </div>
        </>
    );
}