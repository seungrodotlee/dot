import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import "twin.macro";

import { Link, type HeadFC } from "gatsby";
import { useDynamicGeul } from "@dot/geul-react";
import { delay } from "@fxts/core";

import Layout from "../domains/@ui/layout/layout.component";
import { StyledIndex } from "../styles/pages.styles";

const IndexPage = () => {
  const {
    geul: ing,
    isRunning: isIngRunning,
    run: runIng,
  } = useDynamicGeul("", {
    speed: 50,
    decomposeOnBackspace: true,
  });

  const {
    geul: wha,
    isRunning: isWhaRunning,
    run: runWha,
  } = useDynamicGeul("", {
    speed: 50,
    decomposeOnBackspace: true,
  });

  const {
    geul: asy,
    isRunning: isAsyRunning,
    run: runAsy,
  } = useDynamicGeul("", {
    speed: 50,
    decomposeOnBackspace: true,
  });

  const {
    geul: eed,
    isRunning: isEedRunning,
    run: runEed,
  } = useDynamicGeul("", {
    speed: 50,
    decomposeOnBackspace: true,
  });

  const hovered = useRef<boolean>(false);
  const [transformed, setTransformed] = useState<boolean>(false);

  const isRunning = useMemo(
    () => isIngRunning || isWhaRunning || isAsyRunning || isEedRunning,
    [isIngRunning, isWhaRunning, isAsyRunning, isEedRunning],
  );

  const mouseEnterHandler: MouseEventHandler<HTMLDivElement> =
    useCallback(async () => {
      hovered.current = true;
      setTransformed(true);

      await delay(2000);
      if (!hovered.current) {
        setTransformed(false);
      }
    }, [isRunning]);

  const mouseLeaveHandler: MouseEventHandler<HTMLDivElement> =
    useCallback(() => {
      hovered.current = false;

      if (!isRunning) {
        setTransformed(false);
      }
    }, [isRunning]);

  useEffect(() => {
    if (hovered.current) {
      runIng("ING");
      runWha(" WHA");
      runAsy("ASY");
      runEed("EED ");
    } else {
      runIng("");
      runWha("");
      runAsy("");
      runEed("");
    }
  }, [transformed]);

  return (
    <Layout withoutSidebar>
      <StyledIndex.Root>
        <StyledIndex.Title
          transformed={transformed}
          onMouseEnter={mouseEnterHandler}
          onMouseLeave={mouseLeaveHandler}
        >
          <div>
            <span>DO</span>
            <span>{ing}</span>
            <span>{wha}</span>
            <span>T </span>
          </div>
          <div>
            <span>U</span>
            <span className="trans-shrink">&nbsp;</span>
            <span>N</span>
            <span>{eed}</span>
            <span>I</span>
            <span className="trans-hidden">S&nbsp;</span>
            <span>VER</span>
            <span className="trans-show">S</span>
            <span className="trans-hidden">Y</span>
            <span className="trans-hidden">&nbsp;</span>
            <span>E</span>
            <span>{asy}</span>
          </div>
        </StyledIndex.Title>
        <StyledIndex.ContentWrap>
          <StyledIndex.Content>
            DOT은 JS/TS에서 풀스택에 걸쳐 사용할 수 있는
            <br />
            다양한 라이브러리를 제공하는 모노레포에요.
            <br />
            우측에서 알아보고자 하는 기술스택을 선택해 탐색해보세요!
          </StyledIndex.Content>
          <StyledIndex.Links>
            <Link to="/geul-js">Geul.js</Link>
          </StyledIndex.Links>
        </StyledIndex.ContentWrap>
      </StyledIndex.Root>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
