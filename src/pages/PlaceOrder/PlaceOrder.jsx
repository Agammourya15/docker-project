
// import React, { useContext, useEffect, useState } from 'react';
// import './PlaceOrder.css';
// import { StoreContext } from '../../Context/StoreContext';
// import { assets } from '../../assets/assets';
// import { useNavigate } from 'react-router-dom';

// const PlaceOrder = () => {
//   const [data, setData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     zipcode: "",
//     country: "",
//     phone: ""
//   });

//   const [orderPlaced, setOrderPlaced] = useState(false); // New state for order success
//   const { getTotalCartAmount, clearCart } = useContext(StoreContext); // Added clearCart for cleanup
//   const navigate = useNavigate();

//   const onChangeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setData((data) => ({ ...data, [name]: value }));
//   };

//   const placeOrder = () => {
//     if (data.firstName && data.email && data.street) {
//       // Validate minimum required fields
//       setOrderPlaced(true); // Show success message
//       clearCart(); // Clear cart after placing the order
//     } else {
//       alert("Please fill in all required fields."); // Basic validation
//     }
//   };

//   useEffect(() => {
//     if (getTotalCartAmount() === 0 && !orderPlaced) {
//       navigate('/'); // Redirect if cart is empty
//     }
//   }, [getTotalCartAmount, navigate, orderPlaced]);

