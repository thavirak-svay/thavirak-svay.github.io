import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

export const calculateExperienceYears = () => {
  const startYear = 2019;
  const currentYear = new Date().getFullYear();
  const years = currentYear - startYear;
  return `${years}+ Years`;
};
