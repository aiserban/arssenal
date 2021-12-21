import { useLinkProps, useNavigation } from "@react-navigation/native";
import React, { Component, useState, useEffect } from "react";
import { View, Text, Image, ActivityIndicator, Pressable, ScrollView, RefreshControl, PlatformColor } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ArticleScreen from "../screens/ArticleScreen";
import { Feed, FeedItem } from "react-native-rss-parser";
import Colors from "../constants/Colors";
import { ReadList } from "../data/data";
import { StyleSheet } from "react-native";
import { FeedItemModel } from "../models/FeedItemModel";


export const Article = (props: any) => {
    const navigation = useNavigation();
    const item: FeedItemModel = props.item;
    const [logo, setLogo] = useState<string>();
    const source = props.source;
    const sourceUrl = props.sourceUrl;
    const published = props.item.item.published;
    const [displayPublished, setDisplayPublished] = useState('');
    const [isRead, setIsRead] = useState(false);

    const markRead = () => {
        ReadList.push(item);
        setIsRead(true);
    }

    const openArticle = () => {
        navigation.navigate('Article', item);
        markRead();
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

        if (item.item.id === undefined) {
            console.log(item.parent.name);
        }
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
        navigation.navigate('Blacklist', item);
      }

    return (
        <Pressable onPress={openArticle} onLongPress={openBlacklistScreen} style={{ marginBottom: 10 }}>
            <View style={{ margin: 5 }}>
                <Text style={ [styles.title, isRead? styles.read : {}] } numberOfLines={2}>{item.item.title.trim()}</Text>
                <Text style={ [styles.text, isRead? styles.read : {}] } numberOfLines={3}>{item.item.description.trim()}</Text>
                <View style={ styles.info }>
                    <Image source={{ uri: logo }} style={ styles.logo } />
                    <View style={ styles.sourceDateContainer}>
                        <Text style={ styles.source }>{source}</Text>
                        <Text style={ styles.date }>{displayPublished}</Text>
                    </View>
                </View>
            </View>
        </Pressable>

    )

}

const styles = StyleSheet.create({
    title: { fontFamily: 'Avenir', fontWeight: '700' },
    text: { fontFamily: 'Avenir' },
    read: { color: PlatformColor('systemGray')},
    logo: { flex: 1, minHeight: 16, minWidth: 16, maxHeight: 16, maxWidth: 16, height: 16, width: 16, marginRight: 4, alignSelf: 'center' },
    source: { fontFamily: 'Avenir', fontWeight: '100', color: 'white', flex: 1, marginLeft: 4 },
    date: { fontFamily: 'Avenir', fontWeight: '100', color: 'white', alignSelf: 'flex-end', marginRight: 25 },
    info: { flex: 1, flexDirection: 'row', marginTop: 4 },
    sourceDateContainer: { flex: 1, flexDirection: 'row', backgroundColor: PlatformColor('systemBlue') }
})