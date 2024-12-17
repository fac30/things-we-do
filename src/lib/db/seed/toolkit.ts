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
      "https://media.discordapp.net/attachments/1310562134932979735/1318576041073315900/received_950544553601344.jpg?ex=6762d322&is=676181a2&hm=c11e753161510ab37001c9057d18856b24402bde95c4d7808b97b5616dd4a53a&=&format=webp&width=936&height=936",
    timestamp: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: "Breathing exercises",
    categories: ["Change state"],
    checked: false,
    infoUrl: "https://youtu.be/i5apnLrzaT4?si=e_D3D5e-orQWUfLw",
    imageUrl:
      "https://media.discordapp.net/attachments/1310562134932979735/1318576040750088252/received_1503272180337642.jpg?ex=6762d322&is=676181a2&hm=df31873554df20b51e5c40e2e27306c7b4a459337353576f400237d4160a7434&=&format=webp&width=936&height=936",
    timestamp: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: "Call a friend",
    categories: ["Distract", "Change state"],
    checked: false,
    infoUrl: "",
    imageUrl:
      "https://media.discordapp.net/attachments/1310562134932979735/1318576040041381908/received_960755905929645.jpg?ex=6762d321&is=676181a1&hm=c4b3219ff3bca866b47cd013f616879809317d954b5b4019a466a7117b129065&=&format=webp&width=936&height=936",
    timestamp: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: "Drink water",
    categories: ["Replace", "Distract", "Change state"],
    checked: false,
    infoUrl: "https://www.medicalnewstoday.com/articles/290814",
    imageUrl:
      "https://media.discordapp.net/attachments/1310562134932979735/1318576040418742355/received_570339555846105.jpg?ex=6762d321&is=676181a1&hm=0c2bd8744d116ac1e455da589d769eb018bbeb5bd22894012d6fa71e7745e250&=&format=webp&width=936&height=936",
    timestamp: new Date().toISOString(),
  },
];
