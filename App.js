import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {LISTS_TABLE, ITEMS_TABLE} from './model/schema';
import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import schema from './model/schema';
import Lists from './model/Lists';
import Items from './model/Items';
import {ListItem} from './src/Components';

const getRandomNumber = () => Math.floor(Math.random() * 100);

// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
  schema,
});

// Then, make a Watermelon database from it!
const database = new Database({
  adapter,
  modelClasses: [Lists, Items],
  actionsEnabled: true,
});

const makeRandomList = async () => {
  const listsCollection = database.collections.get(LISTS_TABLE);
  await database.action(async () => {
    await listsCollection.create(list => {
      list.name = `List ${getRandomNumber()}`;
    });
  });
};

const deleteList = async listId => {
  const listsCollection = database.collections.get(LISTS_TABLE);
  const listToDelete = await listsCollection.find(listId);
  await database.action(async () => {
    await listToDelete.markAsDeleted();
  });
};

const renameList = async listId => {
  const listsCollection = database.collections.get(LISTS_TABLE);
  const listToRename = await listsCollection.find(listId);
  await database.action(async () => {
    await listToRename.update(list => {
      list.name = `Renamed ${getRandomNumber()}`;
    });
  });
};

const makeRandomItemForList = async listId => {
  const itemsCollection = database.collections.get(ITEMS_TABLE);
  await database.action(async () => {
    await itemsCollection.create(item => {
      item.name = `Item ${getRandomNumber()}`;
      item.list.id = listId;
    });
  });
};

const ShoppingLists = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const listsCollection = database.collections.get(LISTS_TABLE);
    const observable = listsCollection.query().observeWithColumns('name');
    if (!observable || !observable.subscribe) {
      return;
    }
    const subscription = observable.subscribe(next => setLists(next));
    return () => subscription.unsubscribe();
  }, [database]);

  return (
    <FlatList
      data={lists}
      renderItem={({item}) => (
        <ListItem
          name={item.name}
          items={item.items}
          listId={item.id}
          deleteList={deleteList}
          renameList={renameList}
          makeRandomItem={makeRandomItemForList}
        />
      )}
    />
  );
};

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.flexOne}>
        <Text style={styles.header}>{'My Lists'}</Text>
        <ShoppingLists />
        <TouchableOpacity style={styles.addListButton} onPress={makeRandomList}>
          <Text style={styles.addListButtonText}>{'+ New List'}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  flexOne: {flex: 1},
  header: {padding: 32, fontSize: 32},
  addListButton: {
    position: 'absolute',
    left: 32,
    right: 32,
    bottom: 32,
    backgroundColor: 'black',
    borderRadius: 99,
    alignItems: 'center',
    padding: 8,
  },
  addListButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default App;
