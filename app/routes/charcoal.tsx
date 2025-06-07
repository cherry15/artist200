import { getWorkByUri} from "~/works/data";
import type { Route } from "./+types/charcoal";
import { Work } from "~/works/work";

export async function loader({ params }: Route.LoaderArgs) {
  const charcoal = getWorkByUri(params.uri);
  if (!charcoal) {
    throw new Response("Not Found", { status: 404 });
  }
  return { charcoal };
}

export default function charcoal({ loaderData }: Route.ComponentProps) {
  const { charcoal } = loaderData;
  return (
    <>
      <Work item={charcoal} border={false}/>
    </>
  );
}
