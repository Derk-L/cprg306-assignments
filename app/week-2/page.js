import Link from "next/link";
import StudentInfo from "./student-info";

export default function Page() {
    let student1={
        name: "Derek Leong",
        git: <Link href="https://github.com/Derk-L/cprg306-assignments"> Click Me!</Link>
    }

    return (
      <main>
        <h1>Shopping List</h1>
        <StudentInfo
        name={student1.name}
        git={student1.git}/>
      </main>
    );
  }