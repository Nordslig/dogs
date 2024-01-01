import { Card, CardBody, CardHeader, List, ListInlineItem } from "reactstrap";
import styles from "./Info.module.css";

const Info = () => {
  return (
    <div className={styles.footer}>
      <h2 className={styles.footer_title}>Sources:</h2>
      <div>
        <ul className={styles.footer_list}>
          <li className={styles.footer_list__item}>
            Background image by{" "}
            <a
              href="https://pixabay.com/users/saydung89-18713596/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=5941898"
              target="_blanc"
            >
              Piyapong Saydaung{" "}
            </a>
            from{" "}
            <a
              href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=5941898"
              target="_blanc"
            >
              Pixabay
            </a>
          </li>
          <li className={styles.footer_list__item}>
            Pictures of dogs:{" "}
            <a href="https://dog.ceo/dog-api/documentation/" target="_blanc">
              Dog API
            </a>
          </li>
          <li className={styles.footer_list__item}>
            Informations about dogs:{" "}
            <a href="https://dogapi.dog/docs/api-v2" target="_blanc">
              Powered by Stratonauts Dog API
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Info;
