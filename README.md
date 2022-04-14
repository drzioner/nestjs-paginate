# NestJS Paginate

### Library for NestJS and TypeORM paging in a simple way

## Installation

```bash
npm i @drzioner/nest-paginate
# or
yarn add @drzioner/nest-paginate
```

## Usage

Example

```bash
import {
  paginate,
  PaginateDto,
  QueryPaginateDto,
} from '@drzioner/nestjs-paginate';

async function findAndPaginate(query: QueryPaginateDto): Promise<PaginateDto> {
    return paginate(
      {
        type: User,
        dto: UserDto,
        fields: ['name', 'lastname', 'username', 'email'],
        relations: ['roles'],
        route: 'users',
      },
      query,
      { status: 'ASC', name: 'ASC' },
    );
}
  
const paginate = await findAndPaginate({});
console.log('paginate', paginate);

# paginate [
#   {
#     name: 'user',
#     lastname: 'admin',
#     ...
#   }
# ] 
```
