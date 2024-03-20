import { useState } from "react";

import { UseGeulOptions, useGeul } from "@d0t/geul-react";

const UseGeulExample = ({
  from,
  to,
  options,
}: Record<"from" | "to", string> & Record<"options", UseGeulOptions>) => {
  const { geul, isRunning, run, reset } = useGeul(to, {
    ...options,
    initial: from,
  });

  const [isFired, setFired] = useState<boolean>(false);

  const clickHandler = async () => {
    isFired ? reset() : run();
    setFired((isFired) => !isFired);
  };

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
      <button onClick={clickHandler} disabled={isRunning}>
        {isFired ? "reset" : "run"}
      </button>
    </div>
  );
};

export default UseGeulExample;
