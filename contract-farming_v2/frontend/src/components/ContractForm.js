import React, { useState } from 'react';
import './ContractForm.css';

const ContractForm = () => {
  const [formData, setFormData] = useState({
    crop: '',
    quantity: '',
    price: '',
    comments: '',
    paymentStatus: 'unpaid',
    negotiation: ''
  });

  const { crop, quantity, price, comments, paymentStatus, negotiation } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/contract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        const data = await res.json();
        alert('Contract created successfully');
      } else {
        const errorData = await res.json();
        console.error('Error:', errorData.msg);
        alert(`Error: ${errorData.msg}`);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('An error occurred while creating the contract');
    }
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <h2>Create Contract</h2>
        <input type="text" name="crop" value={crop} onChange={onChange} placeholder="Crop" required />
        <input type="number" name="quantity" value={quantity} onChange={onChange} placeholder="Quantity" required />
        <input type="number" name="price" value={price} onChange={onChange} placeholder="Price" required />
        <textarea name="comments" value={comments} onChange={onChange} placeholder="Comments" />
        <input type="text" name="negotiation" value={negotiation} onChange={onChange} placeholder="Negotiation Details" />
        <button type="submit">Create Contract</button>
      </form>
    </div>
  );
};

export default ContractForm;
