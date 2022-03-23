import { plainToClass, plainToInstance } from 'class-transformer';

import { AssembleResponseDto, PaginateDto } from '../dtos';

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
    const path = `${appRouteApi}/${route}`;
    firstPage = `${path}?page=1&limit=${take}${query}`;
    currentPage = `${path}?page=${page}&limit=${take}${query}`;
    nextPage = next ? `${path}?page=${next}&limit=${take}${query}` : next;
    prevPage = prev ? `${path}?page=${prev}&limit=${take}${query}` : prev;
    lastPage = last ? `${path}?page=${last}&limit=${take}${query}` : null;
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
