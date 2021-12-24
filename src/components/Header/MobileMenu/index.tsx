import { AiOutlineMenu } from "react-icons/ai";
import "./styles.scss";

type MobileMenuProps = {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isMobileMenuOpen: boolean) => void;
};

export function MobileMenu({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: MobileMenuProps) {
  console.log(isMobileMenuOpen);
  return (
    <div className={`mobileMenuContainer  ${isMobileMenuOpen ? "active" : ""}`}>
      <div className="mobileMenuIcon">
        <button
          onClick={() => {
            setIsMobileMenuOpen(!isMobileMenuOpen);
            setIsMobileMenuOpen(!isMobileMenuOpen);
          }}
        >
          <AiOutlineMenu size={25} />
        </button>
      </div>

      <div className={`mobileMenuWrapper`}>
        <nav className="mobileMenu">
          <ul>
            <li>about</li>
            <li>about</li>
            <li>about</li>
            <li>about</li>
            <li>about</li>
            <li>about</li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
