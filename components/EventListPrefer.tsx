"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import { MdMyLocation, MdOutlineOnlinePrediction } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import EventCard from "./utils/EventCard";
import { useRouter } from "next/navigation";

const eventFilters = [
  "All",
  "For you",
  "Online",
  "Today",
  "This weekend",
  "Women's History Month",
  "Free",
  "Music",
  "Food & Drink",
  "Charity & Causes",
];

const eventsData = [
  {
    id: 1,
    title: "Music Concert",
    category: "Music",
    city: "Visakhapatnam",
    online: false,
  },
  {
    id: 2,
    title: "Charity Run",
    category: "Charity & Causes",
    city: "Delhi",
    online: false,
  },
  {
    id: 3,
    title: "Online Tech Meetup",
    category: "Online",
    city: "",
    online: true,
  },
  {
    id: 4,
    title: "Food Festival",
    category: "Food & Drink",
    city: "Mumbai",
    online: false,
  },
];

const EventListPrefer = () => {
  const router = useRouter();
  const [isScrollable, setIsScrollable] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [city, setCity] = useState("Visakhapatnam");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const visibleCount = 10;
  useEffect(() => {
    const checkScrollable = () => {
      if (containerRef.current) {
        setIsScrollable(
          containerRef.current.scrollWidth > containerRef.current.clientWidth
        );
      }
    };
    checkScrollable();
    window.addEventListener("resize", checkScrollable);
    return () => window.removeEventListener("resize", checkScrollable);
  }, []);

  const isToday = (eventDate: string) => {
    const today = new Date().toISOString().split("T")[0];
    return eventDate === today;
  };

  const isThisWeekend = (eventDate: string) => {
    const eventDay = new Date(eventDate).getDay();
    return eventDay === 5 || eventDay === 6;
  };

  const filteredEvents = eventsData.filter((event) => {
    if (selectedFilter === "All") return true;
    if (selectedFilter === "Online") return event.online;
    // if (selectedFilter === "Free") return event.price === 0; // Free ticket filter
    // if (selectedFilter === "Today") return isToday(event.date); // Check if event is today
    // if (selectedFilter === "This weekend") return isThisWeekend(event.date); // Check if event is this weekend

    return event.category.toLowerCase() === selectedFilter.toLowerCase(); // Category filter
  });

  return (
    <div className="relative w-full py-4 px-12">
      <div className="flex space-x-4 flex-col md:flex-row">
        <h2 className="text-xl font-bold mb-4">Browsing events in</h2>
        <div
          className="flex items-center space-x-2 mb-4 text-[#004aad] font-semibold uppercase"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <IoIosArrowDown size={28} />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            className="p-2 rounded-md text-[#004aad] font-semibold uppercase outline-none"
          />
        </div>
        {isDropdownOpen && (
          <div className="absolute bg-white border border-[#81a7e3] w-70 rounded-lg mt-22">
            <div className="max-h-40 overflow-y-auto flex flex-col">
              <div className="flex items-center space-x-4 border-b border-b-gray-100 cursor-pointer px-6 py-4 hover:bg-gray-100">
                <MdMyLocation className="text-[#004aad]" />
                <span>Use my current location</span>
              </div>

              <div className="flex items-center space-x-4 border-b border-b-gray-100 cursor-pointer px-6 py-4 hover:bg-gray-100">
                <MdOutlineOnlinePrediction className="text-[#004aad]" />
                <span>Browse Online events</span>
              </div>

              <div className="flex items-center space-x-4 cursor-pointer px-6 py-4 hover:bg-gray-100">
                <CiLocationOn className="text-[#004aad]" />
                <span>Your location</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <motion.div
        ref={containerRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide p-2"
        whileTap={{ cursor: "grabbing" }}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {eventFilters.map((filter, index) => (
          <div
            key={index}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer transition-colors duration-300 ${
              selectedFilter === filter
                ? "bg-[#004aad] text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setSelectedFilter(filter)}
          >
            {filter}
          </div>
        ))}
      </motion.div>
      <div className="py-4">
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredEvents.slice(0, visibleCount).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No events found.</p>
        )}
      </div>

      <div className="flex justify-center mt-6 pb-8">
        <motion.button
          onClick={() => router.push("/all-events")}
          className="px-6 py-2 bg-white text-[#004aad] border border-[#004aad] font-extrabold uppercase tracking-widest rounded-md cursor-pointer transition-colors duration-300 ease-in-out hover:bg-gray-100"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
        >
          SEE MORE EVENTS
        </motion.button>
      </div>
    </div>
  );
};

export default EventListPrefer;
