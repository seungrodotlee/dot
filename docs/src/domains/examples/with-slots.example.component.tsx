import { SlotsProp, withSlots } from "@d0t/overeact";
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
});

const childACSS = css({
  backgroundColor: "#92731d !important",
});

const childBCSS = css({
  backgroundColor: "#1d5092 !important",
});

const ChildA = () => {
  return <div css={childACSS}>child A</div>;
};

const ChildB = () => {
  return <div css={childBCSS}>child B</div>;
};

const WithSlotsExample = ({
  slots: { childA, childB, defaultChildren },
}: SlotsProp<"childA" | "childB">) => {
  return (
    <div css={slotsExampleCSS}>
      {childA}
      {defaultChildren}
      {childB}
    </div>
  );
};

export default withSlots(WithSlotsExample, {
  ChildA,
  ChildB,
});
