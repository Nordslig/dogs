import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "reactstrap";

// * dogs api:
// * pics = https://dog.ceo/dog-api/documentation/
// * facts = https://dogapi.dog/docs/api-v2

const Form = () => {
  const [dogImage, setDogImage] = useState<"" | undefined>("");
  const [groups, setGroups] = useState<string[]>([]);
  const [breedsList, setBreedsList] = useState<string[]>([]);

  const breedsNames: string[] = [];

  const getGroups = async (groupNum: number) => {
    const getGroups = await axios.get("https://dogapi.dog/api/v2/groups");
    // console.log(getGroups.data.data[4].relationships.breeds);
    // ! TEST THIS setGroups([]);
    const groups: string[] = [];
    getGroups.data.data[groupNum].relationships.breeds.data.forEach(
      (breedId: { id: string; type: string }) => {
        groups.push(breedId.id);
      }
    );
    setGroups(groups);
    // groups.splice(0, groups.length);
  };

  useEffect(() => {
    getGroups(1);
  }, []);

  useEffect(() => {
    const getBreeds = async () => {
      for (let i = 0; i < groups.length; i++) {
        const getBreeds = await axios.get(
          `https://dogapi.dog/api/v2/breeds/${groups[i]}`
        );
        setBreedsList((prevState) => [
          ...prevState,
          getBreeds.data.data.attributes.name,
        ]);
      }
    };
    getBreeds();
  }, [groups]);

  useEffect(() => {
    const getInfo = async () => {
      const getBreedsInfo = await axios.get(
        "https://dogapi.dog/api/v2/breeds/"
      );
      const linkNumberOfPages = getBreedsInfo.data.links.last;

      const numberOfPages = linkNumberOfPages.slice(
        linkNumberOfPages.indexOf("[number]=") + "[number]=".length
      );

      for (let i = 1; i <= numberOfPages; i++) {
        const getBreedsNames = await axios.get(
          `https://dogapi.dog/api/v2/breeds?page[number]=${i}`
        );

        getBreedsNames.data.data.forEach((breed: any) => {
          breedsNames.push(breed.attributes.name);
          console.log(breedsNames.sort());
        });
      }
    };
    // getInfo();
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
      <p>{breedsList}</p>
      <form>
        <label htmlFor="dogBreed">Dog breed: </label>
        <Button onClick={() => getGroups(1)}>1st Group</Button>
        <Button onClick={() => getGroups(2)}>2nd Group</Button>
        {/* <Button onClick={getBreeds}>PUG</Button> */}
        {/* <Button>Search for dog</Button> */}
      </form>
      <img src={dogImage} />
    </>
  );
};

export default Form;
