import { Link } from "gatsby";
import { FaGithub } from "react-icons/fa";
import { RiSearch2Fill } from "react-icons/ri";

import { useOverlay } from "../overlay/use-overlay.hook";

import { StyledHeader } from "./header.styles";

const Header = () => {
  useOverlay("Search_Modal");

  return (
    <StyledHeader.Root>
      <StyledHeader.Body>
        <StyledHeader.Search>
          <p>Search</p>
          <RiSearch2Fill />
        </StyledHeader.Search>
        <Link to="/">
          <FaGithub />
        </Link>
      </StyledHeader.Body>
    </StyledHeader.Root>
  );
};

export default Header;
