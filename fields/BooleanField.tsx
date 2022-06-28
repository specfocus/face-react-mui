import { SvgIconComponent } from '@mui/icons-material';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import { Tooltip, Typography, TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslate } from '@specfocus/view-focus.i18n/translations/useTranslate';
import { useRecordContext } from '@specfocus/view-focus/records/useRecordContext';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { FunctionComponent, memo } from 'react';
import { sanitizeFieldRestProps } from './sanitizeFieldRestProps';
import { fieldPropTypes, InjectedFieldProps, PublicFieldProps } from './types';

export const BooleanField: FunctionComponent<BooleanFieldProps> = memo(
  props => {
    const {
      className,
      emptyText,
      source,
      valueLabelTrue,
      valueLabelFalse,
      TrueIcon = DoneIcon,
      FalseIcon = ClearIcon,
      looseValue = false,
      ...rest
    } = props;
    const record = useRecordContext(props);
    const translate = useTranslate();

    const value = get(record, source);
    const isTruthyValue = value === true || (looseValue && value);
    let ariaLabel = value ? valueLabelTrue : valueLabelFalse;

    if (!ariaLabel) {
      ariaLabel = isTruthyValue ? 'boolean.true' : 'boolean.false';
    }

    if (looseValue || value === false || value === true) {
      return (
        <StyledTypography
          component="span"
          variant="body2"
          className={className}
          {...sanitizeFieldRestProps(rest)}
        >
          <Tooltip title={translate(ariaLabel, { _: ariaLabel })}>
            {isTruthyValue ? (
              <TrueIcon data-testid="true" fontSize="small" />
            ) : (
              <FalseIcon data-testid="false" fontSize="small" />
            )}
          </Tooltip>
        </StyledTypography>
      );
    }

    return (
      <Typography
        component="span"
        variant="body2"
        className={className}
        {...sanitizeFieldRestProps(rest)}
      >
        {emptyText}
      </Typography>
    );
  }
);

BooleanField.propTypes = {
  // @ts-ignore
  ...Typography.propTypes,
  ...fieldPropTypes,
  valueLabelFalse: PropTypes.string,
  valueLabelTrue: PropTypes.string,
  TrueIcon: PropTypes.elementType,
  FalseIcon: PropTypes.elementType,
  looseValue: PropTypes.bool,
};

BooleanField.displayName = 'BooleanField';

export interface BooleanFieldProps
  extends PublicFieldProps,
  InjectedFieldProps,
  Omit<TypographyProps, 'textAlign'> {
  valueLabelTrue?: string;
  valueLabelFalse?: string;
  TrueIcon?: SvgIconComponent;
  FalseIcon?: SvgIconComponent;
  looseValue?: boolean;
}

const PREFIX = 'BooleanField';

const StyledTypography = styled(Typography, {
  name: PREFIX,
  overridesResolver: (props, styles) => styles.root,
})({
  display: 'inline-flex',
  verticalAlign: 'middle',
  lineHeight: 0,
});
