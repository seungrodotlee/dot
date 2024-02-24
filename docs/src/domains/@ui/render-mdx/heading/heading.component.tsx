import React, { ComponentProps, ElementType, createElement } from "react";

import { textContent } from "../../../@shared/get-text-content";

import { StyledHeading } from "./heading.style";

const Heading = <E extends ElementType>({
  children,
  as,
}: ComponentProps<"h1"> & { as: E }) => {
  const id = textContent(children)
    .replace('""', "EMPTY_STRING")
    .replace("->", "to")
    .replace(/[^가-힣a-zA-Z0-9\-_\s]+/g, "")
    .replace(/\s/g, "_");

  return createElement(StyledHeading.Root, {
    as,
    id,
    children: (
      <>
        {children}
        <StyledHeading.Hash href={`#${id}`}>#</StyledHeading.Hash>
      </>
    ),
  });
};

export default Heading;
