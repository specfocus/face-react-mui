import { Button, CardContent, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { TextInput } from '../inputs';
import useLogin from '@specfocus/view-focus.auth/providers/useLogin';
import { useTranslate } from '@specfocus/view-focus.i18n/translations/useTranslate';
import { useNotify } from '@specfocus/view-focus.notification/providers/useNotify';
import { useSafeSetState } from '@specfocus/view-focus.states/states/useSafeSetState';
import { required } from '@specfocus/view-focus.forms/forms/validate';
import { Form } from '@specfocus/view-focus/forms/Form';

export const LoginForm = (props: LoginFormProps) => {
  const { redirectTo, className } = props;
  const [loading, setLoading] = useSafeSetState(false);
  const login = useLogin();
  const translate = useTranslate();
  const notify = useNotify();

  const submit = (values: FormData) => {
    setLoading(true);
    login(values, redirectTo)
      .then(() => {
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        notify(
          typeof error === 'string'
            ? error
            : typeof error === 'undefined' || !error.message
              ? 'auth.sign_in_error'
              : error.message,
          {
            type: 'warning',
            messageArgs: {
              _:
                typeof error === 'string'
                  ? error
                  : error && error.message
                    ? error.message
                    : undefined,
            },
          }
        );
      });
  };

  return (
    <StyledForm
      onSubmit={submit}
      mode="onChange"
      noValidate
      className={className}
    >
      <CardContent className={LoginFormClasses.content}>
        <TextInput
          autoFocus
          source="username"
          label={translate('auth.username')}
          validate={required()}
          fullWidth
        />
        <TextInput
          source="password"
          label={translate('auth.password')}
          type="password"
          autoComplete="current-password"
          validate={required()}
          fullWidth
        />

        <Button
          variant="contained"
          type="submit"
          color="primary"
          disabled={loading}
          fullWidth
          className={LoginFormClasses.button}
        >
          {loading ? (
            <CircularProgress
              className={LoginFormClasses.icon}
              size={19}
              thickness={3}
            />
          ) : (
            translate('auth.sign_in')
          )}
        </Button>
      </CardContent>
    </StyledForm>
  );
};

const PREFIX = 'LoginForm';

export const LoginFormClasses = {
  content: `${PREFIX}-content`,
  button: `${PREFIX}-button`,
  icon: `${PREFIX}-icon`,
};

const StyledForm = styled(Form, {
  name: PREFIX,
  overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
  [`& .${LoginFormClasses.content}`]: {
    width: 300,
  },
  [`& .${LoginFormClasses.button}`]: {
    marginTop: theme.spacing(2),
  },
  [`& .${LoginFormClasses.icon}`]: {
    margin: theme.spacing(0.3),
  },
}));

export interface LoginFormProps {
  redirectTo?: string;
  className?: string;
}

interface FormData {
  username: string;
  password: string;
}
LoginForm.propTypes = {
  redirectTo: PropTypes.string,
};
