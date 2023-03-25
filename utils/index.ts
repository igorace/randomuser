/**
 * Simple function to calculate how many days left till birthday, assuming 365 days in the year
 * @param birthday {Date string} - birthday
 * @returns {number} - amount of days due to specified birthday
 */
export const daysUntilBirthday = (birthday: string) => {
  const now = new Date();
  const birthdayDate = new Date(birthday);
  const currentYear = now.getFullYear();
  const ONE_DAY = 1000 * 60 * 60 * 24;
  const birthdayThisYear = new Date(
    currentYear,
    birthdayDate.getMonth(),
    birthdayDate.getDate()
  );
  const daysUntilBirthday = Math.ceil(
    (birthdayThisYear.getTime() - now.getTime()) / ONE_DAY
  );

  // Ceil might retgurn -0
  return !daysUntilBirthday
    ? 0
    : daysUntilBirthday > 0
    ? daysUntilBirthday
    : daysUntilBirthday + 365;
};
