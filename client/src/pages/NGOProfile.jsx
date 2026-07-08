import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/RestaurantProfile.css"

function NGOProfile(){
    const navigate = useNavigate()
    const [ngoName, setNgoName] = useState("");
    const [addressLine, setAddressLine] = useState("")
    const [landmark, setLandmark] = useState("")
    const [area, setArea] = useState("");
    const [pincode, setPincode] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [backupName, setBackupName]= useState("")
    const [backupPhone, setBackupPhone] = useState("")
    const [documentType, setDocumentType] = useState("Government ID");
    const [documentNumber, setDocumentNumber] = useState("");

    const handleCreateNGOProfile = async()=>{
        try{
            const token = localStorage.getItem("token")
            const user = localStorage.getItem("user")
            const response = await axios.post(
                "http://localhost:3000/api/ngo-profiles",
 {
                    ngoName,
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
                    backupContact: {
                        name: backupName,
                        phone: backupPhone
                    },
                    verificationDocuments: [
                        {
                            documentType,
                            documentNumber
                        }
                    ]
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }              
            )
            console.log(response.data)
            alert("Restaurant profile is created")
            // navigate("/ngo-dashboard")
        }catch (error) {
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
    return (
    <div className="profile-container">
        <div className="profile-card">
            <h1>Create NGO Profile</h1>
            <input
                type="text"
                placeholder="NGO Name"
                value={ngoName}
                onChange={(e) => setNgoName(e.target.value)}
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
            <div className="file-section">
                <p>Backup Contact</p>

                <input
                    type="text"
                    placeholder="Backup Contact Name"
                    value={backupName}
                    onChange={(e) => setBackupName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Backup Contact Phone"
                    value={backupPhone}
                    onChange={(e) => setBackupPhone(e.target.value)}
                />
            </div>
            <div className="file-section">
                <p>Verification Document</p>
                <select
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                >
                    <option value="Government ID">
                        Government ID
                    </option>
                    <option value="Business Document">
                        Business Document
                    </option>
                    <option value="Registration Certificate">
                        Registration Certificate
                    </option>
                    <option value="Restaurant Photo">
                        Restaurant Photo
                    </option>
                    <option value="Profile Photo">
                        Profile Photo
                    </option>
                </select>
                <input
                    type="text"
                    placeholder="Document Number"
                    value={documentNumber}
                    onChange={(e) => setDocumentNumber(e.target.value)}
                />
            </div>
            <button
                className="save-btn"
                onClick={handleCreateNGOProfile}
            >
                Create NGO Profile
            </button>
        </div>
    </div>
   );
}
export default NGOProfile