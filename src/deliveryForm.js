// DeliveryForm.js

import React, { useState } from 'react';
import axios from 'axios';
import './deliveryForm.css';
const DeliveryForm = () => {
  const [formData, setFormData] = useState({
    zone: '',
    organization_id: '',
    total_distance: '',
    item_type: '',
    totalPrice_cents: null,
    totalPrice_euros: null,
    error: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
  const response = await axios.post('http://localhost:5000/calculatePrice', formData);
  console.log('resp',response);
      setFormData({ ...formData, totalPrice_cents: response.data.total_price_in_cents,totalPrice_euros:response.data.total_price_in_euros, error: null });
    } catch (error) {
      setFormData({ ...formData, totalPrice: null, error: 'Error calculating price' });
    }
  };

  return (
    <div className="delivery-form-container">
      <h2>Delivery Form</h2>
      <form onSubmit={handleSubmit} className="delivery-form">
        <label>
          Zone:
          <input type="text" name="zone" value={formData.zone} onChange={handleChange} required />
        </label>
        <label>
          Organization ID:
          <input type="text" name="organization_id" value={formData.organization_id} onChange={handleChange} required />
        </label>
        <label>
          Total Distance:
          <input type="number" name="total_distance" value={formData.total_distance} onChange={handleChange} required />
        </label>
        <label>
          Item Type:
          <input type="text" name="item_type" value={formData.item_type} onChange={handleChange} required />
        </label>
        <button type="submit" className="calculate-button">Calculate Price</button>
      </form>
      {formData.totalPrice_cents && (
        <div className="price-info">
          <p>Total Price (cents): {formData.totalPrice_cents}</p>
          <p>Total Price (euros): {formData.totalPrice_euros}</p>
        </div>
      )}
      {formData.error && <p className="error-message">Error: {formData.error}</p>}
    </div>
  );
};

export default DeliveryForm;
