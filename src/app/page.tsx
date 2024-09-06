/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

export default function LocationPage() {
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch location
  const fetchLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(position);
          postLocation(position);
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  // Function to post location to API
  const postLocation = async (position: GeolocationPosition) => {
    try {
      const response = await fetch("/api/location", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          geo: `${position.coords.latitude},${position.coords.longitude}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to post location");
      }

      console.log("Location posted successfully");
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  return <div></div>;
}
