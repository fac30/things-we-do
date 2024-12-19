import { v4 as uuidv4 } from "uuid";

export const categories = [
  { id: uuidv4(), name: "Replace", timestamp: new Date().toISOString() },
  { id: uuidv4(), name: "Barrier", timestamp: new Date().toISOString() },
  { id: uuidv4(), name: "Distract", timestamp: new Date().toISOString() },
  {
    id: uuidv4(),
    name: "Change State",
    timestamp: new Date().toISOString(),
  },
];

export const toolkit = [
  {
    id: uuidv4(),
    name: "Listen to your favourite music",
    categories: ["Distract", "Change state"],
    checked: false,
    infoUrl: "https://open.spotify.com/",
    imageUrl:
      "https://m.media-amazon.com/images/I/51rttY7a+9L.png",
    timestamp: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: "Breathing exercises",
    categories: ["Change state"],
    checked: false,
    infoUrl: "https://youtu.be/i5apnLrzaT4?si=e_D3D5e-orQWUfLw",
    imageUrl:
      "https://www.bhf.org.uk/-/media/images/information-support/heart-matters/2023/december/wellbeing/deep-breathing-620x400.png?h=400&w=620&rev=4506ebd34dab4476b56c225b6ff3ad60&hash=B3CFFEEE704E4432D101432CEE8B2766",
    timestamp: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: "Call a friend",
    categories: ["Distract", "Change state"],
    checked: false,
    infoUrl: "",
    imageUrl:
      "https://img.freepik.com/free-vector/telephone-call-icon-3d-vector-illustration-social-media-symbol-networking-sites-apps-cartoon-style-isolated-white-background-online-communication-digital-marketing-concept_778687-1734.jpg",
    timestamp: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: "Drink water",
    categories: ["Replace", "Distract", "Change state"],
    checked: false,
    infoUrl: "https://www.medicalnewstoday.com/articles/290814",
    imageUrl:
      "https://climatekids.nasa.gov/resources/icons/10-things-water.jpg",
    timestamp: new Date().toISOString(),
  },
];
