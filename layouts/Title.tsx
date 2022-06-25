import { useTranslate } from '@specfocus/view-focus.i18n/i18n/useTranslate';
import { Entity } from '@specfocus/spec-focus/entities/Entity';
import warning from '@specfocus/spec-focus/rules/warning';
import PropTypes from 'prop-types';
import { ReactElement } from 'react';
import { createPortal } from 'react-dom';

export const Title = (props: TitleProps) => {
  const { className, defaultTitle, title, ...rest } = props;
  const translate = useTranslate();
  const container =
    typeof document !== 'undefined'
      ? document.getElementById('@specfocus/view-focus.mui-demo-title')
      : null;

  if (!container) return null;

  warning(!defaultTitle && !title, 'Missing title prop in <Title> element');

  const titleElement = !title ? (
    <span className={className} {...rest}>
      {defaultTitle}
    </span>
  ) : typeof title === 'string' ? (
    <span className={className} {...rest}>
      {translate(title, { _: title })}
    </span>
  ) : (
    title
  );
  return createPortal(titleElement, container);
};

export const TitlePropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.element,
]);

Title.propTypes = {
  defaultTitle: PropTypes.string,
  className: PropTypes.string,
  record: PropTypes.any,
  title: TitlePropType,
};

export interface TitleProps {
  className?: string;
  defaultTitle?: string;
  record?: Partial<Entity>;
  title?: string | ReactElement;
}
