function Screenshots() {
  return (
    <div
      style={{
        padding: '80px 50px',
        color: 'white',
        textAlign: 'center',
      }}
    >
      <h1
        style={{
          fontSize: '45px',
          marginBottom: '50px',
        }}
      >
        App Screenshots
      </h1>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '30px',
          flexWrap: 'wrap',
        }}
      >
        <div style={cardStyle}>
          <img src="/images/home.png" alt="Home" style={imageStyle} />
          <h2>Home Screen</h2>
        </div>

        <div style={cardStyle}>
          <img src="/images/tracking.png" alt="Tracking" style={imageStyle} />
          <h2>Live Tracking</h2>
        </div>

        <div style={cardStyle}>
          <img src="/images/route.png" alt="Route" style={imageStyle} />
          <h2>Route Search</h2>
        </div>

        <div style={cardStyle}>
          <img src="/images/crowd.png" alt="Crowd" style={imageStyle} />
          <h2>Crowd Prediction</h2>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: 'rgba(255,255,255,0.05)',
  padding: '20px',
  borderRadius: '20px',
  width: '250px',
  textAlign: 'center',
};

const imageStyle = {
  width: '100%',
  borderRadius: '15px',
  marginBottom: '20px',
};

export default Screenshots;
