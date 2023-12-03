import React, { FC, useState } from "react";
import { Layer, Source } from "react-map-gl";
import { Button } from "../ui/button";
import { GiPolarStar } from "react-icons/gi";

interface IProps {
  direction: any;
}

const Direction: FC<IProps> = ({ direction }) => {
  const [currentRoute, setCurrentRoute] = useState(0);
  const route = direction.routes[currentRoute];

  const shortest = Math.min(
    ...direction.routes.map((_: any) => _.distance.toFixed(2))
  );

  return (
    <>
      {direction ? (
        <>
          <div className="absolute top-5 left-1/2 -translate-x-1/2">
            {Array.from({ length: direction.routes.length }).map((_, index) => (
              <Button
                key={"route-btn-" + index}
                size={"sm"}
                variant={currentRoute === index ? "secondary" : "default"}
                className="mx-1 border relative"
                onClick={() => {
                  setCurrentRoute(index);
                }}
              >
                Route {index + 1}
                {shortest === direction.routes[index].distance && (
                  <GiPolarStar
                    size={24}
                    className={
                      "absolute top-0 left-0 text-yellow-500 -translate-x-1/2 -translate-y-1/3"
                    }
                  />
                )}
              </Button>
            ))}
          </div>

          <div>
            <div className="absolute top-32 left-1/2 z-50 -translate-x-1/2 bg-white p-2 rounded-md text-md text-slate-800 border">
              <strong className="underline">Route {currentRoute}:</strong>
              <p className="font-bold">
                Distance:{" "}
                <span className="font-normal">
                  {route?.distance.toFixed(2)} meters
                </span>
              </p>
              <p className="font-bold">
                Duration:{" "}
                <span className="font-normal">
                  {route?.duration.toFixed(2)} seconds
                </span>
              </p>
            </div>

            <div>
              <Source
                type="geojson"
                data={{
                  type: "Feature",
                  geometry: {
                    type: "LineString",
                    coordinates: route?.geometry.coordinates,
                  },
                  properties: {},
                }}
              >
                <Layer
                  type="line"
                  paint={{
                    "line-color": "rgb(14, 165, 233)",
                    "line-width": 6,
                  }}
                />
              </Source>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Direction;
