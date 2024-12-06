import Navbar from "@/components/Navbar";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Navbar />
    </>
  );
}
