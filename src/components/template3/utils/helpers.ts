export const calculateExperienceYears = () => {
  const startYear = 2019;
  const currentYear = new Date().getFullYear();
  const years = currentYear - startYear;
  return `${years}+ Years`;
};
