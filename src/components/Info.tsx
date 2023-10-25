import { Card, CardBody, CardHeader, List, ListInlineItem } from "reactstrap";
import styles from "./Info.module.css";

const Info = () => {
  return (
    <Card className={styles.footer}>
      <CardHeader>
        <h2>Info about:</h2>
      </CardHeader>
      <CardBody>
        <List className={styles.list}>
          <ListInlineItem className={styles.list_item}>
            Background image by{" "}
            <a href="https://pixabay.com/users/saydung89-18713596/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=5941898">
              Piyapong Saydaung{" "}
            </a>
            from{" "}
            <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=5941898">
              Pixabay
            </a>
          </ListInlineItem>
          <ListInlineItem className={styles.list_item}>
            Pictures of dogs:{" "}
            <a href="https://dog.ceo/dog-api/documentation/">Dog API</a>
          </ListInlineItem>
          <ListInlineItem className={styles.list_item}>
            Informations about dogs:{" "}
            <a href="https://dogapi.dog/docs/api-v2">
              Powered by Stratonauts Dog API
            </a>
          </ListInlineItem>
        </List>
      </CardBody>
    </Card>
  );
};

export default Info;
