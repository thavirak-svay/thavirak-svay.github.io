export const calculateExperienceYears = (): number => {
  const startYear = 2019;
  const currentYear = new Date().getFullYear();
  return currentYear - startYear;
};