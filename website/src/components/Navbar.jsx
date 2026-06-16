import { FaBus } from 'react-icons/fa';

function Navbar() {
  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: '#0f172a',
        color: 'white',

        padding: '15px 20px',

        display: 'flex',

        justifyContent: 'space-between',

        alignItems: 'center',

        flexWrap: 'wrap',

        gap: '20px',
      }}
    >
      {/* LOGO SECTION */}

      <div
        style={{
          display: 'flex',

          alignItems: 'center',

          gap: '12px',

          flexWrap: 'wrap',
        }}
      >
        <FaBus size={30} color="#22c55e" />

        <div
          style={{
            display: 'flex',

            alignItems: 'center',

            gap: '10px',

            flexWrap: 'wrap',
          }}
        >
          <img
            src="/images/logo.png"
            alt="logo"
            style={{
              width: '45px',

              height: '45px',

              objectFit: 'contain',
            }}
          />

          <h1
            style={{
              margin: 0,

              fontSize: 'clamp(26px, 5vw, 42px)',

              lineHeight: 1.1,

              wordBreak: 'break-word',
            }}
          >
            BusTrack Smart
          </h1>
        </div>
      </div>

      {/* MENU */}

      <div
        style={{
          display: 'flex',

          gap: '20px',

          fontSize: '16px',

          flexWrap: 'wrap',

          justifyContent: 'center',
        }}
      >
        <a
          href="/"
          style={{
            color: 'white',

            textDecoration: 'none',

            fontWeight: '500',
          }}
        >
          Home
        </a>

        <a
          href="#features"
          style={{
            color: 'white',

            textDecoration: 'none',

            fontWeight: '500',
          }}
        >
          Features
        </a>

        <a
          href="#about"
          style={{
            color: 'white',

            textDecoration: 'none',

            fontWeight: '500',
          }}
        >
          About
        </a>
      </div>
    </nav>
  );
}

export default Navbar;