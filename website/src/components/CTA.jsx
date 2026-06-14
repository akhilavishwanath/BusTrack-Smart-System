import React from 'react';
function CTA() {
  return (
    <div
      style={{
        padding: '100px',
        textAlign: 'center',
        color: 'white',
      }}
    >
      <h1
        style={{
          fontSize: '55px',
        }}
      >
        Ready to Travel Smarter?
      </h1>

      <button
        style={{
          background: '#10b981',
          border: 'none',
          padding: '20px 40px',
          borderRadius: '15px',
          color: 'white',
          fontSize: '20px',
          marginTop: '40px',
          cursor: 'pointer',
        }}
      >
        🚍 Get Started
      </button>
    </div>
  );
}

export default CTA;
