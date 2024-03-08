import { ComponentProps, createContext } from "react";

type LayoutContextProps = {
  withoutSidebar?: boolean;
};

export const LayoutContext = createContext<LayoutContextProps>({
  withoutSidebar: false,
});

export const LayoutProvider = ({
  value,
  children,
}: Pick<ComponentProps<"div">, "children"> &
  Record<"value", LayoutContextProps>) => {
  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};
