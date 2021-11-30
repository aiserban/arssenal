import * as React from 'react';
import { ScrollView, Text, View, Image, StyleSheet, Pressable } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IArticle } from '../components/Article';

export default function ArticleScreen({ route, navigation }: any) {
    const article: IArticle = route.params;

    return (
        <ScrollView style={{ margin: 7, marginTop: 90 }}>
            <View>
                <Text style={styles.title} onLongPress={openBlacklistScreen}>{article.title} </Text>

            </View>

            <Text>{article.text}</Text>
        </ScrollView>
    );

    function openBlacklistScreen(){
      navigation.navigate('Blacklist', article);
    }
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
  