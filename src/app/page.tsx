"use client";

import { useState, useEffect, useRef } from "react";
import domtoimage from "dom-to-image-more";

export default function ImDone() {
  const [name, setName] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [location, setLocation] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dateStr = new Date().toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    setTimestamp(dateStr);
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
        );
        const data = await response.json();

        const place =
          data.address.city ||
          data.address.town ||
          data.address.village ||
          data.address.county ||
          data.address.state ||
          "Unknown location";

        setLocation(place);
      } catch {
        setLocation(
          `Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(2)}`
        );
      }
    });
  }, []);

  const handleDownload = async () => {
    if (!cardRef.current || !name) return;
    try {
      const dataUrl = await domtoimage.toPng(cardRef.current);
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "imdone.png";
      link.click();
    } catch (err) {
      console.error("Image generation failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center text-white font-sans">
      <div className="max-w-md w-full bg-black p-8">
        <h1 className="text-2xl sm:text-4xl font-extrabold mb-1 sm:mb-2 text-white">
          Your Last Post Ever
        </h1>
        <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto">
          Say goodbye in style, log off, and discover a strange new world called
          real life. One without notifications. ❤️
        </p>

        {/* Name input */}
        <input
          id="firstname"
          type="text"
          placeholder="Your name"
          maxLength={30}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md bg-black p-3 mb-6 border border-gray-800 focus:ring-2 focus:ring-white text-white placeholder-gray-500"
        />
        {/* Preview card */}
        <div
          ref={cardRef}
          className="bg-black p-5 rounded-lg border border-gray-800 mb-6"
        >
          <p className="font-bold text-lg text-white border-none outline-none m-0 p-0">
            <span className="border-none outline-none">
              {name || "Your Name"}
            </span>
          </p>
          <p className="text-gray-400 text-sm mb-1">@imdone.online</p>
          <p className="text-white text-xl">I’m done.</p>
          <p className="text-blue-500 text-xl mb-4">#bye</p>
          <p className="text-gray-500 text-xs">
            {timestamp}
            {location ? ` · ${location}` : ""}
          </p>
        </div>

        {/* Share button */}
        <button
          onClick={handleDownload}
          disabled={!name}
          className={`inline-flex items-center bg-white text-black px-5 py-2 rounded-md font-semibold w-full justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 ${
            name
              ? "hover:bg-gray-300 cursor-pointer"
              : "opacity-50 cursor-not-allowed"
          }`}
        >
          Share it once and for all
        </button>

        <div className="flex justify-end mt-4">
          <a
            href="https://github.com/rvanrees/imdone"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-colors"
            aria-label="GitHub repository"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M12 0C5.372 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.387.6.113.82-.26.82-.577v-2.02c-3.338.725-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.085 1.84 1.238 1.84 1.238 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.76-1.604-2.665-.304-5.466-1.333-5.466-5.931 0-1.31.468-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.004 2.048.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.77.84 1.234 1.911 1.234 3.221 0 4.61-2.805 5.624-5.476 5.921.43.372.823 1.104.823 2.225v3.293c0 .319.218.694.825.576C20.565 21.796 24 17.298 24 12c0-6.627-5.373-12-12-12z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
