import { useToggleMenuContext } from "../../hooks/useToggleMenuContext";
import { VscDebugBreakpointData } from "react-icons/vsc";
import "./styles.scss";

export function ToggleMenu() {
  const { checkboxStates, handleChangeCheckboxState } = useToggleMenuContext();

  return (
    <div className="SearchFilters">
      <span>Users</span>
      <div
        className={`${checkboxStates.searchUsers ? "active" : ""}`}
        onClick={() => handleChangeCheckboxState("searchUsers")}
      >
        <label>
          <VscDebugBreakpointData />
        </label>
      </div>
      <span>Orgs</span>
      <div
        className={`${checkboxStates.searchOrgs ? "active" : ""}`}
        onClick={() => handleChangeCheckboxState("searchOrgs")}
      >
        <label>
          <VscDebugBreakpointData />
        </label>
      </div>
      <span>Repos</span>
      <div
        className={`${checkboxStates.searchRepos ? "active" : ""}`}
        onClick={() => handleChangeCheckboxState("searchRepos")}
      >
        <label>
          <VscDebugBreakpointData />
        </label>
      </div>
    </div>
  );
}
