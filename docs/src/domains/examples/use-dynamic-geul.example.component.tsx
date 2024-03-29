import { ChangeEventHandler, useCallback, useState } from "react";

import { UseDynamicGeulOptions, useDynamicGeul } from "@d0t/geul-react";

const UseDynamicGeulExample = ({
  from,
  options,
}: Record<"from", string> & Record<"options", UseDynamicGeulOptions>) => {
  const [value, setValue] = useState<string>("안녕하세요");
  const { geul, isRunning, run, reset } = useDynamicGeul(from, { ...options });

  const inputHandler = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setValue(e.currentTarget.value);
    },
    [],
  );

  const clickHandler = useCallback(async () => {
    run(value);
  }, [reset, run, value]);

  return (
    <div className="example">
      <p>
        value: <input value={value} onChange={inputHandler} />
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
      <button onClick={clickHandler} disabled={isRunning || value === geul}>
        run
      </button>
    </div>
  );
};

export default UseDynamicGeulExample;
