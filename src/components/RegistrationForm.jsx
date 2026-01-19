import React, { useState, useMemo } from 'react';
import NECLogo from '../assets/Logo.png';
import { GOOGLE_SCRIPT_URL } from '../config';

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
        extraParticipantsCount: 0,
        extraParticipantsData: [], // Array of objects { name, email, phone }

        // Business Idea
        ideaName: '', ideaArea: '', ideaStatus: 'Ideation Stage',
        ideaDesc: '', wonPrizes: 'No'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleExtraCountChange = (e) => {
        const count = parseInt(e.target.value, 10);
        setFormData(prev => {
            // Create new array with existing data preserved where possible, or empty objects
            const newData = Array(count).fill(null).map((_, i) => {
                return prev.extraParticipantsData[i] || { name: '', email: '', phone: '' };
            });
            return {
                ...prev,
                extraParticipantsCount: count,
                extraParticipantsData: newData
            };
        });
    };

    const handleExtraDataChange = (index, field, value) => {
        setFormData(prev => {
            const newData = [...prev.extraParticipantsData];
            newData[index] = { ...newData[index], [field]: value };
            return { ...prev, extraParticipantsData: newData };
        });
    };

    // Calculate total amount dynamically
    const baseAmount = 2000;
    const extraPerPerson = 1000;
    const extraCost = formData.moreThanTwo === 'Yes' ? (formData.extraParticipantsCount * extraPerPerson) : 0;
    const totalAmount = baseAmount + extraCost;

    const formatDateForZoho = (dateStr) => {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const day = d.getDate().toString().padStart(2, '0');
        return `${day}-${months[d.getMonth()]}-${d.getFullYear()}`;
    };

    const submitToZoho = async () => {
        const zohoUrl = "https://forms.zohopublic.in/leadcollegeautonomous1/form/NationalEntrepreneurshipConclaveNEC26/formperma/cnGCt7mfomhbVf7qe3MP1uVmG1tjNo2VkgPcvGFeOyU/htmlRecords/submit";

        const data = new FormData();
        // Hidden / System Fields
        data.append('formName', 'NationalEntrepreneurshipConclaveNEC26');
        data.append('formPerma', 'cnGCt7mfomhbVf7qe3MP1uVmG1tjNo2VkgPcvGFeOyU');
        data.append('formType', '0');
        data.append('isDocsPublicForm', 'false');
        data.append('resizeform', '0');
        // Basic mapping
        // P1
        data.append('Name_First', formData.p1_name.split(' ')[0]); // Approximating First/Last
        data.append('Name_Last', formData.p1_name.split(' ').slice(1).join(' ') || '.');
        data.append('First', formData.p1_name); // Fallback if name="First"
        data.append('Email', formData.p1_email);
        data.append('Date', formatDateForZoho(formData.p1_dob));
        data.append('PhoneNumber', formData.p1_phone);
        data.append('countrycode', '91'); // Default to India?
        data.append('Address_AddressLine1', formData.p1_address1);
        data.append('Address_AddressLine2', formData.p1_address2);
        data.append('Address_City', formData.p1_city);
        data.append('Address_Region', formData.p1_state);
        data.append('Address_ZipCode', formData.p1_zip);

        data.append('Dropdown', formData.p1_title); // Title
        data.append('SingleLine', formData.p1_institution); // Institution
        data.append('Radio', formData.p1_eduStatus); // Status
        data.append('Radio1', formData.p1_food); // Food

        // P2
        data.append('Name1_First', formData.p2_name.split(' ')[0]);
        data.append('Name1_Last', formData.p2_name.split(' ').slice(1).join(' ') || '.');
        data.append('Email1', formData.p2_email);
        data.append('Date1', formatDateForZoho(formData.p2_dob));
        data.append('PhoneNumber1', formData.p2_phone);
        data.append('Address1_AddressLine1', formData.p2_address1);
        data.append('Address1_AddressLine2', formData.p2_address2);
        data.append('Address1_City', formData.p2_city);
        data.append('Address1_Region', formData.p2_state);
        data.append('Address1_ZipCode', formData.p2_zip);

        data.append('Dropdown1', formData.p2_title);
        data.append('SingleLine1', formData.p2_institution);
        data.append('Radio2', formData.p2_eduStatus);
        data.append('Radio3', formData.p2_food);

        // Extra
        data.append('Radio6', formData.moreThanTwo);

        // Business
        data.append('SingleLine2', formData.ideaName);
        data.append('Dropdown2', formData.ideaArea); // Assuming text works for dropdown if allowing others, else might fail
        data.append('Radio4', formData.ideaStatus);
        data.append('MultiLine', formData.ideaDesc);
        data.append('Radio5', formData.wonPrizes);
        data.append('PaymentAmount', totalAmount.toString());

        try {
            await fetch(zohoUrl, {
                method: 'POST',
                mode: 'no-cors',
                body: data
            });
            console.log("Zoho Form submitted silently.");
        } catch (error) {
            console.error("Zoho submission error:", error);
        }
    };

    const submitToGoogleSheet = async () => {
        if (GOOGLE_SCRIPT_URL.includes("PLACEHOLDER")) {
            console.log("Google Sheet integration pending setup. See SETUP_GUIDE.md");
            return;
        }

        const scriptUrl = GOOGLE_SCRIPT_URL;

        // Prepare data for Sheet (flatter structure)
        const sheetData = new FormData();
        sheetData.append('Timestamp', new Date().toISOString());
        sheetData.append('Team Lead', formData.p1_name);
        sheetData.append('Lead Email', formData.p1_email);
        sheetData.append('Lead Phone', formData.p1_phone);
        sheetData.append('Teammate', formData.p2_name);
        sheetData.append('Extra Members', formData.extraParticipantsCount);
        sheetData.append('Total Amount', totalAmount);
        sheetData.append('Business Idea', formData.ideaName);

        // Add all extras as a single string
        const extrasStr = formData.extraParticipantsData.map(d => `${d.name} (${d.email})`).join('; ');
        sheetData.append('Extra Details', extrasStr);

        try {
            await fetch(scriptUrl, { method: 'POST', body: sheetData, mode: 'no-cors' });
            console.log("Submitted to Google Sheet");
        } catch (error) {
            console.error("Google Sheet Error", error);
        }
    };

    const handlePayment = (e) => {
        e.preventDefault();

        // Basic Validation
        if (!formData.p1_name || !formData.p1_email || !formData.p1_phone) {
            alert("Please fill in at least Participant 1's required details.");
            return;
        }

        const options = {
            key: "rzp_test_PLACEHOLDER", // REPLACE THIS WITH YOUR ACTUAL RAZORPAY KEY ID
            amount: totalAmount * 100, // Amount in paise
            currency: "INR",
            name: "NEC 2026 Registration",
            description: `Team Registration (${2 + (formData.moreThanTwo === 'Yes' ? formData.extraParticipantsCount : 0)} Members)`,
            image: NECLogo,
            handler: function (response) {
                alert(`Payment Successful!\nPayment ID: ${response.razorpay_payment_id}`);
                console.log("Full Registration Data:", formData);
                console.log("Payment Response:", response);
                submitToZoho(); // Submit to Zoho after payment
                submitToGoogleSheet(); // Parallel update to "Excel" (Sheet)
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

                    <div className="extra-participants-section" style={{ padding: '0 2.5rem 2rem', borderBottom: '1px solid var(--border-color)', marginBottom: '2rem' }}>
                        <label className="checkbox-label" style={{ display: 'flex', alignItems: 'center', fontSize: '1rem', fontWeight: '600', color: 'var(--primary-blue)', marginBottom: '1rem' }}>
                            Are there more than two participants? *
                            <select name="moreThanTwo" value={formData.moreThanTwo} onChange={handleChange} style={{ marginLeft: '1rem', padding: '0.4rem', borderRadius: '4px', border: '1px solid #CBD5E1' }}>
                                <option>No</option><option>Yes</option>
                            </select>
                        </label>

                        {formData.moreThanTwo === 'Yes' && (
                            <div className="dynamic-extra-section" style={{ background: '#F8FAFC', padding: '1.5rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                                <div className="form-group">
                                    <label>How many extra participants? (₹1,000 per person)</label>
                                    <select
                                        value={formData.extraParticipantsCount}
                                        onChange={handleExtraCountChange}
                                        style={{ width: '100px' }}
                                    >
                                        <option value="0">Select</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </div>

                                {formData.extraParticipantsData.map((data, index) => (
                                    <div key={index} className="extra-participant-row" style={{ marginTop: '1rem', padding: '1rem', background: 'white', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                                        <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: '#64748B' }}>Extra Participant {index + 1}</h4>
                                        <div className="form-row" style={{ marginBottom: 0 }}>
                                            <div className="form-group" style={{ marginBottom: '0.5rem' }}>
                                                <input
                                                    type="text"
                                                    placeholder="Name"
                                                    value={data.name}
                                                    onChange={(e) => handleExtraDataChange(index, 'name', e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group" style={{ marginBottom: '0.5rem' }}>
                                                <input
                                                    type="email"
                                                    placeholder="Email"
                                                    value={data.email}
                                                    onChange={(e) => handleExtraDataChange(index, 'email', e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group" style={{ marginBottom: '0.5rem' }}>
                                                <input
                                                    type="tel"
                                                    placeholder="Phone"
                                                    value={data.phone}
                                                    onChange={(e) => handleExtraDataChange(index, 'phone', e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
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
                            <span>Total Amount to be paid:</span>
                            <span className="price">₹{totalAmount.toLocaleString()}</span>
                            {formData.moreThanTwo === 'Yes' && formData.extraParticipantsCount > 0 && (
                                <div style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '0.5rem' }}>
                                    (Base: ₹2,000 + Extra: ₹{extraCost.toLocaleString()})
                                </div>
                            )}
                        </div>
                        <button type="submit" className="pay-btn-large">
                            PROCEED TO PAYMENT
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default RegistrationForm;
