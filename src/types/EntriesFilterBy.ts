import { Any } from './Any';

interface EntriesFilterBy {
  date: {
    from?: Date | null;
    to?: Date | null;
  };
  kind: Any;
  labels: Any[];
}

export default EntriesFilterBy;