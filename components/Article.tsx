import { useLinkProps, useNavigation } from "@react-navigation/native";
import React, { Component, useState, useEffect } from "react";
import { View, Text, Image, TouchableHighlight, Pressable, ScrollView, PlatformColor } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ArticleScreen from "../screens/ArticleScreen";
import { getFeed, getFeedItems } from "../parser/parser";
import { Feed, FeedItem } from "react-native-rss-parser";
import Colors from "../constants/Colors";


export function Article(props: any) {
    const navigation = useNavigation();
    const feedItem: FeedItem = props.item;
    const logo = props.logo;
    const source = props.source;
    const published = props.item.published;
    const [displayPublished, setDisplayPublished] = useState('');

    function openArticle() {
        navigation.navigate('Article', feedItem);
    }

    const computeDate = () => {
        const date = new Date(published);
        setDisplayPublished(date.getHours() + ':' + date.getMinutes());
    }
    
    useEffect(computeDate, []);

    return (
        <Pressable onPress={openArticle} style={{ marginBottom: 10 }}>
            <View style={{ margin: 5 }}>
                <Text style={{ fontWeight: 'bold' }} numberOfLines={2}>{feedItem.title.trim()}</Text>
                <Text numberOfLines={3}>{feedItem.description.trim()}</Text>
                <View style={{ flex: 1, flexDirection: 'row', marginTop: 4, backgroundColor: '#eeeeee'}}>
                    <Image source={{ uri: logo }} style={{ flex: 1, minHeight: 16, minWidth: 16, maxHeight: 16, maxWidth: 16, height: 16, width: 16, marginRight: 10 }} />
                    <Text style={{fontWeight: 'bold', flex: 1}}>{source}</Text>
                    <Text style={{ fontWeight: 'bold', alignSelf: 'flex-end', marginRight: 25}}>{ displayPublished }</Text>
                </View>
            </View>
        </Pressable>

    )

}


export const ArticleList = (props: any) => {
    const [feedList, setFeedList] = useState<Feed[]>([]);

    const getData = async () => {
        let feeds: Feed[] = [];
        for (let i=0; i < FeedListUrls.length; i++){
                await getFeed(FeedListUrls[i]).then(feed => {
                    feeds = feeds.concat(feed);
                })
        }
        setFeedList(feeds);
        console.log('Feed list has been updated.');
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <ScrollView>
        {feedList.map(feed => {
            return feed.items.map(item => {
                return (
                    <Article key={item.id} item={item} source={feed.title} logo={feed.image.url}></Article>
                )
            })
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
export var FeedListUrls: string[] = ['http://hotnews.ro/rss', 'http://digi24.ro/rss', 'http://sport.ro/rss']