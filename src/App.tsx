// * dogs api:
// * pics = https://dog.ceo/dog-api/documentation/
// * facts = https://dogapi.dog/docs/api-v2

import { Card, CardBody, CardHeader } from "reactstrap";
import styles from "./App.module.css";
import dogsBg from "./assets/dogsBg.jpg";
import Main from "./components/Main";
import Info from "./components/Info";
import Form from "./components/Form";

function App() {
  return (
    <div style={{ height: "100vh", overflow: "hidden", position: "relative" }}>
      <img
        src={dogsBg}
        alt="background of cartoon dogs"
        className={styles.backgroundImg}
      />
      <div style={{ position: "relative" }}>
        <Main />
        <Form />
      </div>
      <Info />
    </div>
  );
}

export default App;
