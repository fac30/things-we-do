import { v4 as uuidv4 } from "uuid";

export const categories = [
  { id: uuidv4(), name: "Replace", timestamp: new Date().toISOString() },
  { id: uuidv4(), name: "Barrier", timestamp: new Date().toISOString() },
  { id: uuidv4(), name: "Distract", timestamp: new Date().toISOString() },
  {
    id: uuidv4(),
    name: "Change Status",
    timestamp: new Date().toISOString(),
  },
];

export const toolkit = [
  {
    id: uuidv4(),
    name: "Listen to my favourite music",
    categories: ["Replace", "Barrier"],
    checked: false,
    infoUrl: "https://google.com/music",
    imageUrl:
      "https://daily.jstor.org/wp-content/uploads/2023/01/good_times_with_bad_music_1050x700.jpg",
    timestamp: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: "Breathing exercises",
    categories: ["Distract"],
    checked: false,
    infoUrl: "https://www.youtube.com/watch?v=DbDoBzGY3vo",
    imageUrl:
      "https://www.bhf.org.uk/-/media/images/information-support/heart-matters/2023/december/wellbeing/deep-breathing-620x400.png?h=400&w=620&rev=4506ebd34dab4476b56c225b6ff3ad60&hash=B3CFFEEE704E4432D101432CEE8B2766",
    timestamp: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: "Call a friend",
    categories: ["Distract", "Change status"],
    checked: false,
    infoUrl: "https://example.com/call",
    imageUrl:
      "https://t4.ftcdn.net/jpg/04/63/63/59/360_F_463635935_IweuYhCqZRtHp3SLguQL8svOVroVXvvZ.jpg",
    timestamp: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: "Drink water",
    categories: ["Distract", "Change status"],
    checked: false,
    infoUrl: "https://example.com/call",
    imageUrl:
      "https://content.health.harvard.edu/wp-content/uploads/2023/07/b8a1309a-ba53-48c7-bca3-9c36aab2338a.jpg",
    timestamp: new Date().toISOString(),
  },
];
