import { Link } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
    return (
        <footer className="footer">

            <div className="footer-container">

                {/* Brand */}

                <div className="footer-section">

                    <h2>FoodShare</h2>

                    <p>
                        Connecting restaurants with NGOs to reduce food
                        waste and help communities, one meal at a time.
                    </p>

                </div>

                {/* Quick Links */}

                <div className="footer-section">

                    <h3>Quick Links</h3>

                    <ul>

                        <li>
                            <a
                                href="#top"
                                className="footer-link"
                            >
                                Home
                            </a>
                        </li>

                        <li>
                            <Link to="/register">Register</Link>
                        </li>

                        <li>
                            <Link to="/login">Sign In</Link>
                        </li>

                    </ul>

                </div>

                {/* Contact */}

                <div className="footer-section">

                    <h3>Contact</h3>

                    <p>📧 foodshare@fmail.com</p>

                    <p>📍 Pune, Maharashtra</p>

                    <p>📞 +91 98765 xx210</p>

                </div>

            </div>

            <hr />

            <div className="footer-bottom">

                <p>
                    © 2026 FoodShare. All Rights Reserved.
                </p>

            </div>

        </footer>
    );
}

export default Footer;