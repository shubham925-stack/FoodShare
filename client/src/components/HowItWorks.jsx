import "../styles/HowItWorks.css";

function HowItWorks() {
    return (
        <section className="how-it-works">

            <div className="section-header">
                <h2>How FoodShare Works</h2>
                <p>
                    From surplus food to a meal on someone's plate —
                    every donation follows a simple and transparent process.
                </p>
            </div>

            <div className="workflow">

                {/* Step 1 */}
                <div className="step-card">

                    <div className="step-number">1</div>

                    <div className="step-icon">🍽️</div>

                    <h3>Restaurant</h3>

                    <p>
                        Restaurants upload details of surplus food,
                        including quantity, pickup time and expiry.
                    </p>

                </div>

                <div className="arrow">➜</div>

                {/* Step 2 */}
                <div className="step-card">

                    <div className="step-number">2</div>

                    <div className="step-icon">🏢</div>

                    <h3>NGO</h3>

                    <p>
                        Nearby verified NGOs browse available donations
                        and submit a claim request.
                    </p>

                </div>

                <div className="arrow">➜</div>

                {/* Step 3 */}
                <div className="step-card">

                    <div className="step-number">3</div>

                    <div className="step-icon">✅</div>

                    <h3>Approval</h3>

                    <p>
                        The restaurant reviews the request and
                        approves the NGO for pickup.
                    </p>

                </div>

                <div className="arrow">➜</div>

                {/* Step 4 */}
                <div className="step-card">

                    <div className="step-number">4</div>

                    <div className="step-icon">🚚</div>

                    <h3>Pickup</h3>

                    <p>
                        The NGO arrives within the pickup window
                        and collects the donated food.
                    </p>

                </div>

                <div className="arrow">➜</div>

                {/* Step 5 */}
                <div className="step-card">

                    <div className="step-number">5</div>

                    <div className="step-icon">❤️</div>

                    <h3>Distribution</h3>

                    <p>
                        The food reaches people in need,
                        reducing waste and supporting communities.
                    </p>

                </div>

            </div>

        </section>
    );
}

export default HowItWorks;