import React, { FC } from "react";
import { IoIosSearch } from "react-icons/io";

interface iProps {
  placeholder?: string;
}

const AutoInput:FC<iProps> = ({placeholder}) => {
  return (
    <label className=" flex flex-col my-2">
      <div className=" border-1 border-[#f2f4f7] flex items-center justify-between px-1 focus-within:border-sky-400 focus-within::border-sky-500 bg-[#f2f4f7] rounded-md shadow-sm">
        <input
          type="text"
          placeholder={placeholder || "Location"}
          className="w-full h-full py-1 m-1 focus:border-none focus:outline-none bg-transparent text-sm"
        />
        <IoIosSearch size={24} className={"text-sky-400 cursor-pointer mr-2"} />
      </div>
    </label>
  );
};

export default AutoInput;
