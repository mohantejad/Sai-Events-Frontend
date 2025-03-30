import Image from "next/image";

interface Event {
  id: number;
  title: string;
  category: string;
  city: string;
  online: boolean;
  image?: string;
}

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="b4order rounded-lg shadow-sm border border-[#81a7e3] overflow-hidden transition-transform transform hover:scale-105 cursor-pointer">
      <div className="relative w-full h-48">
        <Image
          src={event.image || "/images/default-event.jpg"}
          alt={event.title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold mb-1">{event.title}</h3>
        <p className="text-sm text-gray-500">Category: {event.category}</p>
        {event.online ? (
          <p className="text-green-600 font-semibold">Online Event</p>
        ) : (
          <p className="text-gray-600">Location: {event.city}</p>
        )}
      </div>
    </div>
  );
};

export default EventCard;


