import { useNavigate } from "react-router";
import { getWorksByType } from "./data";
import type { ArtWork } from "./data";
import './works.css'

interface ArtWorksProps {
  workType: string;
}

export const Thumbnails: React.FC<ArtWorksProps> = ({ workType }) => {
  const works = getWorksByType(workType);
  const path = "/ims-120/";
  let navigate = useNavigate()

  const getDetails = (work: ArtWork) => {
    navigate(`/${workType}/${work.uri}`);
  };

  return (
    <>
      {works.length ? (
        <div className="grid grid-cols-3 gap-4 justify-stretch md:grid-cols-4 cursor-pointer lg:grid-cols-5">
          {works.map((work: ArtWork) => (
            <div key={work.id}>
              <img alt={work.name} src={`${path}${work.url}`} onClick={() => getDetails(work)} />
            </div>
          ))}
        </div>
      ) : (
        <p>
          <i>No works</i>
        </p>
      )}
    </>
  );
};
