import '../App.css';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <img src="/MJ_truck.png" alt="MJ Trucking Logo" className="footer-logo" />
        <p><strong>MJ Trucking</strong> — Your trust, our delivery.</p>
        <p>📞 (505) 617-6700</p>
        <p>📧 swatara45@gmail.com</p>
      </div>

      <div className="footer-right">
        <p>Design by Sadia Watara</p>
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