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

import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import { getAllSpaces, getSingleSpace } from "@/actions/SpaceActions";
import { getDirections } from "@/actions/MapActions";

import {
  setIsNotAddingPin,
  stopAppLoading,
} from "@/lib/redux/slices/globalSetting";
import { RootState } from "@/lib/redux/store";
import { ISpace } from "@/types/space";
import { Button } from "../ui/button";
import OptionBar from "../OptionBar";
import RefetchData from "./RefetchData";

const Direction = dynamic(() => import("./Direction"), { ssr: false });
const DirectionFinder = dynamic(() => import("./DirectionFinder"), {
  ssr: false,
});
const ToggleMode = dynamic(() => import("./ToggleMode"), { ssr: false });
const SpaceInfo = dynamic(() => import("./SpaceInfo"), { ssr: false });
const AddSpaceModal = dynamic(
  () => import("@/components/Modal/AddSpaceModal"),
  { ssr: false }
);

const Mapbox = () => {
  const dispatch = useDispatch();
  const { isAddingPin, isLoggedIn, userInfo } = useSelector(
    (state: RootState) => state.globalSetting
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
  const [spaces, setSpaces] = useState<ISpace[]>();
  const [currentPlaceId, setCurrentPlaceId] = useState<null | string>(null);

  const [direction, setDirection] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isDay, setIsDay] = useState(true);
  const [currentDirOption, setCurrentDirOption] = useState<
    "Driving" | "Cycling" | "Walking"
  >("Driving");

  const getSpaces = () => {
    getAllSpaces()
      .then((res) => {
        toast.success(res.message);
        setSpaces(res.data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    console.log(spaces);
  }, [spaces]);

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
    getSpaces();

    getLocation();
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
    if (isAddingPin) {
      const { lat, lng } = e.lngLat;

      // Set the temporary pin coordinates in the local state
      setTempPinCoordinates({ lat, long: lng });
    }
  };

  const findDirection = async () => {
    setIsLoading(true);
    try {
      const destinationResponse = await getSingleSpace(
        currentPlaceId as string
      );
      const destination: ISpace = destinationResponse.data;
      const directionResponse = await getDirections(
        { lng: userLocation.longitude, lat: userLocation.latitude },
        { lng: destination.lng, lat: destination.lat }
      );

      if (directionResponse.code.includes("NoRoute")) {
        toast.error(directionResponse.data.message);
        return;
      }
      setDirection(directionResponse);
    } catch (error: any) {
      toast.error("Failed fetching Direction!");
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
      <OptionBar
        currentDirOption={currentDirOption}
        setCurrentDirOption={setCurrentDirOption}
      />

      {isAddingPin && !tempPinCoordinates && (
        <span className=" absolute top-20 left-1/2 animate-bounce -translate-x-1/2 bg-white p-2 rounded-md text-emerald-500 text-[16px] shadow-md">
          Mark your space point
        </span>
      )}
      {spaces?.map((space: ISpace) => {
        const { lng, lat, id, creatorId } = space;
        const isMySpace = isLoggedIn && creatorId == userInfo?.id
        return (
          <Fragment key={id}>
            <Marker
              latitude={lat}
              longitude={lng}
              color={
                id === currentPlaceId
                  ? "blue"
                  : isMySpace
                  ? "green"
                  : "red"
              }
              onClick={() => {
                !isAddingPin && handleMarkerClick(id, lng, lat);
              }}
            />
            {currentPlaceId === id && (
              <SpaceInfo
                props={space}
                onClose={() => {
                  setCurrentPlaceId(null);
                }}
              />
            )}
          </Fragment>
        );
      })}

      <ScaleControl position="bottom-right" />
      <GeolocateControl
        position="bottom-right"
        showAccuracyCircle
        showUserHeading
        showUserLocation
      />
      <NavigationControl position="bottom-right" />
      {currentPlaceId && !isAddingPin && (
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
          <AddSpaceModal
            pos={{
              lng: tempPinCoordinates.long,
              lat: tempPinCoordinates.lat,
            }}
          >
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
      <RefetchData onClick={() => getSpaces()} />
    </MapGl>
  );
};

export default Mapbox;
