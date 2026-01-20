import SmoothScrollProvider from './components/providers/SmoothScrollProvider';
import CustomCursor from './components/ui/CustomCursor';
import Hero from './components/sections/Hero';
import TeamMarquee from './components/sections/TeamMarquee';
import AboutSection from './components/sections/AboutSection';
import EventsSection from './components/sections/EventsSection';
import ImpactMetrics from './components/sections/ImpactMetrics';
import ProjectSpotlight from './components/sections/ProjectSpotlight';
import FAQ from './components/sections/FAQ';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AdvantageAccordion from './components/sections/AdvantageAccordion';
import TracksHorizontal from './components/sections/TracksHorizontal';

import VideoShowcase from './components/sections/VideoShowcase';

function App() {
  return (
    <SmoothScrollProvider>
      <CustomCursor />
      
      {/* Noise Overlay - Restored for texture */}
      <div className="noise-bg fixed inset-0 z-50 pointer-events-none opacity-30 mix-blend-multiply"></div>

      <Header />
      
      {/* Main Content with z-index for footer reveal effect */}
      <main className="bg-genMain min-h-screen relative z-10 mb-[80vh] shadow-2xl">
        <Hero />
        <AboutSection />
        <VideoShowcase />
        <AdvantageAccordion />
        <EventsSection />
        <TracksHorizontal />

        <ImpactMetrics />
        <ProjectSpotlight />
        <FAQ />
      </main>

      {/* Sticky Reveal Footer */}
      <div className="fixed bottom-0 left-0 w-full h-[80vh] z-0">
          <Footer />
      </div>
    </SmoothScrollProvider>
  );
}

export default App;
