import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('vi-VN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatDateShort(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('vi-VN', {
    day: 'numeric',
    month: 'long',
  });
}

export function getInitials(name: string): string {
  if (!name) return '';
  
  const names = name.split(' ');
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase();
  }
  
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
}

export function getBadgeLevel(totalPoints: number): 'Leaf' | 'Sapling' | 'Tree' {
  if (totalPoints >= 100) {
    return 'Tree';
  } else if (totalPoints >= 50) {
    return 'Sapling';
  } else {
    return 'Leaf';
  }
}

export function getRandomInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export const weekdays = [
  { short: 'T2', full: 'Thứ hai' },
  { short: 'T3', full: 'Thứ ba' },
  { short: 'T4', full: 'Thứ tư' },
  { short: 'T5', full: 'Thứ năm' },
  { short: 'T6', full: 'Thứ sáu' },
  { short: 'T7', full: 'Thứ bảy' },
  { short: 'CN', full: 'Chủ nhật' },
];

export function getCurrentWeekday(): number {
  const today = new Date();
  // In JavaScript, 0 is Sunday, but we want 0 to be Monday for our array
  let day = today.getDay() - 1;
  if (day < 0) day = 6; // If it's Sunday, set it to 6
  return day;
}

export function calculateWeeklyStreak(dates: Date[]): number {
  if (dates.length === 0) return 0;
  
  // Sort dates in descending order
  const sortedDates = [...dates].sort((a, b) => b.getTime() - a.getTime());
  
  // Start with today
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  let currentDate = new Date(today);
  let streak = 0;
  
  for (let i = 0; i < 7; i++) {
    const hasActionOnDay = sortedDates.some(date => {
      const actionDate = new Date(date);
      actionDate.setHours(0, 0, 0, 0);
      return actionDate.getTime() === currentDate.getTime();
    });
    
    if (hasActionOnDay) {
      streak++;
    } else {
      break;
    }
    
    // Move to previous day
    currentDate.setDate(currentDate.getDate() - 1);
  }
  
  return streak;
}
