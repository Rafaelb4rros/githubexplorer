import { useContext } from "react";
import { GetDataContext } from "../../contexts/GetData";
import { responseData } from "../../utils/commonTypes";
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

  const handleExpandItem = (itemId: number) => {
    const [newItem] = responseData.map((item) =>
      item.data.id === itemId
        ? {
            ...item,
            isExpanded: !item.isExpanded,
          }
        : item
    );

    const newState = responseData.filter((item) => item.data.id !== itemId);

    setResponseData([...newState, newItem]);
  };

  if (rateLimitExceeded) {
    return (
      <div className="repoListContainer">
        <div className="repoListHeader">
          <p>
            Voce atingiu a o limite de requisicoes da api do github, tente
            novamente as {resetTime?.getHours()}:{resetTime?.getMinutes()}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="repoListContainer">
      <div className="repoListHeader">
        {responseStatus === "error" && (
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
            key={i}
          />
        ))}

        {isLoading && <Loader />}
      </ul>
    </div>
  );
}
