import type { Route } from "./+types/home";
import { Work } from "~/works/work";
import { works } from "../works/data";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Artist 200" },
    { name: "description", content: "Artist Cheryl Collier displays her work" },
  ];
}

export default function Home() {
    return (
      <>
      <Work item={works[3]} border={false} />
      </>
    )
}
