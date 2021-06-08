import React, { useState, useEffect } from 'react';
import form from 'react-hook-form';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';


function Register() {
    const [val, setVal] = useState({
        name: "",
        email: "",
        password: ""
    });

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

    const handleNameChange = (event) => {
        setVal({...val, name: event.target.value});
    }

    const handleEmailChange = (event) => {
        setVal({...val, email: event.target.value});
    }

    const handlePasswordChange = (event) => {
        setVal({...val, password: event.target.value});
    }


    const submit = (event) => {
        event.preventDefault();
        console.log("submitted");
        axios.post('http://localhost:4000/user/register', val)
            .then(res => {
                if(res.status == 200)
                {
                    alert("created " + res.data.name);
                    window.location = '/login';
                }
                if(res.status === 204)
                {
                    alert("Email already exists!");
                }
            });
    }

    return (
        <div align='center'>
            <h1>Welcome to your Registration Page</h1>
            <form>
                <div className="form-group">
                    <label>Name: </label>
                    <input type="text"
                           className="form-control"
                           value={val.name}
                           onChange={handleNameChange}
                    />
                </div>
                <div className="form-group">
                    <label>Email id: </label>
                    <input type="text"
                           className="form-control"
                           value={val.email}
                           onChange={handleEmailChange}
                    />
                </div>
                <div className="form-group">
                    <label>Password: </label>
                    <input type="password"
                           className="form-control"
                           value={val.password}
                           onChange={handlePasswordChange}
                    />
                </div>
                <Box textAlign='center' margin={2}>
                    <Button variant="contained" onClick={submit} color="primary">
                        Register
                    </Button>
                    </Box>
                    <h3>Already registered!</h3>
                    <a href="http://localhost:3000/login">Login Here</a>
            </form>
        </div>
    )
}

export default Register