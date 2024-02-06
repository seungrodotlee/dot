import * as React from "react";

import "twin.macro";
import { StaticImage } from "gatsby-plugin-image";

import Layout from "../domains/@ui/layout/layout";
import { StyledIndex } from "../styles/pages.styles";

import { Link, type HeadFC, type PageProps } from "gatsby";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout withoutSidebar>
      <StyledIndex.Root>
        <StyledIndex.Title>WELCOME TO DOT UNIVERSE</StyledIndex.Title>
        <StyledIndex.ContentWrap>
          <StyledIndex.Content>
            DOT은 JS/TS에서 풀스택에 걸쳐 사용할 수 있는
            <br />
            다양한 라이브러리를 제공하는 모노레포에요.
            <br />
            우측에서 알아보고자 하는 기술스택을 선택해 탐색해보세요!
          </StyledIndex.Content>
          <StyledIndex.Links>
            <Link to="/">Geul.js</Link>
          </StyledIndex.Links>
        </StyledIndex.ContentWrap>
      </StyledIndex.Root>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
