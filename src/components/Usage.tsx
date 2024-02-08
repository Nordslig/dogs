import styles from "./Usage.module.css";

const Usage = () => {
  return (
    <div className={styles.usage}>
      <h3>How to use dog finder:</h3>
      <p>
        Choose one of the groups of dog breeds. Then wait until list is shown
        with specific breeds and select one that you are interested in. After a
        quick moment, you will see card with information and random image if it
        exist.
      </p>
    </div>
  );
};

export default Usage;
