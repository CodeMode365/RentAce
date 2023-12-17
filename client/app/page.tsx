import dynamic from "next/dynamic";

const TopBar = dynamic(() => import("@/components/TopBar"));
const Mapbox = dynamic(() => import("@/components/Mapping/Mapbox"), {
  ssr: false,
});

const Home = () => {
  return (
    <>
      <TopBar />

      <div>
        <Mapbox />
      </div>
    </>
  );
};

export default Home;
