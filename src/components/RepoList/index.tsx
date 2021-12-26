import { AiOutlineGithub } from "react-icons/ai";
import { FiAlertCircle } from "react-icons/fi";
import { useData } from "../../hooks/useData";
import { responseData } from "../../utils/commonTypes";
import { ToggleMenu } from "../toggleMenu";
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
    rateLimitInfo,
    responseStatus,
    search,
  } = useData();

  const handleExpandItem = (itemId: number) => {
    const oldState = [...responseData];

    const newState = oldState.map((item: responseData) =>
      itemId === item.data.id
        ? {
            ...item,
            isExpanded: !item.isExpanded,
          }
        : item
    );

    setResponseData(newState);
  };

  const handleDeleteItem = (itemId: number) => {
    const oldState = [...responseData];
    const newState = oldState.filter((item) => item.data.id !== itemId);

    setResponseData(newState);
  };

  if (rateLimitExceeded) {
    return (
      <div className="repoListContainer error">
        <AiOutlineGithub size={300} />
        <div className="repoListHeader ">
          <p>
            Maximum call stack size exceeded, try again at{" "}
            <span>
              {resetTime?.getHours()}:{resetTime?.getMinutes()}
            </span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="repoListContainer">
      <ToggleMenu />
      <div className="requestsInfo">
        <FiAlertCircle size={25} />
        <p>
          You have{" "}
          <span
            className={`${
              rateLimitInfo && rateLimitInfo?.limit - rateLimitInfo?.used === 0
                ? "blocked"
                : ""
            }`}
          >
            [ {rateLimitInfo && rateLimitInfo?.limit - rateLimitInfo?.used} ]
          </span>
          Request(s) remaining
        </p>
      </div>
      <div className="rateLimit">
        <FiAlertCircle size={25} />
        <p>
          Your requests will reset automatically at{" "}
          <span>
            {resetTime?.getHours()}:{resetTime?.getMinutes()}
          </span>
        </p>
      </div>

      <div className="repoListHeader">
        {responseStatus?.status === "error" && search.trim() !== "" && (
          <p className="notfound">
            <span className="danger" color="#fff">
              404
            </span>{" "}
            - No results for <span>{search}</span> in{" "}
            <span>{responseStatus.in}</span>
          </p>
        )}
      </div>

      {responseData.length > 0 ? (
        <ul className="repoList emptyList">
          <AiOutlineGithub size={300} />
          {responseData.map((response: responseData, i: number) => (
            <RepoListItem
              handleDeleteItem={handleDeleteItem}
              handleExpandItem={handleExpandItem}
              RepoListItemData={response}
              id={i}
              key={i}
            />
          ))}

          {isLoading && <Loader />}
        </ul>
      ) : (
        <div className="repoList emptyList">
          <AiOutlineGithub size={300} />
          <div className="repoListHeader ">
            <p>
              No items here :( you can search by users, repositories or
              organizations.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
