// Copyright 2020 Northern.tech AS
//
//    Licensed under the Apache License, Version 2.0 (the "License");
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
//
//        http://www.apache.org/licenses/LICENSE-2.0
//
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.
//@ts-nocheck
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { DatePicker } from '@mui/x-date-pickers';

import dayjs from 'dayjs';

const ensureStartOfDay = date => {
  const momentDate = typeof date === 'string' ? dayjs(date.replace('Z', '')) : dayjs(date);
  return `${momentDate.format().split('T')[0]}T00:00:00.000`;
};

const ensureEndOfDay = date => {
  const momentDate = typeof date === 'string' ? dayjs(date.replace('Z', '')) : dayjs(date);
  return `${momentDate.format().split('T')[0]}T23:59:59.999`;
};

export const TimeframePicker = ({ tonight: propsTonight, format = 'MMMM Do', fromLabel = 'From', toLabel = 'To', slotProps = {}, fallbackValue = dayjs() }) => {
  const [tonight] = useState(dayjs(propsTonight));
  const [maxStartDate, setMaxStartDate] = useState(tonight);
  const [minEndDate, setMinEndDate] = useState(tonight);

  const { control, setValue, watch, getValues } = useFormContext();

  const startDate = watch('startDate');
  const endDate = watch('endDate');

  useEffect(() => {
    const currentEndDate = getValues('endDate');
    const now = new Date().toISOString().replace('Z', '');
    if (startDate > currentEndDate) {
      setValue('endDate', ensureEndOfDay(startDate));
    } else if (currentEndDate > now) {
      setValue('endDate', now);
    }
    setMinEndDate(dayjs(startDate));
  }, [startDate, getValues, setValue]);

  useEffect(() => {
    const currentStartDate = getValues('startDate');
    if (endDate < currentStartDate) {
      setValue('startDate', ensureStartOfDay(endDate));
    }
    setMaxStartDate(dayjs(endDate));
  }, [endDate, getValues, setValue]);

  const handleChangeStartDate = date => ensureStartOfDay(date);

  const handleChangeEndDate = date => ensureEndOfDay(date);

  return (
    <div className="flexbox" style={{ flexWrap: 'wrap', gap: 15 }}>
      <Controller
        name="startDate"
        control={control}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            disableFuture
            format={format}
            label={fromLabel}
            maxDate={maxStartDate}
            onChange={e => onChange(handleChangeStartDate(e))}
            value={value ? dayjs(value) : fallbackValue}
            slotProps={slotProps}
          />
        )}
      />
      <Controller
        name="endDate"
        control={control}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            disableFuture
            format={format}
            label={toLabel}
            minDate={minEndDate}
            onChange={e => onChange(handleChangeEndDate(e))}
            value={value ? dayjs(value) : fallbackValue}
            slotProps={slotProps}
          />
        )}
      />
    </div>
  );
};

export default TimeframePicker;
