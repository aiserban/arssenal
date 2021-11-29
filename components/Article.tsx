import { useLinkProps, useNavigation } from "@react-navigation/native";
import React, { Component } from "react";
import { View, Text, Image, TouchableHighlight, Pressable } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ArticleScreen from "../screens/ArticleScreen";

export interface IArticle {
    id: number,
    title: string,
    text: string,
    logo: string
}

const articleList: IArticle[] = [
    {
        id: 1,
        title: ' Criza politică și rata mică de vaccinare din România, prin ochii unor tineri care au plecat din țară: „O pauză de la România nu e o idee rea și s-ar putea inclusiv să ne apropie” ',
        text: ' Cum se vede ce se întâmplă acum în România- criza politică și gestionarea pandemiei- prin ochii unor tineri plecați în alte țări? Am stat de vorbă cu câțiva dintre aceștia, iar poziția lor este în general fermă: „Nu văd nicio schimbare posibilă în decursul vieții mele” / „Cred că o pauză de la România nu e o idee rea și s-ar putea inclusiv să ne apropie”.',
        logo: 'https://www.hotnews.ro/favicon.ico'
    },
    {
        id: 2,
        title: ' LIVETEXT Noua variantă Omicron: Israel devine prima țară care își închide complet granițele / Australia confirmă două cazuri de infectare cu noua tulpină Covid-19 ',
        text: 'Israelul a anunțat că va interzice intrarea tuturor străinilor în țară și va reintroduce sistemul de urmărire telefonică pentru a limita răspândirea noii variante de coronavirus, potențial mai contagioasă, detectată pentru prima dată în Africa de Sud, informează Reuters și Jerusalem Post. Israel a confirmat un caz de infectare cu noua variantă Omicron și alte șapte cazuri suspecte. Danemarca și Australia au confirmat și ele primele cazuri.',
        logo: 'https://www.hotnews.ro/favicon.ico'
    },
    {
        id: 3,
        title: ' OMICRON. Veștile rele, cele bune și ce nu știm încă ',
        text: 'În orice caz, avem o nouă variantă. Nasoală. Cu atât mai nasoală cu cât nivelurile de competență ale respondenților sunt cele pe care le cunoaștem. ',
        logo: 'https://www.hotnews.ro/favicon.ico'
    },
    {
        id: 4,
        title: ' ​VIDEO Ghid de utilizare a testelor de salivă în școli - trei clipuri demonstrative  ',
        text: 'Ministrul Educației, Sorin Cîmpeanu, a făcut publice trei clipuri video pentru administrarea testelor de salivă de către elevi, fie în școli, fie acasă. ',
        logo: 'https://www.hotnews.ro/favicon.ico'
    },
    {
        id: 5,
        title: 'Cât ar putea plăti bucureștenii pentru încălzire în această iarnă la tariful de 280 lei propus de Nicușor Dan ',
        text: 'Primarul general al Capitalei, Nicușor Dan, propune de la 1 decembrie o creștere a prețului gigacaloriei pentru populație de la 164 lei la 280 lei.',
        logo: 'https://www.hotnews.ro/favicon.ico'
    },
    {
        id: 6,
        title: ' ​Loteria de Vaccinare: Duminică are loc a doua extragere lunară. Ce numere participă ',
        text: 'Duminică vor avea loc cea de-a doua extragere lunară și cea de-a noua extragere săptămânală la Loteria de Vaccinare, potrivit Loteriei Române. ',
        logo: 'https://www.hotnews.ro/favicon.ico'
    },
    {
        id: 7,
        title: ' Șapte "date ale problemei" despre vaccinarea anti-COVID a copiilor cu vârsta între 5 și 11 ani. Medicul Mihai Craiu: Decizia este a dumneavoastră ',
        text: 'Agenția Europeană a Medicamentului a aprobat săptămâna trecută primul vaccin - cel al Pfizer/BioNTech - împotriva COVID pentru copiii cu vârsta între 5 și 11 ani. ',
        logo: 'https://www.hotnews.ro/favicon.ico'
    }
]


export function Article(props: any) {
    const navigation = useNavigation();

    function onPress() {
        console.log('Pressed');
        navigation.navigate('Article', {id: props.id, title: props.title, text: props.text, logo: props.logo});
    }

    return (
        <Pressable onPress={onPress}>
            <View style={{ margin: '5px' }}>
                <Image source={{ uri: props.logo }} style={{ minHeight: '16pt', minWidth: '16pt', maxHeight: '16pt', maxWidth: '16pt', height: '16pt', width: '16pt' }} />
                <Text style={{ fontWeight: 'bold' }} numberOfLines={2}>{props.title}</Text>
                <Text numberOfLines={3}>{props.text}</Text>
            </View>
        </Pressable>

    )
}

export const RenderCurratedArticles = () => {
    const curratedArticles = FilterOutExclussions(Exclussions);

    return (
        <View>
            {curratedArticles.map(article => {

                return (<Article key={article.id} title={article.title} text={article.text} logo={article.logo} />)
            })}
        </View>
    )
}

export const FilterOutExclussions = (exclussions: string[]): IArticle[] => {
    const curratedArticles: IArticle[] = []

    articleList.forEach(article => {
        const words = article.title.trim().split(' ');
        console.log(words);

        if (!exclussions.some(word => article.title.toLowerCase().includes(word.toLowerCase()))) {
            curratedArticles.push(article);
            console.log(article.id + ' ' + article.title);
        }
    })

    return curratedArticles;
}

export var Exclussions = [
    'Omicron',
    'Loteria',
    'Covid'
]