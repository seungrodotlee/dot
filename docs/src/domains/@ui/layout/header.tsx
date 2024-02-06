import { useEffect, useState } from "react";

import { FaGithub } from "react-icons/fa";
import { DocSearch } from "@docsearch/react";

import Logo from "./logo";
import Labels from "./labels";
import { StyledHeader } from "./header.styles";

const Header = () => {
  const [Label, setLabel] = useState<(...args: any) => JSX.Element>();
  useEffect(() => {
    const run = async () => {
      setLabel(
        Labels[
          location.pathname.split("/")[1] as unknown as keyof typeof Labels
        ],
      );
    };

    run();
  }, []);

  return (
    <StyledHeader.Root>
      <StyledHeader.Body>
        <StyledHeader.Left>{Label ? <Label /> : <Logo />}</StyledHeader.Left>
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
