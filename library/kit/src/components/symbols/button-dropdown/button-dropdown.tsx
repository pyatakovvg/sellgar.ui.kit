import React from 'react';

import { Button } from '../button';
import { Dropdown } from '../../helpers/dropdown';

interface IProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  form?: 'icon-only';
  style?: 'primary' | 'secondary' | 'tertiary' | 'ghost';
  size?: 'lg' | 'md' | 'sm' | 'xs';
  target?: 'destructive';
  shape?: 'rounded' | 'pill';
  leadIcon?: React.ReactNode;
  tailIcon?: React.ReactNode;
  label?: string | number;
}

export const ButtonDropdown: React.FC<IProps> = ({}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dropdown open={open} setOpen={setOpen}>
      <Dropdown.Reference
        reference={() => {
          return <Button onClick={() => setOpen(true)}>Нажми меня</Button>;
        }}
      />
    </Dropdown>
  );
};
