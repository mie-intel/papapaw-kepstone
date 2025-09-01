export const truncateText = (text, maxLength = 60) => {
  if (typeof text !== "string") return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};
