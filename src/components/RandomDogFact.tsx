import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Card } from "reactstrap";

const RandomDogFact = () => {
  const [dogFactData, setDogFactData] = useState<{
    id: string;
    type: "fact" | string;
    attributes: { body: string };
  } | null>(null);

  // TODO COOKIES
  // const today = new Date();
  //  console.log(today.getMonth() + 1, today.getDate(), today.getFullYear());
  // TODO

  const newFact = async () => {
    const res = await axios.get("https://dogapi.dog/api/v2/facts");
    setDogFactData(res.data.data[0]);
  };

  useEffect(() => {
    newFact();
  }, []);

  return (
    <Card>
      <h3>Your fact of the day: </h3>
      <p>{dogFactData?.attributes.body}</p>
    </Card>
  );
};

export default RandomDogFact;
