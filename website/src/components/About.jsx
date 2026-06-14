import { motion } from 'framer-motion';
import React from 'react';

function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="about"
      style={{
        backgroundColor: '#020617',
        color: 'white',
        padding: '80px 50px',
        textAlign: 'center',
      }}
    >
      <h1
        style={{
          fontSize: '45px',
          marginBottom: '30px',
        }}
      >
        About BusTrack Smart
      </h1>

      <p
        style={{
          maxWidth: '900px',
          margin: 'auto',
          fontSize: '20px',
          lineHeight: '40px',
          color: '#cbd5e1',
        }}
      >
        BusTrack Smart is an intelligent public transport platform designed for
        Hyderabad. It provides real-time bus tracking, crowd prediction, ETA
        estimation, and route search to help passengers travel efficiently.
      </p>
    </motion.div>
  );
}

export default About;
