import Carousel from "@/components/Carousel";
import EventListPrefer from "@/components/EventListPrefer";
import EventsNav from "@/components/EventsNav";

export default function Home() {
  return (
    <div>
      <Carousel />
      <EventsNav />
      <EventListPrefer />
    </div>
  );
}
