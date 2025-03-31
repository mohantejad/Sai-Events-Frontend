"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

const categories = ["Business", "Food & Drink", "Health", "Music"];
const dates = ["Today", "Tomorrow", "This weekend"];

const Page = () => {
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const searchParams = useSearchParams();
  const city = searchParams.get("city") || "Hyderabad";

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`http://localhost:8000/events/event/?city=${encodeURIComponent(city)}`);
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, [city]);

  function isMatchingDate(eventDate: string, filter: string) {
    const eventDay = new Date(eventDate).toISOString().split("T")[0];
    const today = new Date().toISOString().split("T")[0];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split("T")[0];

    if (filter === "Today") return eventDay === today;
    if (filter === "Tomorrow") return eventDay === tomorrowStr;
    if (filter === "This weekend") {
      const dayOfWeek = new Date(eventDate).getDay();
      return dayOfWeek === 5 || dayOfWeek === 6;
    }
    return true;
  }

  const filteredEvents = events.filter((event: any) => {
    if (selectedCategory && event.category !== selectedCategory) return false;
    if (selectedDate && !isMatchingDate(event.date, selectedDate)) return false;
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-2">Events in {city}, India</h2>
      <p className="text-gray-500 mb-6">
        Search for something you love or check out popular events in your area.
      </p>

      <div className="flex gap-8">
        <aside className="w-1/4 hidden md:block">
          <h3 className="font-bold text-xl mb-4">Filters</h3>
          <div className="mb-6">
            <h4 className="font-semibold mb-2 text-lg">Category</h4>
            {categories.map((category) => (
              <p
                key={category}
                className={`cursor-pointer py-1 ${
                  selectedCategory === category ? "text-blue-600 font-bold" : "text-gray-600"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </p>
            ))}
            <p className="text-blue-500 cursor-pointer mt-2">View more</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-lg">Date</h4>
            {dates.map((date) => (
              <p
                key={date}
                className={`cursor-pointer py-1 ${
                  selectedDate === date ? "text-blue-600 font-bold" : "text-gray-600"
                }`}
                onClick={() => setSelectedDate(date)}
              >
                {date}
              </p>
            ))}
            <p className="text-gray-500 mt-2">Pick a date...</p>
          </div>
        </aside>

        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event: any) => (
                <div key={event.id} className="border rounded-lg overflow-hidden">
                  <Image
                    src={event.image}
                    alt="Event"
                    width={100}
                    height={30}
                    className="w-full object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{event.title}</h3>
                    <p className="text-gray-500 text-sm">
                      {new Date(event.date).toDateString()} • {event.city}
                    </p>
                    <p className="text-gray-700 mt-2">{event.organization || "Unknown Organizer"}</p>
                    <p className="text-blue-600 font-semibold mt-2">{event.price ? `$${event.price}` : "Free"}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No events found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
