import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-gray-200 h-screen w-screen flex items-center justify-center flex-col">
      {children}
    </main>
  );
};

export default layout;
