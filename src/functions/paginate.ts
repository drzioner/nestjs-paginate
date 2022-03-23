import { getRepository } from 'typeorm';
import { ParamsPaginateDto, QueryPaginateDto } from '../dtos';
import { assembleResponse } from './assemble-response';
import { assembleWhere } from './assemble-where';
import { getParams } from './get-params';

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
