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
import RandomDog from "./RandomDog";

// * dogs api:
// * pics = https://dog.ceo/dog-api/documentation/
// * facts = https://dogapi.dog/docs/api-v2

const Form = () => {
  const [groups, setGroups] = useState<{ id: string; name: string }[]>([]);
  const [chosenGroup, setChosenGroup] = useState<string | null>(null);

  const [breedsList, setBreedsList] = useState<
    {
      id: string;
      name: string;
      desc: string;
      avgLifeExpectancy: number;
    }[]
  >([]);

  const [dogInfo, setDogInfo] = useState<{
    id: string;
    name?: string;
    desc?: string;
    avgLifeExpectancy?: number;
    avgMaleWeight?: number;
    avgFemaleWeight?: number;
    image?: string | false;
  } | null>({ id: "" });

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

    setChosenGroup(response.data.data.attributes.name);
    setBreedsList([]);
    setIsLoading(true);
    setDogInfo({
      id: "",
    });

    const breeds = response.data.data.relationships.breeds.data;

    const breedsListTemp:
      | [
          {
            id: string;
            name: string;
            desc: string;
            avgLifeExpectancy: number;
            avgMaleWeight: number;
            avgFemaleWeight: number;
          }
        ]
      | any[] = [];

    for (let i = 0; i < breeds.length; i++) {
      const breed = breeds[i];

      const res = await axios.get(
        `https://dogapi.dog/api/v2/breeds/${breed.id}`
      );

      const data = res.data.data;

      // TODO display info nicely

      breedsListTemp.push({
        id: data.id,
        name: data.attributes.name,
        desc: data.attributes.description,
        avgLifeExpectancy:
          (data.attributes.life.min + data.attributes.life.max) / 2,
        avgFemaleWeight:
          (data.attributes.female_weight.min +
            data.attributes.female_weight.max) /
          2,
        avgMaleWeight:
          (data.attributes.male_weight.min + data.attributes.male_weight.max) /
          2,
      });
    }

    breedsListTemp.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      return 0;
    });

    setIsLoading(false);
    setBreedsList(breedsListTemp);
  };

  const fetchDog = async () => {
    const currentDog = breedsList.find((breed) => breed.id === dogInfo?.id);

    if (!currentDog) return console.log("Something is wrong...");

    const names = currentDog.name.trim().split(/\s+/);

    let dogImage: string = "";

    if (names.length === 1) {
      try {
        const res = await axios.get(
          `https://dog.ceo/api/breed/${currentDog.name.toLowerCase()}/images/random`
        );

        dogImage = res.data.message;
      } catch (error) {
        return setDogInfo({ ...currentDog, image: false });
      }
    } else if (names.length === 2) {
      try {
        const res = await axios.get(
          `https://dog.ceo/api/breed/${names[1].toLowerCase()}/${names[0].toLowerCase()}/images/random`
        );

        dogImage = res.data.message;
      } catch (error: any) {
        return setDogInfo({ ...currentDog, image: false });
      }
    } else return setDogInfo({ ...currentDog, image: false });

    setDogInfo({ ...currentDog, image: dogImage });
  };
  console.log(breedsList);

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
                    key={breed.id}
                    onClick={() => {
                      setDogInfo({ id: breed.id });
                    }}
                  >
                    {breed.name}
                  </option>
                ))}
              </Input>
              <Button onClick={fetchDog}>Find dog!</Button>
            </FormGroup>
          </FormGroup>
        )}
      </Card>
      {dogInfo?.name && (
        <RandomDog
          info={{
            name: dogInfo.name,
            life: dogInfo.avgLifeExpectancy!,
            mWeight: dogInfo.avgMaleWeight!,
            fWeight: dogInfo.avgFemaleWeight!,
            image: dogInfo.image!,
            description: dogInfo.desc!,
          }}
        />
      )}
    </>
  );
};

export default Form;
