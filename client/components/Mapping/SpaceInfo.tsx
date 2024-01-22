import { ISpace } from "@/types/space";
import React, {  useState } from "react";
import { FaStar } from "react-icons/fa6";
import { Popup } from "react-map-gl";
import TimeAgo from "react-timeago";
import { Button } from "@/components/ui/button";
import { DetailSpaceView } from "./DetailSpaceView";
import { toPascalCase } from "@/lib/utilities/toPascalCase";
import { SiGooglemaps } from "react-icons/si";
import ReusableTooltip from "../reusables/ReusableTooltip";
import { BirdIcon, CornerUpRight } from "lucide-react";


const SpaceInfo = ({
  props,
  onClose,
  startFindingDirection,
}: {
  props: ISpace;
  onClose: VoidFunction;
  startFindingDirection: VoidFunction;
}) => {
  const { lng, lat, title, amount, payType, spaceType, desc, createdAt, id } =
    props;
  const description = desc.length > 35 ? `${desc} ....` : desc;
  const viewableTitle = title.length > 35 ? `${title} ....` : title;

  const [isDetailView, setIsDetailView] = useState(false);

  return (
    <Popup
      latitude={lat}
      longitude={lng}
      closeButton={true}
      closeOnClick={false}
      anchor="top-left"
      onClose={onClose}
      className="w-72"
    >
      <div className="mx-2 custom-popup">
        <div className="pb-1 mb-2 border-b shadow-sm ">
          <h2 className="font-bold text-sky-500 text-[16px]">
            {viewableTitle}
          </h2>
        </div>

        <div className="pb-1 mb-2 border-b shadow-sm">
          <h3 className="font-bold text-slate-800 text-[14px]">Basic info</h3>
          <p>Type: {toPascalCase(spaceType)}</p>
          <p>
            Fee:{" "}
            {`${toPascalCase(amount)} (${toPascalCase(payType.toString())})`}
          </p>
        </div>

        <div className="pb-1 mb-2 border-b shadow-sm">
          <h3 className="font-bold text-slate-800">Rating</h3>
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((rate, index) => (
              <FaStar
                className="text-yellow-500"
                size={12}
                key={index + "rating"}
              />
            ))}{" "}
            <span className="ml-2">(434)</span>
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
        <div className="w-full flex items-center justify-between mt-2">
          <div className="flex items-center">
            <span className="mx-1 bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-600 transition-colors flex items-center rounded-full p-1">
              <ReusableTooltip content={<p>View on google maps</p>}>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}
                `}
                  target="_blank"
                >
                  <SiGooglemaps size={28} className="text-rose-500" />
                </a>
              </ReusableTooltip>
            </span>
            <span className="mx-1 bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-600 transition-colors flex items-center rounded-full p-1">
              <ReusableTooltip content={<p>Find Direction</p>}>
                <button onClick={startFindingDirection}>
                  <CornerUpRight size={28} className="text-green-500" />
                </button>
              </ReusableTooltip>
            </span>
          </div>

          <DetailSpaceView
            spaceId={id}
            setIsDetailView={setIsDetailView}
            isDetailView={isDetailView}
          >
            <Button
              className="float-right dark:border dark:border-black/50"
              size={"sm"}
              onClick={() => setIsDetailView(true)}
            >
              Detail view
            </Button>
          </DetailSpaceView>
        </div>
      </div>
    </Popup>
  );
};

export default SpaceInfo;
