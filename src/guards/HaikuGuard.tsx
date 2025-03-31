import { navigate } from "astro:transitions/client";
import { useStore } from "@nanostores/react";
import { data } from "../store/Data";
import { useEffect } from "react";

export default function HaikuGuard({ id }: { id: string }) {
  const haikus = useStore(data);

  useEffect(() => {
    if (haikus.length === 0) return;
    const visibleHaikus = haikus.filter((h) => h.show);
    if (id === "random") {
      const randomIndex = Math.floor(Math.random() * visibleHaikus.length);
      navigate(`/${visibleHaikus[randomIndex].id}`);
      return;
    }
    if (!visibleHaikus.find((h) => h.id === Number(id))) {
      navigate("/");
    }
  }, [id, haikus]);

  return <></>;
}
