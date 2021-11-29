import * as React from 'react';
import { ScrollView, Text, View, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IArticle } from '../components/Article';

export default function ArticleScreen({ route, navigation }: any) {
    const article: IArticle = route.params;

    return (
        <ScrollView style={{ margin: 7, marginTop: 90 }}>
            <View>
                {/* <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, marginRight: 25, marginLeft: 25}}>{article.title}</Text> */}
                <Text style={styles.title}>{article.title}</Text>

            </View>

            <Text>{article.text}</Text>
        </ScrollView>
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
  