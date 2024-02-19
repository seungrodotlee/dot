import { useCallback } from "react";

import { UseGeulOptions, useGeul } from "@dot/geul-react";
import { delay } from "@fxts/core";

const UseGeulExample = ({
  from,
  to,
  options,
}: Record<"from" | "to", string> & Record<"options", UseGeulOptions>) => {
  const { geul, run, reset } = useGeul(to, { ...options, initial: from });

  const clickHandler = useCallback(async () => {
    run(async () => {
      await delay(3000);
      reset();
    });
  }, [reset, run]);

  return (
    <div className="example">
      <p>
        value: <code>"{to}"</code>
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
      <p className="result">result: {geul}</p>
      <button onClick={clickHandler}>run</button>
    </div>
  );
};

export default UseGeulExample;
