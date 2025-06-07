import { WorkTypes } from "~/works/data";
import { Thumbnails } from "~/works/thumbnails";
import { Works } from "~/works/works";
import { useArtist } from "~/artistReducer";

export default function Charcoals() {
  const artist = useArtist();
  return (
    <>
      <h1 className="text-stone-400">Charcoal</h1>
      {!artist.visible && <Works workType={WorkTypes.charcoal}/>}
      {artist.visible && <Thumbnails workType={WorkTypes.charcoal} />}
    </>
  );
}
