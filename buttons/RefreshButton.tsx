import NavigationRefresh from '@mui/icons-material/Refresh';
import { useRefresh } from '@specfocus/view-focus.data/providers';
import PropTypes from 'prop-types';
import { MouseEvent, ReactElement, useCallback } from 'react';
import { Button, ButtonProps } from './Button';

export const RefreshButton = (props: RefreshButtonProps) => {
  const {
    label = 'action.refresh',
    icon = defaultIcon,
    onClick,
    ...rest
  } = props;
  const refresh = useRefresh();
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
    <Button label={label} onClick={handleClick} {...rest}>
      {icon}
    </Button>
  );
};

const defaultIcon = <NavigationRefresh />;

interface Props {
  label?: string;
  icon?: ReactElement;
  onClick?: (e: MouseEvent) => void;
}

export type RefreshButtonProps = Props & ButtonProps;

RefreshButton.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.element,
  onClick: PropTypes.func,
};
