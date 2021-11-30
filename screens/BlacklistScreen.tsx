import * as React from 'react'
import { StatusBar, StyleSheet, Platform, Pressable } from 'react-native'
import { IArticle } from '../components/Article';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';


export default function BlacklistScreen({ route, navigation }: any) {
    const article: IArticle = route.params;
    let articleWords: string[] = article.title.split(' ');
    let excludedWords: string[] = []    // TODO needs to be outside this function

    const wordClicked = (word: string) => {
        word = word.trim().toLowerCase();
        if (!excludedWords.includes(word)){
            excludedWords.push(word.trim());
        }
        console.log('Pressed word ' + word);
        excludedWords.forEach(w => {
            console.log(w);
        })
    }

    const renderWords = (words: string[]) => {
        return (<View style={{ flexDirection:'row', flexWrap: 'wrap' }}>
            {words.map(word => {
                return <Text onPress={() => wordClicked(word)}>{word} </Text>
            })}
        </View>
        )
    }

    return (
        <View style={{alignSelf: 'center', alignItems: 'center', marginTop: '70%', flex: 1, justifyContent: 'center', position: 'absolute', marginRight: 10, marginLeft: 10}} >
            <Text style={{flex: 1}}>
                This is where text should appear
            </Text>
            <View style={{alignItems: 'center'}}>
                <Text>{renderWords(articleWords)}</Text>
            </View>
        </View>
    );

    
}

