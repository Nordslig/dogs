import { Card, CardBody, CardHeader } from "reactstrap";

interface RandomDogProps {
  info: {
    name: string;
    description: string;
    mWeight: number;
    fWeight: number;
    life: number;
    image: string | false;
  };
}

const RandomDog = ({ info }: RandomDogProps) => {
  const { name, description, mWeight, fWeight, life, image } = info;

  return (
    <Card>
      <CardHeader>Found dog:</CardHeader>
      <CardBody>
        <h2>{name}</h2>
        <p>{description}</p>
        <Card>
          <CardHeader>Info:</CardHeader>
          <CardBody>
            <div>
              <h3>Average length of life: {life}</h3>
              <h3>Weight:</h3>
              <p>Male: {mWeight} kg</p>
              <p>Female: {fWeight} kg</p>
            </div>
          </CardBody>
        </Card>
        {image && <img src={image} />}
        {!image && (
          <p>
            Sorry, there aren't any pictures of {name}. If you own one, you can
            send image{" "}
            <a
              target="_blank"
              href="https://github.com/jigsawpieces/dog-api-images#dog-api-images"
            >
              here
            </a>{" "}
          </p>
        )}
      </CardBody>
    </Card>
  );
};

export default RandomDog;
