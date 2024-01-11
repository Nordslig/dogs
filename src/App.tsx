// * dogs api:
// * pics = https://dog.ceo/dog-api/documentation/
// * facts = https://dogapi.dog/docs/api-v2

import dogsBg from "./assets/dogsBg.jpg";
import Main from "./components/Main";
import Info from "./components/Info";
import Form from "./components/Form";
import RandomDogFact from "./components/RandomDogFact";

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        // height: "100vh",
        // position: "relative",
        backgroundImage: `url(${dogsBg})`,
        backgroundRepeat: "repeat-y",
      }}
    >
      <img
      // src={dogsBg}
      // alt="background of cartoon dogs"
      // width="100%"
      // height="100%"
      // className={styles.backgroundImg}
      />
      <div style={{ position: "relative" }}>
        <Main />
        <Form />
      </div>
      <RandomDogFact />
      <Info />
    </div>
  );
}

export default App;
