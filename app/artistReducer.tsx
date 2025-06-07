import { createContext, useContext, useReducer } from "react";

export type ArtistAction = {
  type: string;
};

export type Artist = {
  visible: boolean;
};

const initialArtist: Artist = { visible: false };
const ArtistContext = createContext(initialArtist);
const ArtistDispatchContext = createContext(null);

export function ArtistProvider({ children }: { children: React.ReactNode }) {
  const [artist, dispatch] = useReducer(artistReducer, initialArtist);

  return (
    <ArtistContext value={artist}>
      <ArtistDispatchContext value={dispatch}>{children}</ArtistDispatchContext>
    </ArtistContext>
  );
}

export function useArtist() {
  return useContext(ArtistContext);
}

export function useArtistDispatch() {
  return useContext(ArtistDispatchContext);
}

export function artistReducer(state: Artist, action: ArtistAction) {
  if (action.type === "thumbsVisible") {
    return {
      ...state,
      visible: state.visible === true ? false : true,
    };
  }
  throw Error("Unknown action.");
}
