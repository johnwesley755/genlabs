import Hero from '../components/sections/home/Hero';
import AboutSection from '../components/sections/home/AboutSection';
import EventsSection from '../components/sections/home/EventsSection';
import ImpactMetrics from '../components/sections/home/ImpactMetrics';
import ProjectSpotlight from '../components/sections/home/ProjectSpotlight';
import FAQ from '../components/sections/home/FAQ';
import AdvantageAccordion from '../components/sections/home/AdvantageAccordion';
import TracksHorizontal from '../components/sections/home/TrackHorizontal';
import StackingCards from '../components/sections/home/StackingCards';
import Manifesto from '../components/sections/home/Manifesto';
import CommunityGallery from '../components/sections/home/CommunityGallery';

const Home = () => {
    return (
        <>
            <Hero />
            <AboutSection />
            <StackingCards />
            <Manifesto />
            <AdvantageAccordion />
            <EventsSection />
            <CommunityGallery />
            <TracksHorizontal />
            <ImpactMetrics />
            <ProjectSpotlight />
            <FAQ />
        </>
    );
};

export default Home;
