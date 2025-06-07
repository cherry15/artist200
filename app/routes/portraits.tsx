import { WorkTypes } from "~/works/data";
import { Thumbnails } from "~/works/thumbnails";
import { Works } from "~/works/works";
import { useArtist } from "~/artistReducer";

export default function Portraits() {
  const artist = useArtist();
  return (
    <>
      <h1 className="text-stone-400">Portraits</h1>
      {!artist.visible && <Works workType={WorkTypes.portrait} />}
      {artist.visible && <Thumbnails workType={WorkTypes.portrait} />}
    </>
  );
}
