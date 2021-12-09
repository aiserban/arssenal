import * as React from "react"
import { Text, View, TextInput, Button } from "react-native"
import axios from "axios"
import { getFeed, getFeedItems } from "../parser/parser";

export const AddFeed = (props: any) => {
    const [text, onChangeText] = React.useState('');
    const [result, setResult] = React.useState('');

    const SearchForFeed = () => {
        // todo check if valid url
        // get
        // check content/type 

        
        getFeed(text)
            .then(rssTitle => setResult(rssTitle))
            .catch(err => { 
                console.log(err);
                setResult(err)
            });
    }

    return(
        <View>
            <TextInput placeholder={"Feed or website URL"} autoCorrect={false} onChangeText={onChangeText}></TextInput>
            <Button title='Search' onPress={SearchForFeed}></Button>
            <View>
                <Text>{result}</Text>
            </View>
        </View>
    )
}

