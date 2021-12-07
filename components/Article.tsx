import { useLinkProps, useNavigation } from "@react-navigation/native";
import React, { Component, useState, useEffect } from "react";
import { View, Text, Image, TouchableHighlight, Pressable, ScrollView } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ArticleScreen from "../screens/ArticleScreen";
import { getFeed } from "../parser/parser";
import { FeedItem } from "react-native-rss-parser";

export interface IArticle {
    id: number,
    title: string,
    text: string,
    logo: string
}

export function Article(props: any) {
    const navigation = useNavigation();

    function openArticle() {
        navigation.navigate('Article', { id: props.id, title: props.title, text: props.text, logo: props.logo });
    }

    return (
        <Pressable onPress={openArticle}>
            <View style={{ margin: 5 }}>
                <Image source={{ uri: props.logo }} style={{ minHeight: 16, minWidth: 16, maxHeight: 16, maxWidth: 16, height: 16, width: 16 }} />
                <Text style={{ fontWeight: 'bold' }} numberOfLines={2}>{props.title}</Text>
                <Text numberOfLines={3}>{props.text}</Text>
            </View>
        </Pressable>

    )
}


export const ArticleList = (props: any) => {
    const [articleList, setList] = useState<FeedItem[]>([]);

    const doSomething = () => {
        Promise.resolve(FilterOutExclussions(Exclussions)).then(articles => { setList(articles) });
    }

    setTimeout(() => { doSomething() }, 10000);     // decolam

    return (
        <ScrollView>
            {articleList.map(article => {
                return (<Article key={article.id} title={article.title} text={article.description} />)
            })}
        </ScrollView>
    )
}

export const FilterOutExclussions = async (exclussions: string[]): Promise<FeedItem[]> => {
    const articleList = await getFeed();
    const curratedArticles: FeedItem[] = []

    articleList.forEach(article => {
        const words = article.title.trim().split(' ');
        console.log(words);

        if (!exclussions.some(word => article.title.toLowerCase().includes(word.toLowerCase()))) {
            curratedArticles.push(article);
        }
    })
    console.log(curratedArticles);
    return curratedArticles;
}

export var Exclussions: string[] = []