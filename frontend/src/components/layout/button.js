import PropTypes from "prop-types";
import { cva } from "class-variance-authority";
import { cn } from "@/libs/helpers";
import Link from "next/link";

const buttonVariants = cva(
  "w-fit font-eudoxus-medium duration-500 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        amber: "bg-amber-300 text-neutral-1000 shadow-xs hover:bg-amber-400",
        amberInactive: "bg-amber-100 text-neutral-1000 shadow-xs hover:bg-amber-100/80",
        brown: "bg-brown-300 text-neutral-100 shadow-xs hover:bg-brown-400",
        lime: "bg-lime-300 text-neutral-1000 shadow-xs hover:bg-lime-400",
        orange: "bg-orange-300 text-neutral-1000 shadow-xs hover:bg-orange-400",
        blue: "bg-blue-500 text-white shadow-xs hover:bg-blue-300",
        red: "bg-red-100 text-white shadow-xs hover:bg-red-200",
        purple: "bg-purple-500 text-white shadow-xs hover:bg-purple-300",
      },
      size: {
        xs: "px-[10px] py-2 text-[10px]",
        sm: "px-[14px] py-2 text-sm",
        md: "px-6 py-3 text-md",
        lg: "px-8 py-4 text-lg",
      },
    },
    defaultVariants: {
      variant: "amber",
      size: "sm",
    },
  },
);

const buttonVariantsSecondary = cva(
  "w-fit border-3 font-eudoxus-medium font-[700] bg-neutral-200/20 duration-500 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        amber:
          "border-amber-300  text-amber-300 hover:text-neutral-100 shadow-xs hover:bg-amber-300",
        amberInactive:
          "border-amber-100 text-amber-100 hover:text-neutral-100 shadow-xs hover:bg-amber-100",
        brown:
          "border-brown-300 text-brown-300 hover:text-neutral-100  shadow-xs hover:bg-brown-300",
        lime: "border-lime-300 text-lime-300 hover:text-neutral-100 shadow-xs hover:bg-lime-300",
        orange:
          "border-orange-300 text-orange-400 hover:text-neutral-100 shadow-xs hover:bg-orange-300",
      },
      size: {
        xs: "px-[4px] py-1 text-[10px]",
        sm: "px-[8px] py-1 text-sm",
        md: "px-4 py-1 text-md",
        lg: "px-6 py-2 text-lg",
      },
    },
    defaultVariants: {
      variant: "amber",
      size: "sm",
    },
  },
);

const buttonVariantsKelana = cva(
  "w-fit font-eudoxus-medium duration-500 inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        amber: "bg-amber-300 text-neutral-1000 shadow-xs hover:bg-amber-400",
        amberInactive: "bg-amber-100 text-neutral-1000 shadow-xs hover:bg-amber-100/80",
        brown: "bg-brown-300 text-neutral-100 shadow-xs hover:bg-brown-400",
        lime: "bg-lime-300 text-neutral-1000 shadow-xs hover:bg-lime-400",
        orange: "bg-orange-300 text-neutral-1000 shadow-xs hover:bg-orange-400",
        blue: "bg-blue-500 text-white shadow-xs hover:bg-blue-300",
        red: "bg-red-100 text-white shadow-xs hover:bg-red-200",
        purple: "bg-purple-500 text-white shadow-xs hover:bg-purple-300",
        white: "bg-white text-neutral-1000 shadow-xs hover:bg-neutral-100",
      },
      size: {
        xs: "px-[10px] py-2 text-[10px]",
        sm: "px-[14px] py-3 md:py-4 lg:py-5 text-sm",
        default: "px-[14px] py-2 text-sm",
        md: "px-6 py-3 text-md",
        lg: "px-4 md:px-8 py-4",
      },
    },
    defaultVariants: {
      variant: "amber",
      size: "default",
    },
  },
);

const Button = ({ className, variant, kelana = false, secondary = false, size, ...props }) => {
  return (
    <button
      className={cn(
        "cursor-pointer",
        !secondary && !kelana
          ? buttonVariants({ variant, size })
          : !kelana
            ? buttonVariantsSecondary({ variant, size })
            : buttonVariantsKelana({ variant, size }),
        className,
      )}
      {...props}
    />
  );
};

const ButtonLink = ({ className, variant, secondary = false, size, href = "", ...props }) => {
  return (
    <Link href={href}>
      <button
        type="button"
        className={cn(
          "cursor-pointer",
          !secondary
            ? buttonVariants({ variant, size })
            : buttonVariantsSecondary({ variant, size }),
          className,
        )}
        {...props}
      />
    </Link>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  kelana: PropTypes.bool,
  variant: PropTypes.string,
  size: PropTypes.string,
  secondary: PropTypes.bool,
};

ButtonLink.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  secondary: PropTypes.bool,
  href: PropTypes.string,
};

export { Button, ButtonLink, buttonVariants };
