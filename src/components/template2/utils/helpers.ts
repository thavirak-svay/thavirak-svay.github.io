export const calculateExperienceYears = (): number => {
  const startYear = 2020;
  const currentYear = new Date().getFullYear();
  return currentYear - startYear;
};