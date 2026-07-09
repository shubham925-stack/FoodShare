import axios from "axios";
import { useEffect,useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/ClaimDonation.css";

function ClaimDonation(){
    const {id} = useParams();
    const navigate = useNavigate()

    const [donation, setDonation] = useState(null);
    const [itemId, setItemId] = useState("");
    const [quantity, setQuantity] = useState("");

    const fetchDonation = async()=>{
        try {
            const response = await axios.get(
                `http://localhost:3000/api/food-donations/${id}`               
            )
            setDonation(response.data.donation)
            if (response.data.donation.foodItems.length>0){
                setItemId(
                    response.data.donation.foodItems[0]._id
                );
            }
        }catch(error){
            console.log(error)
        }
    }
   useEffect(() => {
        fetchDonation();
    }, [])

    const handleClaim = async()=>{
        try{
            const token = localStorage.getItem("token");
            await axios.post(
                `http://localhost:3000/api/claims/${id}`,
                {
                    itemId,
                    quantity:Number(quantity)
                },
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }               
            );
            alert("claim request sent successfully")
            navigate("/ngo-dashboard")
        }catch (error) {
            console.log(error);
            alert(error.response?.data?.message ||  error.message);
        }
    };
    if (!donation) {
        return <h2>Loading...</h2>;
    }
    const selectedItem = donation.foodItems.find(
        (item) => item._id === itemId

    )

    return (
            <div className="claim-container">
                <div className="claim-card">
                    <h1>Claim Donation</h1>
                    <h2>
                        {
                            donation.restaurantId
                                ?.restaurantName
                        }
                    </h2>
                    <label>Select Food Item</label>
                    <select
                        value={itemId}
                        onChange={(e) =>
                            setItemId(e.target.value)
                        }
                    >
                        {
                            donation.foodItems.map((item) => (
                                <option
                                    key={item._id}
                                    value={item._id}
                                >
                                    {item.foodName}
                                </option>
                            ))
                        }
                    </select>
                    {
                        selectedItem && (
                            <>
                                <p>
                                    <strong>Category:</strong>{" "}
                                    {selectedItem.category}
                                </p>
                                <p>
                                    <strong>Food Type:</strong>{" "}
                                    {selectedItem.foodType}
                                </p>
                                <p>
                                    <strong>Available Quantity:</strong>{" "}
                                    {
                                        selectedItem.totalQuantity -
                                        selectedItem.claimedQuantity
                                    }{" "}
                                    {selectedItem.unit}
                                </p>
                                <p>
                                    <strong>Description:</strong>{" "}
                                    {selectedItem.description}
                                </p>
                            </>
                        )
                    }
                    <label>
                        Quantity to Claim
                    </label>
                    <input
                        type="number"
                        min="1"
                        max={
                            selectedItem
                                ? selectedItem.totalQuantity -
                                selectedItem.claimedQuantity
                                : 1
                        }
                        value={quantity}
                        onChange={(e) =>
                            setQuantity(e.target.value)
                        }
                    />
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
                        onClick={handleClaim}
                    >
                        Submit Claim
                    </button>
                </div>
            </div>
        );
}

export default ClaimDonation;   


