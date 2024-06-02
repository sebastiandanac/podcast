import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convert12HourTo24Hour(hour: number, period: string) {
  if (period === 'PM') {
    if (hour <= 11) {
      return String(hour + 12).padStart(2, '0');
    } else {
      return String(hour).padStart(2, '0');
    }
  } else if (period === 'AM' && hour === 12) {
    return '00';
  }

  return String(hour).padStart(2, '0');
}
