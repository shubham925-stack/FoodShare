import { Link } from "react-router-dom";
import "../styles/RestaurantDashboard.css";

function NGODashboard() {

    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>🍽️ FoodShare</h1>
                <h2>Welcome, {user?.name} 👋</h2>
                <p>Let's reduce food waste together.</p>
            </div>
            <div className="status-card">
                <h3>NGO Status</h3>
                <p>
                    Verification :
                    <span className="pending">
                        Pending
                    </span>
                </p>
            </div>
            <div className="dashboard-cards">
                <Link
                    to="/available-donations"
                    className="dashboard-card"
                >
                    <h2>🍱</h2>
                    <h3>Available Donations</h3>
                    <p>Browse available food donations</p>
                </Link>
                <Link
                    to="/my-claims"
                    className="dashboard-card"
                >
                    <h2>📦</h2>
                    <h3>My Claims</h3>
                    <p>View your claimed donations</p>
                </Link>
                <Link
                    to="/update-ngo-profile"
                    className="dashboard-card"
                >
                    <h2>👤</h2>
                    <h3>Edit Profile</h3>
                    <p>Update NGO details</p>
                </Link>
                <Link
                    to="/login"
                    className="dashboard-card logout-card"
                >
                    <h2>🚪</h2>
                    <h3>Logout</h3>
                    <p>Sign out</p>
                </Link>
            </div>
        </div>
    );
}

export default NGODashboard;