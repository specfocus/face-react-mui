import NavigationRefresh from '@mui/icons-material/Refresh';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useRefresh } from '@specfocus/view-focus.data/providers/useRefresh';
import { useTranslate } from '@specfocus/view-focus.i18n/i18n/useTranslate';
import PropTypes from 'prop-types';
import { ReactElement, useCallback } from 'react';

export const RefreshIconButton = (props: RefreshIconButtonProps) => {
  const {
    label = 'action.refresh',
    icon = defaultIcon,
    onClick,
    className,
    ...rest
  } = props;
  const refresh = useRefresh();
  const translate = useTranslate();
  const handleClick = useCallback(
    event => {
      event.preventDefault();
      refresh();
      if (typeof onClick === 'function') {
        onClick(event);
      }
    },
    [refresh, onClick]
  );

  return (
    <Tooltip title={label && translate(label, { _: label })}>
      <IconButton
        aria-label={label && translate(label, { _: label })}
        className={className}
        color="inherit"
        onClick={handleClick}
        {...rest}
        size="large"
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
};

const defaultIcon = <NavigationRefresh />;

interface Props {
  className?: string;
  icon?: ReactElement;
  label?: string;
  onClick?: (e: MouseEvent) => void;
}

export type RefreshIconButtonProps = Props & IconButtonProps;

RefreshIconButton.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.element,
};
