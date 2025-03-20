import React, { useState } from "react";
import axios from "axios";
import "./Contact.css";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await axios.post("https://stisv.onrender.com/submit-query", formData);
            setResponseMessage(response.data.message);
            setFormData({ name: "", email: "", message: "" });
        } catch (error) {
            setResponseMessage("Failed to send message. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="contact-container">
            <div className="contact-info">
                <h1 className="contact-heading">Contact Us</h1>
                <p className="contact-details">
                    <strong>ORGANIZER</strong> <br />
                    INDIAN INSTITUTE OF SCIENCE, BENGALURU, INDIA<br />
                </p>
                <p className="contact-details">
                    <strong>Conference Secretariat:</strong><br />
                    Ms. Roopashree Gowda <br />
                    Prof. Govind S. Gupta<br />
                    Department of Materials Engineering<br />
                    Indian Institute of Science (IISc)<br />
                    Bengaluru – 560 012, India
                </p>
                <p className="contact-details">
                    <strong>E-mail:</strong><br />
                    <a href="mailto:stis.mte@iisc.ac.in">stis.mte@iisc.ac.in</a><br />
                    <strong>Website:</strong><br />
                    <a href="https://materials.iisc.ac.in/stis2025/" target="_blank" rel="noopener noreferrer">https://materials.iisc.ac.in/stis2025/</a><br />
                    <strong>Tel.:</strong> <br /> +91 80 22933240
                </p>
            </div>

            {/* Contact Form */}
            <div className="contact-form">
                <h2>Submit Your Query</h2>
                <form onSubmit={handleSubmit}>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label>Message</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    ></textarea>

                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Submit"}
                    </button>
                </form>
                {responseMessage && <p className="response-message">{responseMessage}</p>}
            </div>
        </div>
    );
};

export default Contact;
