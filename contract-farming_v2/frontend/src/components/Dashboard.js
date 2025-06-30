import React, { useEffect, useState } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/contract", {
          method: "GET",
          headers: { "x-auth-token": localStorage.getItem("token") },
        });

        if (res.ok) {
          const data = await res.json();
          setContracts(data);
        } else {
          console.error("Error fetching contracts:", await res.text());
        }
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchContracts();
  }, []);

  return (
    <div id="dashboard-container">
      <h2 id="dashboard-title">Dashboard</h2>
      <div id="dashboard-contracts">
        {contracts.map((contract) => (
          <div key={contract._id} id="contract-card">
            <p>
              <strong>Crop:</strong> {contract.crop}
            </p>
            <p>
              <strong>Quantity:</strong> {contract.quantity}
            </p>
            <p>
              <strong>Price:</strong> {contract.price}/-
            </p>
            <p>
              <strong>Status:</strong> {contract.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
