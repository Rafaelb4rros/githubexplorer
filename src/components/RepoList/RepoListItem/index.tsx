import { responseData } from "../../../utils/commonTypes";
import {
  AiOutlineArrowRight,
  AiOutlineFork,
  AiOutlineHeart,
  AiOutlineStar,
} from "react-icons/ai";
import { GiStrikingArrows } from "react-icons/gi";
import { BiLinkExternal } from "react-icons/bi";
import { RiGitRepositoryCommitsLine, RiUserFollowLine } from "react-icons/ri";
import "./styles.scss";
import { FiTrash } from "react-icons/fi";

type RepoListItemProps = {
  RepoListItemData: responseData;
  id: number;
  handleExpandItem: (itemId: number) => void;
  handleDeleteItem: (itemId: number) => void;
};

export function RepoListItem({
  RepoListItemData,
  handleExpandItem,
  handleDeleteItem,
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
            <span className={`tag Repository`}>Repository</span>
          </div>

          {RepoListItemData.data.description && (
            <div className="bioContainer">
              {RepoListItemData.data.description}
            </div>
          )}

          <div className="dataInfoContainer">
            <div className="forks">
              <AiOutlineFork />
              {RepoListItemData.data.forks}
            </div>

            <div className="subs">
              <AiOutlineHeart />
              {RepoListItemData.data.subscribers_count}
            </div>

            <div className="stars">
              <AiOutlineStar />
              {RepoListItemData.data.stargazers_count}
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

          {RepoListItemData.data.bio ? (
            <div className="bioContainer">{RepoListItemData.data.bio}</div>
          ) : (
            <div className="bioContainer">
              {RepoListItemData.data.description}
            </div>
          )}

          <div className="dataInfoContainer">
            {RepoListItemData.data.type === "Organization" ? (
              <>
                <div className="fullReposInfo">
                  <RiGitRepositoryCommitsLine />
                  {RepoListItemData.data.public_repos}
                </div>

                <div className="gists">
                  <GiStrikingArrows />
                  {RepoListItemData.data.public_gists}
                </div>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </>
      )}
      <div className="deleteItem">
        <button onClick={() => handleDeleteItem(RepoListItemData.data.id)}>
          <FiTrash />
        </button>
      </div>
      <div className="expand">
        <button onClick={() => handleExpandItem(RepoListItemData.data.id)}>
          <AiOutlineArrowRight />
        </button>
      </div>
    </div>
  );
}
