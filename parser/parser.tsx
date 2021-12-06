// import axios from 'axios'

// export const getFeed = () => {
//     axios.get('https://hotnews.ro/rss').then(res => {console.log(res);});
// }
// TODO remove axios

import * as rssParser from 'react-native-rss-parser'
import { FeedItem } from 'react-native-rss-parser';


export const getFeed = () => {
    return fetch('https://hotnews.ro/rss')
        .then(response => response.text())
        .then(responseData => rssParser.parse(responseData))
        .then(rss => {
            return rss.items;
        });
}
