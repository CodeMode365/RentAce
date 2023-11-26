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
import { IPin } from "@/types/pins";
import { Fullscreen } from "lucide-react";
import DirectionFinder from "./DirectionFinder";
import Direction from "./Direction";
import ToggleMode from "./ToggleMode";
import { useDispatch } from "react-redux";
import { stopAppLoading } from "@/lib/redux/slices/globalSetting";

const Mapbox = () => {
  const dispatch = useDispatch();

  const [userLocation, setUserLocation] = useState({
    latitude: 27.6974,
    longitude: 85.3318,
  });

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
  const [isDay, setIsDay] = useState(true);

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

      console.log({
        source: [userLocation.longitude, userLocation.latitude],
        destination: [destination.long, destination.lat],
      });

      const directionResponse =
        await axios.get(`${process.env.NEXT_PUBLIC_MAPBOX_ENDPOINT}/directions/v5/mapbox/driving/${userLocation.longitude},${userLocation.latitude};${destination.long},${destination.lat}?alternatives=true&annotations=distance%2Cduration&geometries=geojson&language=en&overview=full&steps=true&access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
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

  const setAppIsLoaded = () => {
    dispatch(stopAppLoading());
    console.log("Map is loaded")
  };

  return (
    <Map
      {...viewport}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle={
        isDay
          ? "mapbox://styles/pabin234/clp9sw82s003801po9bsa758q"
          : "mapbox://styles/pabin234/clp9sv2p5003l01o0dndwdzjl"
      }
      onMove={handleViewportChange}
      onClick={handleMapClick}
      onLoad={() => {
        setAppIsLoaded();
      }}
    >
      {pins?.map((pin: IPin) => (
        <Fragment key={pin.id}>
          <Marker
            latitude={pin.lat}
            longitude={pin.long}
            color={pin.id === currentPlaceId ? "blue" : "red"}
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

      <ScaleControl position="bottom-right" />
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

      {direction && <Direction direction={direction} />}
      <ToggleMode setIsDay={setIsDay} isDay={isDay} />
    </Map>
  );
};

export default Mapbox;
