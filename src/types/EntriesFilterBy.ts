interface EntriesFilterBy {
  date: {
    from?: Date | null;
    to?: Date | null;
  };
  kind: any;
  labels: any[];
}

export default EntriesFilterBy;