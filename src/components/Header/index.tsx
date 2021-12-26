import {
  AiOutlineGithub,
  AiOutlineSearch,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { CgSearchLoading } from "react-icons/cg";

import "./styles.scss";

import { useRef, useEffect, useState } from "react";
import { useData } from "../../hooks/useData";

export function Header() {
  const [isSearchBarEnabled, setIsSearchBarEnabled] = useState(
    document.body.offsetWidth >= 600 ? true : false
  );
  const [onInputFocus, setOnInputFocus] = useState(false);
  const {
    handleSearch,
    search,
    setSearch,
    isLoading,
    setResponseStatus,
    responseStatus,
    rateLimitExceeded,
  } = useData();

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (search.trim() === "") {
      setOnInputFocus(false);
    } else {
      setOnInputFocus(true);
    }
  }, [search]);

  useEffect(() => {}, []);

  return (
    <header className="header">
      <div className={`githubIcon ${isLoading ? "load" : ""}`}>
        <AiOutlineGithub size={130} />
      </div>

      <div className="headerContent">
        {!isSearchBarEnabled ? (
          <>
            <div className="title">
              <h2>Github explorer</h2>
            </div>
            <div className="SearchWrapper">
              <button
                disabled={rateLimitExceeded}
                onClick={() => setIsSearchBarEnabled(!isSearchBarEnabled)}
              >
                <AiOutlineSearch size={25} />
              </button>
            </div>
          </>
        ) : (
          <div
            className={`SearchWrapper
            ${onInputFocus ? "outline" : ""}
            ${isSearchBarEnabled ? "enabled" : ""}
            ${
              responseStatus?.status === "error" && search.trim() !== ""
                ? "error"
                : ""
            }
            `}
          >
            {document.body.offsetWidth < 600 && (
              <button
                className="danger"
                title="Close input"
                onClick={() => setIsSearchBarEnabled(!isSearchBarEnabled)}
              >
                <AiOutlineCloseCircle size={25} />
              </button>
            )}

            <form
              autoComplete="off"
              onSubmit={(e) => handleSearch(e)}
              className={`searchForm`}
            >
              <input
                disabled={rateLimitExceeded}
                autoComplete="off"
                onChange={(e) => {
                  setSearch(e.target.value);
                  setResponseStatus({
                    status: "",
                    in: "",
                  });
                }}
                ref={inputRef}
                value={search}
                type="text"
                name="search"
                placeholder="Repos, orgs or users..."
              />
              {search.trim() !== "" && (
                <button
                  disabled={search.trim() === ""}
                  type="button"
                  className="clearvalue"
                  title="Clear input value"
                  onClick={() => {
                    inputRef.current?.focus();
                    setSearch("");
                  }}
                >
                  <AiOutlineCloseCircle size={15} />
                </button>
              )}

              <button
                disabled={search.trim() === "" || rateLimitExceeded}
                type="submit"
                title="Search"
              >
                {isLoading ? (
                  <CgSearchLoading fill="#ffff" color="#ffff" size={24} />
                ) : (
                  <AiOutlineSearch size={25} />
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
}
