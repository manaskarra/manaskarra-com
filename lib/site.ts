export const site = {
  name: "Manas Karra",
  handle: "manaskarra",
  producerHandle: "sledg3r",
  location: "Dubai",
  tagline: "manaskarra",
  description:
    "Personal site of Manas Karra. I build AI products, poke at research, and make hip-hop beats as sledg3r.",
  url: "https://manaskarra.com",
  twitter: "@manaskarra",
  lastfmUser: "manask_",
  nav: [
    { href: "/", label: "home" },
    { href: "/about", label: "about" },
    { href: "/blog", label: "blog" },
    { href: "/projects", label: "projects" },
  ],
  social: [
    { label: "resume", href: "/resume" },
    { label: "github", href: "https://github.com/manaskarra" },
    { label: "x", href: "https://x.com/manaskarra" },
    { label: "instagram", href: "https://www.instagram.com/sledg3r" },
    { label: "youtube", href: "https://www.youtube.com/@sledg3r" },
    { label: "beatstars", href: "https://www.beatstars.com/sledg3r" },
  ],
  emails: {
    primary: "manas.karra@gmail.com",
    beats: "prodbysledg3r@gmail.com",
  },
} as const;
