import * as React from 'react';
import { ScrollView, Text, View, Image, StyleSheet, Pressable } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FeedItem } from 'react-native-rss-parser';
import WebView from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { IArticle } from '../components/Article';

export default function ArticleScreen({route, navigation}: any) {
    const feedItem: FeedItem = route.params;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <WebView source={{ uri: feedItem.links[0].url}} mediaPlaybackRequiresUserAction={true} />
      </SafeAreaView>
    )

    function openBlacklistScreen(){
      navigation.navigate('Blacklist', feedItem);
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
  