import { motion } from 'framer-motion';

function Hero() {
  const isMobile = window.innerWidth <= 768;

  return (
    <div
      style={{
        minHeight: '90vh',
        display: 'flex',
        flexDirection: isMobile ? 'column-reverse' : 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: isMobile ? '20px' : '50px',
        padding: isMobile ? '20px' : '50px',
        color: 'white',
      }}
    >
      {/* Left Side */}

      <div
        style={{
          maxWidth: '600px',
          textAlign: isMobile ? 'center' : 'left',
        }}
      >
        <h1
          style={{
            fontSize: isMobile ? '55px' : '70px',
            marginBottom: '15px',
            lineHeight: 1.1,
          }}
        >
          BusTrack Smart
        </h1>

        <h2
          style={{
            color: '#94a3b8',
            marginBottom: '25px',
            fontSize: isMobile ? '18px' : '28px',
          }}
        >
          Smart Public Transport for Hyderabad
        </h2>

        <div
          style={{
            fontSize: isMobile ? '18px' : '22px',
            lineHeight: isMobile ? '40px' : '50px',
          }}
        >
          <p>🚍 Live Bus Tracking</p>
          <p>📍 Smart Route Search</p>
          <p>👥 Crowd Prediction</p>
          <p>⏱ ETA Prediction</p>
        </div>

        <button
          style={{
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            padding: isMobile ? '15px 25px' : '18px 35px',
            borderRadius: '15px',
            fontSize: isMobile ? '18px' : '20px',
            cursor: 'pointer',
            marginTop: '25px',
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
          width: isMobile ? '100%' : '500px',
          maxWidth: '500px',
          height: 'auto',
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