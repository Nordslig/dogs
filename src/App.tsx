// * dogs api:
// * pics = https://dog.ceo/dog-api/documentation/
// * facts = https://dogapi.dog/docs/api-v2

// ! remove module.css

import styles from "./App.module.css";
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
        height: "100vh",
        position: "relative",
      }}
    >
      <img
        src={dogsBg}
        alt="background of cartoon dogs"
        className={styles.backgroundImg}
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
