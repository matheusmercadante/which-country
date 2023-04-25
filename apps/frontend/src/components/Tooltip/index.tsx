import { ComponentProps } from 'react';

import { Container } from './styles';

interface TooltipProps extends ComponentProps<any> {
  title: string;
  className?: string;
}

export default function Tooltip({ title, className = '', children }: TooltipProps) {
  return (
    <Container className={className}>
      {children}

      <span>{title}</span>
    </Container>
  );
}
