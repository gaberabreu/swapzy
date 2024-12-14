import { type FC } from "react";
import MuiLink, { type LinkProps as MuiLinkProps } from "@mui/material/Link";
import { Link as RouterLink, type LinkProps as RouterLinkProps } from "@tanstack/react-router";

interface LinkProps extends MuiLinkProps {
  to: RouterLinkProps["to"];
}

const Link: FC<LinkProps> = ({ children, ...rest }) => {
  return (
    <MuiLink
      component={RouterLink}
      {...rest}
    >
      {children}
    </MuiLink>
  );
};

export default Link;
