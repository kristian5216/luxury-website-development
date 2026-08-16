// Centralized image architecture.
// Only the approved client photographs are used. No stock women, no AI substitutes.
// All seven approved portraits (IMAGE 01–07) are now supplied and used editorially.

const P01_BLACK = "/brand/img01-black.png"; // IMAGE 01 — black tailored outfit, grey studio
const P02_BROWN = "/brand/img02-brown-seated.png"; // IMAGE 02 — brown top, seated interior
const P03_WHITE_SEATED = "/brand/img03-white-seated.png"; // IMAGE 03 — white suit seated (HERO)
const P04_WHITE_STAND = "/brand/img04-white-standing.png"; // IMAGE 04 — white suit standing
const P05_RED_STOOL = "/brand/img05-red-stool.png"; // IMAGE 05 — red suit, seated on stool, light studio
const P06_OLIVE = "/brand/img06-olive.png"; // IMAGE 06 — olive-green top, brown trousers, wood wall + plant
const P07_RED_CHAIR = "/brand/img07-red-chair.png"; // IMAGE 07 — red suit, seated, light neutral

export const portraits = {
  hero: {
    // Client feedback: hero should use the black-clothing portrait.
    id: "black-tailored",
    src: P01_BLACK,
    aspectRatio: "3 / 4",
    objectPositionDesktop: "50% 18%",
    objectPositionMobile: "50% 12%",
  },
  about: {
    id: "brown-seated",
    src: P02_BROWN,
    aspectRatio: "3 / 4",
    objectPositionDesktop: "50% 20%",
    objectPositionMobile: "50% 15%",
  },
  philosophy: {
    id: "white-seated",
    src: P03_WHITE_SEATED,
    aspectRatio: "3 / 4",
    objectPositionDesktop: "50% 22%",
    objectPositionMobile: "50% 18%",
  },
  travel: {
    id: "olive-green",
    src: P06_OLIVE,
    aspectRatio: "3 / 4",
    objectPositionDesktop: "50% 12%",
    objectPositionMobile: "50% 10%",
  },
  editorialBreak: {
    id: "white-standing",
    src: P04_WHITE_STAND,
    aspectRatio: "4 / 5",
    // Shifted right (vs. the 50% used elsewhere for this portrait) to leave clear room
    // for the overlaid editorial words on the left, per the gradient composition below.
    objectPositionDesktop: "70% 18%",
    objectPositionMobile: "70% 14%",
  },
  positioning: {
    id: "white-standing-pos",
    src: P04_WHITE_STAND,
    aspectRatio: "3 / 4",
    objectPositionDesktop: "50% 20%",
    objectPositionMobile: "50% 14%",
  },
  colorAccent: {
    id: "red-stool",
    src: P05_RED_STOOL,
    aspectRatio: "3 / 4",
    objectPositionDesktop: "50% 16%",
    objectPositionMobile: "50% 12%",
  },
  contact: {
    id: "red-chair",
    src: P07_RED_CHAIR,
    aspectRatio: "3 / 4",
    objectPositionDesktop: "50% 18%",
    objectPositionMobile: "50% 14%",
  },
};

// Gallery — all seven approved photographs, arranged as an editorial masonry composition.
// altKey references translations.gallery.alt[key].
export const galleryImages = [
  { id: "white-seated", src: P03_WHITE_SEATED, altKey: "whiteSeated", span: "tall", objectPosition: "50% 20%" },
  { id: "black-tailored", src: P01_BLACK, altKey: "black", span: "regular", objectPosition: "50% 16%" },
  { id: "red-chair", src: P07_RED_CHAIR, altKey: "redChair", span: "regular", objectPosition: "50% 18%" },
  { id: "white-standing", src: P04_WHITE_STAND, altKey: "whiteStanding", span: "tall", objectPosition: "50% 16%" },
  { id: "olive-green", src: P06_OLIVE, altKey: "olive", span: "tall", objectPosition: "50% 12%" },
  { id: "red-stool", src: P05_RED_STOOL, altKey: "redStool", span: "regular", objectPosition: "50% 14%" },
  { id: "brown-seated", src: P02_BROWN, altKey: "brown", span: "regular", objectPosition: "50% 18%" },
];
