export const getskalaCederaString = (level) => {
  if (level === 3) return "Critical";
  if (level === 2) return "Moderate";
  return "Minor";
};

export const getSkalaCederaNumber = (levelStr) => {
  if (levelStr === "Critical") return 3;
  if (levelStr === "Moderate") return 2;
  return 1;
};
