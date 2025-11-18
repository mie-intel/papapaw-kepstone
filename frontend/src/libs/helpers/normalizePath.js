export const normalizePath = (pathname) => {
  if (typeof pathname !== "string") return; // console.error("error: pathname is not a string");
  return pathname.replace(/\/$/, "");
};
