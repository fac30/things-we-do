import AddIcon from "./AddToolIcon";
import AddLink from "./AddToolLink";
import AddName from "./AddToolName";
import AddTags from "./AddToolTags";

export default function Inputs() {
  return (
    <div className="flex flex-col gap-2 justify-center">
      <AddName />
      <AddTags />
      <AddIcon />
      <AddLink />
    </div>
  );
}
