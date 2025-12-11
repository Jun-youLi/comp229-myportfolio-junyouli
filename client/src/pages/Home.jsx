// src/pages/Home.jsx
// Home page with welcome message and mission statement

import { Link } from "react-router-dom";

function Home({ contactData }) {
  return (
    <section className="page home-page">
      {contactData && (
        <div className="contact-banner">
          <h2>Thank you, {contactData.firstName}!</h2>
          <p>
            I received your message and will get back to you at{" "}
            <strong>{contactData.email}</strong> as soon as possible.
          </p>
        </div>
      )}

      <div className="hero">
        <h1>Hi, I'm Jun-You Li.</h1>
        <h2>AI Systems Design student & web developer.</h2>
        <p>
          I enjoy building practical AI tools, web applications, and game
          utilities. This portfolio highlights my work at Centennial College and
          my personal projects.
        </p>

        <div className="hero-actions">
          <Link to="/projects" className="btn-primary">
            View My Projects
          </Link>
          <Link to="/about" className="btn-secondary">
            Learn More About Me
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Home;
