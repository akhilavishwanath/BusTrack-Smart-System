import { motion } from 'framer-motion';
import React from 'react';

function Stats() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        backgroundColor: '#020617',
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
        Our Impact
      </h1>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          gap: '30px',
        }}
      >
        <div
          style={boxStyle}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-15px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <h1>10K+</h1>
          <p>Users</p>
        </div>

        <div
          style={boxStyle}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-15px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <h1>500+</h1>
          <p>Buses</p>
        </div>

        <div
          style={boxStyle}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-15px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <h1>100+</h1>
          <p>Routes</p>
        </div>

        <div
          style={boxStyle}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-15px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <h1>99%</h1>
          <p>Accuracy</p>
        </div>
      </div>
    </motion.div>
  );
}

const boxStyle = {
  background: 'rgba(255,255,255,0.05)',
  padding: '40px',
  borderRadius: '20px',
  width: '220px',
  textAlign: 'center',
  transition: '0.3s',
  cursor: 'pointer',
};

export default Stats;
