import { Link } from "react-scroll";
import "./footer.css";
import { Facebook, Instagram, Mail } from "lucide-react";

function Footer() {
  return (
    <>
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-header">
            <img src="./src/assets/icon.png" alt="Icon of Casa Diwa" /> 
            {/* EDIT FOR STORAGE */}
            <h1>Casa Diwa</h1>
          </div>
          <div className="footer-logo-container">
            <div>
              <p>
                A minimalist Filipino retreat where simplicity meets soul.
                Experience authentic hospitality and find your peace in nature's
                embrace.
              </p>
              <div className="footer-icons">
                <div className="icons-bg">
                  <Facebook
                    strokeWidth={1.75}
                    color="white"
                    size={35}
                    className="footer-icon"
                  />
                </div>
                <div className="icons-bg">
                  <Instagram
                    strokeWidth={1.75}
                    color="white"
                    size={35}
                    className="footer-icon"
                  />
                </div>
                <div className="icons-bg">
                  <Mail
                    strokeWidth={1.75}
                    color="white"
                    size={35}
                    className="footer-icon"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="links-contact">
          <div className="links-contact-content">
            <div className="links-header">
              <h2>Quick Links</h2>
            </div>

            <div className="quickLinks">
              <ul>
                <li>
                  <Link to="home" smooth={true} duration={500}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="room&suites" smooth={true} duration={500}>
                    Rooms & Suites
                  </Link>
                </li>
                <li>
                  <Link to="about" smooth={true} duration={500}>
                    About
                  </Link>
                </li>
                <li>
                  <Link to="contact-us" smooth={true} duration={500}>
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="links-contact">
          <div className="links-contact-content">
            <div className="content-header">
              <h2>Contact</h2>
            </div>

            <div className="contact-content">
              <div>
                <p>
                  123 Banahaw Street, Tagaytay City, Cavite Philippines 4120
                </p>
              </div>
              <div>
                <p>+63 912 345 6789</p>
              </div>
              <a href="mailto:hello@casadiwa.ph" className="email-link">
                hello@casadiwa.ph
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-divider"></div>

      <div className="footer-bottom">
        <p>© 2025 Casa Diwa. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Sitemap</a>
        </div>
      </div>
    </>
  );
}

export default Footer;
