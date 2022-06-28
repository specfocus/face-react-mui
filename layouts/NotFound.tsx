import History from '@mui/icons-material/History';
import HotTub from '@mui/icons-material/HotTub';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useAuthenticated } from '@specfocus/view-focus.auth/providers/useAuthenticated';
import { useTranslate } from '@specfocus/view-focus.i18n/translations/useTranslate';
import PropTypes from 'prop-types';
import { Title } from './Title';

export const NotFound = props => {
  const { className, title, ...rest } = props;

  const translate = useTranslate();
  useAuthenticated();
  return (
    <Root className={className} {...sanitizeRestProps(rest)}>
      <Title defaultTitle={title} />
      <div className={NotFoundClasses.message}>
        <HotTub className={NotFoundClasses.icon} />
        <h1>{translate('page.not_found')}</h1>
        <div>{translate('message.not_found')}.</div>
      </div>
      <div className={NotFoundClasses.toolbar}>
        <Button
          variant="contained"
          startIcon={<History />}
          onClick={goBack}
        >
          {translate('action.back')}
        </Button>
      </div>
    </Root>
  );
};

const sanitizeRestProps = ({
  staticContext,
  history,
  location,
  match,
  ...rest
}) => rest;

NotFound.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  location: PropTypes.object,
};

const PREFIX = 'NotFound';

export const NotFoundClasses = {
  icon: `${PREFIX}-icon`,
  message: `${PREFIX}-message`,
  toolbar: `${PREFIX}-toolbar`,
};

const Root = styled('div', {
  name: PREFIX,
  overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  [theme.breakpoints.up('md')]: {
    height: '100%',
  },
  [theme.breakpoints.down('md')]: {
    height: '100vh',
    marginTop: '-3em',
  },

  [`& .${NotFoundClasses.icon}`]: {
    width: '9em',
    height: '9em',
  },

  [`& .${NotFoundClasses.message}`]: {
    textAlign: 'center',
    fontFamily: 'Roboto, sans-serif',
    opacity: 0.5,
    margin: '0 1em',
  },

  [`& .${NotFoundClasses.toolbar}`]: {
    textAlign: 'center',
    marginTop: '2em',
  },
}));

function goBack() {
  window.history.go(-1);
}
