import React from 'react';

import { type TIconName } from '../icon';
import { Button } from '../button';
import { Dropdown } from '../../helpers/dropdown';

interface IProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  form?: 'icon-only';
  style?: 'primary' | 'secondary' | 'tertiary' | 'ghost';
  size?: 'lg' | 'md' | 'sm' | 'xs';
  target?: 'destructive';
  shape?: 'rounded' | 'pill';
  leadicon?: TIconName;
  tailicon?: TIconName;
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
      <Dropdown.Options
        empty={null}
        options={() => {
          return [
            <Dropdown.Option index={0} option={() => <p>Первая ссылка</p>} />,
            <Dropdown.Option index={1} option={() => <p>Вторая ссылка</p>} />,
          ];
        }}
      />
    </Dropdown>
  );
};
