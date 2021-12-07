import { useLinkProps, useNavigation } from "@react-navigation/native";
import React, { Component, useState, useEffect } from "react";
import { View, Text, Image, TouchableHighlight, Pressable, ScrollView } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ArticleScreen from "../screens/ArticleScreen";
import { getFeed } from "../parser/parser";
import { FeedItem } from "react-native-rss-parser";

export interface IArticle {
    id: number,
    title: string,
    text: string,
    logo: string
}

// TODO remove
// const articleList: IArticle[] = [
//     {
//         id: 1,
//         title: 'Cum le-am putea oferi extratereștrilor cele mai bune indicații ca să găsească Pământul',
//         text: 'Există mai multe tehnici pe care oamenii de știință le-ar putea folosi pentru a trimite indicații către extratereștrii îndepărtați, dar, mai important, cercetătorii ar trebui să găsească o modalitate de a trimite o hartă galactică lizibilă oaspeților noștri – ceea ce este o problemă dificilă, scrie <a rel="nofollow" href="https://www.livescience.com/earth-directions-for-aliens" target="Alta pagina">Live Science</a>. "Dacă încerci să spui cuiva unde ești, trebuie să ai niște referințe comune, nu? În mod ideal, referințe fixe. Dar nimic nu este fix în galaxie", spune astrofizicianul Héctor Socas-Navarro."',
//         logo: 'https://www.hotnews.ro/favicon.ico'
//     },
//     {
//         id: 2,
//         title: 'Fără mască de protecție la orele de sport, în școlile din București',
//         text: ' <span times="" new="" roman="">Elevii școlilor din Capitală vor putea face orele de educație fizică și sport în spațiile interioare fără să poarte mască de protecție, începând de joi, când vor reveni la cursuri din minivacanța de 1 Decembrie.</span><span times="" new="" roman=""> Decizia a fost luată luni seară de către Comitetul Municipal pentru Situații de Urgență, în condițiile în care </span><a href="https://www.hotnews.ro/stiri-coronavirus-25211859-rata-infectare-bucuresti-scazut-sub-2-mia-locuitori.htm" target="Alta pagina" times="" new="" roman="">incidența cazurilor COVID-19 în București a ajuns la 1,95</a><span times="" new="" roman=""> la mia de locuitori.</span> ',
//         logo: 'https://www.hotnews.ro/favicon.ico'
//     },
//     {
//         id: 3,
//         title: 'VIDEO Liga 1: Gaz Metan Mediaș vs Farul Constanța 1-1 / Echipa lui Gică Hagi a egalat din penalty în minutul 90+7',
//         text: 'Gaz Metan Mediaş și Farul Constanța au terminat la egalitate, scor 1-1, meciul disputat în etapa a XVII-a a Ligii I. Echipa lui Gică Hagi a egalat în minutul 90+7, din penaltiy',
//         logo: 'https://www.hotnews.ro/favicon.ico'
//     },
//     {
//         id: 4,
//         title: ' ​Incidenţa Covid-19 în Germania, la cel mai ridicat nivel. Merkel, Scholz şi liderii landurilor germane se reunesc pentru a discuta înăsprirea restricţiilor',
//         text: 'Cancelarul federal german Angela Merkel, succesorul său Olaf Scholz şi liderii landurilor germane vor discuta marţi despre o eventuală înăsprire a restricţiilor menite să stăvilească resurgenţa virulentă a Covid-19, informează luni agenția France Presse, citând o sursă guvernamentală.',
//         logo: 'https://www.hotnews.ro/favicon.ico'
//     },
//     {
//         id: 5,
//         title: 'Cât ar putea plăti bucureștenii pentru încălzire în această iarnă la tariful de 280 lei propus de Nicușor Dan ',
//         text: 'Primarul general al Capitalei, Nicușor Dan, propune de la 1 decembrie o creștere a prețului gigacaloriei pentru populație de la 164 lei la 280 lei.',
//         logo: 'https://www.hotnews.ro/favicon.ico'
//     },
//     {
//         id: 6,
//         title: 'Companiile farmaceutice încep să lucreze la noi vaccinuri anti-COVID pentru varianta Omicron / În cât timp estimează că vor fi gata',
//         text: '<span times="" new="" roman="">Companiile Pfizer-BioNTech, Moderna şi Johnson &amp; Johnson încep să lucreze la vaccinuri anti-COVID-19 care ţintesc în mod specific varianta Omicron a noului coronavirus şi care vor fi produse dacă se va dovedi că serurile lor actuale nu sunt eficiente împotriva acestei noi variante, ce a fost semnalată săptămâna trecută de Africa de Sud şi deja se răspândeşte în alte părţi ale lumii, relatează Reuters şi AFP.</span>',
//         logo: 'https://www.hotnews.ro/favicon.ico'
//     },
//     {
//         id: 7,
//         title: ' Șapte "date ale problemei" despre vaccinarea anti-COVID a copiilor cu vârsta între 5 și 11 ani. Medicul Mihai Craiu: Decizia este a dumneavoastră ',
//         text: 'Agenția Europeană a Medicamentului a aprobat săptămâna trecută primul vaccin - cel al Pfizer/BioNTech - împotriva COVID pentru copiii cu vârsta între 5 și 11 ani. ',
//         logo: 'https://www.hotnews.ro/favicon.ico'
//     }
// ]


export function Article(props: any) {
    const navigation = useNavigation();

    function openArticle() {
        console.log('Pressed');
        navigation.navigate('Article', { id: props.id, title: props.title, text: props.text, logo: props.logo });
    }

    return (
        <Pressable onPress={openArticle}>
            <View style={{ margin: 5 }}>
                <Image source={{ uri: props.logo }} style={{ minHeight: 16, minWidth: 16, maxHeight: 16, maxWidth: 16, height: 16, width: 16 }} />
                <Text style={{ fontWeight: 'bold' }} numberOfLines={2}>{props.title}</Text>
                <Text numberOfLines={3}>{props.text}</Text>
            </View>
        </Pressable>

    )
}

export const ArticleList = (props: any) => {
    const [articleList, setList] = useState<FeedItem[]>([]);


    const doSomething = () => {
        Promise.resolve(FilterOutExclussions(Exclussions)).then(articles => { setList(articles) });
    }
    setTimeout(() => { doSomething() }, 10000);     // decolam
    return (
        <ScrollView>
            {articleList.map(article => {
                return (<Article key={article.id} title={article.title} text={article.description} />)
            })}
        </ScrollView>
    )
}

export const FilterOutExclussions = async (exclussions: string[]): Promise<FeedItem[]> => {
    const articleList = await getFeed();
    const curratedArticles: FeedItem[] = []

    articleList.forEach(article => {
        const words = article.title.trim().split(' ');
        console.log(words);

        if (!exclussions.some(word => article.title.toLowerCase().includes(word.toLowerCase()))) {
            curratedArticles.push(article);
        }
    })
    console.log(curratedArticles);
    return curratedArticles;
}

export var Exclussions: string[] = [
    // 'Omicron',
    // 'Loteria',
    // 'Covid'
]