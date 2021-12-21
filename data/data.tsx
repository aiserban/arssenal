import { FeedItem, Feed } from "react-native-rss-parser"
import { FeedItemModel } from "../models/FeedItemModel"

export var ReadList: FeedItemModel[] = []
export var Exclussions: string[] = []
export var FeedList: Feed[] = []
export var FeedListUrls: string[] = ['http://hotnews.ro/rss', 'http://digi24.ro/rss', 'http://sport.ro/rss']