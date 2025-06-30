// // ContractList.js
// import React, { useEffect, useState } from "react";
// import "./ContractList.css";

// const ContractList = () => {
//   const [contracts, setContracts] = useState([]);

//   useEffect(() => {
//     const fetchContracts = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/contract", {
//           method: "GET",
//           headers: { "x-auth-token": localStorage.getItem("token") },
//         });

//         if (res.ok) {
//           const data = await res.json();
//           setContracts(data);
//         } else {
//           console.error("Error:", await res.json());
//         }
//       } catch (err) {
//         console.error("Error:", err);
//       }
//     };

//     fetchContracts();
//   }, []);

//   const handleStatusChange = async (id, status) => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/contract/${id}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           "x-auth-token": localStorage.getItem("token"),
//         },
//         body: JSON.stringify({ status }),
//       });

//       if (res.ok) {
//         const updatedContract = await res.json();
//         setContracts(
//           contracts.map((contract) =>
//             contract._id === updatedContract._id ? updatedContract : contract
//           )
//         );
//       } else {
//         console.error("Error:", await res.json());
//       }
//     } catch (err) {
//       console.error("Error:", err);
//     }
//   };

//   return (
//     <div id="contract-list-container">
//       {contracts.map((contract) => (
//         <div key={contract._id} id="contract-card">
//           <h3>Crop: {contract.crop}</h3>
//           <p>Quantity: {contract.quantity}</p>
//           <p>Price: {contract.price}</p>
//           <p>Status: {contract.status}</p>
//           {contract.status === "pending" && (
//             <div>
//               <button
//                 onClick={() => handleStatusChange(contract._id, "accepted")}
//               >
//                 Accepta
//               </button>
//               <button
//                 className="reject"
//                 onClick={() => handleStatusChange(contract._id, "rejected")}
//               >
//                 Reject
//               </button>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ContractList;

// import React, { useEffect, useState } from "react";
// import "./ContractList.css";

// const ContractList = () => {
//   const [contracts, setContracts] = useState([]);
//   const [images, setImages] = useState({});

//   useEffect(() => {
//     const fetchContracts = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/contract", {
//           method: "GET",
//           headers: { "x-auth-token": localStorage.getItem("token") },
//         });

//         if (res.ok) {
//           const data = await res.json();
//           setContracts(data);
//           // Fetch images for each contract crop
//           data.forEach(contract => fetchCropImage(contract._id, contract.crop));
//         } else {
//           console.error("Error:", await res.json());
//         }
//       } catch (err) {
//         console.error("Error:", err);
//       }
//     };

//     fetchContracts();
//   }, []);

//   const fetchCropImage = async (contractId, cropName) => {
//     try {
//       const res = await fetch(
//         `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
//           cropName
//         )}&client_id=N7nvL6nxt24F980kKAlBCN36LVI9W801QBp8ekNHKlc`
//       );

//       if (res.ok) {
//         const data = await res.json();
//         const imageUrl = data.results[0]?.urls?.small;
//         setImages(prevImages => ({
//           ...prevImages,
//           [contractId]: imageUrl,
//         }));
//       } else {
//         console.error("Error fetching image:", await res.json());
//       }
//     } catch (err) {
//       console.error("Error:", err);
//     }
//   };

//   const handleStatusChange = async (id, status) => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/contract/${id}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           "x-auth-token": localStorage.getItem("token"),
//         },
//         body: JSON.stringify({ status }),
//       });

//       if (res.ok) {
//         const updatedContract = await res.json();
//         setContracts(
//           contracts.map((contract) =>
//             contract._id === updatedContract._id ? updatedContract : contract
//           )
//         );
//       } else {
//         console.error("Error:", await res.json());
//       }
//     } catch (err) {
//       console.error("Error:", err);
//     }
//   };

//   return (
//     <div id="contract-list-container">
//       {contracts.map((contract) => (
//         <div key={contract._id} id="contract-card">
//           {images[contract._id] && (
//             <img
//               src={images[contract._id]}
//               alt={contract.crop}
//               id="contract-image"
//             />
//           )}
//           <h3>Crop: {contract.crop}</h3>
//           <p>Quantity: {contract.quantity}</p>
//           <p>Price: {contract.price}</p>
//           <p>Status: {contract.status}</p>
//           {contract.status === "pending" && (
//             <div>
//               <button
//                 onClick={() => handleStatusChange(contract._id, "accepted")}
//               >
//                 Accept
//               </button>
//               <button
//                 className="reject"
//                 onClick={() => handleStatusChange(contract._id, "rejected")}
//               >
//                 Reject
//               </button>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ContractList;

import React, { useEffect, useState } from "react";
import "./ContractList.css";

const ContractList = () => {
  const [contracts, setContracts] = useState([]);
  const [images, setImages] = useState({});

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
          // Fetch images for each contract crop
          data.forEach(contract => fetchCropImage(contract._id, contract.crop));
        } else {
          console.error("Error:", await res.json());
        }
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchContracts();
  }, []);

  const fetchCropImage = async (contractId, cropName) => {
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(cropName)}&client_id=N7nvL6nxt24F980kKAlBCN36LVI9W801QBp8ekNHKlc`
      );

      if (res.ok) {
        const data = await res.json();
        const firstImageUrl = data.results[0]?.urls?.small || '/images/crops/default.jpg'; // Fallback image
        setImages(prevImages => ({
          ...prevImages,
          [contractId]: firstImageUrl,
        }));
      } else {
        console.error("Error fetching image:", await res.json());
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:5000/api/contract/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        const updatedContract = await res.json();
        setContracts(
          contracts.map((contract) =>
            contract._id === updatedContract._id ? updatedContract : contract
          )
        );
      } else {
        console.error("Error:", await res.json());
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div id="contract-list-container">
      {contracts.map((contract) => (
        <div key={contract._id} id="contract-card">
          {images[contract._id] && (
            <img
              src={images[contract._id]}
              alt={contract.crop}
              id="contract-image"
            />
          )}
          <h3>Crop: {contract.crop}</h3>
          <p>Quantity: {contract.quantity}</p>
          <p>Price: {contract.price}</p>
          <p>Status: {contract.status}</p>
          {contract.status === "pending" && (
            <div>
              <button
                onClick={() => handleStatusChange(contract._id, "accepted")}
              >
                Accept
              </button>
              <button
                className="reject"
                onClick={() => handleStatusChange(contract._id, "rejected")}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ContractList;
