import { useMobileMenuContext } from "../../../hooks/useMobileMenuContext";

export function ToggleMenu() {
  const { checkboxStates, handleChangeCheckboxState } = useMobileMenuContext();

  return (
    <div className="SearchFilters">
      <div>
        <label htmlFor="searchUsers">Users</label>
        <input
          onChange={(e) => handleChangeCheckboxState(e.target.id)}
          checked={checkboxStates.searchUsers}
          id="searchUsers"
          type="checkbox"
        />
      </div>
      <div>
        <label htmlFor="searchOrgs">Orgs</label>
        <input
          checked={checkboxStates.searchOrgs}
          onChange={(e) => handleChangeCheckboxState(e.target.id)}
          id="searchOrgs"
          type="checkbox"
        />
      </div>
      <div>
        <label htmlFor="searchRepos">Repos</label>
        <input
          checked={checkboxStates.searchRepos}
          onChange={(e) => handleChangeCheckboxState(e.target.id)}
          id="searchRepos"
          type="checkbox"
        />
      </div>
    </div>
  );
}
