import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "reactstrap";

// * dogs api:
// * pics = https://dog.ceo/dog-api/documentation/
// * facts = https://dogapi.dog/docs/api-v2

const Form = () => {
  const [dogImage, setDogImage] = useState<"" | undefined>("");
  const [breedsList, setBreedsList] = useState<string[]>([]);

  useEffect(() => {
    const getInfo = async () => {
      const getPagesNum = await axios.get("https://dogapi.dog/api/v2/breeds/");
      console.log(getPagesNum.data.links.last);
    };

    getInfo();
  }, []);

  const getBreeds = async () => {
    const factsRes = await axios.get(
      "https://dogapi.dog/api/v2/breeds/3d6b889f-9c5e-4b31-bb46-60280beeb663"
    );
    const imageRes = await axios.get(
      `https://dog.ceo/api/breed/pug/images/random`
    );

    console.log(factsRes.data.data);

    setDogImage(imageRes.data.message);
    for (let i = 0; i < factsRes.data.data.length; i++) {
      console.log(factsRes.data.data[i].attributes.name);
    }
  };

  useEffect(() => {
    // getBreeds();
  }, []);

  return (
    <>
      <form>
        <label htmlFor="dogBreed">Dog breed: </label>
        <Button onClick={getBreeds}>PUG</Button>
        {/* <Button>Search for dog</Button> */}
      </form>
      <img src={dogImage} />
    </>
  );
};

export default Form;
