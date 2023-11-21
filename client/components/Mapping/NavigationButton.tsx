import { useEffect, useState } from "react";
import { useMap } from "react-map-gl";
import { Button } from "../ui/button";
import { FaUserCircle } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function NavigationButton() {
  const { current: map } = useMap();
  const [userLocation, setUserLocation] = useState({
    latitude: 27.6974,
    longitude: 85.3318,
  });

  const onClick = () => {
    map?.flyTo({ center: [-122.4, 37.8] });
  };

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

  const flyToYourLocation = () => {
    map?.flyTo({
      center: { lat: userLocation.latitude, lng: userLocation.longitude },
      zoom: 15,
    });
  };

  return (
      <Tooltip>
        <TooltipTrigger>
          <Button
            onClick={() => {
              flyToYourLocation();
            }}
            className="absolute top-10 right-5 text-sm"
            variant={"ghost"}
            size={"icon"}
          >
            <FaUserCircle size={24} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            Move to Your location
          </p>
        </TooltipContent>
      </Tooltip>
  );
}

export default NavigationButton;
