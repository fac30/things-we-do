'use client'
import Button from "@/ui/shared/Button";
import { Header } from "@/ui/shared/Header";
import { useRouter } from "next/navigation";

const categoriesBarClass = `
  whitespace-nowrap flex items-center gap-4 px-4 py-2 
  overflow-x-auto bg-[#262537] 
  sm:gap-6 sm:px-6  focus:ring-2 focus:ring-twd-secondary-purple
`;

const categories = [
    {
        id: 1, 
        name: "Replace", 
        description: "Adding a replacement action can help when you want to stop doing something. This is called a competing response and is part of Habit Reversal Training.", 
        link: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7404378/",
        title: "Read more about Habit Reversal Training here"
    },
    {id: 2, name: "Distract", description: "Distracting yourself with something you enjoy can help you feel better."},
    {id: 3, name: "Barrier", description:  "Creating a barrier can help to prevent you doing something you are trying to stop."},
    {id: 4, name: "Change state", description: "Calming your nervous system down or making yourself more alert can help you get out of a spiral."}
];

export default function CategoriesInfoPage() {
    const router = useRouter();

    const goBack = () => {
      router.push('/toolkit/info');
      window.scrollTo(0, 0);
    };

    return (
        <>
          {/* Header */}
          <Header title="Categories" isInfoPage={true}/>
          <div className="bg-twd-background text-white min-h-screen px-10 py-6">
    
          {/* Subheader */}
          <p className="text-gray-400 mt-3 mb-2">
            Filter by categories you might find helpful or add your own:
          </p>

          {/* Scrollable Categories */}
          <div className={categoriesBarClass}>
                <div className="flex overflow-x-auto whitespace-nowrap space-x-2">
                {categories.map((category) => (
                    <Button
                    key={category.id}
                    label={category.name}
                    className=" text-white px-4 py-2 text-sm font-bold rounded-full"
                    />
                ))}
                </div>
            </div>

            {/* Content */}
            <div className="mt-6 space-y-6">
                {categories.map((category) => (
                <div key={category.id} className="space-y-2">
                    <h2 className="text-xl font-semibold text-white">
                    {category.name}
                    </h2>
                    <p className="text-gray-400">{category.description}</p>
                    {category.link && (
                    <a
                        href={category.link}
                        className="text-twd-text-link underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {category.title}
                    </a>
                    )}
                </div>
                ))}
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-white">
                    Add your own category
                  </h2>
                  <p className="text-gray-400">Adding your own categories can help you organise in the best way for you.</p>
                </div>
            </div>
            

            {/* Back Button */}
            <div className="mt-6">
               <Button 
                  label="← Back" 
                  className="bg-twd-primary-purple text-white px-6 py-2 rounded-full"
                  onClick={goBack}
                />
            </div>
        </div>
      </>
);
}
