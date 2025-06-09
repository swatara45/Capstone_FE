import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can send data to backend here using Axios
    console.log("Form Submitted:", formData);
    setSubmitted(true);
    setFormData({ fullname: "", email: "", message: "" });
  };

  return (
    <div className="contact-container" style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h2>Contact Us</h2>

      {submitted ? (
        <p style={{ color: "green" }}>Thank you! We’ll get back to you shortly.</p>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="text"
            name="fullname"
            placeholder="Your Full Name"
            value={formData.fullname}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" style={{ padding: "0.5rem", background: "#333", color: "white", cursor: "pointer" }}>
            Send Message
          </button>
        </form>
      )}
    </div>
  );
};

export default Contact;
