import NavigationLink from "@/ui/shared/NavLink";

export default function Page() {
  return (
    <div>
      <h1 className="text-white">This is the toolkit page</h1>
      
      <div></div>

      <NavigationLink title="Add Tool" destination="/toolkit/addTool"/>
    </div>
  );
}
