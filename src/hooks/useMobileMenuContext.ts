import { useContext } from "react";
import { MobileMenuContext } from "../contexts/MobileMenuContext";

export function useMobileMenuContext() {
  const value = useContext(MobileMenuContext);

  return {
    ...value,
  };
}
