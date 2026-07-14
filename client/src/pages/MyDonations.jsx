import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/MyDonations.css"

function MyDonations() {
    const [donations, setDonations] = useState([])
    const navigate = useNavigate();

    const fetchDonations = async () => {
        try {
            const token = localStorage.getItem("token")
            const user = localStorage.getItem("user")

            const response = await axios.get(
                "http://localhost:3000/api/food-donations/my-donations",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setDonations(response.data.donations);
        }
        catch (error) {
            console.log(error)
            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/login");
            }
            else {
                alert(error.response?.data?.message || error.message);
            }
        }
    }
    const handleDelete = async(donationId)=>{
        const confirmDelete = window.confirm(
            "Are you sure you want to delete the donation"
        );
        if(!confirmDelete) return;
        try{
            const token = localStorage.getItem("token")
            const user = localStorage.getItem("user")
            await axios.delete(
                `http://localhost:3000/api/food-donations/${donationId}`,
                {
                    headers:{
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            alert("Donation deleted successfully");
            fetchDonations
        }catch (error){
            console.log(error)
            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/login");
            }
            else {
                alert(error.response?.data?.message || error.message);
            }
        }
    }
        useEffect(() => {
            fetchDonations()
        }, [])
    return (
        <div className="my-donations-container">
            <h1>My Donations</h1>
            {
                donations.length === 0 ? (
                    <p>No donations found.</p>
                ) : (
                    donations.map((donation) => (
                        <div
                            key={donation._id}
                            className="donation-card"
                        >
                            {
                                donation.foodItems.map((item) => (
                                    <div
                                        key={item._id}
                                        className="food-item"
                                    >
                                        <h2>{item.foodName}</h2>
                                        <p>
                                            <strong>Category:</strong> {item.category}
                                        </p>
                                        <p>
                                            <strong>Food Type:</strong> {item.foodType}
                                        </p>
                                        <p>
                                            <strong>Quantity:</strong>{" "}
                                            {item.totalQuantity} {item.unit}
                                        </p>
                                        <p>
                                            <strong>Claimed:</strong>{" "}
                                            {item.claimedQuantity}
                                        </p>
                                        <p>
                                            <strong>Available:</strong>{" "}
                                            {item.totalQuantity - item.claimedQuantity}
                                        </p>
                                        <p>
                                            <strong>Description:</strong>{" "}
                                            {item.description}
                                        </p>
                                    </div>
                                ))
                            }
                            <hr />
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
                                <strong>Status:</strong>{" "}
                                {donation.donationStatus}
                            </p>
                            <p>
                                <strong>Pickup Instructions:</strong>{" "}
                                {donation.pickupInstructions}
                            </p>
                            <div className="button-group">
                                <button onClick={()=> navigate(`/update-donation/${donation._id}`)}>
                                    Edit
                                </button>
                                <button onClick={()=>handleDelete(donation._id)}>
                                    Delete
                                </button>
                            </div>                    
                        </div>
                        
                    ))
                )
            }
            <div >
                <button className="Home-button"
                onClick={()=>navigate("/restaurant-dashboard")}>
                     Home
                 </button>    
            </div>
        </div>
    );
}

export default MyDonations;