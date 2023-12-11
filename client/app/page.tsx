import Operation from "@/components/Operational/Operation";
import dynamic from "next/dynamic";

const TopBar = dynamic(() => import("@/components/TopBar"));
const OptionBar = dynamic(() => import("@/components/OptionBar"));
const Mapbox = dynamic(() => import("@/components/Mapping/Mapbox"), {
  ssr: false,
});

const Home = () => {
  return (
    <>
      <TopBar />
      <OptionBar />

      <Operation />
      <div>
        <Mapbox />
      </div>
    </>
  );
};

export default Home;
