import { useContext, useMemo } from "react";

import { FaBars, FaGithub } from "react-icons/fa";
import { DocSearch } from "@docsearch/react";
import { match } from "ts-pattern";

import { isWindow } from "../../../../utils";
import Logo from "../logo/logo.component";
import { LayoutContext } from "../layout.context";
import GeulLabel from "../labels/geul-label/geul-label.component";

import { StyledHeader } from "./header.styles";
import OvereactLabel from "../labels/overeact-label/overeact-label.component";

const Header = ({ onMenuClick }: Record<"onMenuClick", () => void>) => {
  const { withoutSidebar } = useContext(LayoutContext);
  const label = useMemo(
    () =>
      isWindow() ? location.pathname.replace(/^\/dot/, "").split("/")[1] : null,
    [],
  );

  return (
    <StyledHeader.Root>
      <StyledHeader.Body>
        <StyledHeader.Left>
          {!withoutSidebar && (
            <button onClick={onMenuClick}>
              <FaBars />
            </button>
          )}
          <div>
            {match(label)
              .with("geul-js", () => <GeulLabel />)
              .with("overeact", () => <OvereactLabel />)
              .otherwise(() => (
                <Logo />
              ))}
          </div>
        </StyledHeader.Left>
        <StyledHeader.Right>
          <DocSearch
            appId={process.env.GATSBY_APPLICATION_ID!}
            apiKey={process.env.GATSBY_API_KEY!}
            indexName="Pages"
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
