import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import React from 'react';

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#111827',
        color: 'white',
        textAlign: 'center',
        padding: '40px',
      }}
    >
      <h1
        style={{
          fontSize: '40px',
          color: '#22c55e',
        }}
      >
        🚌 BusTrack Smart
      </h1>

      <br />

      <p>Smart Public Transport for Hyderabad</p>

      <br />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '25px',
          fontSize: '30px',
          marginTop: '20px',
          marginBottom: '20px',
        }}
      >
        <FaInstagram />

        <FaLinkedin />

        <FaGithub />
      </div>
      <p>Made with ❤️ for Smart Public Transport</p>
      <p>© 2026 BusTrack Smart. All Rights Reserved.</p>
    </footer>
  );
}

export default Footer;
