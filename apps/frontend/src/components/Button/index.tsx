import { ComponentProps } from 'react';

import { Button as StyledButton } from './styles';

type Props = ComponentProps<typeof StyledButton> & Record<string, any>;

export default function Button({ disabled = false, ...rest }: Props) {
  return <StyledButton isDisabled={disabled} {...rest}></StyledButton>;
}
