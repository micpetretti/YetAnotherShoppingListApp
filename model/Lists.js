import {Model} from '@nozbe/watermelondb';
import {LISTS_TABLE, ITEMS_TABLE} from './schema';
import {field, children} from '@nozbe/watermelondb/decorators';

export default class Lists extends Model {
  static table = LISTS_TABLE;
  static associations = {
    [ITEMS_TABLE]: {type: 'has_many', foreignKey: 'list_id'},
  };

  @field('name') name;
  @children(ITEMS_TABLE) items;
}
