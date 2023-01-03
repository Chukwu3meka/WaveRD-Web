export const ageGenerator = (dob) => Math.floor(Math.abs((new Date(dob) - new Date()) / (24 * 60 * 60 * 1000)) / 365);
