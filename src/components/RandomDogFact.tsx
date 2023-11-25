import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Card } from "reactstrap";

const RandomDogFact = () => {
  const [dogFactData, setDogFactData] = useState<string | undefined>("");

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
      setDogFactData(res.data.data[0].attributes.body);
    };
    if (cookies.dogFact) return setDogFactData(cookies.dogFact);
    newFact();
  }, [setCookie, timeToNextDay, cookies]);

  return (
    <Card>
      <h3>Your fact of the day:</h3>
      <p>{dogFactData}</p>
    </Card>
  );
};

export default RandomDogFact;

// ! Check 30/10/23 fact
//  * At the age of 4 weeks, most dogs have developed the majority of their vocalizations.
