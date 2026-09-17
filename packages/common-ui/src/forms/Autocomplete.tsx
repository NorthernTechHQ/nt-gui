// Copyright 2024 Northern.tech AS
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
import type { ReactNode } from 'react';
import type { FieldValues, Path, RefCallBack } from 'react-hook-form';
import { Controller, useFormContext } from 'react-hook-form';

import type { AutocompleteProps, AutocompleteRenderInputParams } from '@mui/material';
import { Autocomplete } from '@mui/material';

type AutocompleteBaseProps<T> = AutocompleteProps<T, false, false, true>;

export type ControlledAutoCompleteProps<T, TFieldValues extends FieldValues = FieldValues> = {
  freeSolo?: boolean;
  name: Path<TFieldValues>;
  /** ignored - the form controller provides the change handler */
  onChange?: AutocompleteBaseProps<T>['onChange'];
  /** ignored - the form controller provides the change handler */
  onInputChange?: AutocompleteBaseProps<T>['onInputChange'];
  renderInput: (params: AutocompleteRenderInputParams & { inputRef: RefCallBack }) => ReactNode;
} & Omit<AutocompleteBaseProps<T>, 'freeSolo' | 'onChange' | 'onInputChange' | 'renderInput' | 'value'>;

export const ControlledAutoComplete = <T, TFieldValues extends FieldValues = FieldValues>({
  freeSolo,
  name,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onInputChange,
  renderInput,
  ...remainder
}: ControlledAutoCompleteProps<T, TFieldValues>) => {
  const { control } = useFormContext<TFieldValues>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange: formOnChange, ref, value, ...field } }) => {
        const onChangeHandler: AutocompleteBaseProps<T>['onChange'] = (_e, data) => formOnChange(data);
        const onInputChangeHandler: AutocompleteBaseProps<T>['onInputChange'] = (_e, data, reason) => {
          if (reason === 'reset' && !_e) {
            return;
          }
          formOnChange(data);
        };
        const wrappedRenderInput = (params: AutocompleteRenderInputParams) => renderInput({ ...params, inputRef: ref });
        const modeProps = (
          freeSolo
            ? { freeSolo: true, inputValue: (value ?? '') as string, onInputChange: onInputChangeHandler }
            : { value: (value ?? null) as T | null, onChange: onChangeHandler }
        ) as Partial<AutocompleteBaseProps<T>>;
        return <Autocomplete<T, false, false, true> autoSelect={false} {...field} {...modeProps} renderInput={wrappedRenderInput} {...remainder} />;
      }}
    />
  );
};
