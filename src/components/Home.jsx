import { useState } from "react";

function Home(){
    const [isTokenExpired, setIsTokenExpired] = useState(false);
    const token = localStorage.getItem('token');
    if(token){
        fetch('http://localhost:8080/api/auth/isSessionExpired', {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' },
            body: token
          }).then(response => response.json())
            .then(data => {
                console.log("data", data);
                setIsTokenExpired(data);
            })
            .catch(error =>{
                console.error('Error : ', error);
            })
    }
    
    if(isTokenExpired){
        localStorage.removeItem('token');
    }
    return (
        <div>
            <h1>Welcome to Home page</h1>
        </div>
    )
}

export default Home;