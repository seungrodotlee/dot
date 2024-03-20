import { ComponentProps } from "react";

import { useSlots } from "@d0t/overeact";
import { css } from "@emotion/react";

const slotsExampleCSS = css({
  backgroundColor: "#0c1018",
  borderRadius: "6px",
  padding: "16px",
  "> *": {
    backgroundColor: "#204230",
    padding: "8px 16px",
    marginBottom: "1rem !important",
    borderRadius: "4px",
  },
  "> h1": {
    backgroundColor: "#1d5092",
  },
});

const childACSS = css({
  backgroundColor: "#92731d !important",
});

export const ChildA = () => {
  return <div css={childACSS}>child A</div>;
};

const UseSlotsExample = ({ children, ...props }: ComponentProps<"div">) => {
  const { title, childA, defaultChildren } = useSlots(children, {
    title: "h1",
    childA: ChildA,
  });

  return (
    <div css={slotsExampleCSS} {...props}>
      {title}
      {childA}
      {defaultChildren}
    </div>
  );
};

export default UseSlotsExample;
