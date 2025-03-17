import { navigate } from "astro:transitions/client";
import { Haiku } from "../components/Haiku";
import haikus from "../const/haikus.json";
import styles from "./Detail.module.scss";

export const Detail = ({ id }: { id: string }) => {
  const haiku = haikus.find((h) => h.id === Number(id));
  if (!haiku) {
    navigate(`${import.meta.env.BASE_URL}`);
    return <></>;
  }
  return (
    <main>
      <div className={styles.block}>
        <Haiku haiku={haiku} size="xl" detailed />
      </div>
    </main>
  );
};

export default Detail;
