import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios"
import "../styles/Register.css"
import "../pages/Login"

function Register(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("")
    const navigate=useNavigate()

const handleRegister=async()=>{
    try{
        const response = await axios.post(
            "http://localhost:3000/api/auth/register",
            {
                name,
                email,
                phone,
                password,
                role
            }
        )
        console.log(response.data);
        alert("Registration Successful")
        navigate("/login")
    }catch(error){
        console.log(error)
        if (error.response){
            alert(error.response.data.message)
        } else{
            alert(error.message)
        }
    }
};

return (
    <div className="register-page">
        <div className="register-wrapper">
            <Link to="/" className="home-button">
                ← Home
            </Link>
            <div className="register-left">
                <img
                    src="/logo.png"
                    alt="FoodShare Logo"
                    className="register-logo"
                />
                <h1>FoodShare</h1>
                <p className="tagline">
                    Connecting surplus food with people who need it.
                </p>
                <div className="feature-list">
                    <div className="feature-item">
                        Donate Surplus Food
                    </div>
                    <div className="feature-item">
                        Reduce Hunger
                    </div>
                    <div className="feature-item">
                        Reduce Food Waste
                    </div>
                    <div className="feature-item">
                        Connect Restaurants & NGOs
                    </div>
                </div>
            </div>
            {/* Right Panel */}
            <div className="register-card">
                <h2>Create Account </h2>
                <p className="register-subtitle">
                    Join oodShare and help reduce food waste.
                </p>
                <input
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="tel"
                    placeholder="Enter Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="role-section">
                    <p>Register As</p>
                    <label>
                        <input
                            type="radio"
                            value="Restaurant"
                            checked={role === "Restaurant"}
                            onChange={(e) => setRole(e.target.value)}
                        />
                        Restaurant
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="NGO"
                            checked={role === "NGO"}
                            onChange={(e) => setRole(e.target.value)}
                        />
                        NGO
                    </label>
                </div>
                <button onClick={handleRegister}>
                    Create Account
                </button>
                <p className="login-text">
                    Already have an account?{" "}
                    <Link to="/login" className="login-link">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    </div>
);
}
export default Register