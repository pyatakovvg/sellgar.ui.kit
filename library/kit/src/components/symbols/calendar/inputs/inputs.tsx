import React from 'react';
import moment from 'moment';

import { FieldWrapper } from '../../../wrappers';
import { LabelField } from '../../label-field';
import { InputMask } from '../../input-mask';
import { Controls } from './controls';

import s from './default.module.scss';

interface IProps {
  value: string;
  onChange(value: string): void;
}

export const Inputs: React.FC<IProps> = (props) => {
  const [date, setDate] = React.useState(() => moment(props.value).format('DD.MM.YYYY'));
  const [time, setTime] = React.useState(() => moment(props.value).format('HH:mm'));

  const [errorDateValidate, setErrorDateValidate] = React.useState(false);
  const [errorTimeValidate, setErrorTimeValidate] = React.useState(false);

  React.useEffect(() => {
    setDate(moment(props.value).format('DD.MM.YYYY'));
    setTime(moment(props.value).format('HH:mm'));
  }, [props.value]);

  const handleChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value;
    const matchDate = date.match(/(0[1-9]|[1-2][0-9]|3[0-1])\.(0[1-9]|1[0-2])\.(\d{4})/);

    setErrorDateValidate(!matchDate);
    setDate(date);
  };

  const handleChangeTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    const time = event.target.value;
    const matchTime = time.match(/([0-1][0-9]|2[0-3]):([0-5][0-9])/);

    setErrorTimeValidate(!matchTime);
    setTime(time);
  };

  const handleChange = () => {
    const matchDate = date.match(/(0[1-9]|[1-2][0-9]|3[0-1])\.(0[1-9]|1[0-2])\.(\d{4})/);
    const matchTime = time.match(/([0-1][0-9]|2[0-3]):([0-5][0-9])/);

    if (!matchDate || !matchTime) {
      return void 0;
    }

    const result = moment()
      .year(Number(matchDate[3]))
      .month(Number(matchDate[2]) - 1)
      .date(Number(matchDate[1]))
      .hour(Number(matchTime[1]))
      .minute(Number(matchTime[2]))
      .second(0)
      .millisecond(0)
      .format();

    props.onChange(result);
  };

  return (
    <div className={s.wrapper}>
      <div className={s.fields}>
        <div className={s.field}>
          <FieldWrapper>
            <FieldWrapper.Label>
              <LabelField label={'Дата'} />
            </FieldWrapper.Label>
            <FieldWrapper.Content>
              <InputMask
                size={'xs'}
                mask={'__.__.____'}
                replacement={{ _: /\d/ }}
                value={date}
                target={errorDateValidate ? 'destructive' : undefined}
                onChange={handleChangeDate}
              />
            </FieldWrapper.Content>
          </FieldWrapper>
        </div>
        <div className={s.field}>
          <FieldWrapper>
            <FieldWrapper.Label>
              <LabelField label={'Время'} />
            </FieldWrapper.Label>
            <FieldWrapper.Content>
              <InputMask
                size={'xs'}
                mask={'__:__'}
                replacement={{ _: /\d/ }}
                value={time}
                target={errorTimeValidate ? 'destructive' : undefined}
                onChange={handleChangeTime}
              />
            </FieldWrapper.Content>
          </FieldWrapper>
        </div>
      </div>
      <div className={s.control}>
        <Controls onApply={() => handleChange()} onCancel={() => {}} />
      </div>
    </div>
  );
};
