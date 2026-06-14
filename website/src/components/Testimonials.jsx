import React from 'react';
function Testimonials() {
  return (
    <div
      style={{
        backgroundColor: '#0f172a',
        color: 'white',
        padding: '80px 50px',
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          fontSize: '45px',
          marginBottom: '50px',
        }}
      >
        User Reviews
      </h1>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '30px',
        }}
      >
        <div style={cardStyle}>
          ⭐⭐⭐⭐⭐
          <p>Very useful for daily travel.</p>
        </div>

        <div style={cardStyle}>
          ⭐⭐⭐⭐⭐
          <p>Accurate ETA and crowd prediction.</p>
        </div>

        <div style={cardStyle}>
          ⭐⭐⭐⭐⭐
          <p>Easy and fast bus tracking.</p>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: 'rgba(255,255,255,0.05)',
  padding: '40px',
  borderRadius: '20px',
  width: '280px',
  textAlign: 'center',
};

export default Testimonials;
