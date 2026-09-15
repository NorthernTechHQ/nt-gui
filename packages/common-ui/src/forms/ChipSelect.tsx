// Copyright 2023 Northern.tech AS
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
import type { Ref } from 'react';
import { useState } from 'react';
import type { ControllerProps, FieldValues, Path } from 'react-hook-form';
import { Controller, useFormContext } from 'react-hook-form';

import { Cancel as CancelIcon } from '@mui/icons-material';
import { Autocomplete, Chip, TextField } from '@mui/material';

import { duplicateFilter, unionizeStrings } from '@northern.tech/utils/helpers';

import { TruncatedTagList } from './helpers';

type SelectionSetter = (selection: string[]) => void;

export interface ChipSelectProps<TFieldValues extends FieldValues = FieldValues> {
  chipDisplay?: boolean;
  className?: string;
  disabled?: boolean;
  forcePopupIcon?: boolean;
  helperText?: string;
  inputRef?: Ref<HTMLInputElement>;
  label?: string;
  name: Path<TFieldValues>;
  options?: string[];
  placeholder?: string;
  rules?: ControllerProps<TFieldValues>['rules'];
}

export const ChipSelect = <TFieldValues extends FieldValues = FieldValues>({
  chipDisplay = true,
  className = '',
  name,
  disabled = false,
  forcePopupIcon = false,
  helperText,
  inputRef,
  label = '',
  options = [],
  placeholder = '',
  rules
}: ChipSelectProps<TFieldValues>) => {
  const [value, setValue] = useState('');

  const { control, getValues } = useFormContext<TFieldValues>();

  // to allow device types to automatically be selected on entered ',' we have to filter the input and transform any completed device types (followed by a ',')
  // while also checking for duplicates and allowing complete resets of the input
  const onTextInputChange = (inputValue: string | null, reason: string, setCurrentSelection: SelectionSetter) => {
    const value = inputValue || '';
    if (reason === 'clear') {
      setValue('');
      return setCurrentSelection([]);
    } else if (reason === 'reset') {
      return setValue('');
    }
    const lastIndex = value.lastIndexOf(',');
    const commaSeparatedValues = value.substring(0, lastIndex).split(',');
    const tagWorthyValues = commaSeparatedValues.flatMap(potentialTag => potentialTag.trim().split(/\s+/)).filter(Boolean);
    const possibleSelection = tagWorthyValues.filter(duplicateFilter);
    const currentValue = value.substring(lastIndex + 1);
    const selection: string[] = getValues(name) ?? [];
    const nextSelection = unionizeStrings(selection, possibleSelection);
    setValue(currentValue);
    setCurrentSelection(nextSelection);
  };

  const onTextInputLeave = (value: string, setCurrentSelection: SelectionSetter) => {
    const selection: string[] = getValues(name) ?? [];
    const nextSelection = unionizeStrings(selection, value.trim().split(/\s+/).filter(Boolean));
    setCurrentSelection(nextSelection);
    setValue('');
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange: formOnChange, value: currentSelection, ref, ...props }, fieldState: { error } }) => (
        <Autocomplete
          autoSelect={false}
          id={`${name}-chip-select`}
          value={currentSelection ?? []}
          className={className}
          filterSelectedOptions
          forcePopupIcon={forcePopupIcon}
          freeSolo={true}
          includeInputInList={true}
          multiple
          onChange={(e, value) => (!chipDisplay || (e as unknown as KeyboardEvent).key !== 'Backspace' ? formOnChange(value) : null)}
          onInputChange={(e, v, reason) => onTextInputChange(null, reason, formOnChange)}
          options={options}
          readOnly={disabled}
          ref={ref}
          renderValue={
            chipDisplay
              ? (values, getItemProps) =>
                  values.map((option, index) => {
                    const { key, onDelete, ...tagProps } = getItemProps({ index });
                    return (
                      <Chip
                        label={option}
                        key={key}
                        onDelete={onDelete}
                        size="small"
                        deleteIcon={<CancelIcon onClick={onDelete} aria-label={`${option}-delete`} />}
                        {...tagProps}
                      />
                    );
                  })
              : values => <TruncatedTagList values={values} />
          }
          renderInput={params => (
            <TextField
              {...params}
              fullWidth
              slotProps={{
                ...params.slotProps,
                input: { ...params.slotProps.input, disableUnderline: true },
                htmlInput: { ...params.slotProps.htmlInput, value }
              }}
              key={`${name}-input`}
              label={label}
              disabled={disabled}
              variant={disabled ? 'standard' : 'outlined'}
              onBlur={e => onTextInputLeave(e.target.value, formOnChange)}
              onChange={e => onTextInputChange(e.target.value, 'input', formOnChange)}
              placeholder={currentSelection?.length ? '' : placeholder}
              error={!!error?.message}
              helperText={error?.message || helperText}
              inputRef={inputRef}
            />
          )}
          {...props}
        />
      )}
    />
  );
};

export default ChipSelect;
