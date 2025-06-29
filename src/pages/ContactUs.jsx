import { useState } from "react";
import "../App.css";



const About = () => {
  return (
    <div className="contact-fullpage">
      <section className="about-section">
        <h2>About Us</h2>
        <p>
          <strong>Mans Joke Trucking</strong> has been proudly serving businesses and communities since 2021, delivering reliable, efficient, and secure transportation solutions across the Southwest and beyond. Based in <strong>Rio Rancho, New Mexico</strong>, we specialize in freight delivery, logistics coordination, and exceptional customer service tailored to meet the demands of modern shipping.
        </p>
        <p>
          What started as a bold idea has grown into a trusted operation under the leadership of our CEO, Mr. Elvis Momlanyuy. With a deep commitment to excellence and integrity, Mans Joke Trucking is focused on building lasting relationships with clients, ensuring that every load arrives safely and on time.
        </p>
        <p>
          Whether you're a small business or a large enterprise, we’re here to move what matters to you with care and precision.
        </p>
      </section>

      <section className="contact-section">
        <h2>Contact Us</h2>
        <p><strong>Address:</strong> Rio Rancho, New Mexico</p>
        <p><strong>Email:</strong> <a href="mailto:info@mansjoketrucking.com">info@mansjoketrucking.com</a></p>
        <p><strong>Phone:</strong> +1 (505) 397-5459</p>
        <p><strong>Business Hours:</strong> Monday – Sunday, 8:00 AM – 6:00 PM</p>
        <p><strong>Customer Support:</strong> We're here to help 24/7—just call or email us.</p>
      </section>
    </div>
  );
};

export default About;