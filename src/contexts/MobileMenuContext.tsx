import { createContext, ReactNode, useState } from "react";

type MobileMenuContextProviderProps = {
  children: ReactNode;
};

type checkboxStates = {
  searchUsers?: boolean;
  searchOrgs?: boolean;
  searchRepos?: boolean;
};

type MobileMenuContext = {
  handleChangeCheckboxState: (active: string) => void;
  checkboxStates: checkboxStates;
  activeCheckbox: string;
};

export const MobileMenuContext = createContext({} as MobileMenuContext);

export function MobileMenuContextProvider({
  children,
}: MobileMenuContextProviderProps) {
  const [checkboxStates, setCheckboxStates] = useState<checkboxStates>({
    searchUsers: true,
    searchOrgs: false,
    searchRepos: false,
  });
  const [activeCheckbox, setActiveCheckbox] = useState("searchUsers");
  function handleChangeCheckboxState(active: string) {
    setActiveCheckbox(active);
    const inactiveCheckboxes = Object.keys(checkboxStates).filter(
      (checkbox) => checkbox !== active
    );

    setCheckboxStates({
      [inactiveCheckboxes[0]]: false,
      [inactiveCheckboxes[1]]: false,
      [active]: true,
    });
  }

  return (
    <MobileMenuContext.Provider
      value={{
        checkboxStates,
        activeCheckbox,
        handleChangeCheckboxState,
      }}
    >
      {children}
    </MobileMenuContext.Provider>
  );
}
