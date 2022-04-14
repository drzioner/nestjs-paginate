/** @packages */
import { plainToClass, plainToInstance } from 'class-transformer';
import { getRepository, ILike } from 'typeorm';

/** @application */
import {
  AssembleResponseDto,
  PaginateDto,
  ParamsPaginateDto,
  QueryPaginateDto,
} from './dtos';

export const paginate = async (
  params: ParamsPaginateDto,
  query: QueryPaginateDto,
  order: any = { id: 'DESC' },
) => {
  const { dto, type, fields, relations, route } = params;
  const { page, take, keyword, filters, status, skip } = getParams(query);
  const where = assembleWhere(keyword, fields, filters, query.status);
  const [items, total] = await getRepository(type).findAndCount({
    where,
    relations,
    order,
    take,
    skip,
  });
  return assembleResponse({
    dto,
    items,
    total,
    take,
    page,
    route,
    status,
    keyword,
    filters: query.filters,
  });
};

export const assembleResponse = (
  params: AssembleResponseDto,
  appRouteApi?: string,
) => {
  const { page, take, keyword, filters, status, route, total, dto, items } =
    params;
  type dataPage = null | number | string;
  const last = Math.ceil(total / take);
  const next = page + 1 > last ? null : page + 1;
  const prev = page - 1 < 1 ? null : page - 1;
  let firstPage: dataPage = 1;
  let currentPage: dataPage = page;
  let nextPage: dataPage = next;
  let prevPage: dataPage = prev;
  let lastPage: dataPage = last;
  if (route && appRouteApi) {
    const query = buildQuery(filters, keyword, status);
    const path = `${appRouteApi}/${route}`;
    firstPage = buildUrl(path, 1, take, query);
    currentPage = buildUrl(path, page, take, query);
    nextPage = next ? buildUrl(path, next, take, query) : next;
    prevPage = prev ? buildUrl(path, prev, take, query) : prev;
    lastPage = last ? buildUrl(path, last, take, query) : null;
  }
  return plainToClass(PaginateDto, {
    items: plainToInstance(dto, items),
    limit: take,
    total,
    firstPage,
    currentPage,
    nextPage,
    prevPage,
    lastPage,
  });
};

const buildUrl = (path: string, page: number, take: number, query: string) =>
  `${path}?page=${page}&limit=${take}${query}`;

const buildQuery = (filters: string, keyword: string, status: string) => {
  let query = '';
  if (keyword) {
    query = `&keyword=${keyword}`;
  }
  if (filters) {
    query = `${query}&filters=${filters}`;
  }
  if (status) {
    query = `${query}&status=${status}`;
  }
  return query;
};

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
