import React from 'react';
import ContentAdd from '@mui/icons-material/Add';
import { Fab, Theme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useResourceContext } from '@specfocus/view-focus/resources';
import { useTranslate } from '@specfocus/view-focus.i18n/translations';
import { useCreatePath } from '@specfocus/view-focus.navigation/routes';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { memo, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonProps } from './Button';

/**
 * Opens the Create view of a given resource
 *
 * Renders as a regular button on desktop, and a Floating Action Button
 * on mobile.
 *
 * @example // basic usage
 * import { CreateButton } from '@specfocus/view-focus.mui-demo';
 *
 * const CommentCreateButton = () => (
 *     <CreateButton label="Create comment" />
 * );
 */
const CreateButton = (props: CreateButtonProps) => {
  const {
    className,
    icon = defaultIcon,
    label = 'action.create',
    resource: resourceProp,
    scrollToTop = true,
    variant,
    ...rest
  } = props;

  const resource = useResourceContext(props);
  const createPath = useCreatePath();
  const translate = useTranslate();
  const isSmall = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md')
  );

  return isSmall ? (
    // @ts-ignore
    <StyledFab
      component={Link}
      to={createPath({ resource, type: 'create' })}
      state={scrollStates[String(scrollToTop)]}
      color="primary"
      className={clsx(CreateButtonClasses.floating, className)}
      aria-label={label && translate(label)}
      {...rest}
    >
      {icon}
    </StyledFab>
  ) : (
    <Button
      component={Link}
      to={createPath({ resource, type: 'create' })}
      state={scrollStates[String(scrollToTop)]}
      className={className}
      label={label}
      variant={variant}
      {...(rest as any)}
    >
      {icon}
    </Button>
  );
};

// avoids using useMemo to get a constant value for the link state
const scrollStates = {
  true: { _scrollToTop: true },
  false: {},
};

const defaultIcon = <ContentAdd />;

interface Props {
  resource?: string;
  icon?: ReactElement;
  scrollToTop?: boolean;
}

export type CreateButtonProps = Props & ButtonProps;

CreateButton.propTypes = {
  resource: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.element,
  label: PropTypes.string,
};

const PREFIX = 'CreateButton';

export const CreateButtonClasses = {
  floating: `${PREFIX}-floating`,
};

const StyledFab = (styled(Fab, {
  name: PREFIX,
  overridesResolver: (_props, styles) => styles.root,
})(({ theme }) => ({
  [`&.${CreateButtonClasses.floating}`]: {
    color: theme.palette.getContrastText(theme.palette.primary.main),
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 60,
    left: 'auto',
    position: 'fixed',
    zIndex: 1000,
  },
})) as unknown) as typeof Fab;

export default memo(CreateButton, (prevProps, nextProps) => {
  return (
    prevProps.resource === nextProps.resource &&
    prevProps.label === nextProps.label &&
    prevProps.translate === nextProps.translate &&
    prevProps.disabled === nextProps.disabled
  );
});
