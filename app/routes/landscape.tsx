import { getWorkByUri} from "~/works/data";
import type { Route } from "./+types/landscape";
import { Work } from "~/works/work";

export async function loader({ params }: Route.LoaderArgs) {
  const landscape = getWorkByUri(params.uri);
  if (!landscape) {
    throw new Response("Not Found", { status: 404 });
  }
  return { landscape };
}

export default function Landscape({ loaderData }: Route.ComponentProps) {
  const { landscape } = loaderData;
  return (
    <>
      <Work item={landscape} border={false}/>
    </>
  );
}
