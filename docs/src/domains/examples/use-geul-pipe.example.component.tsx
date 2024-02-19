import { useCallback } from "react";

import { UseGeulPipeOptions, useGeulPipe } from "@dot/geul-react";

const UseGeulPipeExample = ({
  from,
  to,
  options,
}: {
  from: string;
  to: string[];
  options: UseGeulPipeOptions;
}) => {
  const { geul, next, reset } = useGeulPipe(to, { ...options, initial: from });

  const clickHandler = useCallback(async () => {
    next();
  }, [reset, next]);

  return (
    <div className="example">
      <p>
        value: <code>[{to.map((value) => `"${value}"`).join(", ")}]</code>
      </p>
      <p>options:</p>
      <p>
        {" "}
        - speed: <code>{"" + options.speed}</code>
      </p>
      <p>
        {" "}
        - initial: <code>"{"" + from}"</code>
      </p>
      <p>
        {" "}
        - decomposeOnBackspace:
        <code>{"" + options.decomposeOnBackspace}</code>
      </p>
      <p>result: {geul}</p>
      <button onClick={clickHandler}>run</button>
    </div>
  );
};

export default UseGeulPipeExample;
