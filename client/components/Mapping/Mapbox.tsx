"use client";

import React, { useEffect, useState } from "react";
import Map, {
  ViewState,
  Marker,
  Popup,
  ScaleControl,
  useMap,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { FaLocationDot } from "react-icons/fa6";
import NavigationButton from "./NavigationButton";
import Popover from "./Popover";

const Mapbox = () => {
  const [userLocation, setUserLocation] = useState({
    latitude: 27.6974,
    longitude: 85.3318,
  });

  const [viewport, setViewPort] = useState<any>({
    width: 400,
    height: 400,
    latitude: userLocation.latitude,
    longitude: userLocation.longitude,
    zoom: 8,
  });

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        });
      } else {
        alert("Please turn on your location!");
      }
    };
    getLocation();
  }, []);

  const handleViewportChange = (nextViewport: any) => {
    setViewPort(nextViewport.ViewState);
  };

  return (
    <Map
      {...viewport}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onMove={handleViewportChange}
    >
      {/* 48.858093, 2.294694 */}
      <NavigationButton />
      <Marker
        longitude={userLocation.longitude}
        latitude={userLocation.latitude}
        // anchor="bottom"
      >
        <FaLocationDot className="text-red-500" size={24} />
        <p>You are here!</p>
      </Marker>
      <Popover
        desc="Some desc"
        lat={userLocation.latitude}
        lng={userLocation.longitude}
        title="title"
      />

      <ScaleControl position="top-right" />
    </Map>
  );
};

export default Mapbox;
