function Team() {
  return (
    <div
      style={{
        backgroundColor: "#020617",
        color: "white",
        padding: "80px 50px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "45px",
          marginBottom: "50px",
        }}
      >
        Meet Our Team
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          flexWrap: "wrap",
        }}
      >
        <div style={cardStyle}>
          <img
src="/images/member1.jpg"
alt="member"
style={{
width:"120px",
height:"120px",
borderRadius:"50%",
marginBottom:"20px"
}}
/>
          <p>Frontend Developer</p>
        </div>

        <div style={cardStyle}>
          <img
src="/images/member2.jpg"
alt="member"
style={{
width:"120px",
height:"120px",
borderRadius:"50%",
marginBottom:"20px"
}}
/>
          <h2>👨‍💻 Member 2</h2>
          <p>Backend Developer</p>
        </div>

        <div style={cardStyle}>
          <img
src="/images/member1.jpg"
alt="member"
style={{
width:"120px",
height:"120px",
borderRadius:"50%",
marginBottom:"20px"
}}
/>
          <p>ML Developer</p>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "rgba(255,255,255,0.05)",
  padding: "40px",
  borderRadius: "20px",
  width: "250px",
  textAlign: "center",
  boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
};

export default Team;