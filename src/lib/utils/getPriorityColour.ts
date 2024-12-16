export default function getPriorityColour(priority: number): string {
  switch (priority) {
    case 1:
      return "twd-cube-red";
    case 2:
      return "twd-cube-yellow";
    case 3:
      return "twd-cube-blue";
    case 4:
      return "twd-cube-green";
  }

  return "";
}