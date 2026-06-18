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

          <div
            style={{
              marginTop: '20px',
              padding: '15px',
              background: '#0f172a',
              borderRadius: '12px',
              border: '1px solid #334155',
              color: '#cbd5e1',
              fontSize: isMobile ? '14px' : '16px',
              lineHeight: '1.7',
            }}
          >
            📱 <strong>Full Live Tracking Experience Available in Android App</strong>
            <br />
            Download the Android application to access:
            <br />
            ✅ Real-time GPS Tracking
            <br />
            ✅ AI Chatbot
            <br />
            ✅ Smart Route Navigation
            <br />
            ✅ Live Crowd Prediction
            <br />
            ✅ Personalized Travel Assistance
          </div>
        </div>

        {/* Download Button */}

        <div
          style={{
            marginTop: '25px',
          }}
        >
          <button
            onClick={() =>
              window.open(
                'https://github.com/akhilavishwanath/BusTrack-Smart-System/releases/download/v1.0.0/application-a4ac17f7-bfb6-4427-8d80-d0ff685a2a9b.apk',
                '_blank'
              )
            }
            style={{
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              padding: isMobile ? '15px 25px' : '18px 35px',
              borderRadius: '15px',
              fontSize: isMobile ? '18px' : '20px',
              cursor: 'pointer',
              fontWeight: 'bold',
              width: isMobile ? '100%' : 'auto',
            }}
          >
            📱 Download Android App
          </button>
        </div>
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