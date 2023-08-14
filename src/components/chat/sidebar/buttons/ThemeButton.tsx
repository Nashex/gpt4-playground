import React from "react";
import { MdColorLens } from "react-icons/md";
import ButtonContainer from "./ButtonContainer";
import { useTheme } from "next-themes";

type Props = {};

export default function ThemeButton({}: Props) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const handleThemeChange = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  if (!mounted) return null;

  return (
    <ButtonContainer onClick={handleThemeChange}>
      <MdColorLens />
      {`${theme === "dark" ? "Light" : "Dark"} mode`}
    </ButtonContainer>
  );
}
