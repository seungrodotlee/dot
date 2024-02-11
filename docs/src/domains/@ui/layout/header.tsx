import { useMemo } from "react";

import { FaGithub } from "react-icons/fa";
import { DocSearch } from "@docsearch/react";

import Logo from "./logo";
import Labels from "./labels";
import { StyledHeader } from "./header.styles";

const Header = () => {
  const label = useMemo(
    () => location.pathname.split("/")[1] as unknown as keyof typeof Labels,
    [],
  );

  return (
    <StyledHeader.Root>
      <StyledHeader.Body>
        <StyledHeader.Left>
          {label ? Labels[label]({}) : <Logo />}
        </StyledHeader.Left>
        <StyledHeader.Right>
          <DocSearch
            appId={process.env.GATSBY_APPLICATION_ID!}
            indexName="Pages"
            apiKey={process.env.GATSBY_API_KEY!}
          />
          <StyledHeader.Link to="/">
            <FaGithub />
          </StyledHeader.Link>
        </StyledHeader.Right>
      </StyledHeader.Body>
    </StyledHeader.Root>
  );
};

export default Header;
