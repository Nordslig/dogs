import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <div>
        <h1>DOGS!</h1>
        <h2>We love them, we care about them</h2>
        <em>
          Unless you are cat lover. You can leave, and you are forgiven for your
          lack of taste. (Just kidding)
        </em>
      </div>
      <p>
        This is a simple site for dogs enthusiasts and/or someone who wants to
        look at dogs and learn about them few new things.
      </p>
    </div>
  );
};

export default Header;
