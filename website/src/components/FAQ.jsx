import { motion } from 'framer-motion';
import React from 'react';
function FAQ() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
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
        Frequently Asked Questions
      </h1>

      <div
        style={{
          maxWidth: '800px',
          margin: 'auto',
          lineHeight: '40px',
          fontSize: '20px',
        }}
      >
        <h3>❓ What is BusTrack Smart?</h3>
        <p>Smart bus tracking platform for Hyderabad.</p>

        <br />

        <h3>❓ Is the app free?</h3>
        <p>Yes, it is completely free.</p>

        <br />

        <h3>❓ Which buses are supported?</h3>
        <p>TSRTC buses.</p>
      </div>
    </motion.div>
  );
}

export default FAQ;
