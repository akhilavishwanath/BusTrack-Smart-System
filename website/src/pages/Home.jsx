import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Dashboard from '../components/Dashboard';
import Features from '../components/Features';
import Screenshots from '../components/Screenshots';
import HowItWorks from '../components/HowItWorks';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import About from '../components/About';
import Stats from '../components/Stats';
import Testimonials from '../components/Testimonials';
import Download from "../components/Download";
import CTA from "../components/CTA";
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
