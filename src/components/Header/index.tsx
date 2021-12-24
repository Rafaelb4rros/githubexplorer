import { MobileMenu } from "./MobileMenu";
import {
  AiOutlineGithub,
  AiOutlineSearch,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { CgSearchLoading } from "react-icons/cg";

import "./styles.scss";

import { useRef, useEffect, useState, useContext } from "react";
import { GetDataContext } from "../../contexts/GetData";

export function Header() {
  const [isSearchBarEnabled, setIsSearchBarEnabled] = useState(false);
  const [onInputFocus, setOnInputFocus] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {
    handleSearch,
    search,
    setSearch,
    rateLimitInfo,
    isLoading,
    setResponseStatus,
    responseStatus,
    resetTime,
    rateLimitExceeded,
  } = useContext(GetDataContext);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (search.trim() === "") {
      setOnInputFocus(false);
    } else {
      setOnInputFocus(true);
    }
  }, [search]);

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
                onClick={() => setIsSearchBarEnabled(!isSearchBarEnabled)}
              >
                <AiOutlineSearch size={25} />
              </button>
            </div>
            <MobileMenu
              resetTime={resetTime}
              rateLimitInfo={rateLimitInfo}
              isMobileMenuOpen={isMobileMenuOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
          </>
        ) : (
          <div
            className={`SearchWrapper
            ${onInputFocus ? "outline" : ""}
            ${isSearchBarEnabled ? "enabled" : ""}
            ${responseStatus === "error" ? "error" : ""}
            `}
          >
            <button
              className="danger"
              title="Close input"
              onClick={() => setIsSearchBarEnabled(!isSearchBarEnabled)}
            >
              <AiOutlineCloseCircle size={25} />
            </button>
            <form onSubmit={(e) => handleSearch(e)} className={`searchForm`}>
              <input
                onChange={(e) => {
                  setSearch(e.target.value);
                  setResponseStatus("");
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
                  title="clear input value"
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
