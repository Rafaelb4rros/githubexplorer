import { useContext, useEffect } from "react";
import { GetDataContext } from "../../contexts/GetData";
import { responseData } from "../../utils/commonTypes";
import { ToggleMenu } from "../Header/toggleMenu";
import { RepoListItem } from "./RepoListItem";
import { Loader } from "./RepoListLoader";

import "./styles.scss";

export function RepoList() {
  const {
    responseData,
    isLoading,
    resetTime,
    rateLimitExceeded,
    setResponseData,
    responseStatus,
    search,
  } = useContext(GetDataContext);

  const handleExpandItem = (i: number) => {
    const newState = [...responseData];
    newState[i].isExpanded = !newState[i].isExpanded;
    setResponseData(newState);
  };

  if (rateLimitExceeded) {
    return (
      <div className="repoListContainer">
        <div className="repoListHeader">
          Voce atingiu a o limite de requisicoes da api do github, tente
          novamente as {resetTime?.getHours()}:{resetTime?.getMinutes()}
        </div>
      </div>
    );
  }

  return (
    <div className="repoListContainer">
      You are looking for
      <ToggleMenu />
      <div className="repoListHeader">
        {responseStatus === "error" && search.trim() !== "" && (
          <p>
            <span className="danger" color="#fff">
              404
            </span>{" "}
            - No results for <span>{search}</span>
          </p>
        )}
      </div>
      <ul className="repoList">
        {responseData.map((response: responseData, i: number) => (
          <RepoListItem
            handleExpandItem={handleExpandItem}
            RepoListItemData={response}
            id={i}
            key={i}
          />
        ))}

        {isLoading && <Loader />}
      </ul>
    </div>
  );
}
