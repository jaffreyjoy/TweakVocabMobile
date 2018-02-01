import React, { Component } from 'react';
import {
  AppRegistry,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

var SQLite = require('react-native-sqlite-storage')
// var db = SQLite.openDatabase({ name: 'tweak.db', createFromLocation: '~storage/tweak.db'});
var db = SQLite.openDatabase({ name: 'tweak-data.db', createFromLocation: '~storage/tweak.db'});
// var db = SQLite.openDatabase({ name: 'tweak-data.db',  location: 'default'});

import { StackNavigator } from 'react-navigation';

import Chapter from './components/Chapter';
import Deck from './components/Deck';
import Word from './components/WordCards/Word';
import DeckComplete from './components/WordCards/DeckComplete';

class Home extends Component {

  static navigationOptions = {
    title: '⌘  Units',
    headerStyle: {
      backgroundColor: '#00232d',
    },
    headerTitleStyle: {
      color: '#88bfff',
      fontSize: 20,
      fontWeight: '300'
    }
  };

  render() {
    return (
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.chapterContainer}>
          <Chapter navigation={this.props.navigation}/>
        </View>
      </ScrollView>
    );
  }
}


export default class App extends Component {

  constructor(props){
  	super(props);

    // SQLite.deleteDatabase({name: 'tweak.db', location: 'default'});

    // db.transaction((tx) => {
    //   tx.executeSql('CREATE TABLE temp (id INTEGER,name TEXT)');
    // });
    // db.transaction((tx) => {
    //   tx.executeSql('INSERT INTO temp (id,name) VALUES (?,?)', [1,'lol'], (tx, res) => {
    //     // let noOfDecks = countResult.rows.item(0).noOfDecks;
    //     // console.log(noOfDecks);
    //     console.log(res.rowsAffected);
    //   });
    // });

    // db.transaction((tx) => {
    //   tx.executeSql('SELECT COUNT(DISTINCT deck) AS noOfDecks FROM origin WHERE unit=? AND chapter=?', [1,1], (tx, countResult) => {
    //     let noOfDecks = countResult.rows.item(0).noOfDecks;
    //     console.log(noOfDecks);
    //   });
    // });

    db.transaction((tx) => {
      tx.executeSql('SELECT name FROM sqlite_master WHERE type=?', ['table'], (tx, res) => {
        let table_name = res.rows.item(0).name;
        console.log(table_name);
      });
    });

  }

  render() {
    return (
      <Screens/>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer:{
    flex:1,
    backgroundColor: '#2a8fe7',
  },
  chapterContainer:{
    alignItems: 'center',
  }
});

const Screens = StackNavigator({
  Home: { screen: Home },
  Deck: { screen: Deck },
  Word: { screen: Word },
  DeckComplete: { screen: DeckComplete },
});
