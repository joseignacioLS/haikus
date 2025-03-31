import { navigate } from "astro:transitions/client";
import { useStore } from "@nanostores/react";
import { data } from "../store/Data";

export default function HaikuGuard({ id }: { id: string }) {
  const haikus = useStore(data);
  const visibleHaikus = haikus.filter((h) => h.show);
  if (id === "random") {
    const randomIndex = Math.floor(Math.random() * visibleHaikus.length);
    navigate(`${import.meta.env.BASE_URL}${visibleHaikus[randomIndex].id}`);
  }

  return <></>;
}
