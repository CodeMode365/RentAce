import Image from "next/image";
import Link from "next/link";
import React from "react";

const Error = () => {
  return (
    <main className="h-screen w-screen relative bg-sky-50">
      <div className="absolute left-1/2 top-[8%] -translate-x-1/2 text-center flex items-center flex-col">
        <div className=" my-14">
          <h2 className="font-bold text-3xl text-sky-500">
            Sorry, the page wasn't found!
          </h2>
          <p className="text-md my-2 text-gray-500 font-medium">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.{" "}
            <br />
            Perhaps you&apos;ve mistyped the URL? <br /> Be sure to check your
            spelling.
          </p>
        </div>
        <Image src="/icons/404.svg" alt="Error icon" height={250} width={250} />

        <div className="my-14">
          <Link
            href={"/"}
            className="h-10 px-4 py-2 bg-sky-500 hover:bg-sky-600 rounded-sm text-white transition-all"
          >
            Go Home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Error;
