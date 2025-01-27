import Navbar from "@/components/Navbar";

export default function NavbarPagesLayout({
  children,
}: Readonly<{ children: JSX.Element }>) {
  return (
    <>
      {children}
      <Navbar />
    </>
  );
}
