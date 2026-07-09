import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MyClaims.css"

function MyClaims() {
    const navigate = useNavigate()
    const [claims, setClaims] = useState([])

    const fetchClaims = async () => {
        try {
            const token = localStorage.getItem("token")

            const response = await axios.get(
                "http://localhost:3000/api/claims/ngo",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setClaims(response.data.claims)
        } catch (error) {
            console.log(error)

            if (error.response?.status === 401) {
                localStorage.removeItem("token")
                localStorage.removeItem("user")
                navigate("/login")
            }
        }
    };
    useEffect(() => {
        fetchClaims()
    }, [])
    return (
        <div className="claims-container">
            <h1>My Claims</h1>
            {claims.length === 0 ? (
                <p>No claims found.</p>
            ) : (
                claims.map((claim) => (
                    <div
                        className="claim-card"
                        key={claim._id}
                    >
                        <h2>
                            {claim.donationId?.restaurantId?.restaurantName}
                        </h2>
                        {claim.claimedItems.map((claimedItem) => {
                            const foodItem =
                                claim.donationId?.foodItems?.find(
                                    (item) =>
                                        item._id.toString() ===
                                        claimedItem.itemId.toString()
                                );
                            return (
                                <div
                                    className="claimed-food"
                                    key={claimedItem.itemId}
                                >
                                    <p>
                                        <strong>Food Item:</strong>{" "}
                                        {foodItem?.foodName || "Not Found"}
                                    </p>
                                    <p>
                                        <strong>Category:</strong>{" "}
                                        {foodItem?.category || "-"}
                                    </p>
                                    <p>
                                        <strong>Food Type:</strong>{" "}
                                        {foodItem?.foodType || "-"}
                                    </p>
                                    <p>
                                        <strong>Quantity Requested:</strong>{" "}
                                        {claimedItem.quantityClaimed}{" "}
                                        {foodItem?.unit}
                                    </p>
                                </div>
                            );
                        })}
                        <p>
                            <strong>Status:</strong>{" "}
                            {claim.claimStatus}
                        </p>
                        <p>
                            <strong>Requested On:</strong>{" "}
                            {new Date(
                                claim.createdAt
                            ).toLocaleString()}
                        </p>
                    </div>
                ))
            )}
        </div>
    );
}

export default MyClaims

