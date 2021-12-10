import { useLinkProps, useNavigation } from "@react-navigation/native";
import React, { Component, useState, useEffect } from "react";
import { View, Text, Image, TouchableHighlight, Pressable, ScrollView } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ArticleScreen from "../screens/ArticleScreen";
import { getFeedItems } from "../parser/parser";
import { Feed, FeedItem } from "react-native-rss-parser";

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
                <Text>{props.link}</Text>
            </View>
        </Pressable>

    )
}


export const ArticleList = (props: any) => {
    const [articleList, setList] = useState<FeedItem[]>([]);

    const doSomething = () => {
        Promise.resolve(FilterOutExclussions()).then(articles => { setList(articles); });
    }

    setTimeout(() => { doSomething() }, 10000);     // decolam

    return (
        <ScrollView>
            {articleList.map(article => {
                return (<Article key={article.id} title={article.title} text={article.description} link={article.links[0].url}/>)
            })}
        </ScrollView>
    )
}

    ;    // todo should not get items in exclussions, need to filter them after we have a list
export const FilterOutExclussions = async (): Promise<FeedItem[]> => {
    let curratedArticles: FeedItem[] = []

    for (let index = 0; index < FeedListUrls.length; index++) {
        const url = FeedListUrls[index];

        let items = await getFeedItems(url);
        if (Exclussions.length !== 0) {
            items.forEach((article: FeedItem) => {
                // TODO should split words first
                if (!Exclussions.some(word => article.title.toLowerCase().includes(word.toLowerCase()))) {
                    curratedArticles.push(article);
                }
            })
        }
        else {
            curratedArticles = curratedArticles.concat(items);
        }

    }
    console.log(curratedArticles[0].published);
    console.log(new Date(curratedArticles[0].published));
    curratedArticles.sort((a, b) => {
        return new Date(b.published).getTime() - new Date(a.published).getTime();
    });

    return curratedArticles;
}

export var Exclussions: string[] = []
export var FeedList: Feed[] = []
export var FeedListUrls: string[] = ['http://hotnews.ro/rss', 'http://digi24.ro/rss']