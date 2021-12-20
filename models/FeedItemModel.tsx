import { FeedItem } from "react-native-rss-parser";

export interface FeedItemModel {
    item: FeedItem,
    parent: {
        name: string,
        url: string,
        logoUrl: string
    }
}