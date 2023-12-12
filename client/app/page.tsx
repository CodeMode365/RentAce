import Operation from "@/components/Operational/Operation";
import dynamic from "next/dynamic";

const TopBar = dynamic(() => import("@/components/TopBar"));
const Mapbox = dynamic(() => import("@/components/Mapping/Mapbox"), {
  ssr: false,
});

const Home = () => {
  return (
    <>
      <TopBar />

      <Operation />
      <div>
        <Mapbox />
      </div>
    </>
  );
};

export default Home;
