import * as _ from 'lodash';

const getAllEntries = (state: any): any[] => {
  const entries = state.entries.allIds ? state.entries.allIds.map((id: string) => state.entries.byId[id]) : [];
  const entryList: any = [];

  entries.map((entry: any) => {
    if (entry) {
      const date = new Date(entry.date);
      const YMD = new Date(date.getFullYear(), date.getMonth(), date.getDate());

      const day: any = _.find(entryList, {
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
    }
  });

  const filteredByDate = _.sortBy(entryList, [(o: any) => {
    return o.date;
  }]);

  return filteredByDate;
};

const closestToToday = (state: any): string => {
  const entries = state.entries.allIds ? state.entries.allIds.map((id: string) => state.entries.byId[id]) : [];

  const sorted = entries.sort(function(a: any, b: any) {
    return a.date - b.date;
  });

  const maxToday = sorted.filter((entry: any) => {
    return entry.date <= new Date().setHours(0,0,0,0) ? entry.id : null;
  });
  
  return maxToday[maxToday.length - 1];
};

export {
  getAllEntries,
  closestToToday
};