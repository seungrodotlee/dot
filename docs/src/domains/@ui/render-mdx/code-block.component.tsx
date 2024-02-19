import { ComponentProps, ReactElement } from "react";

import { Highlight, themes } from "prism-react-renderer";

const CodeBlock = ({ children }: ComponentProps<"pre">) => {
  const className = (children as ReactElement)?.props?.className || "";
  const matches = className.match(/language-(?<lang>.*)/);
  const language = matches?.groups?.lang ?? "";

  return (
    <Highlight
      theme={themes.palenight}
      code={(children as ReactElement)?.props?.children.trim()}
      language={language}
    >
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
