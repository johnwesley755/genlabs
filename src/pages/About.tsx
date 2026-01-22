import AboutHero from '../components/sections/about/AboutHero';
import AboutStats from '../components/sections/about/AboutStats';
import CoreValues from '../components/sections/about/CoreValues';
import PartnersGrid from '../components/sections/about/PartnersGrid';
import PresenceMap from '../components/sections/about/PresenceMap';
import MasonryGrid from '../components/sections/about/MasonryGrid';
import FounderSpotlight from '../components/sections/events/FounderSpotlight';

const About = () => {
    return (
        <div className="bg-genMain min-h-screen">
            <AboutHero />
            <MasonryGrid />
            <AboutStats />
            <CoreValues />
            <PartnersGrid />
            <FounderSpotlight />
            <PresenceMap />
        </div>
    );
};

export default About;
