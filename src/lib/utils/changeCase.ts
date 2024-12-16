export default function changeCase(phrase: string, useCase: string) {
  const inputArray = phrase.split(" ");
  let changed = "";

  switch (useCase) {
    case "title":
      changed = inputArray
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      break;
    case "sentence":
      changed = `${inputArray[0].charAt(0).toUpperCase()}${inputArray[0].slice(1)} ${inputArray.slice(1).join(" ")}`;
      break;
    case "lower":
      changed = inputArray
        .map((word) => word.charAt(0).toLowerCase() + word.slice(1))
        .join(" ");
      break;
    case "upper":
      changed = inputArray
        .map((word) => word.toUpperCase())
        .join(" ");
      break;
  }

  return changed;
}