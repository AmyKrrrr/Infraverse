import React from "react";
import "./HomePage.css";
import TextType from "../TextType";

const HomePage = ({ onLoginClick, onStartLearningClick }) => {
  return (
    <div className="homepage-container">
      {/* --- CORRECTED BOOTSTRAP NAVBAR --- */}
      <nav className="navbar bg-dark" data-bs-theme="dark">
        <div className="container-fluid">
          {/* Left side: Brand and Logo */}
          <a className="navbar-brand d-flex align-items-center" href="#">
            <div className="nav-logo">IV</div>
            <span style={{ marginLeft: "1rem", fontSize: "1.5rem" }}>
              InfraVerse
            </span>
          </a>

          {/* Right side: Login Button wrapped in a form */}
          <form className="d-flex">
            <button
              className="btn btn-outline-light"
              onClick={onLoginClick}
              type="button"
            >
              Login
            </button>
          </form>
        </div>
      </nav>
      {/* --- END: NAVBAR --- */}

      {/* Hero Section (remains the same) */}
      <main className="hero-section">
        <h1 className="hero-title">
          <TextType
            text={[
              "Build the future",
              "Bridging the Education Gap",
              "Smart Learning, Anywhere",
              "Unlocking Potential",
              "Education Without Limits",
            ]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter=""
          />
        </h1>
        <p className="hero-subtitle">
          Our Digital Classroom initiative is designed to bring quality education to rural colleges through affordable, technology-driven learning solutions. By integrating smart tools and interactive content, we aim to bridge the educational divide and empower students in underserved communities.
        </p>

        <button className="hero-button" onClick={onStartLearningClick}>
          Start Learning
        </button>

      </main>
    </div>
  );
};

export default HomePage;
