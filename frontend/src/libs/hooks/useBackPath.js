import { usePathname } from "next/navigation";

export const useBackPath = () => {
  const path = usePathname();
  const pathArray = path.split("/");
  const backPath = pathArray.slice(0, -2).join("/");
  return backPath || "/";
};
