// Apple Device detection
export const isAppleDevice = () => {
  const userAgent = navigator.userAgent;
  const platform = navigator.userAgentData ? navigator.userAgentData.platform : navigator.platform;
  return (
    /iPad|iPhone|iPod/.test(userAgent) ||
    (platform === "MacIntel" && navigator.maxTouchPoints > 1) || // iPad Pro
    /Macintosh|Mac OS X/.test(userAgent)
  );
};
