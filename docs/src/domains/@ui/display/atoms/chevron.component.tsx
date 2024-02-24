import { StyledChevron } from "./chevron.styles";
import { ChevronProps } from "./chevron.types";

const Chevron = ({ direction }: ChevronProps) => (
  <StyledChevron.Root isBottom={direction === "bottom"}>
    <StyledChevron.Partition isReverse={direction !== "bottom"} />
    <StyledChevron.Partition isReverse={direction === "bottom"} />
  </StyledChevron.Root>
);

export default Chevron;
