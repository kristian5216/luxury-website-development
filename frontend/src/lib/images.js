// Centralized image architecture.
// Only the approved client photographs are used. No stock women, no AI substitutes.
// NOTE: Four approved portraits were supplied for Stage 1; they are reused intelligently
// across the seven editorial slots below.
// TODO-CODEX-CONTENT: Replace reused slots with IMAGE 05 (red suit, stool), IMAGE 06
// (olive-green top) and IMAGE 07 (red suit, seated) once the client supplies the files.

const P01_BLACK = "/brand/img01-black.png"; // IMAGE 01 — black tailored outfit
const P02_BROWN = "/brand/img02-brown-seated.png"; // IMAGE 02 — brown top, seated interior
const P03_WHITE_SEATED = "/brand/img03-white-seated.png"; // IMAGE 03 — white suit seated (HERO)
const P04_WHITE_STAND = "/brand/img04-white-standing.png"; // IMAGE 04 — white suit standing

export const portraits = {
  hero: {
    id: "white-seated",
    src: P03_WHITE_SEATED,
    aspectRatio: "3 / 4",
    objectPositionDesktop: "50% 22%",
    objectPositionMobile: "50% 18%",
  },
  about: {
    id: "brown-seated",
    src: P02_BROWN,
    aspectRatio: "3 / 4",
    objectPositionDesktop: "50% 20%",
    objectPositionMobile: "50% 15%",
  },
  philosophy: {
    id: "black-tailored",
    src: P01_BLACK,
    aspectRatio: "3 / 4",
    objectPositionDesktop: "50% 18%",
    objectPositionMobile: "50% 12%",
  },
  travel: {
    id: "brown-seated-travel",
    src: P02_BROWN,
    aspectRatio: "3 / 4",
    objectPositionDesktop: "50% 22%",
    objectPositionMobile: "50% 15%",
  },
  editorialBreak: {
    id: "white-standing",
    src: P04_WHITE_STAND,
    aspectRatio: "4 / 5",
    objectPositionDesktop: "50% 18%",
    objectPositionMobile: "50% 14%",
  },
  positioning: {
    id: "white-standing-pos",
    src: P04_WHITE_STAND,
    aspectRatio: "3 / 4",
    objectPositionDesktop: "50% 20%",
    objectPositionMobile: "50% 14%",
  },
  colorAccent: {
    id: "black-accent",
    src: P01_BLACK,
    aspectRatio: "3 / 4",
    objectPositionDesktop: "50% 18%",
    objectPositionMobile: "50% 12%",
  },
  contact: {
    id: "white-seated-contact",
    src: P03_WHITE_SEATED,
    aspectRatio: "3 / 4",
    objectPositionDesktop: "50% 22%",
    objectPositionMobile: "50% 16%",
  },
};

// Gallery — all approved photographs, arranged as an editorial masonry composition.
// altKey references translations.gallery.alt[key].
export const galleryImages = [
  { id: "white-seated", src: P03_WHITE_SEATED, altKey: "whiteSeated", span: "tall", objectPosition: "50% 20%" },
  { id: "black-tailored", src: P01_BLACK, altKey: "black", span: "regular", objectPosition: "50% 16%" },
  { id: "brown-seated", src: P02_BROWN, altKey: "brown", span: "regular", objectPosition: "50% 18%" },
  { id: "white-standing", src: P04_WHITE_STAND, altKey: "whiteStanding", span: "tall", objectPosition: "50% 16%" },
  { id: "white-seated-2", src: P03_WHITE_SEATED, altKey: "whiteSeated", span: "regular", objectPosition: "50% 24%" },
  { id: "black-2", src: P01_BLACK, altKey: "black", span: "tall", objectPosition: "50% 18%" },
  { id: "brown-2", src: P02_BROWN, altKey: "brown", span: "regular", objectPosition: "50% 22%" },
];
