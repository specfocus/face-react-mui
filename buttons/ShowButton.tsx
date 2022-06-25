import ImageEye from '@mui/icons-material/RemoveRedEye';
import { useResourceContext } from '@specfocus/view-focus/core';
import { useRecordContext } from '@specfocus/view-focus/records/useRecordContext';
import { useCreatePath } from '@specfocus/view-focus.navigation/routes/useCreatePath';
import { Entity } from '@specfocus/spec-focus/entities/Entity';
import PropTypes from 'prop-types';
import { memo, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonProps } from './Button';

/**
 * Opens the Show view of a given record
 *
 * @example // basic usage
 * import { ShowButton } from '@specfocus/view-focus.mui-demo';
 *
 * const CommentShowButton = ({ record }) => (
 *     <ShowButton label="Show comment" record={record} />
 * );
 */
const ShowButton = <RecordType extends Entity = any>(
  props: ShowButtonProps<RecordType>
) => {
  const {
    icon = defaultIcon,
    label = 'action.show',
    record: recordProp,
    resource: resourceProp,
    scrollToTop = true,
    ...rest
  } = props;
  const resource = useResourceContext(props);
  const record = useRecordContext(props);
  const createPath = useCreatePath();
  if (!record) return null;
  return (
    <Button
      component={Link}
      to={createPath({ type: 'show', resource, id: record.id })}
      state={scrollStates[String(scrollToTop)]}
      label={label}
      onClick={stopPropagation}
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

const defaultIcon = <ImageEye />;

// useful to prevent click bubbling in a datagrid with rowClick
const stopPropagation = e => e.stopPropagation();

interface Props<RecordType extends Entity = any> {
  icon?: ReactElement;
  label?: string;
  record?: RecordType;
  resource?: string;
  scrollToTop?: boolean;
}

export type ShowButtonProps<RecordType extends Entity = any> = Props<
  RecordType
> &
  ButtonProps;

ShowButton.propTypes = {
  icon: PropTypes.element,
  label: PropTypes.string,
  record: PropTypes.any,
  scrollToTop: PropTypes.bool,
};

const PureShowButton = memo(
  ShowButton,
  (props: ShowButtonProps, nextProps: ShowButtonProps) =>
    props.resource === nextProps.resource &&
    (props.record && nextProps.record
      ? props.record.id === nextProps.record.id
      : props.record == nextProps.record) && // eslint-disable-line eqeqeq
    props.label === nextProps.label &&
    props.disabled === nextProps.disabled
);

export default PureShowButton;
