import { Card, CardBody, CardHeader } from "reactstrap";
import styles from "./Main.module.css";

const Main = () => {
  return (
    <>
      <Card className={styles.welcome}>
        <CardHeader>
          <h1>DOGS!</h1>
          <h2>We love them, we care about them</h2>
          <em>
            Unless you are from The Cat Camp. Then you are forgiven (for your
            lack of taste).
          </em>
        </CardHeader>
        <CardBody>
          <p>
            This is simple site for dogs enthusiasts and/or someone who wants to
            look and dogs and learn about them few new things.
          </p>
        </CardBody>
      </Card>
    </>
  );
};

export default Main;
