import PropTypes from "prop-types";
import { cn } from "@/libs/helpers/cn";

const H1 = ({ className, children, ...props }) => (
  <h1 className={cn("font-eudoxus-bold lg:text-[120px] lg:leading-[180px]", className)} {...props}>
    {children}
  </h1>
);

const H2 = ({ className, children, ...props }) => (
  <h2 className={cn("font-eudoxus-bold text-[92px] leading-[138px]", className)} {...props}>
    {children}
  </h2>
);

const H3 = ({ className, children, ...props }) => (
  <h3 className={cn("font-eudoxus-bold text-[70px] leading-[105px]", className)} {...props}>
    {children}
  </h3>
);

const H4 = ({ className, children, ...props }) => (
  <h4 className={cn("font-eudoxus-bold text-[54px] leading-[81px]", className)} {...props}>
    {children}
  </h4>
);

const H5 = ({ className, children, ...props }) => (
  <h5
    className={cn(
      "font-eudoxus-bold text-[24px] leading-[36px] sm:text-[32px] sm:leading-[48px] lg:text-[42px] lg:leading-[63px]",
      className,
    )}
    {...props}
  >
    {children}
  </h5>
);

const H6 = ({ className, children, ...props }) => (
  <h6 className={cn("font-eudoxus-bold text-[32px] leading-[48px]", className)} {...props}>
    {children}
  </h6>
);

const H7 = ({ className, children, ...props }) => (
  <p className={cn("font-eudoxus-bold text-[24px] leading-[36px]", className)} {...props}>
    {children}
  </p>
);

const B1 = ({ className, ...props }) => (
  <p className={cn("font-eudoxus-medium text-[18px] leading-[27px]", className)} {...props} />
);

const B2 = ({ className, ...props }) => (
  <p className={cn("font-eudoxus-regular text-[14px] leading-[21px]", className)} {...props} />
);

const B3 = ({ className, ...props }) => (
  <p className={cn("font-eudoxus-regular text-[10px] leading-[15px]", className)} {...props} />
);

const B4 = ({ className, ...props }) => (
  <p className={cn("font-eudoxus-regular text-[8px] leading-[12px]", className)} {...props} />
);

const B5 = ({ className, ...props }) => (
  <p
    className={cn("font-regular font-eudoxus-regular text-[6px] leading-[9px]", className)}
    {...props}
  />
);

H1.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
H2.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
H3.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
H4.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
H5.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
H6.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
H7.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
B1.propTypes = {
  className: PropTypes.string,
};
B2.propTypes = {
  className: PropTypes.string,
};
B3.propTypes = {
  className: PropTypes.string,
};
B4.propTypes = {
  className: PropTypes.string,
};
B5.propTypes = {
  className: PropTypes.string,
};

export { H1, H2, H3, H4, H5, H6, H7, B1, B2, B3, B4, B5 };
