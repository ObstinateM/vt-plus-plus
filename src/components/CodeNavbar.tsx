import { Navbar } from "@nextui-org/react";

export function CodeNavbar({
  code,
  deleteCode,
}: {
  code: string;
  deleteCode: (s: string, b: boolean) => void;
}) {
  if (code === "") {
    return (
      <Navbar.Link isActive href="#">
        Se connecter
      </Navbar.Link>
    );
  } else {
    return (
      <>
        <Navbar.Link isActive href="#">
          {`Emploi du temps : ${code.toLocaleUpperCase()}`}
        </Navbar.Link>
        <Navbar.Link onPress={() => deleteCode("", true)} href="#">
          Changer de code
        </Navbar.Link>
      </>
    );
  }
}
