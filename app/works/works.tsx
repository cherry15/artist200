import { useNavigate } from "react-router";
import { getWorksByType } from "./data";
import type { ArtWork } from "./data";
import "./works.css";

interface ArtWorksProps {
  workType: string;
  showThumbs?: boolean;
}

export const Works: React.FC<ArtWorksProps> = ({ workType, showThumbs }) => {
  const works = getWorksByType(workType);
  const path1000 = "/ims-1000/";
  let navigate = useNavigate();

  const getDetails = (work: ArtWork) => {
    navigate(`/${workType}/${work.uri}`);
  };

  return (
    <>
      {works.length ? (
        <div className="works-slides-container">
          {works.map((work: ArtWork) => (
            <div
              key={work.id}
              className="works-slide w-[350px] h-[340px] md:w-[500px] md:h-[490px]"
            >
              <img
                alt={work.name}
                src={`${path1000}${work.url}`}
                onClick={() => getDetails(work)}
              />
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
