import "../styles/Navbar.css"
function Navbar(){
    return(
        <nav className="navbar">
            <h2 className="logo">FoodShare</h2>
            <div className="nav-links">
                <a href="/">Home</a>
                <a href="/">About</a>
                <a href="/">Login</a>
                <a href="/">Register</a>
            </div>
        </nav>
    )
}

export default Navbar;