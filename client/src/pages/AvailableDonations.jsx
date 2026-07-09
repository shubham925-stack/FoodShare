import { useEffect,useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/AvailableDonations.css"
function AvailableDonations(){
    const navigate = useNavigate();
    const [donations, setDonations] = useState([]);

    const fetchDonation = async()=>{
        try{
            const response = await axios.get(
                "http://localhost:3000/api/food-donations"
            )
            const AvailableDonations=response.data.donations.filter(
                (donation)=>
                    donation.donationStatus!=="Fully Claimed"
            );
            setDonations(AvailableDonations);
        }catch(error){
            console.log(error)
            if (error.response?.status === 401){
                localStorage.removeItem("token")
                localStorage.removeItem("user")
                navigate("/login")
            }
        }
    }
    useEffect(()=>{
        fetchDonation()
    },[])
    return (
        <div className="donations-container">
            <h1>Available Donations</h1>
            {donations.length === 0 ? (
                <p>No donations available.</p>
            ) : (
                donations.map((donation) => (
                    <div
                        className="donation-card"
                        key={donation._id}
                    >
                        <h2>
                            {
                                donation.restaurantId
                                    ?.restaurantName
                            }
                        </h2>
                        {donation.foodItems.map((item) => (
                                <div className="food-item" key={item._id}>
                                    <h3>{item.foodName}</h3>
                                    <p><strong>Category:</strong> {item.category}</p>
                                    <p><strong>Food Type:</strong> {item.foodType}</p>
                                    <p>
                                        <strong>Available:</strong>{" "}
                                        {item.totalQuantity - item.claimedQuantity} {item.unit}
                                    </p>
                                    <p><strong>Description:</strong> {item.description}</p>
                                </div>
                            ))}
                        <p>
                            <strong>Pickup Start:</strong>{" "}
                            {new Date(
                                donation.pickupStartTime
                            ).toLocaleString()}
                        </p>
                        <p>
                            <strong>Pickup End:</strong>{" "}
                            {new Date(
                                donation.pickupEndTime
                            ).toLocaleString()}
                        </p>
                        <p>
                            <strong>Expiry:</strong>{" "}
                            {new Date(
                                donation.expiryTime
                            ).toLocaleString()}
                        </p>
                        <p>
                            <strong>Pickup Instructions:</strong>{" "}
                            {donation.pickupInstructions}
                        </p>
                        <button
                            className="claim-btn"
                            onClick={() =>
                                navigate(
                                    `/claim-donation/${donation._id}`
                                )
                            }
                        >
                            Claim Donation
                        </button>
                    </div>
                ))
            )}
        </div>
    )
}

export default AvailableDonations;