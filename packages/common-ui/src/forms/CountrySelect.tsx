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
import { useFormContext } from 'react-hook-form';

import { TextField } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { countries } from '@northern.tech/utils/constants';

import { ControlledAutoComplete } from './Autocomplete';

const useStyles = makeStyles()(() => ({
  autocomplete: { width: 500 }
}));

export type Country = (typeof countries)[number];

export const findCountry = (code?: string): Country | null => countries.find(country => country.code === code) ?? null;

export interface ControlledCountrySelectProps {
  id?: string;
  required?: boolean;
}

export const ControlledCountrySelect = ({ id = 'country', required }: ControlledCountrySelectProps) => {
  const { classes } = useStyles();
  const {
    formState: { errors }
  } = useFormContext();
  const error = errors.country;
  return (
    <ControlledAutoComplete<Country>
      name="country"
      rules={{ required: required ? 'Country or region is required' : false }}
      autoHighlight
      className={classes.autocomplete}
      getOptionLabel={option => (typeof option === 'string' ? option : option.label)}
      options={countries}
      renderInput={params => <TextField {...params} error={!!error} helperText={error?.message as string} label="Country or region" id={id} />}
    />
  );
};
