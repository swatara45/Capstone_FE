import '../App.css';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <img src="/MJ_truck.jpeg" alt="MJ Trucking Logo" className="footer-logo" />
        <span>MJ Trucking — Your trust, our delivery.</span>
      </div>
      <div className="footer-contact">
        <span>Email: <a href="mailto:info@mjtrucking.com"> 📧 info@mansjoketrucking.com</a></span>
        <span>Phone: <a href="tel:+1234567890">📞 +1 (505) 397-5459</a></span>
      </div>

      <div className="footer-right">
        <p>Designed by Sadia Watara</p>
        <p>&copy; 2025 MJ Trucking</p>
        <div className="footer-socials">
          <a href="https://www.facebook.com/mjtrucking" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
          <a href="https://www.instagram.com/mjtrucking" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://www.linkedin.com/company/mjtrucking" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
          <a href="https://www.twitter.com/mjtrucking" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;