import React, { FC } from "react";
import { Layer, Source } from "react-map-gl";

interface IProps {
  direction: any;
}

const Direction: FC<IProps> = ({ direction }) => {
  return (
    <>
      {direction
        ? direction.routes.map((route: any, index: number) => (
            <Source
              key={index}
              id={`route-${index}`}
              type="geojson"
              data={{
                type: "Feature",
                geometry: {
                  type: "LineString",
                  coordinates: route.geometry.coordinates,
                },
                properties: {},
              }}
            >
              <Layer
                id={`route-${index}`}
                type="line"
                paint={{
                  "line-color": "rgba(42, 17, 233,.8)",
                  "line-width": 6,
                }}
              />
            </Source>
          ))
        : null}
    </>
  );
};
export default Direction;
