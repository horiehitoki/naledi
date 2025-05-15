import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Naledi",
    short_name: "Naledi",
    description: "Naledi is an AT Protocol web client with emoji reactions.",
    start_url: "/home",
    display: "standalone",
    background_color: "#fff",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
      },
    ],
  };
}
