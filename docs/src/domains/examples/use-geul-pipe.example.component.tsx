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
  const { geul, isRunning, isEnded, next, reset } = useGeulPipe(to, {
    ...options,
    initial: from,
  });

  const clickHandler = async () => {
    isEnded ? reset() : next();
  };

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
      <p className="result">result: {geul}</p>
      <button onClick={clickHandler} disabled={isRunning}>
        {isEnded ? "reset" : "run"}
      </button>
    </div>
  );
};

export default UseGeulPipeExample;
