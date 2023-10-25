import axios from "axios";
import { useEffect } from "react";
import { Button } from "reactstrap";

const Form = () => {
  const getBreeds = async () => {
    const res = await axios.get("https://dogapi.dog/api/v2/breeds");

    console.log(res.data.data);
    for (let i = 0; i < res.data.data.length; i++) {
      console.log(res.data.data[i].attributes.name);
    }
  };

  useEffect(() => {
    // getBreeds();
  }, []);

  return (
    <form>
      <label></label>
      <input name="" type="text" />
      <Button>Search for dog</Button>
    </form>
  );
};

export default Form;
