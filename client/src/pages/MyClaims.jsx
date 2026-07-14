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
                                    {foodItem?.foodName}
                                </p>
                                <p>
                                    <strong>Category:</strong>{" "}
                                    {foodItem?.category}
                                </p>
                                <p>
                                    <strong>Food Type:</strong>{" "}
                                    {foodItem?.foodType}
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
                        <span
                            className={`status ${claim.claimStatus
                                .toLowerCase()
                                .replace(" ", "")}`}
                        >
                            {claim.claimStatus}
                        </span>
                    </p>
                    <p>
                        <strong>Requested On:</strong>{" "}
                        {new Date(
                            claim.createdAt
                        ).toLocaleString()}
                    </p>
                    {(claim.claimStatus === "Accepted" ||
                        claim.claimStatus === "Picked Up") && (
                        <>
                            <hr />
                            <h3>Restaurant Details</h3>
                            <p>
                                <strong>Restaurant:</strong>{" "}
                                {
                                    claim.donationId
                                        ?.restaurantId
                                        ?.restaurantName
                                }
                            </p>
                            <p>
                                <strong>Pickup Time:</strong>{" "}
                                {new Date(
                                    claim.donationId
                                        ?.pickupStartTime
                                ).toLocaleString()}
                                {" - "}
                                {new Date(
                                    claim.donationId
                                        ?.pickupEndTime
                                ).toLocaleString()}
                            </p>
                            <p>
                                <strong>Pickup Instructions:</strong>{" "}
                                {
                                    claim.donationId
                                        ?.pickupInstructions
                                }
                            </p>
                            <p>
                                <strong>Restaurant Address:</strong>{" "}
                                {
                                    claim.donationId
                                        ?.restaurantId
                                        ?.address
                                        ?.addressLine
                                }
                                ,{" "}
                                {
                                    claim.donationId
                                        ?.restaurantId
                                        ?.address
                                        ?.area
                                }
                                ,{" "}
                                {
                                    claim.donationId
                                        ?.restaurantId
                                        ?.address
                                        ?.city
                                }
                            </p>
                            <p>
                                <strong>Restaurant Contact:</strong>{" "}
                                {
                                    claim.donationId
                                        ?.restaurantId
                                        ?.contactPerson
                                        ?.name || "Not Available"
                                }
                            </p>
                            <p>
                                <strong>Phone:</strong>{" "}
                                {
                                    claim.donationId
                                        ?.restaurantId
                                        ?.contactPerson
                                        ?.phone || "Not Available"
                                }
                            </p>
                        </>
                    )}
                    {claim.claimStatus === "Picked Up" && (
                        <>
                            <hr />
                            <p>
                                <strong>Picked Up On:</strong>{" "}
                                {new Date(
                                    claim.pickedUpAt
                                ).toLocaleString()}
                            </p>
                        </>
                    )}
                </div>
            ))
        )}
        <div >
                <button className="Home-button"
                onClick={()=>navigate("/ngo-dashboard")}>
                     Home
                 </button>    
            </div>
    </div>
);
}

export default MyClaims

