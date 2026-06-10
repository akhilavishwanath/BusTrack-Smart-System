import { motion } from "framer-motion";
function Features() {
  return (
    <motion.div
initial={{opacity:0}}
whileInView={{opacity:1}}
transition={{duration:1}} id="features"
      style={{
        backgroundColor: "#0f172a",
        padding: "80px 50px",
        color: "white",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "45px",
          marginBottom: "50px",
        }}
      >
        Our Features
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "30px",
        }}
      >
        <div
  style={cardStyle}
  onMouseOver={(e)=>{
    e.currentTarget.style.transform='scale(1.05)';
  }}
  onMouseOut={(e)=>{
    e.currentTarget.style.transform='scale(1)';
  }}
>
          <h2>🚍 Live Bus Tracking</h2>
          <p>Track buses in real time.</p>
        </div>

        <div
  style={cardStyle}
  onMouseOver={(e)=>{
    e.currentTarget.style.transform='scale(1.05)';
  }}
  onMouseOut={(e)=>{
    e.currentTarget.style.transform='scale(1)';
  }}
>
          <h2>📍 Smart Route Search</h2>
          <p>Find buses and routes instantly.</p>
        </div>

        <div
  style={cardStyle}
  onMouseOver={(e)=>{
    e.currentTarget.style.transform='scale(1.05)';
  }}
  onMouseOut={(e)=>{
    e.currentTarget.style.transform='scale(1)';
  }}
>
          <h2>⏱ ETA Prediction</h2>
          <p>Know when your bus arrives.</p>
        </div>

        <div
  style={cardStyle}
  onMouseOver={(e)=>{
    e.currentTarget.style.transform='scale(1.05)';
  }}
  onMouseOut={(e)=>{
    e.currentTarget.style.transform='scale(1)';
  }}
>
          <h2>👥 Crowd Prediction</h2>
          <p>Avoid overcrowded buses.</p>
        </div>

        <div
  style={cardStyle}
  onMouseOver={(e)=>{
    e.currentTarget.style.transform='scale(1.05)';
  }}
  onMouseOut={(e)=>{
    e.currentTarget.style.transform='scale(1)';
  }}
>
          <h2>🌐 Multi-language</h2>
          <p>English, Telugu, Hindi and Urdu.</p>
        </div>

        <div
  style={cardStyle}
  onMouseOver={(e)=>{
    e.currentTarget.style.transform='scale(1.05)';
  }}
  onMouseOut={(e)=>{
    e.currentTarget.style.transform='scale(1)';
  }}
>
          <h2>🔔 Notifications</h2>
          <p>Receive arrival alerts.</p>
        </div>
      </div>
    </motion.div>
  );
}

const cardStyle = {
  background: "rgba(255,255,255,0.05)",
  padding: "30px",
  borderRadius: "20px",
  textAlign: "center",
  boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
  transition: "0.3s",
};

export default Features;