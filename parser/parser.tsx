// import axios from 'axios'

// export const getFeed = () => {
//     axios.get('https://hotnews.ro/rss').then(res => {console.log(res);});
// }
// TODO remove axios

import * as rssParser from 'react-native-rss-parser'
import { FeedItem } from 'react-native-rss-parser';


export const getFeedItems = async (url: string) => {
    try {
        const response = await fetch(url);
        const responseData = await response.text();
        const rss = await rssParser.parse(responseData);
        return rss.items;
    } catch (err) {
        alert(err);
        return [];
    }
}

export const getFeed = async (url: string) => {
    return fetch(url)
            .then((response) => response.text())
            .then((responseData) => rssParser.parse(responseData))
            .then((rss) => rss.title);
}