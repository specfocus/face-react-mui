import {
  getElementsFromRecords, InferredElement,
  useResourceContext
} from '@specfocus/view-focus/core';
import { EditBase } from '@specfocus/view-focus/mutations/EditBase';
import { useEditContext } from '@specfocus/view-focus/mutations/useEditContext';
import inflection from 'inflection';
import { useEffect, useState } from 'react';
import { EditProps } from '../types';
import { editFieldTypes } from './editFieldTypes';
import { EditView } from './EditView';

export const EditGuesser = (props: EditProps) => {
  const {
    resource,
    id,
    mutationMode,
    mutationOptions,
    queryOptions,
    redirect,
    transform,
    disableAuthentication,
    ...rest
  } = props;
  return (
    <EditBase
      resource={resource}
      id={id}
      mutationMode={mutationMode}
      mutationOptions={mutationOptions}
      queryOptions={queryOptions}
      redirect={redirect}
      transform={transform}
      disableAuthentication={disableAuthentication}
    >
      <EditViewGuesser {...rest} />
    </EditBase>
  );
};

const EditViewGuesser = props => {
  const resource = useResourceContext(props);
  const { record } = useEditContext();
  const [child, setChild] = useState(null);

  useEffect(() => {
    setChild(null);
  }, [resource]);

  useEffect(() => {
    if (record && !child) {
      const inferredElements = getElementsFromRecords(
        [record],
        editFieldTypes
      );
      const inferredChild = new InferredElement(
        editFieldTypes.form,
        null,
        inferredElements
      );
      setChild(inferredChild.getElement());

      if (process.env.NODE_ENV === 'production') return;

      const representation = inferredChild.getRepresentation();

      const components = ['Edit']
        .concat(
          Array.from(
            new Set(
              Array.from(representation.matchAll(/<([^/\s>]+)/g))
                .map(match => match[1])
                .filter(component => component !== 'span')
            )
          )
        )
        .sort();

      // eslint-disable-next-line no-console
      console.log(
        `Guessed Edit:

import { ${components.join(', ')} } from '@specfocus/view-focus.mui-demo';

export const ${inflection.capitalize(
          inflection.singularize(resource)
        )}Edit = () => (
    <Edit>
${representation}
    </Edit>
);`
      );
    }
  }, [record, child, resource]);

  return <EditView {...props}>{child}</EditView>;
};

EditViewGuesser.propTypes = EditView.propTypes;
