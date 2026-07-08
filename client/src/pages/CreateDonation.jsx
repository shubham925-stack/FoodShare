import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/CreateDonation.css";

function CreateDonation() {

    const navigate = useNavigate();

    const [foodName, setFoodName] = useState("");
    const [category, setCategory] = useState("");
    const [foodType, setFoodType] = useState("Veg");
    const [totalQuantity, setTotalQuantity] = useState("");
    const [unit, setUnit] = useState("Plates");
    const [description, setDescription] = useState("");
    const [pickupStartTime, setPickupStartTime] = useState("");
    const [pickupEndTime, setPickupEndTime] = useState("");
    const [expiryTime, setExpiryTime] = useState("");
    const [pickupInstructions, setPickupInstructions] = useState("");

    const handleCreateDonation = async()=>{
        try{
            const token = localStorage.getItem("token")
            const response = await axios.post(
                "http://localhost:3000/api/food-donations/",
                {
                    foodItems:[
                        {
                        foodName,
                        category,
                        foodType,
                        totalQuantity: Number(totalQuantity),
                        unit,
                        description
                    }
                    ],
                    pickupStartTime,
                    pickupEndTime,
                    expiryTime,
                    pickupInstructions
                },
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );
            console.log(response.data);
            alert("Donation created successfully");
            navigate("/restaurant-dashboard")
        }
        catch(error){
            console.log(error);
            if(error.response?.status===401){
                localStorage.removeItem("token")
                localStorage.removeItem("user");
                navigate("/login")
            }
            else if(error.response){
                alert(error.response.data.message);
            }
            else{
                alert(error.message)
            }
        }
    }
    return (
    <div className="profile-container">
        <div className="profile-card">
            <h1>Create Food Donation</h1>
            <input
                type="text"
                placeholder="Food Name"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            <div className="type-section">
                <p>Food Type</p>
                <label>
                    <input
                        type="radio"
                        value="Veg"
                        checked={foodType === "Veg"}
                        onChange={(e) => setFoodType(e.target.value)}
                    />
                    Veg
                </label>
                <label>
                    <input
                        type="radio"
                        value="Non-Veg"
                        checked={foodType === "Non-Veg"}
                        onChange={(e) => setFoodType(e.target.value)}
                    />
                    Non-Veg
                </label>
                <label>
                    <input
                        type="radio"
                        value="Vegan"
                        checked={foodType === "Vegan"}
                        onChange={(e) => setFoodType(e.target.value)}
                    />
                    Vegan
                </label>
                <label>
                    <input
                        type="radio"
                        value="Jain"
                        checked={foodType === "Jain"}
                        onChange={(e) => setFoodType(e.target.value)}
                    />
                    Jain
                </label>
            </div>
            <input
                type="number"
                placeholder="Total Quantity"
                value={totalQuantity}
                onChange={(e) => setTotalQuantity(e.target.value)}
            />
            <div className="file-section">
                <p>Unit</p>
                <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                >
                    <option value="Plates">Plates</option>
                    <option value="pieces">Pieces</option>
                    <option value="Kg">Kg</option>
                    <option value="Grams">Grams</option>
                    <option value="Liters">Liters</option>
                    <option value="Ml">Ml</option>
                    <option value="Packets">Packets</option>
                    <option value="Bowls">Bowls</option>
                    <option value="Boxes">Boxes</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <textarea
                placeholder="Food Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
            />
            <label>Pickup Start Time</label>
            <input
                type="datetime-local"
                value={pickupStartTime}
                onChange={(e) => setPickupStartTime(e.target.value)}
            />
            <label>Pickup End Time</label>
            <input
                type="datetime-local"
                value={pickupEndTime}
                onChange={(e) => setPickupEndTime(e.target.value)}
            />
            <label>Expiry Time</label>
            <input
                type="datetime-local"
                value={expiryTime}
                onChange={(e) => setExpiryTime(e.target.value)}
            />
            <textarea
                placeholder="Pickup Instructions"
                value={pickupInstructions}
                onChange={(e) => setPickupInstructions(e.target.value)}
                rows={3}
            />
            <button
                className="save-btn"
                onClick={handleCreateDonation}
            >
                Create Donation
            </button>
        </div>
    </div>
);
}
export default CreateDonation