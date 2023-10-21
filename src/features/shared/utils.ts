export const removeMongoVersionFieldsFromSingleRecord = (result: any) => {
  const resultCopy = {...result};

  delete resultCopy.__v;

  return resultCopy;
};

export const removeMongoVersionFields = (results: any | any[]) => {
  if (Array.isArray(results)) {
    return results.map((result: any) => {
      return removeMongoVersionFieldsFromSingleRecord(result);
    });
  }

  return removeMongoVersionFieldsFromSingleRecord(results);
};

export const addFakeUndefinedMongoVersioningField = (item: any): any => {
  return {...item, __v: undefined};
};
