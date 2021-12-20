import * as React from 'react';
import { Button, StyleSheet, ScrollView } from 'react-native';
import { getFeedItemModels } from '../parser/parser';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { ArticleList } from '../components/ArticleList';
import { RootTabScreenProps } from '../types';

export default function UnreadScreen({ navigation }: RootTabScreenProps<'Articles'>) {
  return (
    <View style={styles.container}>
      <ArticleList/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
