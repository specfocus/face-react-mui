import ContentCreate from '@mui/icons-material/Create';
import { useResourceContext } from '@specfocus/view-focus/core';
import { useRecordContext } from '@specfocus/view-focus/records/useRecordContext';
import { useCreatePath } from '@specfocus/view-focus.navigation/routes/useCreatePath';
import { Entity } from '@specfocus/spec-focus/entities/Entity';
import PropTypes from 'prop-types';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonProps } from './Button';

/**
 * Opens the Edit view for the current record.
 *
 * Reads the record and resource from the context.
 *
 * @example // basic usage
 * import { EditButton } from '@specfocus/view-focus.mui-demo';
 *
 * const CommentEditButton = () => (
 *     <EditButton label="Edit comment" />
 * );
 */
export const EditButton = <RecordType extends Entity = any>(
  props: EditButtonProps<RecordType>
) => {
  const {
    icon = defaultIcon,
    label = 'action.edit',
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
      to={createPath({ type: 'edit', resource, id: record.id })}
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

const defaultIcon = <ContentCreate />;

// useful to prevent click bubbling in a datagrid with rowClick
const stopPropagation = e => e.stopPropagation();

interface Props<RecordType extends Entity = any> {
  icon?: ReactElement;
  label?: string;
  record?: RecordType;
  resource?: string;
  scrollToTop?: boolean;
}

export type EditButtonProps<RecordType extends Entity = any> = Props<
  RecordType
> &
  ButtonProps;

EditButton.propTypes = {
  icon: PropTypes.element,
  label: PropTypes.string,
  record: PropTypes.any,
  scrollToTop: PropTypes.bool,
};
