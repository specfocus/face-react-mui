import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { IconButtonWithTooltip } from '../../buttons';
import { useSimpleFormIteratorItem } from './useSimpleFormIteratorItem';

export const ReOrderButtons = ({ className }: { className?: string; }) => {
  const { index, total, reOrder } = useSimpleFormIteratorItem();

  return (
    <div className={className}>
      <IconButtonWithTooltip
        label="action.move_up"
        size="small"
        onClick={() => reOrder(index - 1)}
        disabled={index <= 0}
      >
        <ArrowUpwardIcon />
      </IconButtonWithTooltip>
      <IconButtonWithTooltip
        label="action.move_down"
        size="small"
        onClick={() => reOrder(index + 1)}
        disabled={total == null || index >= total - 1}
      >
        <ArrowDownwardIcon />
      </IconButtonWithTooltip>
    </div>
  );
};
