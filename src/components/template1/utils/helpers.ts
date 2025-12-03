export const calculateExperienceYears = () => {
  const startYear = 2019;
  const currentYear = new Date().getFullYear();
  return currentYear - startYear;
};
