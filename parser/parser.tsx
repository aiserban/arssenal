// import axios from 'axios'

// export const getFeed = () => {
//     axios.get('https://hotnews.ro/rss').then(res => {console.log(res);});
// }
// TODO remove axios

import * as rssParser from 'react-native-rss-parser'
import { FeedItem } from 'react-native-rss-parser';


export const getFeedItems = async (url: string) => {
    return fetch(url)
    .then((response) => response.text())
    .then((responseData) => rssParser.parse(responseData))
    .then((rss) => rss.items);
}

export const getFeed = async (url: string) => {
    return fetch(url)
            .then((response) => response.text())
            .then((responseData) => rssParser.parse(responseData))
}