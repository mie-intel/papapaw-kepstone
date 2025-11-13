import PropTypes from "prop-types";

export const metadata = {
  title: "Dashboard",
  description: "Solanum Dashboard",
};

export default function DashboardLayout({ children }) {
  return <div className="flex w-full bg-[#2B2E4D] lg:h-screen lg:pt-12 lg:pl-5">{children}</div>;
}

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
