import { useState } from "react";
import "../styles/RestaurantProfile.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
function RestaurantProfile() {
    const navigate=useNavigate()
    const [restaurantName, setRestaurantName] = useState("")
    const [restaurantType, setRestaurantType] = useState("Restaurant")
    const [addressLine, setAddressLine] = useState("")
    const [landmark, setLandmark] = useState("")
    const [area, setArea] = useState("");
    const [pincode, setPincode] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [documentType, setDocumentType] = useState("Government ID");
    const [documentNumber, setDocumentNumber] = useState("");
    const [acceptingDonations, setAcceptingDonations] = useState(true)
    
    const handleSaveProfile = async()=>{
        try{
            const token = localStorage.getItem("token")
            console.log("Token:",token)
            const response = await axios.post(
                "http://localhost:3000/api/restaurant/profile",
                {
                    restaurantName,
                    restaurantType,
                    address:{
                        addressLine,
                        landmark,
                        area,
                        pincode,
                        city,
                        state,
                        location:{
                            type:"Point",
                            coordinates:[
                                73.8567,
                                18.5204
                            ]
                        }
                    },
                    verificationDocuments:[
                        {
                            documentType:"Buisness Document",
                            documentNumber:"",
                            // file:{
                            //     url:"sample.pdf",
                            //     fileName:"sample.pdf",
                            //     mimeType:"application/pdf",
                            //     fileSize:1000
                            // }
                        }
                    ],
                    acceptingDonations
                },
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            )
            console.log(response.data)
            alert("Restaurant profile created successfully")
            navigate("/restaurant-dashboard")
        } catch(error){
            console.log(error)
            if(error.response){
                alert(error.response.data.message)
            }
            else{
                alert(error.message)
            }
        }
    }
    return (
        <div className="profile-container">
            <div className="profile-card">
                <h1>Restaurant profile</h1>
                <input
                    type="text"
                    placeholder="Restaurant name"
                    value={restaurantName}
                    onChange={(e) => setRestaurantName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Address Line"
                    value={addressLine}
                    onChange={(e) => setAddressLine(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Landmark"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Area"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                />
                <div className="type-section">
                    <p>Restaurant Type</p>
                    <label>
                        <input
                            type="radio"
                            value="Restaurant"
                            checked={restaurantType === "Restaurant"}
                            onChange={(e) => setRestaurantType(e.target.value)}
                        />
                        Restaurant
                    </label>

                    <label>
                        <input
                            type="radio"
                            value="Hotel"
                            checked={restaurantType === "Hotel"}
                            onChange={(e) => setRestaurantType(e.target.value)}
                        />
                        Hotel
                    </label>

                    <label>
                        <input
                            type="radio"
                            value="Bakery"
                            checked={restaurantType === "Bakery"}
                            onChange={(e) => setRestaurantType(e.target.value)}
                        />
                        Bakery
                    </label>
                </div>
                <button className="location-btn">
                    Use current location 📍
                </button>
                <div className="file-section">
                    <p>Verification Document</p>
                    <select value={documentType}
                    onChange={(e)=>setDocumentType(e.target.value)}>
                        <option>Government ID</option> 
                        <option>Buisness Document</option> 
                        <option>Registration Certificate</option> 
                        <option>Restaurant Photo</option> 
                        <option>Profile Photo</option> 
                    </select>
                    <input 
                    type="text"
                    placeholder="Document Number"
                    value={documentNumber}
                    onChange={(e)=>setDocumentNumber(e.target.value)} />
                </div>
                <div className="donation-section">
                    <p>Accepting donations</p>
                    <label>
                        <input
                            type="radio"
                            checked={acceptingDonations === true}
                            onChange={() => setAcceptingDonations(true)} />
                        Yes
                    </label>
                    <label>
                        <input
                            type="radio"
                            checked={acceptingDonations === false}
                            onChange={() => setAcceptingDonations(false)} />
                        No
                    </label>
                </div>
                <button
                    className="save-btn"
                    onClick={handleSaveProfile}
                >
                    Save Profile
                </button>
            </div>
        </div>
    )
}
export default RestaurantProfile