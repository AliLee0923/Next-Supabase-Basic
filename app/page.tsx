import Image from "next/image";
import StudentsTable from "./students-table/page";

export default function Home() {
  return (
    <main className="flex justify-center pt-20 px-8 min-w-[850px] overflow-auto">
      <StudentsTable />
    </main>
  );
}
