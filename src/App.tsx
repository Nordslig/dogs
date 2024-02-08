import dogsBg from "./assets/dogsBg.jpg";
import Main from "./components/Main";
import Info from "./components/Info";
import Form from "./components/Form";
import RandomDogFact from "./components/RandomDogFact";

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${dogsBg})`,
        backgroundRepeat: "repeat",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          top: 0,
          left: 0,
          minHeight: "100vh",
          backgroundColor: "rgba(255,255,255, .3)",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Main />
          <Form />
        </div>
        <RandomDogFact />
        <Info />
      </div>
    </div>
  );
}

export default App;
