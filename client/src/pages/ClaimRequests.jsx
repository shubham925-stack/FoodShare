import axios from "axios";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ClaimRequests.css"

function ClaimRequests(){
    const navigate = useNavigate()
    const [claims, setClaims] = useState([])

    const fetchClaims = async()=>{
        try{
            const token = localStorage.getItem("token");
            const user = localStorage.getItem("user");
            const response = await axios.get(
                "http://localhost:3000/api/claims/restaurant",
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    },
                }
            );
            setClaims(response.data.claims);
        }catch(error){
            console.log(error)
            if (error.response?.status === 401){
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/login");
            }
        }
    }
    useEffect(()=>{
        fetchClaims()
    },[]);
    const acceptClaim = async (claimId)=>{
        try{
            const token = localStorage.getItem("token");
            await axios.patch(
                 `http://localhost:3000/api/claims/${claimId}/accept`,
                {},
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    },
                }
            );
            alert("claim request accepted");
            fetchClaims()
        }catch(error){
            console.log(error);
            alert(
                error.response?.data?.message || "Failed to accept claim"
            );
        }
    };
    const rejectClaim = async(claimId)=>{
        try{
            const token = localStorage.getItem("token");
            await axios.patch(
                 `http://localhost:3000/api/claims/${claimId}/reject`,
                {},
                {
                    headers:{
                        Authorization:`Bearer ${token}`,
                    },
                }
            );
            alert ("Claim request rejected");
            fetchClaims()
        }catch(error){
            console.log(error);
            alert(
                error.response?.data?.message || "Failed to reject claim"
            );
        }
    }
    const handlePickUp = async(claimId)=>{
        try{
            const token = localStorage.getItem("token")
            await axios.patch(
                `http://localhost:3000/api/claims/${claimId}/pickup`,
                {},
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    },
                }                
            );
            alert("Donation marked as picked up");
            fetchClaims()
        }catch (error){
            console.log(error);
            alert(
                error.response?.data?.message || error.message
            )
        }
    }
    return (
    <div className="claim-requests-container">
        <h1>Claim Requests</h1>

        {claims.length === 0 ? (
            <p>No claim requests found.</p>
        ) : (
            claims.map((claim) => (
                <div
                    key={claim._id}
                    className="claim-card"
                >
                    <h2>
                        {claim.ngoId?.ngoName}
                    </h2>

                    {claim.claimedItems.map((item) => (
                        <div
                            key={item.itemId}
                            className="food-item"
                        >
                            <p>
                                <strong>Food Item:</strong>{" "}
                                {item.foodName}
                            </p>

                            <p>
                                <strong>Category:</strong>{" "}
                                {item.category}
                            </p>

                            <p>
                                <strong>Food Type:</strong>{" "}
                                {item.foodType}
                            </p>

                            <p>
                                <strong>Quantity Requested:</strong>{" "}
                                {item.quantityClaimed}{" "}
                                {item.unit}
                            </p>
                        </div>
                    ))}

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

                    {(claim.claimStatus === "Accepted" ||
                        claim.claimStatus === "Picked Up") && (
                        <>
                            <hr />

                            <h3>NGO Contact Details</h3>

                            <p>
                                <strong>Contact Person:</strong>{" "}
                                {
                                    claim.ngoId
                                        ?.backupContact
                                        ?.name
                                }
                            </p>

                            <p>
                                <strong>Phone:</strong>{" "}
                                {
                                    claim.ngoId
                                        ?.backupContact
                                        ?.phone
                                }
                            </p>

                            <p>
                                <strong>Address:</strong>{" "}
                                {
                                    claim.ngoId
                                        ?.address
                                        ?.addressLine
                                }
                                ,{" "}
                                {
                                    claim.ngoId
                                        ?.address
                                        ?.area
                                }
                                ,{" "}
                                {
                                    claim.ngoId
                                        ?.address
                                        ?.city
                                }
                            </p>
                        </>
                    )}

                    {claim.claimStatus === "Pending" && (
                        <div className="button-group">
                            <button
                                className="accept-btn"
                                onClick={() =>
                                    acceptClaim(
                                        claim._id
                                    )
                                }
                            >
                                Accept
                            </button>

                            <button
                                className="reject-btn"
                                onClick={() =>
                                    rejectClaim(
                                        claim._id
                                    )
                                }
                            >
                                Reject
                            </button>
                        </div>
                    )}

                    {claim.claimStatus === "Accepted" && (
                        <button
                            className="pickup-btn"
                            onClick={() =>
                                handlePickUp(
                                    claim._id
                                )
                            }
                        >
                            Mark as Picked Up
                        </button>
                    )}

                    {claim.claimStatus ===
                        "Picked Up" && (
                        <div className="picked-up-box">
                            <h3>
                                ✅ Donation Collected
                            </h3>

                            {/* <p>
                                <strong>
                                    Picked Up On:
                                </strong>{" "}
                                {new Date(
                                    claim.pickedUpAt
                                ).toLocaleString()}
                            </p> */}
                        </div>
                    )}
                </div>
            ))
        )}
        <div>
            <button className="Home-button"
            onClick={()=>navigate("/restaurant-dashboard")}>
                Home
            </button>
        </div>
    </div>
);
}

export default ClaimRequests;