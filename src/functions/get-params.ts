import { QueryPaginateDto } from '../dtos';

export const getParams = (query: QueryPaginateDto) => {
  const page = +query?.page || 1;
  const take = +query?.limit || 10;
  const skip = (page - 1) * take;
  const keyword = query.keyword;
  const filtersParams = query.filters;
  let filters: string[] = [];
  if (filtersParams) {
    const items = filtersParams.split(',');
    for (const item of items) {
      const filter = item.split(':');
      if (!isNaN(Number(filter[1]))) {
        const queryParams = {
          [filter[0]]: {
            id: parseInt(filter[1]),
          },
        };
        filters = {
          ...filters,
          ...queryParams,
        };
      }
    }
  }

  return {
    page,
    take,
    skip,
    keyword,
    filters,
    status: query.status,
  };
};
