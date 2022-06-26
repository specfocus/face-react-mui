import { Card } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useCreateContext } from '@specfocus/view-focus/mutations/useCreateContext';
import { CreateControllerProps } from '@specfocus/view-focus/mutations/useCreateController';
import { Entity } from '@specfocus/spec-focus/entities/Entity';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { ReactElement } from 'react';
import { Title } from '../layouts';
import { CreateProps } from '../types';

export const CreateView = (props: CreateViewProps) => {
  const {
    actions,
    aside,
    children,
    className,
    component: Content = Card,
    title,
    ...rest
  } = props;

  const { defaultTitle } = useCreateContext(props);

  return (
    <Root
      className={clsx('create-page', className)}
      {...sanitizeRestProps(rest)}
    >
      <Title title={title} defaultTitle={defaultTitle} />
      {actions}
      <div
        className={clsx(CreateClasses.main, {
          [CreateClasses.noActions]: !actions,
        })}
      >
        <Content className={CreateClasses.card}>{children}</Content>
        {aside}
      </div>
    </Root>
  );
};

type Overwrites = 'children' | 'mutationOptions' | 'redirect' | 'resource' | 'transform';

interface CreateViewProps<RecordType extends Entity = any>
  extends CreateProps<RecordType>,
  Omit<CreateControllerProps<RecordType>, Overwrites> {
  children: ReactElement;
}

CreateView.propTypes = {
  actions: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
  aside: PropTypes.element,
  children: PropTypes.element,
  className: PropTypes.string,
  defaultTitle: PropTypes.any,
  hasList: PropTypes.bool,
  hasShow: PropTypes.bool,
  mutationOptions: PropTypes.object,
  record: PropTypes.object,
  redirect: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.func,
  ]),
  resource: PropTypes.string,
  save: PropTypes.func,
  title: PropTypes.node,
};

const sanitizeRestProps = ({
  addMiddleware = null,
  defaultTitle = null,
  hasCreate = null,
  hasEdit = null,
  hasList = null,
  hasShow = null,
  history = null,
  isFetching = null,
  isLoading = null,
  location = null,
  match = null,
  mutationOptions = null,
  options = null,
  permissions = null,
  save = null,
  saving = null,
  transform = null,
  removeMiddleware = null,
  ...rest
}) => rest;

const PREFIX = 'Create';

export const CreateClasses = {
  main: `${PREFIX}-main`,
  noActions: `${PREFIX}-noActions`,
  card: `${PREFIX}-card`,
};

const Root = styled('div', {
  name: PREFIX,
  overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
  [`& .${CreateClasses.main}`]: {
    display: 'flex',
  },

  [`& .${CreateClasses.noActions}`]: {
    [theme.breakpoints.up('sm')]: {
      marginTop: '1em',
    },
  },

  [`& .${CreateClasses.card}`]: {
    flex: '1 1 auto',
  },
}));
