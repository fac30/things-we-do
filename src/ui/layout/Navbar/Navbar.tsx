import NavbarLinks from "./NavbarLinks";

export default function Navbar() {
  return (
    <nav className="fixed bottom-0 bg-twd-background h-16 w-screen border-t-[1.5px] border-t-gray-600 z-50 ">
      <NavbarLinks />
    </nav>
  );
}
