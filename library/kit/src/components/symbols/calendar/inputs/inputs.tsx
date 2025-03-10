import React from 'react';

import { FieldWrapper } from '../../../wrappers';
import { LabelField } from '../../label-field';
import { Input } from '../../input';
import { Controls } from './controls';

import s from './default.module.scss';

export const Inputs = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.fields}>
        <div className={s.field}>
          <FieldWrapper>
            <FieldWrapper.Label>
              <LabelField label={'Дата'} />
            </FieldWrapper.Label>
            <FieldWrapper.Content>
              <Input size={'xs'} />
            </FieldWrapper.Content>
          </FieldWrapper>
        </div>
        <div className={s.field}>
          <FieldWrapper>
            <FieldWrapper.Label>
              <LabelField label={'Время'} />
            </FieldWrapper.Label>
            <FieldWrapper.Content>
              <Input size={'xs'} />
            </FieldWrapper.Content>
          </FieldWrapper>
        </div>
      </div>
      <div className={s.control}>
        <Controls onApply={() => {}} onCancel={() => {}} />
      </div>
    </div>
  );
};
