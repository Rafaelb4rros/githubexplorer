import { MobileMenu } from "./MobileMenu";
import {
  AiOutlineGithub,
  AiOutlineSearch,
  AiOutlineCloseCircle,
} from "react-icons/ai";

import "./styles.scss";

import { useRef, useEffect, useState, FormEvent } from "react";

export function Header() {
  const [isSearchBarEnabled, setIsSearchBarEnabled] = useState(false);
  const [onInputFocus, setOnInputFocus] = useState(false);
  const [search, setSearch] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (search.trim() === "") {
      setOnInputFocus(false);
    } else {
      setOnInputFocus(true);
    }
  }, [search]);

  const handleSubmit = (e: FormEvent) => {
    if (search.trim() === "") return;
    e.preventDefault();

    console.log(search);
  };

  return (
    <header className="header">
      <div className="githubIcon">
        <AiOutlineGithub size={100} />
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
              isMobileMenuOpen={isMobileMenuOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
          </>
        ) : (
          <div
            className={`SearchWrapper
            ${onInputFocus ? "outline" : ""}
            ${isSearchBarEnabled ? "enabled" : ""}`}
          >
            <button
              className="danger"
              title="Close input"
              onClick={() => setIsSearchBarEnabled(!isSearchBarEnabled)}
            >
              <AiOutlineCloseCircle size={25} />
            </button>
            <form onSubmit={(e) => handleSubmit(e)} className={`searchForm`}>
              <input
                onChange={(e) => setSearch(e.target.value)}
                ref={inputRef}
                value={search}
                type="text"
                placeholder="Repos or users"
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
                disabled={search.trim() === ""}
                type="submit"
                title="Search"
              >
                <AiOutlineSearch size={25} />
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
}
