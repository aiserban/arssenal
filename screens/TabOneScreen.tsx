import * as React from 'react';
import { Button, StyleSheet, ScrollView } from 'react-native';
import { getFeed } from '../parser/parser';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Article, RenderCurratedArticles, Exclussions } from '../components/Article';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />

      <Button
        onPress={() => {
          alert('something');
          }}
          title="Button"/>
      {/* <ScrollView>{RenderCurratedArticles()}</ScrollView> */}
      <RenderCurratedArticles></RenderCurratedArticles>
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
