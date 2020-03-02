import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

export const ListItem = props => {
  const [items, setItems] = useState([]);
  const itemsQuery = props.items;

  useEffect(() => {
    if (itemsQuery) {
      const observable = itemsQuery.observe();
      if (!observable || !observable.subscribe) {
        return;
      }
      const subscription = observable.subscribe(next => setItems(next));
      return () => subscription.unsubscribe();
    }
  }, [itemsQuery]);

  return (
    <View style={styles.listItemCell}>
      <View style={styles.listItemHeader}>
        <Text style={{fontSize: 20}}>{props.name}</Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.renameListButton}
            onPress={() => props.renameList(props.listId)}>
            <Text style={{color: 'white'}}>{'rename'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteListButton}
            onPress={() => props.deleteList(props.listId)}>
            <Text style={{color: 'white'}}>{'delete'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addListItemButton}
            onPress={() => props.makeRandomItem(props.listId)}>
            <Text style={{color: 'white'}}>{'+ Add Item'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text>{`# Items: ${items.length}`}</Text>
      {items.map(item => (
        <Text key={item.id}>{item.name}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  listItemCell: {marginHorizontal: 16, paddingVertical: 8},
  listItemHeader: {
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  addListItemButton: {borderRadius: 99, backgroundColor: 'black', padding: 4},
  deleteListButton: {
    borderRadius: 99,
    backgroundColor: 'red',
    padding: 4,
    marginRight: 16,
  },
  renameListButton: {
    borderRadius: 99,
    backgroundColor: 'green',
    padding: 4,
    marginRight: 16,
  },
});
