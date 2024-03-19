import { Slots, withSlots } from "@d0t/overeact";

const ChildA = () => {
  return <div>child A</div>;
};

const ChildB = () => {
  return <div>child B</div>;
};

const _WithSlotsExample = ({
  slots: { childA, childB, defaultChildren },
}: {
  slots: Slots<"childA" | "childB">;
}) => {
  return (
    <div>
      {childA}
      {defaultChildren}
      {childB}
    </div>
  );
};

const WithSlotsExample = withSlots(_WithSlotsExample, {
  ChildA,
  ChildB,
});

export default WithSlotsExample;
