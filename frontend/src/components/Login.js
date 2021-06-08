import React, {Component} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        axios.get("http://localhost:4000/user/legit", {withCredentials: true})
            .then(res => {
                console.log(res.data, "this is the response");
                if(!res.data){
                    // window.location = '/login';
                }
                else{
                    window.location = '/dashboard';
                    console.log(document.cookie + "this cookie");
                }
            })
            .catch(err => {
                console.log(err);
            });
        console.log(Date());
    }

    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('http://localhost:4000/user/login', user, {withCredentials: true})
            .then(res => {
                if(res.status == 200)
                {
                    alert("Welcome " + res.data.name);
                    // console.log("Logged in successfully\t" + res.data.name);
                    window.location = '/dashboard';
                }
                // Not getting this response
                // if(res.status == 204)
                // {
                //     alert("Make sure that password and emailId are correct!")
                // }
            })
            .catch(err => {
                console.log(err);
                window.location = '/login';
                alert("Couldn't log you in. Please try again");
            });
    }

    render() {
        return (
            <div align='center'>
                <h1>Welcome to your Login Page</h1>
                <form >
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.email}
                               onChange={this.onChangeEmail}
                               />
                    </div>
                    <br/>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password"
                               className="form-control"
                               value={this.state.password}
                               onChange={this.onChangePassword}
                               />
                    </div>
                    <Box textAlign='center' margin={2}>
                    <Button variant="contained" onClick={this.onSubmit} color="primary">
                        Login
                    </Button>
                </Box>
                    <h3>Not registered yet!</h3>
                    <a href="http://localhost:3000/register">Register Here</a>
                </form>
            </div>
        )
    }
}