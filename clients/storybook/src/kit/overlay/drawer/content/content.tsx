import React from 'react';

import { Drawer, Button, Typography } from '@sellgar/kit';

import s from './default.module.scss';

export const Content: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <div className={s.title}>
          <Typography size={'body-m'}>
            <p>Заголовок контента</p>
          </Typography>
        </div>
        <div>
          <Drawer.Close />
        </div>
      </div>
      <div>
        <Typography size={'caption-m'}>
          <p>
            callback: A function containing the logic for your Effect Event. When you define an Effect Event with
            useEffectEvent, the callback always accesses the latest values from props and state when it is invoked. This
            helps avoid issues with stale closures.
          </p>
        </Typography>
        <Typography size={'caption-m'}>
          <p>
            callback: A function containing the logic for your Effect Event. When you define an Effect Event with
            useEffectEvent, the callback always accesses the latest values from props and state when it is invoked. This
            helps avoid issues with stale closures.
          </p>
        </Typography>
        <Typography size={'caption-m'}>
          <p>
            callback: A function containing the logic for your Effect Event. When you define an Effect Event with
            useEffectEvent, the callback always accesses the latest values from props and state when it is invoked. This
            helps avoid issues with stale closures.
          </p>
        </Typography>
        <Typography size={'caption-m'}>
          <p>
            callback: A function containing the logic for your Effect Event. When you define an Effect Event with
            useEffectEvent, the callback always accesses the latest values from props and state when it is invoked. This
            helps avoid issues with stale closures.
          </p>
        </Typography>
        <Typography size={'caption-m'}>
          <p>
            callback: A function containing the logic for your Effect Event. When you define an Effect Event with
            useEffectEvent, the callback always accesses the latest values from props and state when it is invoked. This
            helps avoid issues with stale closures.
          </p>
        </Typography>
        <Typography size={'caption-m'}>
          <p>
            callback: A function containing the logic for your Effect Event. When you define an Effect Event with
            useEffectEvent, the callback always accesses the latest values from props and state when it is invoked. This
            helps avoid issues with stale closures.
          </p>
        </Typography>
        <Typography size={'caption-m'}>
          <p>
            callback: A function containing the logic for your Effect Event. When you define an Effect Event with
            useEffectEvent, the callback always accesses the latest values from props and state when it is invoked. This
            helps avoid issues with stale closures.
          </p>
        </Typography>
        <Typography size={'caption-m'}>
          <p>
            callback: A function containing the logic for your Effect Event. When you define an Effect Event with
            useEffectEvent, the callback always accesses the latest values from props and state when it is invoked. This
            helps avoid issues with stale closures.
          </p>
        </Typography>
        <Typography size={'caption-m'}>
          <p>
            callback: A function containing the logic for your Effect Event. When you define an Effect Event with
            useEffectEvent, the callback always accesses the latest values from props and state when it is invoked. This
            helps avoid issues with stale closures.
          </p>
        </Typography>
        <Drawer.Close>
          <Button>Закрыть</Button>
        </Drawer.Close>
      </div>
    </div>
  );
};
