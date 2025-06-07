import { getWorkByUri} from "~/works/data";
import type { Route } from "./+types/portrait";
import { Work } from "~/works/work";

export async function loader({ params }: Route.LoaderArgs) {
  const portriat = getWorkByUri(params.uri);
  if (!portriat) {
    throw new Response("Not Found", { status: 404 });
  }
  return { portriat };
}

export default function Portriat({ loaderData }: Route.ComponentProps) {
  const { portriat } = loaderData;
  return (
    <>
      <Work item={portriat} border={false}/>
    </>
  );
}
