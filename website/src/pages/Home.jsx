import About from '../components/About';
import CTA from '../components/CTA';
import Dashboard from '../components/Dashboard';
import Download from '../components/Download';
import FAQ from '../components/FAQ';
import Features from '../components/Features';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Navbar from '../components/Navbar';
import Screenshots from '../components/Screenshots';
import Stats from '../components/Stats';
import Testimonials from '../components/Testimonials';

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Dashboard />
      <Features />
      <Screenshots />
      <HowItWorks />
      <About />
      <Stats />
      <Testimonials />
      <FAQ />
      <Download />
      <CTA />
      <Footer />
    </>
  );
}

export default Home;
