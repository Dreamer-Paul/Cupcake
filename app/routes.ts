import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/app-layout.tsx", [
    index("routes/index.tsx"),
    route("note", "routes/note.tsx"),
    route("note/:year/:id", "routes/note-detail.tsx"),
    route("gallery/*", "routes/gallery.tsx"),
    route("*", "routes/page.tsx"),
  ]),
] satisfies RouteConfig;
