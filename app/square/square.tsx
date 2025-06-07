import { useArtistDispatch } from "~/artistReducer";

export default function Square() {
  interface Coord {
    x: number;
    y: number;
    id: number;
  }
  const coords = [
    { x: 0, y: 0, id: 1 },
    { x: 12, y: 0, id: 2 },
    { x: 0, y: 14, id: 3 },
    { x: 12, y: 14, id: 4 },
  ];

  const dispatch = useArtistDispatch();
  
  const toggleThumbs = () => {
    dispatch({ type: "thumbsVisible" })
  }
  return (
    <div
      className="absolute right-[3rem] cursor-pointer md:relative md:top-auto md:right-auto"
      onClick={() => {toggleThumbs()}}
    >
      <svg width="26" height="26" xmlns="http://www.w3.org/2000/svg">
        {coords.map((coord: Coord) => (
          <rect
            key={coord.id}
            x={coord.x}
            y={coord.y}
            width="10"
            height="10"
            style={{ fill: "rgb(183, 183, 189)" }}
          />
        ))}
      </svg>
    </div>
  );
}
