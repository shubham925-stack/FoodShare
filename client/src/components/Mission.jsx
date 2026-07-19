import { Link } from "react-router-dom";
import "../styles/Mission.css";

function Mission() {
    return (
        <section className="mission">

            <div className="mission-container">

                {/* Left Section */}

                <div className="mission-content">

                    <span className="mission-tag">
                        OUR MISSION
                    </span>

                    <h2>
                        Together, We Can Make Every Meal Count.
                    </h2>

                    <p>
                        FoodShare is committed to reducing food waste by
                        connecting restaurants with verified NGOs. Every
                        successful donation helps protect the environment,
                        supports local communities, and ensures surplus food
                        reaches people instead of landfills.
                    </p>

                    <Link
                        to="/register"
                        className="mission-btn"
                    >
                        Join the Mission
                    </Link>

                </div>

                {/* Right Section */}

                <div className="mission-cards">

                    <div className="mission-card">

                        <div className="mission-icon">
                            🌱
                        </div>

                        <h3>Reduce Food Waste</h3>

                        <p>
                            Give surplus food a second chance instead of
                            throwing it away.
                        </p>

                    </div>

                    <div className="mission-card">

                        <div className="mission-icon">
                            ❤️
                        </div>

                        <h3>Fight Hunger</h3>

                        <p>
                            Help NGOs provide nutritious meals to
                            communities in need.
                        </p>

                    </div>

                    <div className="mission-card">

                        <div className="mission-icon">
                            🤝
                        </div>

                        <h3>Build Strong Communities</h3>

                        <p>
                            Encourage collaboration between restaurants,
                            NGOs, and volunteers.
                        </p>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default Mission;