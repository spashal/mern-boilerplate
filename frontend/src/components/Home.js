import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';


export default function Home() {
    
    let history = useHistory();

    function goToLogin() {
        history.push('/login');
    }

    function goToRegister() {
        history.push('/register');
    }

    useEffect(() => {
        axios.get("http://localhost:4000/user/legit", {withCredentials: true})
            .then(res => {
                if(!res.data){
                    // window.location = '/login';
                }
                else{
                    window.location = '/dashboard';
                }
            })
            .catch(err => {
                console.log(err);
            });
    })

    return(
        <div>
            <div>
                <h3 align='center'>
                    Welcome. We are at your serivce.
                </h3>
            </div>
            <div>
                <Box textAlign='center' margin={2}>
                    <Button variant="contained" onClick={goToLogin} color="primary">
                        Login
                    </Button>
                </Box>
                <Box textAlign='center' margin={2}>
                    <Button variant="contained" onClick={goToRegister} color="primary">
                        Register
                    </Button>
                </Box>
            </div>
        </div>
    );
}