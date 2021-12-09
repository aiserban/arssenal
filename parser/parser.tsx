// import axios from 'axios'

// export const getFeed = () => {
//     axios.get('https://hotnews.ro/rss').then(res => {console.log(res);});
// }
// TODO remove axios

import * as rssParser from 'react-native-rss-parser'
import { FeedItem } from 'react-native-rss-parser';


export const getFeedItems = (url: string) => {
    return fetch(url)
        .then(response => response.text())
        .then(responseData => rssParser.parse(responseData))
        .then(rss => {
            return rss.items;
        })
        .catch(err => {
            alert(err);
            return [];
        });
}

export const getFeed = (url: string) => {
    return fetch(url)
        .then(response => response.text())
        .then(responseData => rssParser.parse(responseData))
        .then(rss => { return rss.title })
        .catch(err => { 
            alert(err);
            return 'Could not find the feed. \nPlease check your spelling and try again.';
         });
}