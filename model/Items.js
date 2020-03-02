import {Model} from '@nozbe/watermelondb';
import {ITEMS_TABLE, LISTS_TABLE} from './schema';
import {field, relation} from '@nozbe/watermelondb/decorators';

export default class Items extends Model {
  static table = ITEMS_TABLE;
  static associations = {
    [LISTS_TABLE]: {type: 'belongs_to', key: 'list_id'},
  };

  @field('name') name;
  @relation('lists', 'list_id') list;
}
