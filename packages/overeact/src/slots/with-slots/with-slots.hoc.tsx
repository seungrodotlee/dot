import { JSXElementConstructor, ReactElement, ReactNode } from "react";

import { useSlots } from "../use-slots/use-slots.hook";
import { reduceComponentSlots } from "../internal/reduce-component-slots.util";

type ToPascalCase<T> = T extends `${infer First}${infer Rest}`
  ? `${Uppercase<First>}${Rest}`
  : T;

export const withSlots = <
  Comp extends (props: any) => ReactElement,
  Props extends Parameters<Comp>[0],
  SlotConstructors extends Record<
    ToPascalCase<Exclude<keyof Props["slots"], "defaultChildren">>,
    keyof JSX.IntrinsicElements | JSXElementConstructor<any>
  >,
>(
  Component: Comp,
  slots: SlotConstructors,
) => {
  const _ComponentWithSlot = ({
    children,
    ...props
  }: Omit<Props, "slots"> & Record<"children", ReactNode>) => {
    const slotElements = useSlots(children, slots);

    return <Component {...(props as any)} slots={slotElements} />;
  };

  const ComponentWithSlot = Object.assign(
    _ComponentWithSlot,
    reduceComponentSlots(slots),
  );

  return ComponentWithSlot;
};
