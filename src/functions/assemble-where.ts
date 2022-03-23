import { ILike } from 'typeorm';

export const assembleWhere = (
  keyword?: string,
  fields?: string[],
  filters?: any[],
  status?: string,
) => {
  const state = { status };
  if (fields?.length >= 1 && keyword) {
    const query: any = [];
    for (const field of fields) {
      if (status) {
        query.push({
          ...filters,
          ...state,
          [field]: ILike('%' + keyword + '%'),
        });
      } else {
        query.push({
          ...filters,
          [field]: ILike('%' + keyword + '%'),
        });
      }
    }
    return query;
  }
  return status ? { ...filters, ...state } : { ...filters };
};
