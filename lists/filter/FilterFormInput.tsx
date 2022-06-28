import ActionHide from '@mui/icons-material/HighlightOff';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { useResourceContext } from '@specfocus/view-focus/resources';
import { useTranslate } from '@specfocus/view-focus.i18n/translations/useTranslate';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

export const FilterFormInput = props => {
  const { filterElement, handleHide, className } = props;
  const resource = useResourceContext(props);
  const translate = useTranslate();

  return (
    <Root
      data-source={filterElement.props.source}
      className={clsx('filter-field', className)}
    >
      {!filterElement.props.alwaysOn && (
        <IconButton
          className={clsx(
            'hide-filter',
            FilterFormInputClasses.hideButton
          )}
          onClick={handleHide}
          data-key={filterElement.props.source}
          title={translate('action.remove_filter')}
          size="small"
        >
          <ActionHide />
        </IconButton>
      )}
      {React.cloneElement(filterElement, {
        resource,
        record: emptyRecord,
        size: 'small',
        helperText: false,
        // ignore defaultValue in Field because it was already set in Form (via mergedInitialValuesWithDefaultValues)
        defaultValue: undefined,
      })}
      <div className={FilterFormInputClasses.spacer}>&nbsp;</div>
    </Root>
  );
};

FilterFormInput.propTypes = {
  filterElement: PropTypes.node,
  handleHide: PropTypes.func,
  resource: PropTypes.string,
};

const PREFIX = 'FilterFormInput';

export const FilterFormInputClasses = {
  spacer: `${PREFIX}-spacer`,
  hideButton: `${PREFIX}-hideButton`,
};

const Root = styled('div', {
  name: PREFIX,
  overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  pointerEvents: 'auto',

  [`& .${FilterFormInputClasses.spacer}`]: { width: theme.spacing(2) },
  [`& .${FilterFormInputClasses.hideButton}`]: {
    marginBottom: theme.spacing(1),
  },
}));

const emptyRecord = {};
