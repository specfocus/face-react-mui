import Inbox from '@mui/icons-material/Inbox';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  useGetResourceLabel,
  useResourceContext,
  useResourceDefinition
} from '@specfocus/view-focus/resources';
import { useTranslate } from '@specfocus/view-focus.i18n/translations/useTranslate';
import { CreateButton } from '../buttons';

export const Empty = (props: EmptyProps) => {
  const { className } = props;
  const { hasCreate } = useResourceDefinition(props);
  const resource = useResourceContext(props);

  const translate = useTranslate();

  const getResourceLabel = useGetResourceLabel();
  const resourceName = translate(`resources.${resource}.forcedCaseName`, {
    smart_count: 0,
    _: getResourceLabel(resource, 0),
  });

  const emptyMessage = translate('page.empty', { name: resourceName });
  const inviteMessage = translate('page.invite');

  return (
    <Root className={className}>
      <div className={EmptyClasses.message}>
        <Inbox className={EmptyClasses.icon} />
        <Typography variant="h4" paragraph>
          {translate(`resources.${resource}.empty`, {
            _: emptyMessage,
          })}
        </Typography>
        {hasCreate && (
          <Typography variant="body1">
            {translate(`resources.${resource}.invite`, {
              _: inviteMessage,
            })}
          </Typography>
        )}
      </div>
      {hasCreate && (
        <div className={EmptyClasses.toolbar}>
          <CreateButton variant="contained" />
        </div>
      )}
    </Root>
  );
};

export interface EmptyProps {
  resource?: string;
  hasCreate?: boolean;
  className?: string;
}

const PREFIX = 'Empty';

export const EmptyClasses = {
  message: `${PREFIX}-message`,
  icon: `${PREFIX}-icon`,
  toolbar: `${PREFIX}-toolbar`,
};

const Root = styled('span', {
  name: PREFIX,
  overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
  flex: 1,
  [`& .${EmptyClasses.message}`]: {
    textAlign: 'center',
    opacity: theme.palette.mode === 'light' ? 0.5 : 0.8,
    margin: '0 1em',
    color:
      theme.palette.mode === 'light'
        ? 'inherit'
        : theme.palette.text.primary,
  },

  [`& .${EmptyClasses.icon}`]: {
    width: '9em',
    height: '9em',
  },

  [`& .${EmptyClasses.toolbar}`]: {
    textAlign: 'center',
    marginTop: '2em',
  },
}));
