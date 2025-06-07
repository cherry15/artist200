import { useEffect, useState } from "react";
import "./menu.css";
import { NavLink } from "react-router";

export default function Menu() {
  const mainLinks = [
    { name: "Home", url: "/" },
    { name: "Landscapes", url: "/landscapes" },
    { name: "Portraits", url: "/portraits" },
    { name: "Charcoal", url: "/charcoals" },
  ];
  const [mainMenuVisible, setMainMenuVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(700);
  const mediumBP = 768;

  if (typeof window !== "undefined") {
    useEffect(() => {
      setWindowWidth(window.innerWidth);
    });
  }

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMainMenu = () => {
    mainMenuVisible ? setMainMenuVisible(false) : setMainMenuVisible(true);
  };
  return (
    <>
      { (windowWidth < mediumBP) &&
        <svg
          height="25px"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          id="hamburger-icon"
          onClick={toggleMainMenu}
          className={mainMenuVisible ? "cross" : ""}
        >
          <path
            d="M7.94977 11.9498H39.9498"
            stroke="#a8a29e"
            strokeWidth="4px"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.94977 23.9498H39.9498"
            stroke="#a8a29e"
            strokeWidth="4px"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.94977 35.9498H39.9498"
            stroke="#a8a29e"
            strokeWidth="4px"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      }
      {(mainMenuVisible || windowWidth > mediumBP) && (
        <nav
          className="
        absolute 
        top-0 
        left-0
        w-full 
        h-screen 
        grid 
        grid-col 
        place-items-center 
        bg-slate-900 
        z-10
        m-0
        md:relative 
        md:w-auto 
        md:h-auto
        md:bg-white
        md:place-items-start
        md:mt-10
        md:mb-20
        "
        >
          {mainLinks.map((mainLink) => (
            <NavLink
              key={mainLink.name}
              to={mainLink.url}
              className={({ isActive }) =>
                isActive
                  ? "text-white md:text-stone-400"
                  : "text-stone-300 hover:text-yellow-200"
              }
              onClick={toggleMainMenu}
            >
              {mainLink.name}
            </NavLink>
          ))}
        </nav>
      )}
    </>
  );
}
