import { JSXElementConstructor, ReactElement, ReactNode } from "react";

import { reduceComponentSlots } from "../internal/reduce-component-slots.util";
import { ToPascalCase } from "../internal/slots.types";
import { useSlots } from "../use-slots/use-slots.hook";

export const withSlots = <
  Comp extends (props: any) => ReactElement,
  Props extends Parameters<Comp>[0],
  SlotConstructors extends Record<
    ToPascalCase<Exclude<keyof Props["slots"], "defaultChildren">>,
    keyof JSX.IntrinsicElements | JSXElementConstructor<any>
  >,
>(
  Component: Comp,
  slotConstructors: SlotConstructors,
) => {
  const _ComponentWithSlot = ({
    children,
    ...props
  }: Omit<Props, "slots"> & Record<"children", ReactNode>) => {
    const slotElements = useSlots(children, slotConstructors);

    return <Component {...(props as any)} slots={slotElements} />;
  };

  const ComponentWithSlot = Object.assign(
    _ComponentWithSlot,
    reduceComponentSlots(slotConstructors),
  );

  return ComponentWithSlot;
};
