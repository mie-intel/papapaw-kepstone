import { cn } from "@/libs/helpers";
import { FaFacebook, FaInstagram, FaLine, FaTiktok, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import { SlGlobe } from "react-icons/sl";
import { SiGmail } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import PropTypes from "prop-types";

export const SocialMedia = ({ type, url, className, ...props }) => {
  const sz = "h-6 w-6";
  const getIcon = () => {
    switch (type) {
      case "instagram":
        return <FaInstagram className={sz} />;
      case "youtube":
        return <FaYoutube className={sz} />;
      case "tiktok":
        return <FaTiktok className={sz} />;
      case "x":
        return <FaXTwitter className={sz} />;
      case "website":
        return <SlGlobe className={sz} />;
      case "email":
        return <SiGmail className={sz} />;
      case "line":
        return <FaLine className={sz} />;
      case "facebook":
        return <FaFacebook className={sz} />;
      case "linkedin":
        return <FaLinkedinIn className={sz} />;
      default:
        return null;
    }
  };
  return (
    <Link
      href={url}
      key={JSON.stringify({ type, url })}
      target="_blank"
      aria-label={type}
      className={cn(
        "relative flex aspect-square items-center justify-center rounded-md p-1",
        className,
      )}
      {...props}
    >
      {getIcon()}
    </Link>
  );
};

SocialMedia.propTypes = {
  key: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  className: PropTypes.string,
};
