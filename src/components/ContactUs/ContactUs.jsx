import "./contact-us.css";
import { MapPin, Phone, Mail } from "lucide-react";

function ContactUs() {
  return (
    <>
      <div className="contact-us-container">
        <div className="contacts">
          <div className="contact-us-header">
            <h4>GET IN TOUCH</h4>
          </div>

          <div className="contact-title">
            <h3>Contact Us</h3>
            <p>
              We'd love to hear from you. Whether you have questions about
              reservations, amenities, or special requests, our team is here to
              help.
            </p>
          </div>

          <div className="contact-info">
            <div className="contact-details">
              <MapPin
                strokeWidth={2}
                size={30}
                color={"white"}
                className="icon"
              />
              <div>
                <h2>Location</h2>
                <p>
                  123 Banahaw Street, Tagaytay City Cavite, Philippines 4120
                </p>
              </div>
            </div>

            <div className="contact-details">
              <Phone
                strokeWidth={2}
                size={30}
                color={"white"}
                className="icon"
              />
              <div>
                <h2>Phone</h2>
                <p>+63 912 345 6789</p>
                <p>+63 2 8123 4567</p>
              </div>
            </div>

            <div className="contact-details">
              <Mail
                strokeWidth={2}
                size={30}
                color={"white"}
                className="icon"
              />
              <div>
                <h2>Email</h2>
                <p>hello@casadiwa.ph</p>
                <p>reservation@casadiwa.ph</p>
              </div>
            </div>
          </div>

          <div className="operating-hour">
            <div>
              <h2>Operating Hours</h2>
            </div>

            <div className="weekdays">
              <p>Monday - Friday</p>
              <p>8:00 AM - 8:00 PM</p>
            </div>

            <div className="weekends">
              <p>Saturday - Sunday</p>
              <p>7:00 AM - 9:00 PM</p>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <div>
            <h2>Send us a Message</h2>
          </div>
          <div className="form">
            <div className="fullName-form">
              <div>
                <label htmlFor="firstName">First Name</label>
                <div className="input-form">
                  <input type="text" id="firstName" placeholder="Juan" />
                </div>
              </div>

              <div>
                <label htmlFor="lastName">Last Name</label>
                <div className="input-form">
                  <input type="text" id="lastName" placeholder="Dela Cruz" />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="emailAddress">Email Address</label>
              <div className="input-form">
                <input
                  type="email"
                  id="emailAddress"
                  placeholder="juan@gmail.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phoneNumber">Phone Number</label>
              <div className="input-form">
                <input
                  type="tel"
                  id="phoneNumber"
                  placeholder="+63 912 345 6789"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message">Message</label>
              <div className="message-inquiry">
                <textarea
                  id="message"
                  placeholder="Tell us about your inquiry or reservation..."
                ></textarea>
              </div>
            </div>
          </div>
          <div className="send-message-btn">
            <button>Send Message</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
