import React from "react";

export default function Loading() {
  return (
    <div
      className={`relative w-screen h-screen bg-sky-500 `}
      style={{ zIndex: 300 }}
    >
      <div className="absolute left-1/2 top-1/2  -translate-x-1/2 -translate-y-1/2 flex flex-col  items-center">
        <span className=" h-14 w-14 bg-white rounded-full flex items-center justify-center">
          <span className="bg-sky-500 h-10 w-10 animate-spin" />
        </span>
        <h2 className="mt-2 text-white text-xl">Please wait</h2>
      </div>
    </div>
  );
}
