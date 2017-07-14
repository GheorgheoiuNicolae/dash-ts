import { Any } from '../../types/';
import * as _ from 'lodash';

const getAllEntries = (state: Any): Any[] => {
  const entries = state.entries.allIds.map((id: string) => state.entries.byId[id]);
  const entryList: Any = [];

  entries.map((entry: Any) => {
    const date = new Date(entry.date);
    const YMD = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    const day: Any = _.find(entryList, {
      date: YMD,
    });

    if (day) {
      day.entries.push(entry);
    } else {
      entryList.push({
        date: YMD,
        entries: [entry]
      });
    }
  });

  return entryList;
};

export {
  getAllEntries,
};