import * as React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IArticle } from '../components/Article';

export default function ArticleScreen({route, navigation}: any) {
    const article: IArticle = route.params;

    return(
        <Text>{article.text}</Text>
    );
}