function HowItWorks() {
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
        How It Works
      </h1>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          gap: '30px',
        }}
      >
        <div style={boxStyle}>
          <h2>1️⃣ Search Bus</h2>
        </div>

        <div style={boxStyle}>
          <h2>2️⃣ View Route</h2>
        </div>

        <div style={boxStyle}>
          <h2>3️⃣ Track Live Bus</h2>
        </div>

        <div style={boxStyle}>
          <h2>4️⃣ Reach Destination</h2>
        </div>
      </div>
    </div>
  );
}

const boxStyle = {
  backgroundColor: '#1e293b',
  padding: '40px',
  borderRadius: '20px',
  width: '250px',
  textAlign: 'center',
};

export default HowItWorks;
