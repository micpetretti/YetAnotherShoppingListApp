import {appSchema, tableSchema} from '@nozbe/watermelondb';

export const LISTS_TABLE = 'lists';
export const ITEMS_TABLE = 'items';

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'lists',
      columns: [{name: 'name', type: 'string'}],
    }),
    tableSchema({
      name: 'items',
      columns: [
        {name: 'name', type: 'string'},
        {name: 'list_id', type: 'string', isIndexed: true},
      ],
    }),
  ],
});
