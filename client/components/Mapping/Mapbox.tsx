"use client";

import React, { Fragment, useEffect, useRef, useState } from "react";
import Map, {
  Marker,
  ScaleControl,
  GeolocateControl,
  MapLayerMouseEvent,
  NavigationControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Popover from "./Popover";
import axios from "axios";
import toast from "react-hot-toast";
import { IPin } from "@/lib/pins";
import { Fullscreen } from "lucide-react";
import DirectionFinder from "./DirectionFinder";
import Direction from "./Direction";

const Mapbox = () => {
  const [userLocation, setUserLocation] = useState({
    latitude: 27.6974,
    longitude: 85.3318,
  });

  const map = useRef(null);

  const [viewport, setViewPort] = useState({
    width: 400,
    height: 400,
    latitude: userLocation.latitude,
    longitude: userLocation.longitude,
    zoom: 8,
  });
  const [pins, setPins] = useState<any[]>();
  const [currentPlaceId, setCurrentPlaceId] = useState<null | string>(null);

  const [direction, setDirection] = useState();
  const [isLoading, setIsLoading] = useState(false);

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

    const getPins = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/pin`
        );
        toast.success("Pins fetched!");
        setPins(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Error fetching the Pins!");
      }
    };

    getLocation();
    getPins();
  }, []);

  const handleViewportChange = (nextViewport: any) => {
    setViewPort(nextViewport.ViewState);
  };

  const handleMarkerClick = (id: string, long: number, lat: number) => {
    setCurrentPlaceId(id);
    setViewPort({ ...viewport, latitude: lat, longitude: long });
  };

  const handleMapClick = (e: MapLayerMouseEvent) => {
    const { lat, lng } = e.lngLat;
  };

  const findDirection = async () => {
    setIsLoading(true);
    try {
      const destinationResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/pin/getPin/${currentPlaceId}`
      );
      const destination: IPin = destinationResponse.data;

      const directionResponse =
        await axios.get(`${process.env.NEXT_PUBLIC_MAPBOX_ENDPOINT}/directions/v5/mapbox/cycling/${userLocation.longitude},${userLocation.latitude};${destination.long},${destination.lat}?geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          `);

      if (directionResponse.data.code.includes("NoRoute")) {
        toast.error(directionResponse.data.message);
        return;
      }

      setDirection(directionResponse.data);
    } catch (error: any) {
      toast.error("Failed to fetch Direction!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Map
      ref={map}
      {...viewport}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onMove={handleViewportChange}
      onClick={handleMapClick}
    >
      {pins?.map((pin: IPin) => (
        <Fragment key={pin.id}>
          <Marker
            latitude={pin.lat}
            longitude={pin.long}
            color="blue"
            onClick={() => {
              handleMarkerClick(pin.id, pin.long, pin.lat);
            }}
          />
          <Popover
            id={pin.id}
            rating={pin.rating}
            desc={pin.desc}
            lat={pin.lat}
            long={pin.long}
            title={pin.title}
            createdAt={pin.createdAt}
            updateAt={pin.updateAt}
            visible={currentPlaceId === pin.id}
            onClose={() => {
              setCurrentPlaceId(null);
            }}
          />
        </Fragment>
      ))}

      <ScaleControl position="top-right" />
      <GeolocateControl
        position="bottom-right"
        showAccuracyCircle
        showUserHeading
        showUserLocation
      />
      <NavigationControl position="bottom-right" />
      {currentPlaceId && (
        <DirectionFinder
          isLoading={isLoading}
          startFindingDirection={() => {
            findDirection();
          }}
        />
      )}

      <Direction direction={direction} />
    </Map>
  );
};

export default Mapbox;
