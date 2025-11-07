import "./about-us.css";
import { Star } from "lucide-react";

function AboutUs({ values }) {
  return (
    <>
      <div className="about-us-container">
        <div className="our-story-info">
          <div className="about-us-header">
            <h4>OUR STORY</h4>
          </div>

          <div>
            <h3>A Heaven Rooted in Filipino Heritage</h3>
          </div>

          <p>
            Casa Diwa, meaning "House of the Soul," was born from a vision to
            create a retreat that honors Filipino traditions while embracing
            modern minimalism. Nestled in nature's embrace, we offer more than
            just accommodation—we provide a sanctuary for the spirit.
          </p>

          <p>
            Every element of Casa Diwa reflects our commitment to simplicity and
            authenticity. From handwoven textiles to locally-sourced bamboo
            furniture, each detail tells a story of Filipino craftsmanship and
            sustainable design.
          </p>

          <p>
            Our philosophy is simple: less is more. By stripping away the
            unnecessary, we reveal what truly matters—connection, peace, and the
            beauty of being present.
          </p>

          <div className="icons">
            <div className="rooms-available">
              <h5>15+</h5>
              <p className="description">Rooms</p>
            </div>
            <div className="rating">
              <div className="ratings">
                <h5>5</h5>
                <Star size={18} fill="#ae5c20" />
              </div>
              <div>
                <p className="description">Rating</p>
              </div>
            </div>

            <div className="rating">
              <h5>2025</h5>
              <p className="description">Established</p>
            </div>
          </div>
        </div>

        <div className="values-card">
          {values.map((value) => (
            <div className="our-values">
              <div className="values">
                <img src={value.image} alt="asdfasd" />

                <div className="values-title">
                  <h2>{value.title}</h2>
                </div>
              </div>
              <p>{value.paragraph}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AboutUs;
