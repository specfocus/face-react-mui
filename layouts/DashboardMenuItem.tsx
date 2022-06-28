import DashboardIcon from '@mui/icons-material/Dashboard';
import { useTranslate } from '@specfocus/view-focus.i18n/translations/useTranslate';
import { useBasename } from '@specfocus/view-focus.navigation/routes/useBasename';
import PropTypes from 'prop-types';
import { ReactElement } from 'react';
import { MenuItemLink } from './MenuItemLink';

export const DashboardMenuItem = (props: DashboardMenuItemProps) => {
  const { locale, leftIcon = <DashboardIcon />, ...rest } = props;
  const translate = useTranslate();
  const basename = useBasename();
  return (
    <MenuItemLink
      to={`${basename}/`}
      primaryText={translate('page.dashboard')}
      leftIcon={leftIcon}
      {...rest}
    />
  );
};

export interface DashboardMenuItemProps {
  leftIcon?: ReactElement;
  locale?: string;
  onClick?: () => void;
  dense?: boolean;
  /**
   * @deprecated
   */
  sidebarIsOpen?: boolean;
}

DashboardMenuItem.propTypes = {
  leftIcon: PropTypes.element,
  locale: PropTypes.string,
  onClick: PropTypes.func,
  dense: PropTypes.bool,
  sidebarIsOpen: PropTypes.bool,
};
