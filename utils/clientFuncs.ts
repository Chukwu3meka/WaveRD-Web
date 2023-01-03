export const ageGenerator = (dob: any) => {
  const todaysDate: number = Number(new Date()),
    birthDate: number = Number(new Date(dob));

  Math.floor(Math.abs((birthDate - todaysDate) / (24 * 60 * 60 * 1000)) / 365);

  return;
};
