import { FaBus } from 'react-icons/fa';
import React from 'react';

function Navbar() {
  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: '#0f172a',
        color: 'white',
        padding: '20px 60px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {/* Logo */}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <FaBus size={30} color="#22c55e" />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
          }}
        >
          <img
            src="/images/logo.png"
            alt="logo"
            style={{
              width: '50px',
            }}
          />

          <h1>BusTrack Smart</h1>
        </div>
      </div>

      {/* Menu */}

      <div
        style={{
          display: 'flex',
          gap: '30px',
          fontSize: '18px',
        }}
      >
        <a
          href="/"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          Home
        </a>

        <a
          href="#features"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          Features
        </a>

        <a
          href="#about"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          About
        </a>
      </div>

      {/* Button */}

      <button
        style={{
          backgroundColor: '#22c55e',
          color: 'white',
          border: 'none',
          padding: '12px 20px',
          borderRadius: '10px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        Download App
      </button>
    </nav>
  );
}

export default Navbar;
