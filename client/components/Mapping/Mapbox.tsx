"use client";

import React, { Fragment, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import MapGl, {
  Marker,
  ScaleControl,
  GeolocateControl,
  MapLayerMouseEvent,
  NavigationControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import toast from "react-hot-toast";
import { IPin } from "@/types/pins";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsNotAddingPin,
  stopAppLoading,
} from "@/lib/redux/slices/globalSetting";
import { RootState } from "@/lib/redux/store";
import { Button } from "../ui/button";

const Direction = dynamic(() => import("./Direction"), { ssr: false });
const DirectionFinder = dynamic(() => import("./DirectionFinder"), {
  ssr: false,
});
const ToggleMode = dynamic(() => import("./ToggleMode"), { ssr: false });
const Popover = dynamic(() => import("./Popover"), { ssr: false });
const AddSpaceModal = dynamic(
  () => import("@/components/Modal/AddSpaceModal"),
  { ssr: false }
);

const Mapbox = () => {
  const dispatch = useDispatch();
  const isUserAddingPin = useSelector(
    (state: RootState) => state.globalSetting.isAddingPin
  );

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

  const [tempPinCoordinates, setTempPinCoordinates] = useState<{
    lat: number;
    long: number;
  } | null>(null);

  const clearTempPin = () => {
    setTempPinCoordinates(null);
  };

  const handleMapClick = (e: MapLayerMouseEvent) => {
    if (isUserAddingPin) {
      const { lat, lng } = e.lngLat;

      // Set the temporary pin coordinates in the local state
      setTempPinCoordinates({ lat, long: lng });
    }
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
    console.log("Map is loaded");
  };

  const cancelAddingPin = () => {
    setTempPinCoordinates(null);
    dispatch(setIsNotAddingPin());
  };

  return (
    <MapGl
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
      {isUserAddingPin && !tempPinCoordinates && (
        <span className=" absolute top-20 left-1/2 font-medium -translate-x-1/2 bg-white/80 p-2 rounded-md text-emerald-500 text-xl">
          Please select the Area
        </span>
      )}
      {pins?.map((pin: IPin) => (
        <Fragment key={pin.id}>
          <Marker
            latitude={pin.lat}
            longitude={pin.long}
            color={pin.id === currentPlaceId ? "blue" : "red"}
            onClick={() => {
              !isUserAddingPin && handleMarkerClick(pin.id, pin.long, pin.lat);
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
      {currentPlaceId && !isUserAddingPin && (
        <DirectionFinder
          isLoading={isLoading}
          startFindingDirection={() => {
            findDirection();
          }}
        />
      )}

      {tempPinCoordinates && (
        <>
          <Button
            className="z-2 absolute top-20 left-1/2 -translate-x-[110%] shadow-xl "
            variant={"destructive"}
            size={"sm"}
            onClick={() => cancelAddingPin()}
          >
            Cancel
          </Button>
          <AddSpaceModal>
            <Button
              className="z-2 absolute top-20 left-1/2  text-sky-600 shadow-xl border hover:bg-sky-500 hover:text-white"
              variant={"secondary"}
              size={"sm"}
            >
              Next Step
            </Button>
          </AddSpaceModal>
          <Marker
            latitude={tempPinCoordinates.lat}
            longitude={tempPinCoordinates.long}
            color="#4d96f3" // Choose a color for the temporary pin
            onClick={clearTempPin}
          />
        </>
      )}

      {direction && <Direction direction={direction} />}
      <ToggleMode setIsDay={setIsDay} isDay={isDay} />
    </MapGl>
  );
};

export default Mapbox;
