import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import { FeedItemModel } from "../models/FeedItemModel";

export async function openDb(): Promise<SQLite.WebSQLDatabase> {
    // const pathToDatabaseFile = FileSystem.documentDirectory || '/Users/andrei/Source/arssenal/db';
    // console.log(pathToDatabaseFile);

    if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
        await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
    }
    // await FileSystem.downloadAsync(
    //     Asset.fromModule(require(pathToDatabaseFile)).uri,
    //     FileSystem.documentDirectory + 'SQLite/arss.db'
    // );
    return SQLite.openDatabase('arss.db');
};

export const insert = async (item: FeedItemModel) => {
    const db = await openDb();
    db.transaction((tx) => {
        // tx.executeSql('DROP TABLE IF EXISTS FeedItem;');
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS 
            FeedItem (
            ID TEXT,
            Read INTEGER
        );`
        );
        tx.executeSql(`INSERT INTO FeedItem VALUES (?, ?)`, [item.item.id, 0])
        tx.executeSql('SELECT * FROM FeedItem', [], (tx, resultSet) => {
            const rows = JSON.stringify(resultSet.rows);
            console.log(rows);
        });
    });
}