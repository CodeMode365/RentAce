"use client";

// import Mapbox from "@/components/Mapping/Mapbox";
// import AuthModal from "@/components/Modal/AuthModal";
// import LogoutModal from "@/components/Modal/LogoutModal";
// import OptionBar from "@/components/OptionBar";
// import Sidebar from "@/components/Sidebar";
// import TopBar from "@/components/TopBar";
import dynamic from "next/dynamic";

const TopBar = dynamic(() => import("@/components/TopBar"), { ssr: false });
const OptionBar = dynamic(() => import("@/components/OptionBar"), {
  ssr: false,
});
const Sidebar = dynamic(() => import("@/components/Sidebar"), { ssr: false });
const AuthModal = dynamic(() => import("@/components/Modal/AuthModal"), {
  ssr: false,
});
const LogoutModal = dynamic(() => import("@/components/Modal/LogoutModal"), {
  ssr: false,
});
const Mapbox = dynamic(() => import("@/components/Mapping/Mapbox"), {
  ssr: false,
});

const Home = () => {
  return (
    <>
      <TopBar />
      <OptionBar />
      <Sidebar />

      <AuthModal />

      <LogoutModal />
      <div>
        <Mapbox />
      </div>
    </>
  );
};

export default Home;
