import styles from "./Usage.module.css";

const Usage = () => {
  return (
    <div className={styles.usage}>
      <h3>How to use dog finder:</h3>
      <p>
        Choose one of the seven groups of dog breeds. Then, wait until list is
        shown with specific breeds and choose one. After this, wait to see card
        with infromation about your chosen breed and random image if one exists.
      </p>
    </div>
  );
};

export default Usage;
