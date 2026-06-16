import { motion } from 'framer-motion';
import React from 'react';

function Hero() {
  return (
    <div
      style={{
        minHeight: '90vh',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '50px',
        padding: '50px',
        color: 'white',
      }}
    >
      {/* Left Side */}

      <div style={{ maxWidth: '600px' }}>
        <h1
          style={{
            fontSize: '70px',
            marginBottom: '20px',
          }}
        >
          BusTrack Smart
        </h1>

        <h2
          style={{
            color: '#94a3b8',
            marginBottom: '30px',
          }}
        >
          Smart Public Transport for Hyderabad
        </h2>

        <div
          style={{
            fontSize: '22px',
            lineHeight: '50px',
          }}
        >
          <p>🚍 Live Bus Tracking</p>

          <p>📍 Smart Route Search</p>

          <p>👥 Crowd Prediction</p>

          <p>⏱ ETA Prediction</p>
        </div>

        <button
          onClick={() => window.open('exp://172.18.211.186:8081')}
          style={{
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            padding: '18px 35px',
            borderRadius: '15px',
            fontSize: '20px',
            cursor: 'pointer',
            marginTop: '30px',
          }}
        >
          📥 Download App
        </button>
      </div>

      {/* Right Side */}

      <motion.img
        src="/images/bus.png"
        alt="bus"
        style={{
          width: '500px',
        }}
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      />
    </div>
  );
}

export default Hero;
