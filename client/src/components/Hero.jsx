import { Link } from "react-router-dom";
import "../styles/Hero.css";

function Hero() {
    return (
        <section className="hero" id="top">
            
            <nav className="navbar">

                        <div className="logo">
                            <div className="logo-circle">
                                <img
                                    src="/logo.png"
                                    alt="FoodShare Logo"
                                    className="logo-image"
                                />
                            </div>
                            <span>FoodShare</span>
                        </div>

                <div className="nav-links">

                    <Link
                        to="/login"
                        className="nav-btn"
                    >
                        Sign In
                    </Link>

                    <Link
                        to="/register"
                        className="register-btn"
                    >
                        Register
                    </Link>

                </div>

            </nav>

            {/* Hero Content */}

            <div className="hero-content">

                <h1>
                    Reducing Food Waste,
                    <br />
                    One Meal at a Time.
                </h1>

                <p>
                    FoodShare connects restaurants with NGOs,
                    helping surplus food reach people
                    instead of ending up in landfills.
                </p>

                <Link
                    to="/register"
                    className="hero-button"
                >
                    Register Now
                </Link>

            </div>

            {/* Scroll */}

            <div className="scroll-down">

                ↓

                <span>Scroll to Learn More</span>

            </div>

        </section>
    );
}

export default Hero;