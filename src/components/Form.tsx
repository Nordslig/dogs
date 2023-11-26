import axios from "axios";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  FormGroup,
  Input,
  Label,
  List,
  ListInlineItem,
  Spinner,
} from "reactstrap";
import FoundDog from "./FoundDog";

// * dogs api:
// * pics = https://dog.ceo/dog-api/documentation/
// * facts = https://dogapi.dog/docs/api-v2

const Form = () => {
  const [groups, setGroups] = useState<{ id: string; name: string }[]>([]);
  const [chosenGroup, setChosenGroup] = useState<string | null>(null);

  const [breedsList, setBreedsList] = useState<string[]>([]);

  const [dogInfo, setDogInfo] = useState<{
    name: string;
    desc: string;
    image?: string | false;
    lifeExpectancy: number;
    avgMaleWeight: number;
    avgFemaleWeight: number;
  } | null>({
    name: "",
    desc: "",
    lifeExpectancy: 0,
    avgFemaleWeight: 0,
    avgMaleWeight: 0,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // const breedRef = useRef<HTMLOptionElement | null>(null);

  const fetchGroups = async () => {
    const response = await axios.get(`https://dogapi.dog/api/v2/groups`);

    setGroups(
      response.data.data.map((group: any) => ({
        id: group.id,
        name: group.attributes.name,
      }))
    );
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchBreeds = async (id: string) => {
    const response = await axios.get(`https://dogapi.dog/api/v2/groups/${id}`);

    // TODO display list of breeds, then after picking one out, look for informations and pic
    setChosenGroup(response.data.data.attributes.name);
    setBreedsList([]);
    setIsLoading(true);
    setDogInfo({
      name: "",
      desc: "",
      lifeExpectancy: 0,
      avgFemaleWeight: 0,
      avgMaleWeight: 0,
    });

    const breeds = response.data.data.relationships.breeds.data;

    const breedsListTemp: string[] = [];

    for (let i = 0; i < breeds.length; i++) {
      const breed = breeds[i];

      const res = await axios.get(
        `https://dogapi.dog/api/v2/breeds/${breed.id}`
      );
      breedsListTemp.push(res.data.data.attributes.name);
    }
    // console.log(breedsListTemp[0].trim().split(/\s+/).length);

    breedsListTemp.sort();
    setIsLoading(false);
    setBreedsList(breedsListTemp);
  };

  const fetchDog = async () => {
    if (!dogInfo) {
      return console.log("Something went wrong...");
    }

    const { name } = dogInfo;
    const names = name.trim().split(/\s+/);

    console.log(names);

    let dogImage: string = "";

    if (names.length === 1) {
      try {
        const res = await axios.get(
          `https://dog.ceo/api/breed/${name.toLowerCase()}/images/random`
        );

        dogImage = res.data.message;
      } catch (error) {
        return setDogInfo({ ...dogInfo, image: false });
      }
    } else if (names.length === 2) {
      try {
        const res = await axios.get(
          `https://dog.ceo/api/breed/${names[1].toLowerCase()}/${names[0].toLowerCase()}/images/random`
        );

        dogImage = res.data.message;
      } catch (error: any) {
        return setDogInfo({ ...dogInfo, image: false });
      }
    } else return setDogInfo({ ...dogInfo, image: false });

    setDogInfo({ ...dogInfo, image: dogImage });
  };

  return (
    <>
      <Card>
        <FormGroup>
          <label htmlFor="dogBreed">Dog breed: </label>
          {groups.length === 0 && <Spinner />}
          {groups.length > 0 && (
            <List>
              {groups.map(({ id, name }) => (
                <ListInlineItem key={id}>
                  <Button onClick={() => fetchBreeds(id)}>{name}</Button>
                </ListInlineItem>
              ))}
            </List>
          )}
        </FormGroup>
        {isLoading && <Spinner />}
        {breedsList.length > 0 && (
          <FormGroup>
            <FormGroup>
              <Label for="selectBreed">
                Select breed from {chosenGroup} group
              </Label>
              <Input type="select" id="selectBreed">
                <option defaultChecked>-</option>
                {breedsList.map((breed) => (
                  <option
                    key={breed}
                    onClick={() => {
                      setDogInfo({ ...dogInfo!, name: breed });
                    }}
                  >
                    {breed}
                  </option>
                ))}
              </Input>
              <Button onClick={fetchDog}>Find dog!</Button>
            </FormGroup>
          </FormGroup>
        )}
      </Card>
      {dogInfo?.image && <img src={dogInfo.image} />}
      {dogInfo?.image === false && (
        <p>
          Sorry, there aren't any pictures of {dogInfo.name}. If you own one,
          you can send image{" "}
          <a href="https://github.com/jigsawpieces/dog-api-images#dog-api-images">
            here
          </a>{" "}
        </p>
      )}
    </>
  );
};

export default Form;
