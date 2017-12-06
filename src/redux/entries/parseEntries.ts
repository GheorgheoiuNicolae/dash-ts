import * as _ from 'lodash';

const mapEntriesToDays = (state: any): any[] => {
  const days = [];
  for (var key in state) {
    if (state.hasOwnProperty(key)) {
      state[key].id = key;
      days.push(state[key]);
    }
  }

  // console.log('get allEntries', state)
  // const entries = state.allIds ? state.allIds.map((id: string) => state.byId[id]) : [];
  // console.log('entries', entries);
  
  const entryList: any = [];
  const date = new Date();
  const todayDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  days.map((entry: any) => {
    
    if (entry) {
      const entryDate = new Date(entry.date);
      const YMD = new Date(entryDate.getFullYear(), entryDate.getMonth(), entryDate.getDate());
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

  // check if there is an entry for today
  // push an empty day if it does not exist
  const today = entryList.find((day: any) => 
    day.date.getTime() === todayDate.getTime());

  if(!today) {
    entryList.push({
      date: todayDate,
      entries: [{
        id: 'injectedEntry',
        date: new Date().getTime(),
        dateTime: new Date().getTime(),
        title: 'Nothing is happening today? Make sure you add your entries.'
      }]
    });
  }

  const filteredByDate = _.sortBy(entryList, [(o: any) => {
    return o.date;
  }]);

  return filteredByDate.reverse();
};

export { mapEntriesToDays };