//   return (
//     <div className="place-order">
//       {orderPlaced ? (
//         <div className="order-success">
//           <h1>Order Successfully Placed!</h1>
//           <p>Thank you for your purchase, {data.firstName}!</p>
//           <button onClick={() => navigate('/')}>Go to Home</button>
//         </div>
//       ) : (
//         <>
//           <div className="place-order-left">
//             <p className="title">Delivery Information</p>
//             <div className="multi-field">
//               <input
//                 type="text"
//                 name="firstName"
//                 onChange={onChangeHandler}
//                 value={data.firstName}
//                 placeholder="First name"
//               />
//               <input
//                 type="text"
//                 name="lastName"
//                 onChange={onChangeHandler}
//                 value={data.lastName}
//                 placeholder="Last name"
//               />
//             </div>
//             <input
//               type="email"
//               name="email"
//               onChange={onChangeHandler}
//               value={data.email}
//               placeholder="Email address"
//             />
//             <input
//               type="text"
//               name="street"
//               onChange={onChangeHandler}
//               value={data.street}
//               placeholder="Street"
//             />
//             <div className="multi-field">
//               <input
//                 type="text"
//                 name="city"
//                 onChange={onChangeHandler}
//                 value={data.city}
//                 placeholder="City"
//               />
//               <input
//                 type="text"
//                 name="state"
//                 onChange={onChangeHandler}
//                 value={data.state}
//                 placeholder="State"
//               />
//             </div>
//             <div className="multi-field">
//               <input
//                 type="text"
//                 name="zipcode"
//                 onChange={onChangeHandler}
//                 value={data.zipcode}
//                 placeholder="Zip code"
//               />
//               <input
//                 type="text"
//                 name="country"
//                 onChange={onChangeHandler}
//                 value={data.country}
//                 placeholder="Country"
//               />
//             </div>
//             <input
//               type="text"
//               name="phone"
//               onChange={onChangeHandler}
//               value={data.phone}
//               placeholder="Phone"
//             />
//           </div>
//           <div className="place-order-right">
//             <div className="cart-total">
//               <h2>Cart Totals</h2>
//               <div>
//                 <div className="cart-total-details">
//                   <p>Subtotal</p>
//                   <p>${getTotalCartAmount()}</p>
//                 </div>
//                 <hr />
//                 <div className="cart-total-details">
//                   <p>Delivery Fee</p>
//                   <p>${getTotalCartAmount() === 0 ? 0 : 5}</p>
//                 </div>
//                 <hr />
//                 <div className="cart-total-details">
//                   <b>Total</b>
//                   <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 5}</b>
//                 </div>
//               </div>
//             </div>
//             <div className="payment-options">
//               <h2>Select Payment Method</h2>
//               <div className="payment-option">
//                 <img src={assets.selector_icon} alt="" />
//                 <p>COD ( Cash On Delivery )</p>
//               </div>
//               <button onClick={placeOrder}>PLACE ORDER</button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default PlaceOrder;
import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const [paymentMethod, setPaymentMethod] = useState("cod"); // Default payment method
  const [upiId, setUpiId] = useState(""); // State to store UPI ID
  const [orderPlaced, setOrderPlaced] = useState(false); // Order success state
  const { getTotalCartAmount, clearCart } = useContext(StoreContext);
  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateUpiId = (id) => {
    const upiRegex = /^[\w.-]+@[a-zA-Z]+$/;
    return upiRegex.test(id); // Validate UPI ID format
  };

  const placeOrder = () => {
    if (!data.firstName || !data.email || !data.street) {
      alert("Please fill in all required fields.");
      return;
    }

    if (paymentMethod === "upi" && !validateUpiId(upiId)) {
      alert("Please enter a valid UPI ID.");
      return;
    }

    setOrderPlaced(true); // Show success message
    clearCart(); // Clear cart
  };

  useEffect(() => {
    if (getTotalCartAmount() === 0 && !orderPlaced) {
      navigate('/');
    }
  }, [getTotalCartAmount, navigate, orderPlaced]);

  return (
    <div className="place-order">
      {orderPlaced ? (
        <div className="order-success">
          <h1>Order Successfully Placed!</h1>
          <p>
            Thank you for your purchase, {data.firstName}!
            {paymentMethod === "upi" && <span> Payment processed via UPI ID: {upiId}</span>}
          </p>
          <button onClick={() => navigate('/')}>Go to Home</button>
        </div>
      ) : (
        <>
          <div className="place-order-left">
            <p className="title">Delivery Information</p>
            <div className="multi-field">
              <input
                type="text"
                name="firstName"
                onChange={onChangeHandler}
                value={data.firstName}
                placeholder="First name"
              />
              <input
                type="text"
                name="lastName"
                onChange={onChangeHandler}
                value={data.lastName}
                placeholder="Last name"
              />
            </div>
            <input
              type="email"
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              placeholder="Email address"
            />
            <input
              type="text"
              name="street"
              onChange={onChangeHandler}
              value={data.street}
              placeholder="Street"
            />
            <div className="multi-field">
              <input
                type="text"
                name="city"
                onChange={onChangeHandler}
                value={data.city}
                placeholder="City"
              />
              <input
                type="text"
                name="state"
                onChange={onChangeHandler}
                value={data.state}
                placeholder="State"
              />
            </div>
            <div className="multi-field">
              <input
                type="text"
                name="zipcode"
                onChange={onChangeHandler}
                value={data.zipcode}
                placeholder="Zip code"
              />
              <input
                type="text"
                name="country"
                onChange={onChangeHandler}
                value={data.country}
                placeholder="Country"
              />
            </div>
            <input
              type="text"
              name="phone"
              onChange={onChangeHandler}
              value={data.phone}
              placeholder="Phone"
            />
          </div>
          <div className="place-order-right">
            <div className="cart-total">
              <h2>Cart Totals</h2>
              <div>
                <div className="cart-total-details">
                  <p>Subtotal</p>
                  <p>${getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <p>Delivery Fee</p>
                  <p>${getTotalCartAmount() === 0 ? 0 : 5}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <b>Total</b>
                  <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 5}</b>
                </div>
              </div>
            </div>
            <div className="payment-options">
              <h2>Select Payment Method</h2>
              <div className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <p>COD (Cash On Delivery)</p>
              </div>
              <div className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={paymentMethod === "upi"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <p>UPI</p>
              </div>
              {paymentMethod === "upi" && (
                <div className="upi-input">
                  <input
                    type="text"
                    placeholder="Enter UPI ID (e.g., example@upi)"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                </div>
              )}
              <button onClick={placeOrder}>PLACE ORDER</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PlaceOrder;
