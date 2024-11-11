import * as SQLite from 'expo-sqlite/legacy';
import { Place } from '../models/place';

const database = SQLite.openDatabase('places.db');

export function init() {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS places (
                    id INTEGER PRIMARY KEY NOT NULL,
                    title TEXT NOT NULL,
                    imageUrl TEXT NOT NULL,
                    address TEXT NOT NULL,
                    lat REAL NOT NULL,
                    lng REAL NOT NULL
                )`,
                [],
                () => {
                    resolve();
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
    return promise;
}

export function insertPlace(place){
    const promise = new Promise((resolve, reject)=>{
        database.transaction((tx)=>{
            tx.executeSql(`INSERT INTO places (title, imageUrl, address, lat, lng) VALUES (?,?,?,?,?)`,
            [
                place.title, 
                place.imageUrl, 
                place.address, 
                place.location.lat, 
                place.location.lng
            ],
            (_,result)=>{
                console.log(result)
                resolve(result)
            },
            (_, error)=>{
                reject(error)
            }
        )
        })
    })
}

export function fetchPlaces(){
    const promise = new Promise((resolve, reject)=>{
        database.transaction((tx)=>{
            tx.executeSql(`SELECT * FROM places`,
                [],
            (_, result)=>{
                const places=[]
                for(const dp of result.rows._array)
                {
                    places.push(new Place(dp.title, 
                        dp.imageUrl, 
                        {
                            address:dp.address,
                            lat:dp.lat,
                            lng:dp.lng
                        },
                        dp.id 

                    ))
                }
                resolve(places)
            },
            (_, error)=>{
                reject(error)
            }
            )
        })
    })
    return promise
}

export function fetchPlaceDetails(id){
    const promise=new Promise((resolve, reject)=>{
        database.transaction((tx)=>{
            tx.executeSql(`SELECT * FROM places WHERE id = ?`,
                [id],
                (_, result)=>{
                    resolve(result.rows._array[0])
                },
                (_,error)=>{
                    reject(error)
                }
            )
        })
    })

    return promise
}