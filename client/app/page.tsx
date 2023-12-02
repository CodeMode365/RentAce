import dynamic from "next/dynamic";

const TopBar = dynamic(() => import("@/components/TopBar"));
const OptionBar = dynamic(() => import("@/components/OptionBar"), {
  ssr: false,
});
const Sidebar = dynamic(() => import("@/components/Sidebar"));
const LogoutModal = dynamic(() => import("@/components/Modal/LogoutModal"));
const Mapbox = dynamic(() => import("@/components/Mapping/Mapbox"));

const Home = () => {
  return (
    <>
      <TopBar />
      <OptionBar />

      <Sidebar />
      <LogoutModal />
      <div>
        <Mapbox />
      </div>
    </>
  );
};

export default Home;
