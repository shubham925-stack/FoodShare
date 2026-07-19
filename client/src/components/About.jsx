import "../styles/About.css";

function About() {
    return (
        <section className="about">

            <div className="about-container">

                {/* Left Side */}

                <div className="about-content">

                    <h2>About FoodShare</h2>

                    <p>
                        Every day, thousands of kilograms of perfectly edible
                        food are discarded while many people struggle to access
                        nutritious meals.
                    </p>

                    <p>
                        FoodShare bridges this gap by connecting restaurants
                        with verified NGOs, enabling surplus food to be donated,
                        claimed, and distributed safely before it expires.
                    </p>

                    <p>
                        Through technology, transparency, and collaboration,
                        FoodShare aims to reduce food waste, support
                        communities, and make every meal count.
                    </p>

                </div>

                {/* Right Side */}

                <div className="about-image">

                    <div className="about-card">

                        <div className="about-icon">🍽️</div>

                        <h3>Share Food</h3>

                        <p>
                            Restaurants donate surplus food instead of wasting it.
                        </p>

                    </div>

                    <div className="about-card">

                        <div className="about-icon">🤝</div>

                        <h3>Connect NGOs</h3>

                        <p>
                            Verified NGOs claim and collect available donations.
                        </p>

                    </div>

                    <div className="about-card">

                        <div className="about-icon">❤️</div>

                        <h3>Feed People</h3>

                        <p>
                            Good food reaches people who need it the most.
                        </p>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default About;