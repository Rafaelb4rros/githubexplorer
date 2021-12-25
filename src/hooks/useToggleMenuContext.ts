import { useContext } from "react";
import { ToggleMenuContext } from "../contexts/ToggleMenuContext";

export function useToggleMenuContext() {
  const value = useContext(ToggleMenuContext);

  return {
    ...value,
  };
}
