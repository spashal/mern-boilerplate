import axios from 'axios';
import React, {useEffect} from 'react';

function Logout() {
    useEffect(() => {
        axios.get("http://localhost:4000/user/legit", {withCredentials: true})
            .then(res => {
                // console.log(res.data, "this is the response");
                if(!res.data){
                    window.location = '/login';
                }
            })
            .catch(err => {
                console.log(err);
            });

        axios.get('http://localhost:4000/user/logout', {withCredentials: true})
            .then(res => {
                alert("Logged out successfully");
                window.location = '/login';
                // console.log(res, "is the response");
            })
            .catch(err => {
                console.log(err);
                alert("Couldn't logout. Please try again or after some time.");
            });
    });
    return(
        <div>
            <h3>Thank you for visiting us!</h3>
        </div>
    );

}

export default Logout