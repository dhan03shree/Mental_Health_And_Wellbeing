import React, { useState } from "react";
import { FaLocationArrow } from "react-icons/fa"; // Location Icon
import axios from "axios";

import "leaflet/dist/leaflet.css";
import "./styles/SOS.css";

const SOS = () => {
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState("Click 'Get Location' to fetch address");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [sosMessage, setSosMessage] = useState("I need help! This is my location.");
  const [loading, setLoading] = useState(false);

  const getLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setPosition({ lat, lng });

          console.log("Location Accuracy:", pos.coords.accuracy, "meters");

          // Fetch address using OpenStreetMap (Nominatim)
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
            );
            const data = await response.json();
            setAddress(data.display_name || "Location not found");
          } catch (error) {
            console.error("Error fetching address:", error);
            setAddress("Failed to fetch address");
          }
          setLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Failed to fetch location. Please check GPS settings.");
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const sendSOS = async () => {
    if (!address || !phoneNumber || !position) {
      alert("Please get your location and enter a phone number.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/sos/save", {
        phoneNumber,
        address,
        latitude: position.lat,
        longitude: position.lng,
        message: sosMessage,
      });

      console.log("✅ SOS saved:", response.data);
    } catch (error) {
      console.error("❌ Error saving SOS:", error);
      alert("Failed to save SOS.");
    }

    // Send SOS message via WhatsApp
    const message = `${sosMessage} My location is: ${address}`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="sos-container">
      <div className="sos-card">
        <div className="icon-container">
          <FaLocationArrow className="icon" />
        </div>
        <h2>Send Your Location</h2>
        <p>Share your current location for immediate assistance.</p>

        <input
          type="text"
          placeholder="Enter Mobile Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="input-box"
        />

        <button onClick={getLocation} className="location-btn" disabled={loading}>
          {loading ? "Fetching Location..." : "Get Current Location"}
        </button>

        <textarea
          value={sosMessage}
          onChange={(e) => setSosMessage(e.target.value)}
          placeholder="Add a message (optional)"
          className="message-box"
        />

        {position && (
          <>
            <p className="address-text">📍 {address}</p>
            <button onClick={sendSOS} className="sos-btn">
              SEND MY LIVE LOCATION 🚨
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SOS;
