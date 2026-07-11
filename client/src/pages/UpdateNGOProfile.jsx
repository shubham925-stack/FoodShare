import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/UpdateNGOProfile.css"


function UpdateNGOProfile() {
    const navigate = useNavigate();

    const [ngoName, setNGOName] = useState("");
    const [addressLine, setAddressLine] = useState("");
    const [landmark, setLandmark] = useState("");
    const [area, setArea] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState("");
    const [contactPersonName, setContactPersonName] = useState("");
    const [contactPersonPhone, setContactPersonPhone] = useState("");

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            const user = localStorage.getItem("user");
            const response = await axios.get(
                "http://localhost:3000/api/ngo-profiles/profile",
    
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
            );
            const profile = response.data.ngoProfile;
            setNGOName(profile.ngoName);
            setAddressLine(profile.address.addressLine);
            setLandmark(profile.address.landmark);
            setArea(profile.address.area);
            setCity(profile.address.city);
            setState(profile.address.state);
            setPincode(profile.address.pincode);
            setContactPersonName(profile.backupContact.name);
            setContactPersonPhone(profile.backupContact.phone);
        } catch (error) {
            console.log(error);

            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user")
                navigate("/login")
            }
        }
    }
    useEffect(() => {
        fetchProfile()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const token = localStorage.getItem("token");
            const user = localStorage.getItem("user");
            await axios.put(
                "http://localhost:3000/api/ngo-profiles/profile",
                {
                    ngoName,
                    address: {
                        addressLine,
                        landmark,
                        area,
                        city,
                        state,
                        pincode,
                        location: {
                            type: "Point",
                            coordinates: [
                                73.8567,
                                18.5204
                            ]
                        }
                    },

                    backupContact : {
                        name: contactPersonName,
                        phone: contactPersonPhone,
                    },
                },
                {
                    headers:{
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert("NGP profile updated successfully")
            navigate("/ngo-dashboard")
       }catch(error){
        console.log(error);
        alert(
            error.response?.data?.message || "Failed to update ngo profile"       
         )
       }
    }
    return (
    <div className="update-ngo-container">
        <form
            className="update-ngo-form"
            onSubmit={handleSubmit}
        >
            <h1>Update NGO Profile</h1>
            <label>NGO Name</label>
            <input
                type="text"
                value={ngoName}
                onChange={(e) =>
                    setNGOName(e.target.value)
                }
                required
            />
            <h2>Address</h2>
            <label>Address Line</label>
            <input
                type="text"
                value={addressLine}
                onChange={(e) =>
                    setAddressLine(e.target.value)
                }
                required
            />
            <label>Landmark</label>
            <input
                type="text"
                value={landmark}
                onChange={(e) =>
                    setLandmark(e.target.value)
                }
            />
            <label>Area</label>
            <input
                type="text"
                value={area}
                onChange={(e) =>
                    setArea(e.target.value)
                }
                required
            />
            <label>City</label>
            <input
                type="text"
                value={city}
                onChange={(e) =>
                    setCity(e.target.value)
                }
                required
            />
            <label>State</label>
            <input
                type="text"
                value={state}
                onChange={(e) =>
                    setState(e.target.value)
                }
                required
            />
            <label>Pincode</label>
            <input
                type="text"
                value={pincode}
                onChange={(e) =>
                    setPincode(e.target.value)
                }
                required
            />
            <h2>Contact Person</h2>
            <label>Contact Person Name</label>
            <input
                type="text"
                value={contactPersonName}
                onChange={(e) =>
                    setContactPersonName(e.target.value)
                }
              required
            />
            <label>Contact Person Phone</label>
            <input
                type="text"
                value={contactPersonPhone}
                onChange={(e) =>
                    setContactPersonPhone(e.target.value)
                }
                required
            />
            <div className="button-group">
                <button
                    type="submit"
                    className="save-btn"
                >
                    Save Changes
                </button>
                <button
                    type="button"
                    className="cancel-btn"
                    onClick={() =>
                        navigate("/ngo-dashboard")
                    }
                >
                    Cancel
                </button>
            </div>
        </form>
    </div>
    )
}

export default UpdateNGOProfile