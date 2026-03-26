// src/Components/ContactUs.jsx
import React, { useEffect } from "react";
import "./ContactUs.css";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactUs = () => {
  // Initialize AOS once
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 100,
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    if (!name || !email || !message) {
      toast.error("⚠️ Please fill all fields!", {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
      });
      return;
    }

    toast.success("✅ Message sent successfully!", {
      position: "top-center",
      autoClose: 2000,
      theme: "colored",
    });

    e.target.reset();
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <h2 className="contact-title" data-aos="fade-down">
          📞 Get in Touch
        </h2>
        <p
          className="contact-subtitle"
          data-aos="fade-up"
          data-aos-delay="120"
        >
          We'd love to hear from you! Whether you have a question about recipes,
          collaborations, or anything else — reach out below.
        </p>

        <div className="contact-grid">
          {/* Left — Info Cards */}
          <div className="contact-info">
            <div className="info-card" data-aos="fade-right" data-aos-delay="80">
              <FaMapMarkerAlt className="info-icon" />
              <h4>Our Location</h4>
              <p>Mumbai, Maharashtra, India</p>
            </div>

            <div className="info-card" data-aos="fade-right" data-aos-delay="160">
              <FaPhoneAlt className="info-icon" />
              <h4>Phone</h4>
              <p>+91 98765 43210</p>
            </div>

            <div className="info-card" data-aos="fade-right" data-aos-delay="240">
              <FaEnvelope className="info-icon" />
              <h4>Email</h4>
              <p>support@foodieland.com</p>
            </div>
          </div>

          {/* Right — Contact Form */}
          <form
            className="contact-form"
            onSubmit={handleSubmit}
            data-aos="fade-left"
            data-aos-delay="120"
          >
            <div className="form-group">
              <input type="text" name="name" placeholder="Your Name" />
            </div>

            <div className="form-group">
              <input type="email" name="email" placeholder="Your Email" />
            </div>

            <div className="form-group">
              <textarea name="message" rows="5" placeholder="Your Message"></textarea>
            </div>

            <button
              type="submit"
              className="contact-btn"
              data-aos="zoom-in"
              data-aos-delay="260"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
