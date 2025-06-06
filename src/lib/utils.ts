import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2
  }).format(value);
}

export function formatPercentage(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(value / 100);
}

export function formatCompactNumber(value: number): string {
  const formatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  });
  return formatter.format(value);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

export function formatShortDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}

export function getChangeColor(change: number): string {
  if (change > 0) return 'text-success';
  if (change < 0) return 'text-error';
  return 'text-muted-foreground';
}

export function getChangeBackgroundColor(change: number): string {
  if (change > 0) return 'bg-success/20 text-success';
  if (change < 0) return 'bg-error/20 text-error';
  return 'bg-muted text-muted-foreground';
}

export function getChangeSign(change: number): string {
  if (change > 0) return '+';
  if (change < 0) return '';
  return '';
}
