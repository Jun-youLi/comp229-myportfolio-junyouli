// src/pages/Contact.jsx
// Contact information and simple interactive form

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Contact() {
  const navigate = useNavigate();

  // Controlled form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });

  // Handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle submit: capture data and redirect to Home
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Contact form submitted:", formData);

    // Navigate back to Home and pass the contact data
    navigate("/", {
      state: {
        contactData: formData,
      },
    });
  };

  return (
    <section className="page contact-page">
      <h1>Contact Me</h1>

      <div className="contact-layout">
        {/* Contact information panel */}
        <div className="contact-info">
          <h2>Get in touch</h2>
          <p>
            If you would like to talk about projects, internships or
            collaborations, feel free to reach out.
          </p>

          <ul>
            <li>
              <strong>Email:</strong> li1785458273@gmail.com
            </li>
            <li>
              <strong>Location:</strong> Toronto, Ontario, Canada
            </li>
            <li>
              <strong>Program:</strong> AI Systems Design, Centennial College
            </li>
          </ul>
        </div>

        {/* Interactive form */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Contact Number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-primary">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
