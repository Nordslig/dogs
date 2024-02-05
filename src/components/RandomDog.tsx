import styles from "./RandomDog.module.css";

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
    <div className={styles.card}>
      <div className={styles.info}>
        <h2>{name}</h2>
        <p>{description}</p>
        <div className={styles.info_stats}>
          <p>
            Average length of life: <span>{life}</span>
          </p>
          <p>
            Male weight: <span>{mWeight} kg</span>
          </p>
          <p>
            Female weight: <span>{fWeight} kg</span>{" "}
          </p>
        </div>
      </div>
      <div>
        {image && (
          <img
            src={image}
            className={styles.dogImage}
            alt={`${name} dog breed`}
          />
        )}
        {!image && (
          <div className={styles.absentDogImage}>
            <p>
              There are not any pictures of {name}. If you own one, you can send
              image{" "}
              <a
                rel="noreferrer"
                target="_blank"
                href="https://github.com/jigsawpieces/dog-api-images#dog-api-images"
              >
                here
              </a>{" "}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RandomDog;
