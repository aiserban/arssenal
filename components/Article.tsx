import { useLinkProps, useNavigation } from "@react-navigation/native";
import React, { Component, useState, useEffect } from "react";
import { View, Text, Image, ActivityIndicator, Pressable, ScrollView, RefreshControl, PlatformColor } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ArticleScreen from "../screens/ArticleScreen";
import { getFeed, getFeedItems } from "../parser/parser";
import { Feed, FeedItem } from "react-native-rss-parser";
import Colors from "../constants/Colors";


export const Article = (props: any) => {
    const navigation = useNavigation();
    const feedItem: FeedItem = props.item;
    const [logo, setLogo] = useState<string>();
    const source = props.source;
    const sourceUrl = props.sourceUrl;
    const published = props.item.published;
    const [displayPublished, setDisplayPublished] = useState('');

    const openArticle = () => {
        navigation.navigate('Article', feedItem);
    }

    // TODO Handle days other day today
    const computeDate = () => {
        const date = new Date(published);
        const hours = date.getHours();
        let minutes;

        if (date.getMinutes() < 10) {
            minutes = '0' + date.getMinutes();
        }
        else {
            minutes = date.getMinutes();
        }
        setDisplayPublished(hours + ':' + minutes);
    }

    const computeFavicon = () => {
        if (logo === undefined){    // TODO Should cache icon
            setLogo('https://www.google.com/s2/favicons?domain=' + sourceUrl);
        }
        else {
            setLogo(props.logo);
        }
    }

    useEffect(computeDate, []);
    useEffect(computeFavicon, []);

    function openBlacklistScreen(){
        navigation.navigate('Blacklist', feedItem);
      }

    return (
        <Pressable onPress={openArticle} onLongPress={openBlacklistScreen} style={{ marginBottom: 10 }}>
            <View style={{ margin: 5 }}>
                <Text style={{ fontFamily: 'Avenir', fontWeight: '700' }} numberOfLines={2}>{feedItem.title.trim()}</Text>
                <Text style={{ fontFamily: 'Avenir'}} numberOfLines={3}>{feedItem.description.trim()}</Text>
                <View style={{ flex: 1, flexDirection: 'row', marginTop: 4, backgroundColor: PlatformColor('systemBlue') }}>
                    <Image source={{ uri: logo }} style={{ flex: 1, minHeight: 16, minWidth: 16, maxHeight: 16, maxWidth: 16, height: 16, width: 16, marginHorizontal: 8, alignSelf: 'center' }} />
                    <Text style={{ fontFamily: 'Avenir', fontWeight: '100', color: 'white', flex: 1 }}>{source}</Text>
                    <Text style={{ fontFamily: 'Avenir', fontWeight: '100', color: 'white', alignSelf: 'flex-end', marginRight: 25 }}>{displayPublished}</Text>
                </View>
            </View>
        </Pressable>

    )

}