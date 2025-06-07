import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, useRouteError, NavLink, Meta, Links, ScrollRestoration, Scripts, useLocation, Outlet, isRouteErrorResponse, useNavigate } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createElement, useState, useEffect, createContext, useContext, useReducer } from "react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
function Menu() {
  const mainLinks = [
    { name: "Home", url: "/" },
    { name: "Landscapes", url: "/landscapes" },
    { name: "Portraits", url: "/portraits" },
    { name: "Charcoal", url: "/charcoals" }
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
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    windowWidth < mediumBP && /* @__PURE__ */ jsxs(
      "svg",
      {
        height: "25px",
        viewBox: "0 0 48 48",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        id: "hamburger-icon",
        onClick: toggleMainMenu,
        className: mainMenuVisible ? "cross" : "",
        children: [
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M7.94977 11.9498H39.9498",
              stroke: "#a8a29e",
              strokeWidth: "4px",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M7.94977 23.9498H39.9498",
              stroke: "#a8a29e",
              strokeWidth: "4px",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M7.94977 35.9498H39.9498",
              stroke: "#a8a29e",
              strokeWidth: "4px",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          )
        ]
      }
    ),
    (mainMenuVisible || windowWidth > mediumBP) && /* @__PURE__ */ jsx(
      "nav",
      {
        className: "\r\n        absolute \r\n        top-0 \r\n        left-0\r\n        w-full \r\n        h-screen \r\n        grid \r\n        grid-col \r\n        place-items-center \r\n        bg-slate-900 \r\n        z-10\r\n        m-0\r\n        md:relative \r\n        md:w-auto \r\n        md:h-auto\r\n        md:bg-white\r\n        md:place-items-start\r\n        md:mt-10\r\n        md:mb-20\r\n        ",
        children: mainLinks.map((mainLink) => /* @__PURE__ */ jsx(
          NavLink,
          {
            to: mainLink.url,
            className: ({ isActive }) => isActive ? "text-white md:text-stone-400" : "text-stone-300 hover:text-yellow-200",
            onClick: toggleMainMenu,
            children: mainLink.name
          },
          mainLink.name
        ))
      }
    )
  ] });
}
const initialArtist = { visible: false };
const ArtistContext = createContext(initialArtist);
const ArtistDispatchContext = createContext(null);
function ArtistProvider({ children }) {
  const [artist, dispatch] = useReducer(artistReducer, initialArtist);
  return /* @__PURE__ */ jsx(ArtistContext, { value: artist, children: /* @__PURE__ */ jsx(ArtistDispatchContext, { value: dispatch, children }) });
}
function useArtist() {
  return useContext(ArtistContext);
}
function useArtistDispatch() {
  return useContext(ArtistDispatchContext);
}
function artistReducer(state, action) {
  if (action.type === "thumbsVisible") {
    return {
      ...state,
      visible: state.visible === true ? false : true
    };
  }
  throw Error("Unknown action.");
}
function Square() {
  const coords = [
    { x: 0, y: 0, id: 1 },
    { x: 12, y: 0, id: 2 },
    { x: 0, y: 14, id: 3 },
    { x: 12, y: 14, id: 4 }
  ];
  const dispatch = useArtistDispatch();
  const toggleThumbs = () => {
    dispatch({ type: "thumbsVisible" });
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "absolute right-[3rem] cursor-pointer md:relative md:top-auto md:right-auto",
      onClick: () => {
        toggleThumbs();
      },
      children: /* @__PURE__ */ jsx("svg", { width: "26", height: "26", xmlns: "http://www.w3.org/2000/svg", children: coords.map((coord) => /* @__PURE__ */ jsx(
        "rect",
        {
          x: coord.x,
          y: coord.y,
          width: "10",
          height: "10",
          style: { fill: "rgb(183, 183, 189)" }
        },
        coord.id
      )) })
    }
  );
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = withComponentProps(function App() {
  useLocation();
  return /* @__PURE__ */ jsx(ArtistProvider, {
    children: /* @__PURE__ */ jsxs("div", {
      className: "flex flex-col md:flex-row",
      children: [/* @__PURE__ */ jsxs("header", {
        className: "flex pt-4 pb-4 pl-8 pr-8 h-[100px] md:h-auto md:w-[200px] md:flex-row md:content-start md:flex-wrap",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex-1",
          children: [/* @__PURE__ */ jsx("p", {
            className: "uppercase font-serif text-stone-400 text-[2rem]",
            children: "Artist200"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-stone-300 italic text-sm",
            children: "Cheryl Collier"
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex-1",
          children: [/* @__PURE__ */ jsx(Menu, {}), /* @__PURE__ */ jsx(Square, {})]
        })]
      }), /* @__PURE__ */ jsx("main", {
        className: "px-8 pt-2 overflow-hidden md:pt-4",
        children: /* @__PURE__ */ jsx(Outlet, {})
      })]
    })
  });
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const WorkTypes = {
  portrait: "portraits",
  landscape: "landscapes",
  charcoal: "charcoals",
  stillLife: "still life"
};
const works = [
  {
    id: 1,
    name: "Fluffy Flowers",
    uri: "fluffy-flowers",
    type: WorkTypes.landscape,
    size: "60cm x 60cm",
    url: "im1.jpg",
    medium: "Acrylic on canvas",
    show: true
  },
  {
    id: 2,
    name: "Kitchen and me",
    uri: "kitchen-and-me",
    type: WorkTypes.portrait,
    size: "40cm x 60cm",
    url: "im2.jpg",
    medium: "Acrylic on canvas",
    show: true
  },
  {
    id: 3,
    name: "Affordable Insulation",
    uri: "affordable-insulation",
    type: WorkTypes.portrait,
    size: "40cm x 60cm",
    url: "im3.jpg",
    medium: "Acrylic on canvas",
    show: true
  },
  {
    id: 4,
    name: "Autumn in Wythenshawe",
    uri: "autumn-in-wythenshawe",
    type: WorkTypes.landscape,
    size: "60cm x 40cm",
    url: "im4.jpg",
    medium: "Acrylic on canvas",
    show: true
  },
  {
    id: 5,
    name: "Seaworms and me",
    uri: "seaworms-and-me",
    type: WorkTypes.portrait,
    size: "40cm x 60cm",
    url: "im5.jpg",
    medium: "Acrylic on canvas",
    show: true
  },
  {
    id: 6,
    name: "Lobsang and coloured shapes",
    uri: "lobsang-and-coloured-shapes",
    type: WorkTypes.portrait,
    size: "60cm x 60cm",
    url: "im6.jpg",
    medium: "Acrylic on canvas",
    show: true
  },
  {
    id: 7,
    name: "Old curtain and me",
    uri: "old-curtain-and-me",
    type: WorkTypes.portrait,
    size: "40cm x 60cm",
    url: "im7.jpg",
    medium: "Acrylic on canvas",
    show: true
  },
  {
    id: 8,
    name: "Echo in the bedroom",
    uri: "echo-in-the-bedroom",
    type: WorkTypes.landscape,
    size: "40cm x 30cm",
    url: "im8.jpg",
    medium: "Acrylic on canvas",
    show: true
  },
  {
    id: 9,
    name: "Cliffs Carlin How",
    uri: "cliffs-carlin-how",
    type: WorkTypes.landscape,
    size: "30cm x 30cm",
    url: "im9.jpg",
    medium: "Acrylic on board",
    show: true
  },
  {
    id: 10,
    name: "View from the window",
    uri: "view-from-the-window",
    type: WorkTypes.landscape,
    size: "40cm x 30cm",
    url: "im10.jpg",
    medium: "Acrylic on paper",
    show: true
  },
  {
    id: 11,
    name: "Tulips",
    uri: "tulips",
    type: WorkTypes.stillLife,
    size: "40cm x 60cm",
    url: "im11.jpg",
    medium: "Acrylic on paper",
    show: true
  },
  {
    id: 12,
    name: "Ruby",
    uri: "ruby",
    type: WorkTypes.charcoal,
    size: "30cm x 40cm",
    url: "im12.jpg",
    medium: "Charcoal on paper",
    show: true
  },
  {
    id: 13,
    name: "Houses on the hill",
    uri: "houses-on-the-hill",
    type: WorkTypes.landscape,
    size: "90cm x 90cm",
    url: "im13.jpg",
    medium: "Acrylic on canvas",
    show: true
  },
  {
    id: 14,
    name: "House on the hill",
    uri: "house-on-the-hill",
    type: WorkTypes.landscape,
    size: "40cm x 30cm",
    url: "im14.jpg",
    medium: "Acrylic on canvas",
    show: true
  },
  {
    id: 15,
    name: "Mum",
    uri: "mum",
    type: WorkTypes.charcoal,
    size: "30cm x 40cm",
    url: "im15.jpg",
    medium: "Charcoal on paper",
    show: true
  },
  {
    id: 16,
    name: "Person",
    uri: "person",
    type: WorkTypes.charcoal,
    size: "30cm x 40cm",
    url: "im16.jpg",
    medium: "Charcoal on paper",
    show: true
  },
  {
    id: 17,
    name: "Person two",
    uri: "person-two",
    type: WorkTypes.charcoal,
    size: "30cm x 40cm",
    url: "im17.jpg",
    medium: "Charcoal on paper",
    show: true
  },
  {
    id: 18,
    name: "Person four",
    uri: "person-four",
    type: WorkTypes.charcoal,
    size: "30cm x 40cm",
    url: "im18.jpg",
    medium: "Charcoal on paper",
    show: true
  },
  {
    id: 19,
    name: "Person five",
    uri: "person-five",
    type: WorkTypes.charcoal,
    size: "30cm x 40cm",
    url: "im19.jpg",
    medium: "Charcoal on paper",
    show: true
  },
  {
    id: 20,
    name: "Person six",
    uri: "person-six",
    type: WorkTypes.charcoal,
    size: "30cm x 40cm",
    url: "im20.jpg",
    medium: "Charcoal on paper",
    show: true
  },
  {
    id: 21,
    name: "Person seven",
    uri: "person-seven",
    type: WorkTypes.charcoal,
    size: "30cm x 40cm",
    url: "im21.jpg",
    medium: "Charcoal on paper",
    show: true
  },
  {
    id: 22,
    name: "Wild flowers",
    uri: "wild-flowers",
    type: WorkTypes.landscape,
    size: "50cm x 60cm",
    url: "im22.jpg",
    medium: "Acrylic on canvas",
    show: true
  },
  {
    id: 23,
    name: "Wild flowers v2",
    uri: "wild-flowers-v2",
    type: WorkTypes.landscape,
    size: "60cm x 60cm",
    url: "im23.jpg",
    medium: "Acrylic on canvas",
    show: true
  },
  {
    id: 24,
    name: "Cath Carlin",
    uri: "cath-carlin",
    type: WorkTypes.portrait,
    size: "40cm x 60cm",
    url: "im24.jpg",
    medium: "Acrylic on canvas",
    show: true
  },
  {
    id: 25,
    name: "Ruby v2",
    uri: "ruby-v2",
    type: WorkTypes.portrait,
    size: "40cm x 60cm",
    url: "im25.jpg",
    medium: "Acrylic on canvas",
    show: true
  },
  {
    id: 26,
    name: "Cliff Skinningrove",
    uri: "cliff-skinningrove",
    type: WorkTypes.landscape,
    size: "40cm x 30cm",
    url: "im26.jpg",
    medium: "Acrylic on canvas",
    show: true
  },
  {
    id: 27,
    name: "Carlin How",
    uri: "carlin-how",
    type: WorkTypes.landscape,
    size: "40cm x 30cm",
    url: "im27.jpg",
    medium: "Acrylic on canvas",
    show: true
  },
  {
    id: 28,
    name: "Carlin How v2",
    uri: "carlin-how-v2",
    type: WorkTypes.landscape,
    size: "40cm x 30cm",
    url: "im28.jpg",
    medium: "Acrylic on canvas",
    show: true
  },
  {
    id: 29,
    name: "Carlin How v3",
    uri: "carlin-how-v3",
    type: WorkTypes.landscape,
    size: "40cm x 30cm",
    url: "im29.jpg",
    medium: "Acrylic on canvas",
    show: true
  },
  {
    id: 30,
    name: "Carlin How v4",
    uri: "carlin-how-v4",
    type: WorkTypes.landscape,
    size: "40cm x 30cm",
    url: "im30.jpg",
    medium: "Acrylic on canvas",
    show: true
  },
  {
    id: 31,
    name: "Carlin How v5",
    uri: "carlin-how-v5",
    type: WorkTypes.landscape,
    size: "40cm x 30cm",
    url: "im31.jpg",
    medium: "Acrylic on canvas",
    show: true
  },
  {
    id: 32,
    name: "Wythenshawe",
    uri: "wythenshawe",
    type: WorkTypes.landscape,
    size: "40cm x 30cm",
    url: "im32.jpg",
    medium: "Acrylic on canvas",
    show: true
  },
  {
    id: 33,
    name: "Saltburn",
    uri: "saltburn",
    type: WorkTypes.landscape,
    size: "40cm x 30cm",
    url: "im33.jpg",
    medium: "Acrylic on canvas",
    show: true
  },
  {
    id: 34,
    name: "Carlin How v7",
    uri: "carlin-how-v7",
    type: WorkTypes.landscape,
    size: "40cm x 30cm",
    url: "im34.jpg",
    medium: "Acrylic on canvas",
    show: true
  },
  {
    id: 35,
    name: "Carlin How v8",
    uri: "carlin-how-v8",
    type: WorkTypes.landscape,
    size: "40cm x 30cm",
    url: "im35.jpg",
    medium: "Acrylic on paper",
    show: true
  },
  {
    id: 36,
    name: "Carlin How v9",
    uri: "carlin-how-v9",
    type: WorkTypes.landscape,
    size: "40cm x 30cm",
    url: "im36.jpg",
    medium: "Acrylic on paper",
    show: true
  },
  {
    id: 37,
    name: "Carlin How v10",
    uri: "carlin-how-v10",
    type: WorkTypes.landscape,
    size: "40cm x 30cm",
    url: "im37.jpg",
    medium: "Acrylic on paper",
    show: true
  },
  {
    id: 38,
    name: "Carlin How v11",
    uri: "carlin-how-v11",
    type: WorkTypes.landscape,
    size: "40cm x 30cm",
    url: "im38.jpg",
    medium: "Acrylic on paper",
    show: true
  },
  {
    id: 39,
    name: "Carlin How v12",
    uri: "carlin-how-v12",
    type: WorkTypes.landscape,
    size: "40cm x 30cm",
    url: "im39.jpg",
    medium: "Acrylic on paper",
    show: true
  },
  {
    id: 40,
    name: "Carlin How v13",
    uri: "carlin-how-v13",
    type: WorkTypes.landscape,
    size: "40cm x 30cm",
    url: "im40.jpg",
    medium: "Acrylic on canvas",
    show: true
  },
  {
    id: 41,
    name: "Carlin How v14",
    uri: "carlin-how-v14",
    type: WorkTypes.landscape,
    size: "40cm x 30cm",
    url: "im41.jpg",
    medium: "Acrylic on canvas",
    show: true
  },
  {
    id: 42,
    name: "Flowers v2",
    uri: "flowers-v2",
    type: WorkTypes.stillLife,
    size: "30cm x 40cm",
    url: "im42.jpg",
    medium: "Acrylic on canvas",
    show: true
  }
];
const getWorksByType = (workType) => {
  return works.filter((obj) => obj.type === workType).map((obj) => obj);
};
const getWorkByUri = (workUri) => {
  return works.find((obj) => obj.uri === workUri);
};
const Work = ({ item, border, details }) => {
  const path1000 = "/ims-1000/";
  const borderClass = border === void 0 ? "border border-stone-200 p-4" : "";
  const showDetails = details === void 0 ? true : false;
  return /* @__PURE__ */ jsxs("div", { className: borderClass, children: [
    /* @__PURE__ */ jsx("div", { className: "md:w-[550px]", children: /* @__PURE__ */ jsx("img", { alt: item.name, src: `${path1000}${item.url}` }) }),
    showDetails && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { className: "text-stone-900", children: item.name }),
      /* @__PURE__ */ jsx("p", { className: "text-stone-400 text-sm", children: `${item.medium}, ${item.size}` })
    ] })
  ] });
};
function meta({}) {
  return [{
    title: "Artist 200"
  }, {
    name: "description",
    content: "Artist Cheryl Collier displays her work"
  }];
}
const home = withComponentProps(function Home() {
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsx(Work, {
      item: works[3],
      border: false
    })
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const Thumbnails = ({ workType }) => {
  const works2 = getWorksByType(workType);
  const path = "/ims-120/";
  let navigate = useNavigate();
  const getDetails = (work) => {
    navigate(`/${workType}/${work.uri}`);
  };
  return /* @__PURE__ */ jsx(Fragment, { children: works2.length ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-4 justify-stretch md:grid-cols-4 cursor-pointer lg:grid-cols-5", children: works2.map((work) => /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("img", { alt: work.name, src: `${path}${work.url}`, onClick: () => getDetails(work) }) }, work.id)) }) : /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("i", { children: "No works" }) }) });
};
const Works = ({ workType, showThumbs }) => {
  const works2 = getWorksByType(workType);
  const path1000 = "/ims-1000/";
  let navigate = useNavigate();
  const getDetails = (work) => {
    navigate(`/${workType}/${work.uri}`);
  };
  return /* @__PURE__ */ jsx(Fragment, { children: works2.length ? /* @__PURE__ */ jsx("div", { className: "works-slides-container", children: works2.map((work) => /* @__PURE__ */ jsx(
    "div",
    {
      className: "works-slide w-[350px] h-[340px] md:w-[500px] md:h-[490px]",
      children: /* @__PURE__ */ jsx(
        "img",
        {
          alt: work.name,
          src: `${path1000}${work.url}`,
          onClick: () => getDetails(work)
        }
      )
    },
    work.id
  )) }) : /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("i", { children: "No works" }) }) });
};
const landscapes = withComponentProps(function Landscapes() {
  const artist = useArtist();
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx("h1", {
      className: "text-stone-400",
      children: "Landscapes"
    }), !artist.visible && /* @__PURE__ */ jsx(Works, {
      workType: WorkTypes.landscape
    }), artist.visible && /* @__PURE__ */ jsx(Thumbnails, {
      workType: WorkTypes.landscape
    })]
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: landscapes
}, Symbol.toStringTag, { value: "Module" }));
async function loader$2({
  params
}) {
  const landscape2 = getWorkByUri(params.uri);
  if (!landscape2) {
    throw new Response("Not Found", {
      status: 404
    });
  }
  return {
    landscape: landscape2
  };
}
const landscape = withComponentProps(function Landscape({
  loaderData
}) {
  const {
    landscape: landscape2
  } = loaderData;
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsx(Work, {
      item: landscape2,
      border: false
    })
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: landscape,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
const portraits = withComponentProps(function Portraits() {
  const artist = useArtist();
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx("h1", {
      className: "text-stone-400",
      children: "Portraits"
    }), !artist.visible && /* @__PURE__ */ jsx(Works, {
      workType: WorkTypes.portrait
    }), artist.visible && /* @__PURE__ */ jsx(Thumbnails, {
      workType: WorkTypes.portrait
    })]
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: portraits
}, Symbol.toStringTag, { value: "Module" }));
async function loader$1({
  params
}) {
  const portriat = getWorkByUri(params.uri);
  if (!portriat) {
    throw new Response("Not Found", {
      status: 404
    });
  }
  return {
    portriat
  };
}
const portrait = withComponentProps(function Portriat({
  loaderData
}) {
  const {
    portriat
  } = loaderData;
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsx(Work, {
      item: portriat,
      border: false
    })
  });
});
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: portrait,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
const charcoals = withComponentProps(function Charcoals() {
  const artist = useArtist();
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx("h1", {
      className: "text-stone-400",
      children: "Charcoal"
    }), !artist.visible && /* @__PURE__ */ jsx(Works, {
      workType: WorkTypes.charcoal
    }), artist.visible && /* @__PURE__ */ jsx(Thumbnails, {
      workType: WorkTypes.charcoal
    })]
  });
});
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: charcoals
}, Symbol.toStringTag, { value: "Module" }));
async function loader({
  params
}) {
  const charcoal22 = getWorkByUri(params.uri);
  if (!charcoal22) {
    throw new Response("Not Found", {
      status: 404
    });
  }
  return {
    charcoal: charcoal22
  };
}
const charcoal = withComponentProps(function charcoal2({
  loaderData
}) {
  const {
    charcoal: charcoal22
  } = loaderData;
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsx(Work, {
      item: charcoal22,
      border: false
    })
  });
});
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: charcoal,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-Dk9qHdne.js", "imports": ["/assets/chunk-DQRVZFIR-C9NECug8.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-bkmB400t.js", "imports": ["/assets/chunk-DQRVZFIR-C9NECug8.js", "/assets/with-props-Da6b0gV-.js", "/assets/artistReducer-Cq3i9szn.js"], "css": ["/assets/root-CmGbuoGK.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-BGjkS0Os.js", "imports": ["/assets/with-props-Da6b0gV-.js", "/assets/chunk-DQRVZFIR-C9NECug8.js", "/assets/work-C1tuk2s7.js", "/assets/data-5Dx5_UxM.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/landscapes": { "id": "routes/landscapes", "parentId": "root", "path": "landscapes", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/landscapes-BhVEkPh1.js", "imports": ["/assets/with-props-Da6b0gV-.js", "/assets/chunk-DQRVZFIR-C9NECug8.js", "/assets/data-5Dx5_UxM.js", "/assets/works-BgjNDzRh.js", "/assets/artistReducer-Cq3i9szn.js"], "css": ["/assets/works-CtKDRcOL.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/landscape": { "id": "routes/landscape", "parentId": "root", "path": "landscapes/:uri", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/landscape-Do7AS43k.js", "imports": ["/assets/with-props-Da6b0gV-.js", "/assets/chunk-DQRVZFIR-C9NECug8.js", "/assets/work-C1tuk2s7.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/portraits": { "id": "routes/portraits", "parentId": "root", "path": "portraits", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/portraits-BS3TFpRr.js", "imports": ["/assets/with-props-Da6b0gV-.js", "/assets/chunk-DQRVZFIR-C9NECug8.js", "/assets/data-5Dx5_UxM.js", "/assets/works-BgjNDzRh.js", "/assets/artistReducer-Cq3i9szn.js"], "css": ["/assets/works-CtKDRcOL.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/portrait": { "id": "routes/portrait", "parentId": "root", "path": "portraits/:uri", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/portrait-BliLR8-P.js", "imports": ["/assets/with-props-Da6b0gV-.js", "/assets/chunk-DQRVZFIR-C9NECug8.js", "/assets/work-C1tuk2s7.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/charcoals": { "id": "routes/charcoals", "parentId": "root", "path": "charcoals", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/charcoals-ANM-J9Rx.js", "imports": ["/assets/with-props-Da6b0gV-.js", "/assets/chunk-DQRVZFIR-C9NECug8.js", "/assets/data-5Dx5_UxM.js", "/assets/works-BgjNDzRh.js", "/assets/artistReducer-Cq3i9szn.js"], "css": ["/assets/works-CtKDRcOL.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/charcoal": { "id": "routes/charcoal", "parentId": "root", "path": "charcoals/:uri", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/charcoal-BZnvWuPd.js", "imports": ["/assets/with-props-Da6b0gV-.js", "/assets/chunk-DQRVZFIR-C9NECug8.js", "/assets/work-C1tuk2s7.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-ecb4a0f7.js", "version": "ecb4a0f7", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/landscapes": {
    id: "routes/landscapes",
    parentId: "root",
    path: "landscapes",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/landscape": {
    id: "routes/landscape",
    parentId: "root",
    path: "landscapes/:uri",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/portraits": {
    id: "routes/portraits",
    parentId: "root",
    path: "portraits",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/portrait": {
    id: "routes/portrait",
    parentId: "root",
    path: "portraits/:uri",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/charcoals": {
    id: "routes/charcoals",
    parentId: "root",
    path: "charcoals",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/charcoal": {
    id: "routes/charcoal",
    parentId: "root",
    path: "charcoals/:uri",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
