import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css"
import useAuth from "../hooks/useAuth"; //change

function Login() {
    const {login} = useAuth() //change
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const handleLogin = async () => {
        try {
            const response = await axios.post(
                "http://localhost:3000/api/auth/login",
                {
                    email,
                    password
                }
            )
            login(response.data.user, response.data.token); //change
            const token = response.data.token
            const user = response.data.user
            console.log("Saved token:", localStorage.getItem("token"))
            console.log(response.data)
            alert("Login Successful")
            if (user.role === "Restaurant") {
                try {
                    await axios.get(
                        "http://localhost:3000/api/restaurant/profile",
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );
                    navigate("/restaurant-dashboard");
                } catch (error){
                    console.log("Profile Check Error:", error.response);
                    if (error.response?.status === 404){
                        navigate ("/restaurant-profile")
                    }
                    else{
                         alert(error.response?.data?.message || error.message);
                    }
                }
             }

             if (user.role === "NGO") {
                try {
                    await axios.get(
                        "http://localhost:3000/api/ngo-profiles/profile",
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );
                    navigate("/ngo-dashboard");
                } catch (error){
                    console.log("Profile Check Error:", error.response);
                    if (error.response?.status === 404){
                        navigate ("/ngo-profile")
                    }
                    else{
                         alert(error.response?.data?.message || error.message);
                    }
                }
             }

        } catch (error) {
            console.log(error);
            if (error.response) {
                alert(error.response.data.message)
            } else {
                alert(error.message)
            }
        }
    }
    return (
        <div className="login-page">
            <div className="login-wrapper">
                <Link to ="/" className="home-button">
                     Home
                </Link>
                <div className="login-left">
                    <img src="/logo.png" alt="FoodShare Logo" className="login-logo"/>
                    <h1>FoodShare</h1>
                    <p className="tagline">
                        Connecting surplus food with people who need it.
                    </p>
                    <div className="feature-list">
                        <div className="feature-item">
                            Donate surplus food
                        </div>
                        <div className="feature-item">
                            Reduce hunger
                        </div>
                        <div className="feature-item">
                            Reduce food waste
                        </div>
                        <div className="feature-item">
                            Connect Restaurants and NGOs
                        </div>
                    </div>
                </div>
                <div className="login-card">
                    <h2>Welcome back</h2>
                    <p className="login-subtitle">
                        Sign in to continue your FoodShare journey
                    </p>
                    <input type="email"
                           placeholder="enter email"
                           value={email}
                           onChange={(e)=>setEmail(e.target.value)}
                    />
                    <input type="password"
                           placeholder="enter password"
                           value={password}
                           onChange={(e)=>setPassword(e.target.value)}
                    />
                    <button onClick={handleLogin}>
                        Sign In
                    </button>
                    <p className="register-text">
                        Don't have and account?{" "}
                        <Link to="/register">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login