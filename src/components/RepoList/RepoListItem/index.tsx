import { responseData } from "../../../utils/commonTypes";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BiLinkExternal } from "react-icons/bi";
import { RiGitRepositoryCommitsLine, RiUserFollowLine } from "react-icons/ri";
import "./styles.scss";

type RepoListItemProps = {
  RepoListItemData: responseData;
  handleExpandItem: (value: number) => void;
};

export function RepoListItem({
  RepoListItemData,
  handleExpandItem,
}: RepoListItemProps) {
  return (
    <div
      className={`RepoListItem ${
        RepoListItemData.isExpanded ? "expanded" : ""
      }`}
    >
      {!RepoListItemData.data.type ? (
        <>
          <div className="avatarWrapper">
            <div className="avatarContainer">
              <img src={RepoListItemData.data.owner.avatar_url} alt="Avatar" />
            </div>
          </div>
          <div className="tagContainer">
            <span className="username">{RepoListItemData.data.full_name}</span>
            <a target="_blank" href={RepoListItemData.data.html_url}>
              <BiLinkExternal size={25} />
            </a>
            <span className={`tag Repository`}>{"Repository"}</span>
          </div>

          {RepoListItemData.data.description && (
            <div className="bioContainer">
              {RepoListItemData.data.description}
            </div>
          )}

          <div className="dataInfoContainer">
            <div className="followers">
              <RiUserFollowLine />
              {RepoListItemData.data.forks}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="avatarWrapper">
            <div className="avatarContainer">
              <img src={RepoListItemData.data.avatar_url} alt="Avatar" />
            </div>
          </div>
          <div className="tagContainer">
            <span className="username">{RepoListItemData.data.name}</span>
            <a target="_blank" href={RepoListItemData.data.html_url}>
              <BiLinkExternal size={25} />
            </a>
            <span className={`tag ${RepoListItemData.data.type}`}>
              {RepoListItemData.data.type}
            </span>
          </div>

          {RepoListItemData.data.bio && (
            <div className="bioContainer">{RepoListItemData.data.bio}</div>
          )}

          <div className="dataInfoContainer">
            <div className="reposInfo">
              <RiGitRepositoryCommitsLine />
              {RepoListItemData.data.public_repos}
            </div>

            <div className="followers">
              <RiUserFollowLine />
              {RepoListItemData.data.followers}
            </div>
            <div className="following">
              <RiUserFollowLine />
              {RepoListItemData.data.following}
            </div>
          </div>
        </>
      )}
      <div className="expand">
        <button onClick={() => handleExpandItem(RepoListItemData.data.id)}>
          <AiOutlineArrowRight />
        </button>
      </div>
    </div>
  );
}
