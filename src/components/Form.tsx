import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
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

import styles from "./Form.module.css";

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

  const fetchBreeds = async (id: string, event: React.SyntheticEvent) => {
    event.preventDefault();

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

  return (
    <>
      <div className={styles.card}>
        <form className={styles.card_form__group}>
          <label htmlFor="breed group" className={styles.card_form__label}>
            Breed group:
          </label>
          {groups.length === 0 && (
            <div style={{ textAlign: "center" }}>
              <Spinner className={styles.spinner} />
            </div>
          )}
          {groups.length > 0 && (
            <ul className={styles.card_form__list}>
              {groups.map(({ id, name }) => (
                <li key={id}>
                  <Button
                    type="submit"
                    onClick={(event) => fetchBreeds(id, event)}
                  >
                    {name}
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </form>
        {isLoading && (
          <div style={{ textAlign: "center" }}>
            <Spinner className={styles.spinner} />
          </div>
        )}
        {breedsList.length > 0 && (
          <form className={styles.card_form}>
            <label htmlFor="selectBreed" className={styles.card_form__label}>
              Select from {chosenGroup}:
            </label>
            <select className={styles.card_form__select} id="selectBreed">
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
            </select>
            <Button className={styles.card__btn} onClick={fetchDog}>
              Find dog!
            </Button>
          </form>
        )}
      </div>
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
