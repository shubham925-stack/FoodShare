import { useState } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import "../styles/Login.css"


function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const handleLogin = async()=>{
        try{
            const response = await axios.post(
                "http://localhost:3000/api/auth/login",
                {
                    email,
                    password
                }
            )
            localStorage.setItem("token",response.data.token)
            localStorage.setItem("user",JSON.stringify(response.data.user))
            console.log("Saved token:",localStorage.getItem("token"))
            console.log(response.data)
            alert("Login Successful")
            navigate("/restaurant-profile")
        }catch(error){
            console.log(error);
            if (error.response){
                alert(error.response.data.message)
            } else{
                alert(error.message)
            }
        }
    }
    return(
        <div className="login-container">
            <div className="login-card">
                <h1>Food Share</h1>
                <h2>Login</h2>
                
                <input  
                   type="email" 
                   placeholder="Enter Email"
                   value={email}
                   onChange={(e)=>setEmail(e.target.value)
                   }/>

                <input  
                   type="password" 
                   placeholder="Enter Password"
                   value={password}
                   onChange={(e)=>setPassword(e.target.value)
                   }/>
                <button onClick={handleLogin}>
                    Login
                </button>
                <p className="register-text">
                    Don't have an account?{" "}
                    <Link to="/">
                    Register
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login