import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom';
import SmoothScrollProvider from './components/providers/SmoothScrollProvider';
import CustomCursor from './components/ui/CustomCursor';
import Preloader from './components/ui/Preloader';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import ScrollToTop from './components/utils/ScrollToTop';

function App() {
  return (
    <Router>
        <Preloader />
        <SmoothScrollProvider>
        <CustomCursor />
        <ScrollToTop />
        
        {/* Noise Overlay - Restored for texture */}
        <div className="noise-bg fixed inset-0 z-50 pointer-events-none opacity-30 mix-blend-multiply"></div>

        <Header />
        
        {/* Main Content with z-index for footer reveal effect */}
        <main className="bg-genMain min-h-screen relative z-10 mb-[80vh] shadow-2xl w-full">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/events" element={<Events />} />
            </Routes>
        </main>

        {/* Sticky Reveal Footer */}
        <div className="fixed bottom-0 left-0 w-full h-[80vh] z-0">
            <Footer />
        </div>
        </SmoothScrollProvider>
    </Router>
  );
}

export default App;
