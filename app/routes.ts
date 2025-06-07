import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("landscapes", "routes/landscapes.tsx"),
    route("landscapes/:uri", "routes/landscape.tsx"),
    route("portraits", "routes/portraits.tsx"),
    route("portraits/:uri", "routes/portrait.tsx"),
    route("charcoals", "routes/charcoals.tsx"),
    route("charcoals/:uri", "routes/charcoal.tsx"),

] satisfies RouteConfig;
