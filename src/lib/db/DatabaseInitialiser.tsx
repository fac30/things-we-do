// "use client";

// import { useEffect } from "react";
// import DatabaseManager from "../db/rxdbInit";
// export default function DatabaseInitializer() {
//   useEffect(() => {
//     const init = async () => {
//       try {
//         await DatabaseManager.initializeDatabase();
//       } catch (error) {
//         console.error(
//           "Database initialization error in DatabaseInitialiser:",
//           error
//         );
//       }
//     };

//     init();
//   }, []);

//   return null;
// }
