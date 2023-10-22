// dogs api:
// pics = https://dog.ceo/dog-api/documentation/
// facts = https://dogapi.dog/docs/api-v2

import { Card, CardHeader, Container } from "reactstrap";
import dogsBg from "./assets/dogsBg.jpg";

function App() {
  return (
    <div style={{ backgroundImage: dogsBg }}>
      {/* <div> */}
      <Card>
        <h1>DOGS!</h1>
        <h2>We love them, we care about them</h2>
        <em>
          Unless you are from The Cat Camp. Then you are forgiven (for your lack
          of taste).
        </em>
      </Card>
    </div>
  );
}

export default App;
