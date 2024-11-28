import { useRouter } from "next/navigation";
import AddIcon from "./AddToolIcon";
import AddLink from "./AddToolLink";
import AddName from "./AddToolName";
import AddTags from "./AddToolTags";
import { ToolkitFormProvider, useToolkitForm } from "@/context/ToolkitFormContext";
import rxdbInit from "@/lib/db/rxdbInit";
import Button from "@/ui/shared/Button";

function SubmitButton() {
  const router = useRouter();
  const { formState } = useToolkitForm();

  const handleSubmit = async () => {
    const db = await rxdbInit();
    
    await db.toolkit.insert({
      id: crypto.randomUUID(),
      name: formState.name,
      categories: formState.categories,
      checked: false,
      link: formState.link,
      imageUrl: formState.imageUrl,
      timestamp: new Date().toISOString()
    });

    console.log(`Created ${formState.name} in the database`);

    router.push("/toolkit");
  };

  return (
    <Button
      label="Add Tool"
      onClick={handleSubmit}
      className="w-full mt-4 bg-twd-primary-purple hover:bg-twd-secondary-purple"
    />
  );
}

export default function Inputs() {
  return (
    <ToolkitFormProvider>
      <div className="space-y-4 p-4">
        <AddName />
        <AddTags />
        <AddIcon />
        <AddLink />
        <SubmitButton />
      </div>
    </ToolkitFormProvider>
  );
}
