import { Link as MuiLink, styled } from '@mui/material';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link as RRLink, LinkProps as RRLinkProps } from 'react-router-dom';

export const Link = (props: LinkProps) => {
  const { to, children, className, ...rest } = props;

  return (
    <StyledLink
      to={to}
      className={clsx(LinkClasses.link, className)}
      {...rest}
    >
      {children}
    </StyledLink>
  );
};

const PREFIX = 'Link';

export const LinkClasses = {
  link: `${PREFIX}-link`,
};

const MuiRouterLink = (props: RRLinkProps) => (
  <MuiLink component={RRLink} {...props} />
);

const StyledLink = styled(MuiRouterLink)(({ theme }) => ({
  [`&.${LinkClasses.link}`]: {
    textDecoration: 'none',
  },
}));

export interface LinkProps extends RRLinkProps {
  className?: string;
}

Link.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};
