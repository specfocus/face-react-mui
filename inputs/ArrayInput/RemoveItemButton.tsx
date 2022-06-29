import CloseIcon from '@mui/icons-material/RemoveCircleOutline';
import { Button, ButtonProps } from '../../buttons';
import { useSimpleFormIteratorItem } from './useSimpleFormIteratorItem';

export const RemoveItemButton = (props: Omit<ButtonProps, 'onClick'>) => {
  const { remove } = useSimpleFormIteratorItem();

  return (
    <Button label="action.remove" onClick={() => remove()} {...props}>
      <CloseIcon />
    </Button>
  );
};
