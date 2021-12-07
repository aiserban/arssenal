import * as React from 'react'
import { StatusBar, StyleSheet, Platform, PlatformColor, Pressable, Button, TouchableHighlight } from 'react-native'
import { Exclussions, IArticle } from '../components/Article';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';


export default function BlacklistScreen({ route, navigation, props }: any) {
    const article: IArticle = route.params;
    let articleWords: string[] = article.title.split(' ');

    const wordClicked = (word: string) => {
        word = word.trim().toLowerCase();
        if (!Exclussions.includes(word)) {
            Exclussions.push(word.trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""));
        }
        console.log('Pressed word ' + word);
        Exclussions.forEach(w => {
            console.log(w);
        })
    }

    const renderWords = (words: string[]) => {
        return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {words.map((word, index) => {
                return <Text key={index} onPress={() => wordClicked(word)}>{word} </Text>
            })}
        </View>
        )
    }

    return (
        <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', height: '100%', width: '100%' }} >
            <View style={{ borderRadius: 10, overflow: 'hidden', alignSelf: 'center', alignItems: 'center', marginTop: '70%', flex: 0, justifyContent: 'center', position: 'absolute', marginRight: 10, marginLeft: 10 }} >
                {/* Header */}
                <View style={{ flexDirection: 'row', borderRadius: 0, flex: 1, backgroundColor: PlatformColor('quaternarySystemFill') }}>
                    <Text style={{ marginTop: 10, margin: 10, fontWeight: '500', fontSize: 16, flex: 10 }}>
                        Select words to blacklist
                    </Text>
                    <TouchableHighlight style={{ flex: 3, overflow: 'hidden' }}>
                        <Button title='Done' onPress={() => navigation.goBack()}></Button>
                    </TouchableHighlight>
                </View>

                {/* Article title / words */}
                <View style={{ alignItems: 'center', borderRadius: 10, margin: 10 }}>
                    <Text>{renderWords(articleWords)}</Text>
                </View>
            </View>
        </View>
    );
}

