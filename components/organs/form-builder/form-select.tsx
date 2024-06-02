import { X } from 'lucide-react';
import React, { ReactNode, useEffect, useState } from 'react';
import { type UseFormReturn, useWatch } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Button } from '@/components/ui/button';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';

export type FormSelectProps = {
  form: UseFormReturn;
  name: string;
  content?: {
    value: string | Record<string, string>;
    label: string | ReactNode;
  }[];
  label?: string;
  placeholder?: string;
  description?: string;
  className?: string;
  isLoading?: boolean;
  resetField?: 'default' | 'empty';
};
export function FormSelect({
  form,
  name,
  content,
  label,
  placeholder,
  description,
  className,
  isLoading,
  resetField,
}: FormSelectProps) {
  const [value, setValue] = useState<string>();

  const watch = useWatch({ control: form.control, name: name });

  useEffect(() => {
    if (watch !== value) {
      setValue(watch);
    }
  }, [watch]);

  function handleReset() {
    setValue('');

    form.resetField(name, {
      ...(resetField === 'empty' && {
        defaultValue: '',
      }),
    });
  }

  if (isLoading)
    return <div className='w-70 h-10 animate-pulse rounded bg-accent' />;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}

          <div className='flex gap-2'>
            <Select
              value={value}
              onValueChange={(value) => {
                field.onChange(value);
                setValue(value);
              }}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent className='max-h-[500px]'>
                {content?.map((item, i) => (
                  <SelectItem
                    className='cursor-pointer'
                    key={i}
                    value={String(item.value)}
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {resetField && form.getValues(name) && (
              <div>
                <Button
                  size='square'
                  variant='outline'
                  type='button'
                  icon={<X size={16} />}
                  onClick={() => handleReset()}
                />
              </div>
            )}
          </div>

          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
