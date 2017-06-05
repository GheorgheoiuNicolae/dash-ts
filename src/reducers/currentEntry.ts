export default function reducer(state={
}, action:any){
  switch(action.type){
    case 'ADD_ENTRY_DATA': {
      return {...state, ...action.payload}
    }
    default: {
      return {...state}
    }
  }
}