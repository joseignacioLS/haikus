import { navigate } from "astro:transitions/client";
import haikus from "../const/haikus.json";

export default function HaikuGuard({ id }: { id: string }) {
  const visibleHaikus = haikus.filter((h) => !h.hide);
  if (id === "random") {
    const randomIndex = Math.floor(Math.random() * visibleHaikus.length);
    navigate(`${import.meta.env.BASE_URL}${visibleHaikus[randomIndex].id}`);
    return;
  }

  return <></>;
}
