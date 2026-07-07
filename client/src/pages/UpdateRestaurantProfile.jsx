import { useState } from "react";
import axios from "axios"
import "../styles/RestaurantProfile.css"
import { useEffect } from "react";
// import verificationDocumentSchema from "../../../server/models/schemas/VerificationDocument";

function UpdateRestaurantProfile() {
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
    // get restaurant details
    const fetchRestaurantProfile = async () => {
        try {
            const token = localStorage.getItem("token")

            const response = await axios.get(
                "http://localhost:3000/api/restaurant/profile",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            const profile = response.data.profile;
            setRestaurantName(profile.restaurantName);
            setRestaurantType(profile.restaurantType);
            setAddressLine(profile.address.addressLine);
            setLandmark(profile.address.landmark);
            setArea(profile.address.area);
            setPincode(profile.address.pincode);
            setCity(profile.address.city);
            setState(profile.address.state);
            setDocumentType(
                profile.verificationDocuments[0].documentType
            );
            setDocumentNumber(
                profile.verificationDocuments[0].documentNumber
            );
            setAcceptingDonations(profile.acceptingDonations);
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchRestaurantProfile()
    }, [])
    //update restaurant details
    const handleUpdateProfile = async () => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios.put(
                "http://localhost:3000/api/restaurant/profile",
                {
                    restaurantName,
                    restaurantType,
                    address: {
                        addressLine,
                        landmark,
                        area,
                        pincode,
                        city,
                        state,
                        location: {
                            type: "Point",
                            coordinates: [
                                73.8567,
                                18.5204
                            ]
                        }
                    },
                    verificationDocuments: [
                        {
                            documentType,
                            documentNumber
                        }
                    ],
                    acceptingDonations
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log(response.data);
            alert("Restaurant profile updated successfully")
        } catch (error) {
            console.log(error)
            if (error.response) {
                alert(error.response.data.message)
            }
            else {
                alert(error.message)
            }
        }
    }
    return (
        <div className="profile-container">
            <div className="profile-card">
                <h1>Update Restaurant Profile</h1>
                <input
                    type="text"
                    placeholder="Restaurant Name"
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
                    <label>
                        <input
                            type="radio"
                            value="Cafe"
                            checked={restaurantType === "Cafe"}
                            onChange={(e) => setRestaurantType(e.target.value)}
                        />
                        Cafe
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Cloud Kitchen"
                            checked={restaurantType === "Cloud Kitchen"}
                            onChange={(e) => setRestaurantType(e.target.value)}
                        />
                        Cloud Kitchen
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Mess"
                            checked={restaurantType === "Mess"}
                            onChange={(e) => setRestaurantType(e.target.value)}
                        />
                        Mess
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Caterer"
                            checked={restaurantType === "Caterer"}
                            onChange={(e) => setRestaurantType(e.target.value)}
                        />
                        Caterer
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Other"
                            checked={restaurantType === "Other"}
                            onChange={(e) => setRestaurantType(e.target.value)}
                        />
                        Other
                    </label>
                </div>
                <div className="file-section">
                    <p>Verification Document</p>
                    <select
                        value={documentType}
                        onChange={(e) => setDocumentType(e.target.value)}
                    >
                        <option value="Government ID">Government ID</option>
                        <option value="Business Document">Business Document</option>
                        <option value="Registration Certificate">Registration Certificate</option>
                        <option value="Restaurant Photo">Restaurant Photo</option>
                        <option value="Profile Photo">Profile Photo</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Document Number"
                        value={documentNumber}
                        onChange={(e) => setDocumentNumber(e.target.value)}
                    />
                </div>
                <div className="donation-section">
                    <p>Accepting Donations</p>
                    <label>
                        <input
                            type="radio"
                            checked={acceptingDonations === true}
                            onChange={() => setAcceptingDonations(true)}
                        />
                        Yes
                    </label>
                    <label>
                        <input
                            type="radio"
                            checked={acceptingDonations === false}
                            onChange={() => setAcceptingDonations(false)}
                        />
                        No
                    </label>
                </div>
                <button
                    className="save-btn"
                    onClick={handleUpdateProfile}
                >
                    Update Profile
                </button>
            </div>
        </div>
    );
}
export default UpdateRestaurantProfile;