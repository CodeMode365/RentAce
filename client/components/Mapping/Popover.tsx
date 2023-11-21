import React, { FC } from "react";
import { FaStar } from "react-icons/fa6";
import { Popup } from "react-map-gl";

interface iProps {
  lng: number;
  lat: number;
  title: string;
  desc: string;
}

const Popover: FC<iProps> = ({ lng, lat, title, desc }) => {
  return (
    <Popup
      latitude={lat}
      longitude={lng}
      closeButton
      closeOnClick={false}
      anchor="top"
    >
      <div>
        <div className="pb-1 mb-2 border-b shadow-sm">
          <h3 className="font-bold text-slate-800">Place</h3>
          <p>Dharara</p>
        </div>

        <div className="pb-1 mb-2 border-b shadow-sm">
          <h3 className="font-bold text-slate-800 ">Review</h3>
          <p>THis is so beafutiful.</p>
        </div>

        <div className="pb-1 mb-2 border-b shadow-sm">
          <h3 className="font-bold text-slate-800">Rating</h3>
          <div className="flex">
            <FaStar className="text-yellow-500" size={12} />
            <FaStar className="text-yellow-500" size={12} />
            <FaStar className="text-yellow-500" size={12} />
            <FaStar className="text-yellow-500" size={12} />
            <FaStar className="text-yellow-500" size={12} />
          </div>
        </div>

        <div className="pb-1 shadow-sm">
          <h3 className="font-bold text-slate-800">Information</h3>
          <p>
            Information Created by <b>Pabin</b>
          </p>
          <span>1 hour ago</span>
        </div>
      </div>
    </Popup>
  );
};

export default Popover;
