import { type ArtWork } from "./data";

interface ArtWorkProps {
  item: ArtWork;
  border?: boolean;
  details?: boolean;
}

export const Work: React.FC<ArtWorkProps> = ({ item, border, details }) => {
  const path1000 = "/ims-1000/";
  const borderClass = border === undefined ? "border border-stone-200 p-4" : "";
  const showDetails: boolean = details === undefined ? true : false;

  return (
    <div className={borderClass}>
      <div className="md:w-[550px]">
        <img alt={item.name} src={`${path1000}${item.url}`} />
      </div>
      {showDetails && (
        <>
          <p className="text-stone-900">{item.name}</p>
          <p className="text-stone-400 text-sm">{`${item.medium}, ${item.size}`}</p>
        </>
      )}
    </div>
  );
};
