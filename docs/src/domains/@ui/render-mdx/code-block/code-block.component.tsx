import { ComponentProps, ReactElement } from "react";

import { Highlight, themes } from "prism-react-renderer";

const CodeBlock = ({ children: _children }: ComponentProps<"pre">) => {
  const children = _children as ReactElement | undefined;
  const className = children?.props?.className ?? "";
  const matches = className.match(/language-(?<lang>.*)/);
  const language = matches?.groups?.lang ?? "";
  const code = children?.props?.children.trim();

  return (
    <Highlight theme={themes.palenight} code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre style={style} className={className}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default CodeBlock;
