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

  const [dogInfo, setDogImage] = useState<{
    name: string;
    desc: string;
    image?: string;
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

  const breedRef = useRef<string | null>("");

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

    const breeds = response.data.data.relationships.breeds.data;

    const breedsListTemp: string[] = [];

    for (let i = 0; i < breeds.length; i++) {
      const breed = breeds[i];

      const res = await axios.get(
        `https://dogapi.dog/api/v2/breeds/${breed.id}`
      );

      breedsListTemp.push(res.data.data.attributes.name);
    }

    breedsListTemp.sort();
    setIsLoading(false);
    setBreedsList(breedsListTemp);
  };

  const fetchDog = async () => {
    const res = await axios.get(
      `https://dog.ceo/api/breed/hound/afghan/images/random`
    );

    // console.log(res);
    // setDogImage({name:})
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
                  <option key={breed}>{breed}</option>
                ))}
              </Input>
              <Button onClick={fetchDog}>Find dog!</Button>
            </FormGroup>
          </FormGroup>
        )}
      </Card>
      {dogInfo?.name && <FoundDog />}
    </>
  );
};

export default Form;
