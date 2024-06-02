'use client';

import { Eye, EyeOff } from 'lucide-react';
import React from 'react';
import { useEffect, useState } from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';

export type FormInputProps = {
  form: UseFormReturn;
  label?: string;
  placeholder?: string;
  description?: string;
  name: string;
  button?: ButtonProps;
  inputType?: HTMLInputElement['type'];
  className?: string;
  labelClass?: string;
  isLoading?: boolean;
  disabled?: boolean;
  disabledMuted?: boolean;
};

export function FormInput({
  form,
  label,
  placeholder,
  description,
  name,
  inputType = 'text',
  button,
  className,
  labelClass,
  isLoading,
  disabled,
  disabledMuted,
}: FormInputProps) {
  const [type, setType] = useState(inputType);

  useEffect(() => {
    setType(inputType);
  }, []);

  const handleType = () => {
    switch (type) {
      case 'password':
        setType('text');
        break;
      case 'text':
        setType('password');
    }
  };

  const iconSize = 'h-4 w-4';

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('w-full', className)}>
          {label && <FormLabel className={labelClass}>{label}</FormLabel>}

          {isLoading ? (
            <div className='w-70 h-10 animate-pulse rounded bg-accent' />
          ) : (
            <FormControl>
              <div className='flex gap-2'>
                <Input
                  disabled={disabled || disabledMuted}
                  placeholder={placeholder}
                  {...field}
                  type={type}
                  className={cn({
                    'border-0 bg-muted disabled:opacity-100': disabledMuted,
                  })}
                  {...(inputType === 'number' && {
                    onChange: (event) => field.onChange(+event.target.value),
                  })}
                  {...(!field.value && {
                    value: '',
                  })}
                />
                {inputType === 'password' && (
                  <Button
                    type='button'
                    variant='outline'
                    size='square'
                    icon={
                      type === 'password' ? (
                        <EyeOff className={iconSize} />
                      ) : (
                        <Eye className={iconSize} />
                      )
                    }
                    onClick={() => handleType()}
                  />
                )}
                {button && <Button {...button} />}
              </div>
            </FormControl>
          )}

          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
