import EventsHero from '../components/sections/events/EventsHero';
import EventCountdown from '../components/sections/events/EventCountdown';
import EventInfo from '../components/sections/events/EventInfo';
import RegistrationForm from '../components/sections/events/RegistrationForm';
import EventsBenefits from '../components/sections/events/EventsBenefits';
import PastEventsGallery from '../components/sections/events/PastEventsGallery';

const Events = () => {
    return (
        <div className="bg-genMain min-h-screen">
            <EventsHero />
            <EventCountdown />
            <EventInfo />
            <PastEventsGallery />
            <RegistrationForm />
            <EventsBenefits />
        </div>
    );
};

export default Events;
