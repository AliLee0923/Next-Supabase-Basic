import Image from "next/image";
import StudentsTable from "./students-table/page";

export default function Home() {
  return (
    <main className="flex justify-center pt-20 px-8">
      <StudentsTable />
    </main>
  );
}
