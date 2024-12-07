import Button from "@/ui/shared/Button";
import { useRouter } from "next/navigation";

interface MoodButtonsProps {
  submitMood: () => void;
}

export default function MoodButtons({ submitMood }: MoodButtonsProps) {
  const router = useRouter();
  return (
    <div className="flex justify-between w-10/12 max-w-xl m-auto">
      <Button
        label="Save"
        className="mt-2 px-3 py-1 bg-twd-primary-purple text-white rounded"
        onClick={() => submitMood()}
      />
      <Button
        label="Go to Insights"
        className="mt-2 px-3 py-1 bg-gray-700 text-white rounded"
        onClick={() => router.push("/insights")}
      />
    </div>
  );
}
