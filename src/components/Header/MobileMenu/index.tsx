import { useContext } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiAlertCircle } from "react-icons/fi";
import { GetDataContext } from "../../../contexts/GetData";
import { useMobileMenuContext } from "../../../hooks/useMobileMenuContext";
import { ToggleMenu } from "../toggleMenu";
import "./styles.scss";

type MobileMenuProps = {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isMobileMenuOpen: boolean) => void;
  rateLimitInfo:
    | {
        limit: number;
        used: number;
        reset: number;
      }
    | undefined;
  resetTime: Date | undefined;
};

export function MobileMenu({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  rateLimitInfo,
}: MobileMenuProps) {
  const { resetTime } = useContext(GetDataContext);

  return (
    <div className={`mobileMenuContainer  ${isMobileMenuOpen ? "active" : ""}`}>
      <div className="mobileMenuIcon">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <AiOutlineMenu size={25} />
        </button>
        {isMobileMenuOpen && <ToggleMenu />}
      </div>
      <div className={`mobileMenuWrapper`}>
        <nav className="mobileMenu">
          <ul>
            <li className="list-item">
              <div className="iconContainer">
                <FiAlertCircle size={25} />
              </div>
              You have{" "}
              <p>
                <span
                  className={`${
                    rateLimitInfo &&
                    rateLimitInfo?.limit - rateLimitInfo?.used === 0
                      ? "blocked"
                      : ""
                  }`}
                >
                  [{" "}
                  {rateLimitInfo && rateLimitInfo?.limit - rateLimitInfo?.used}{" "}
                  ]
                </span>
                Request(s) remaining on the GitHub API!
              </p>
            </li>
            <li>
              <p>
                Your requests will reset automatically at{" "}
                {resetTime?.getHours()}:{resetTime?.getMinutes()}
              </p>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
