import React, { useState, useEffect } from "react";
import { ActivityIndicator, ScrollView, RefreshControl } from "react-native";
import { Feed, FeedItem } from "react-native-rss-parser";
import { getFeed, getFeedItems } from "../parser/parser";
import {Article} from "./Article";

export const ArticleList = (props: any) => {
    const [feedList, setFeedList] = useState<Feed[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const getData = async () => {
        let feeds: Feed[] = [];
        for (let i = 0; i < FeedListUrls.length; i++) {
            await getFeed(FeedListUrls[i]).then(feed => {
                feeds = feeds.concat(feed);
            })
        }
        setFeedList(feeds);
        setIsLoading(false);
        console.log('Feed list has been updated.');
    }

    const refresh = async () => {
        setIsRefreshing(true);
        await getData();
        setIsRefreshing(false);
    }

    useEffect(() => {
        getData();
    }, [])


    // TODO Sort by published
    return (
        <>
        { isLoading && <ActivityIndicator size='large' style={{ flex: 1, alignSelf: 'center', justifyContent: 'center'}}></ActivityIndicator>}
        <ScrollView refreshControl={<RefreshControl refreshing={ isRefreshing } onRefresh={refresh}></RefreshControl>}>
            { feedList.map(feed => {
                return feed.items.map(item => {
                    return (
                        <Article key={item.id} item={item} source={feed.title} sourceUrl={feed.links[0].url} logo={feed.image.url}></Article>
                    )
                })
            })}
        </ScrollView>
        </>
    )
}

// todo should not get items in exclussions, need to filter them after we have a list
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