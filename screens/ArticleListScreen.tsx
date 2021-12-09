import * as React from 'react';
import { Button, StyleSheet, ScrollView } from 'react-native';
import { getFeedItems } from '../parser/parser';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Article, ArticleList, Exclussions } from '../components/Article';
import { RootTabScreenProps } from '../types';

export default function ArticleListScreen({ navigation }: RootTabScreenProps<'Articles'>) {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />

      <Button
        onPress={() => {
          alert('something');
          }}
          title="Button"/> */}
      <ArticleList></ArticleList>
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