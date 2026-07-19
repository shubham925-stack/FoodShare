import { Link } from "react-router-dom";
import "../styles/LandingPage.css"
import Hero from "../components/Hero"
import About from "../components/About";
import HowItWorks from "../components/HowItWorks";
import Mission from "../components/Mission";
import Footer from "../components/Footer";
function LandingPage(){
    return(
        <>
            <Hero />  
            <About />      
            <HowItWorks />
            <Mission />
            <Footer />
        </>
    )
}
export default LandingPage;
