import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Card } from "reactstrap";

import styles from "./RandomDogFact.module.css";

const RandomDogFact = () => {
  const [dogFact, setDogFact] = useState<string | undefined>("");

  const [cookies, setCookie] = useCookies(["dogFact"]);

  const current = new Date();
  const nextDay = new Date(
    current.getFullYear(),
    current.getMonth(),
    current.getDate() + 1,
    0,
    0,
    0
  );
  const timeToNextDay = (nextDay.getTime() - current.getTime()) / 1000;

  useEffect(() => {
    const newFact = async () => {
      const res = await axios.get("https://dogapi.dog/api/v2/facts");
      setCookie("dogFact", res.data.data[0].attributes.body, {
        maxAge: timeToNextDay,
        sameSite: "strict",
      });
      setDogFact(res.data.data[0].attributes.body);
    };
    if (cookies.dogFact) return setDogFact(cookies.dogFact);
    newFact();
  }, [setCookie, timeToNextDay, cookies]);

  return (
    <div className={styles.card}>
      <h3 className={styles.card__title}>Fact of the day:</h3>
      <div className={styles.card__line}></div>
      <p className={styles.card__dogFact}>{dogFact}</p>
    </div>
  );
};

export default RandomDogFact;
