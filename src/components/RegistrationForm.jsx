import React, { useState } from 'react';
import NECLogo from '../assets/Logo.png';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        // Participant 1
        p1_title: 'Mr', p1_name: '', p1_email: '', p1_dob: '',
        p1_phone: '', p1_address1: '', p1_address2: '', p1_city: '', p1_zip: '', p1_state: '',
        p1_institution: '', p1_eduStatus: '', p1_food: 'Vegetarian',

        // Participant 2
        p2_title: 'Mr', p2_name: '', p2_email: '', p2_dob: '',
        p2_phone: '', p2_address1: '', p2_address2: '', p2_city: '', p2_zip: '', p2_state: '',
        p2_institution: '', p2_eduStatus: '', p2_food: 'Vegetarian',

        // Extra Info
        moreThanTwo: 'No',

        // Business Idea
        ideaName: '', ideaArea: '', ideaStatus: 'Ideation Stage',
        ideaDesc: '', wonPrizes: 'No'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePayment = (e) => {
        e.preventDefault();

        // Simple validation check for P1 Name and Email at minimum
        if (!formData.p1_name || !formData.p1_email || !formData.p1_phone) {
            alert("Please fill in at least Participant 1's required details.");
            return;
        }

        const options = {
            key: "rzp_test_PLACEHOLDER", // REPLACE THIS WITH YOUR ACTUAL RAZORPAY KEY ID
            amount: 200000, // ₹2000 in paise
            currency: "INR",
            name: "NEC 2026 Registration",
            description: "Team Registration (2 Members)",
            image: NECLogo,
            handler: function (response) {
                alert(`Payment Successful!\nPayment ID: ${response.razorpay_payment_id}`);
                console.log("Full Registration Data:", formData);
                console.log("Payment Response:", response);
            },
            prefill: {
                name: formData.p1_name,
                email: formData.p1_email,
                contact: formData.p1_phone
            },
            theme: { color: "#0A2540" }
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response) {
            alert("Payment Failed: " + response.error.description);
        });
        rzp1.open();
    };

    const renderParticipantFields = (prefix, label) => (
        <div className="participant-section">
            <h3>{label}</h3>

            <div className="form-row">
                <div className="form-group small">
                    <label>Title</label>
                    <select name={`${prefix}_title`} value={formData[`${prefix}_title`]} onChange={handleChange}>
                        <option>Mr</option><option>Ms</option><option>Dr</option>
                    </select>
                </div>
                <div className="form-group large">
                    <label>Name *</label>
                    <input type="text" name={`${prefix}_name`} value={formData[`${prefix}_name`]} onChange={handleChange} required />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Email *</label>
                    <input type="email" name={`${prefix}_email`} value={formData[`${prefix}_email`]} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Date of Birth *</label>
                    <input type="date" name={`${prefix}_dob`} value={formData[`${prefix}_dob`]} onChange={handleChange} required />
                </div>
            </div>

            <div className="form-group">
                <label>Contact Number *</label>
                <input type="tel" name={`${prefix}_phone`} value={formData[`${prefix}_phone`]} onChange={handleChange} required />
            </div>

            <div className="form-group">
                <label>Address *</label>
                <input type="text" name={`${prefix}_address1`} value={formData[`${prefix}_address1`]} onChange={handleChange} placeholder="Street Address" required />
                <input type="text" name={`${prefix}_address2`} value={formData[`${prefix}_address2`]} onChange={handleChange} placeholder="Address Line 2" style={{ marginTop: '0.5rem' }} />
            </div>

            <div className="form-row">
                <div className="form-group"><label>City *</label><input type="text" name={`${prefix}_city`} value={formData[`${prefix}_city`]} onChange={handleChange} required /></div>
                <div className="form-group"><label>Zip Code *</label><input type="text" name={`${prefix}_zip`} value={formData[`${prefix}_zip`]} onChange={handleChange} required /></div>
                <div className="form-group"><label>State *</label><input type="text" name={`${prefix}_state`} value={formData[`${prefix}_state`]} onChange={handleChange} required /></div>
            </div>

            <div className="form-group">
                <label>Institution / Organization Name *</label>
                <input type="text" name={`${prefix}_institution`} value={formData[`${prefix}_institution`]} onChange={handleChange} required />
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Educational Status *</label>
                    <select name={`${prefix}_eduStatus`} value={formData[`${prefix}_eduStatus`]} onChange={handleChange}>
                        <option>Currently Pursuing</option><option>Graduate</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Food Preference *</label>
                    <select name={`${prefix}_food`} value={formData[`${prefix}_food`]} onChange={handleChange}>
                        <option>Vegetarian</option><option>Non - Vegetarian</option>
                    </select>
                </div>
            </div>
        </div>
    );

    return (
        <div className="registration-wrapper" id="register">
            <div className="registration-container wide">
                <h2 className="form-title">Registration Form</h2>
                <form onSubmit={handlePayment}>

                    {renderParticipantFields('p1', 'DETAILS OF FIRST PARTICIPANT')}
                    {renderParticipantFields('p2', 'DETAILS OF SECOND PARTICIPANT')}

                    <div className="extra-participants-section">
                        <label className="checkbox-label">
                            Are there more than two participants planning to attend? *
                            <select name="moreThanTwo" value={formData.moreThanTwo} onChange={handleChange} style={{ marginLeft: '1rem' }}>
                                <option>No</option><option>Yes</option>
                            </select>
                        </label>
                        {formData.moreThanTwo === 'Yes' && (
                            <div className="info-box">
                                For participants beyond the existing two, an additional fee of INR 1,000 per person applies.
                                The registration link for accompanying participants will be sent to your registered email ID.
                                Please complete basic registration and payment first.
                            </div>
                        )}
                    </div>

                    <div className="business-idea-section">
                        <h3>Business IDEA</h3>
                        <p className="section-desc">Kindly input the information pertaining to your proposed entrepreneurship venture.</p>

                        <div className="form-group">
                            <label>Name of Entrepreneurship Idea *</label>
                            <input type="text" name="ideaName" value={formData.ideaName} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label>Area of Entrepreneurship *</label>
                            <input type="text" name="ideaArea" value={formData.ideaArea} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label>Current Status *</label>
                            <select name="ideaStatus" value={formData.ideaStatus} onChange={handleChange}>
                                <option>Ideation Stage</option>
                                <option>Modelling Stage</option>
                                <option>Prototyping Stage</option>
                                <option>Ready to Start</option>
                                <option>Already Started</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Brief Description *</label>
                            <textarea name="ideaDesc" value={formData.ideaDesc} onChange={handleChange} rows="4" required></textarea>
                        </div>

                        <div className="form-group">
                            <label>Have you won any prizes for this idea earlier? *</label>
                            <select name="wonPrizes" value={formData.wonPrizes} onChange={handleChange}>
                                <option>No</option><option>Yes</option>
                            </select>
                        </div>
                    </div>

                    <div className="payment-footer">
                        <div className="amount-display">
                            <span>Amount to be paid:</span>
                            <span className="price">₹2000.00</span>
                        </div>
                        <button type="submit" className="pay-btn-large">
                            PROCEED TO PAYMENT (Razorpay)
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default RegistrationForm;
