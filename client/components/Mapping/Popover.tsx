import { IPin } from "@/lib/pins";
import React, { FC } from "react";
import { FaStar } from "react-icons/fa6";
import { Popup } from "react-map-gl";
import TimeAgo from "react-timeago";

interface iProps extends IPin {
  visible: boolean;
  onClose: VoidFunction;
}

const Popover: FC<iProps> = ({
  long,
  lat,
  title,
  desc,
  rating,
  id,
  createdAt,
  visible,
  onClose,
}) => {
  return visible ? (
    <Popup
      latitude={lat}
      longitude={long}
      closeButton={true}
      closeOnClick={false}
      anchor="left"
      onClose={onClose}
    >
      <div>
        <div className="pb-1 mb-2 border-b shadow-sm">
          <h3 className="font-bold text-slate-800">Place</h3>
          <p>{title}</p>
        </div>

        <div className="pb-1 mb-2 border-b shadow-sm">
          <h3 className="font-bold text-slate-800 ">Review</h3>
          <p>{desc}</p>
        </div>

        <div className="pb-1 mb-2 border-b shadow-sm">
          <h3 className="font-bold text-slate-800">Rating</h3>
          <div className="flex">
            {Array.from({ length: rating }).map((rate, index) => (
              <FaStar
                className="text-yellow-500"
                size={12}
                key={index + "rating"}
              />
            ))}
          </div>
        </div>

        <div className="pb-1 shadow-sm">
          <h3 className="font-bold text-slate-800">Information</h3>
          <p>
            Created by <b>Pabin</b>
          </p>
          {createdAt && (
            <span>
              <TimeAgo date={createdAt} />
            </span>
          )}
        </div>
      </div>
    </Popup>
  ) : null;
};

export default Popover;
