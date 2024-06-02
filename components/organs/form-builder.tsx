import FormDateInput from './form-builder/form-date-input';
import { FormInput, FormInputProps } from './form-builder/form-input';
import { FormSelect, type FormSelectProps } from './form-builder/form-select';
import * as React from 'react';
import { UseFormReturn } from 'react-hook-form';

type InputOptions = { type: 'input' | 'date' | 'select' };

export type FormBuilderProps = {
  inputs:
    | Omit<FormInputProps & InputOptions, 'form'>[]
    | Omit<FormSelectProps & InputOptions, 'form'>[];
  form: UseFormReturn<any>;
};

export function FormBuilder({ inputs, form }: FormBuilderProps) {
  return (
    <>
      {inputs.map((item, i: number) => {
        switch (item.type) {
          case 'input':
            return <FormInput form={form} key={i} {...item} />;
          case 'date':
            return <FormDateInput form={form} key={i} {...item} />;
          case 'select':
            return (
              <FormSelect
                form={form}
                key={i}
                {...item}
                /* @ts-ignore */
                content={item.content}
              />
            );
        }
      })}
    </>
  );
}
