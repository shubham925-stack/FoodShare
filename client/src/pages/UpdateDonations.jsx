import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/CreateDonation.css";


function UpdateDonation() {
    const navigate = useNavigate();
    const { id } = useParams();
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

    const fetchDonation = async()=>{
        try{
            const token = localStorage.getItem("token");

            const response = await axios.get(
                `http://localhost:3000/api/food-donations/${id}`,
                {
                    headers:{
                        Authorization :`Bearer ${token}`
                    }
                }
            );

            const donation = response.data.donation;
            const item = donation.foodItems[0]

            setFoodName(item.foodName)
            setCategory(item.category)
            setFoodType(item.foodType);
            setTotalQuantity(item.totalQuantity)
            setUnit(item.unit)
            setDescription(item.description)    
            setPickupStartTime(
                donation.pickupStartTime.slice(0, 16)
            );
            setPickupEndTime(
                donation.pickupEndTime.slice(0, 16)
            );
            setExpiryTime(
                donation.expiryTime.slice(0, 16)
            );
            setPickupInstructions(
                donation.pickupInstructions
            );
        } catch (error) {
            console.log(error);
            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/login");
            }else{
                alert(error.response?.data.message||error.message)
            }
        }
    };
    useEffect(() => {
        fetchDonation();
    }, [])

    const handleUpdateDonation = async()=>{
        try{
            const token = localStorage.getItem("token");
            await axios.put(
                `http://localhost:3000/api/food-donations/${id}`,
                {
                    foodItems:[
                        {
                            foodName,
                            category,
                            foodType,
                            totalQuantity:Number(totalQuantity),
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
            alert("Donation Updated Successfully");
            navigate("/my-donations")
        } catch (error) {
            console.log(error);
            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/login");
            }
            else{
                alert(error.response?.data.message||error.message)
            }
         }
    }

    return(
    <div className="profile-container">
        <div className="profile-card">
            <h1>Update Food Donation</h1>
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
                onClick={handleUpdateDonation}
            >
                Update Donation
            </button> 
        </div>
    </div>        
    )
}

export default UpdateDonation