import { FC, ForwardRefExoticComponent } from 'react';

import { Interpolation } from '@emotion/react';

declare module "react" {
  type State<S> = [S, Dispatch<SetStateAction<S>>];

  type Componentable<P = any> = FC<P> | ForwardRefExoticComponent<P> | ((props: P) => JSX.Element);

  type ComponentPropsWith<Type extends keyof JSX.IntrinsticElements, Additional = Record<string, never>> = ComponentProps<Type> & {
    css?: Interpolation<Theme>
  } & Additional;
}