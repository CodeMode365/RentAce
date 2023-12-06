import Operation from "@/components/Operational/Operation";
import dynamic from "next/dynamic";

const TopBar = dynamic(() => import("@/components/TopBar"));
const OptionBar = dynamic(() => import("@/components/OptionBar"), {
  ssr: false,
});
const LogoutModal = dynamic(() => import("@/components/Modal/LogoutModal"));
const Mapbox = dynamic(() => import("@/components/Mapping/Mapbox"));

const Home = () => {
  return (
    <>
      <TopBar />
      <OptionBar />

      <Operation />
      <LogoutModal />
      <div>
        <Mapbox />
      </div>
    </>
  );
};

export default Home;
