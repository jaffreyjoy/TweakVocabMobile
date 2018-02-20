/**
  * Author : Jaffrey Joy
  * Copyright (c) 2018 All Rights Reserved
**/

import React, { Component } from 'react';

var SQLite = require('react-native-sqlite-storage')
// var db = SQLite.openDatabase({ name: 'tweak.db', createFromLocation: '~storage/tweak.db'});
var db = SQLite.openDatabase({ name: 'tweak-datax.db', createFromLocation: '~storage/tweak.db'});
// var db = SQLite.openDatabase({ name: 'tweak-data.db',  location: 'default'});

import { StackNavigator } from 'react-navigation';

import { Actions, Router, Scene } from 'react-native-router-flux';

import VocabHome from './components/VocabHome';
import Deck from './components/Deck';
import Word from './components/WordCards/Word';
import DeckComplete from './components/WordCards/DeckComplete';


export default class App extends Component {

  constructor(props){
  	super(props);

    // setTimeout(function(){
    //   console.log('delete here');
    //   SQLite.deleteDatabase({ name: 'tweak-datax.db', location: 'default' });
    // },2000);


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

    // db.transaction((tx) => {
    //   tx.executeSql('DELETE FROM current', [], (tx, deleteResult) => {
    //   });
    // });

    // db.transaction((tx) => {
    //   tx.executeSql('UPDATE origin SET viewed=0', [], (tx, updateResult) => {
    //   });
    // });

    // db.transaction((tx) => {
    //   tx.executeSql('UPDATE derived SET viewed=0,status=0', [], (tx, updateResult) => {
    //   });
    // });

    // db.transaction((tx) => {
    //   tx.executeSql('SELECT * FROM current WHERE unit=? AND chapter=? AND deck=?', [1,1,1], (tx, selectResult) => {
    //     // let countr = selectResult.rows.item(0).countr;
    //     if(selectResult.rows.length>0){
    //       let id = selectResult.rows.item(0).id;
    //       let word = selectResult.rows.item(0).word;
    //       let type = selectResult.rows.item(0).type;
    //       let unit = selectResult.rows.item(0).unit;
    //       let chapter = selectResult.rows.item(0).chapter;
    //       let deck = selectResult.rows.item(0).deck;
    //       let mode = selectResult.rows.item(0).mode;
    //       // console.log(countr);
    //       console.log(id);
    //       console.log(deck);
    //       console.log(word);
    //       console.log(type);
    //       console.log(unit);
    //       console.log(chapter);
    //       console.log(mode);
    //     }
    //     else{
    //       console.log('current table empty');
    //     }

    //   });
    // });

    // db.transaction((tx) => {
    //   tx.executeSql('SELECT name FROM sqlite_master WHERE type=?', ['table'], (tx, res) => {
    //     let table_name = res.rows.item(0).name;
    //     console.log(table_name);
    //   });
    // });

  }

  showBackArrow(dest) {
    if (dest != 'nope')
      return (
        <TouchableOpacity onPress={() => { Actions[dest](); }}>
          <Text style={{
            color: '#88bfff',              // back arrow color
            fontSize: 22,
            transform: [{ rotate: '180deg' }],
            marginTop: 5,
            paddingLeft: 20,
            paddingRight: 20,
          }}>
            ➔
          </Text>
        </TouchableOpacity>
      )
  }

  renderTitle(source) {
    return (

      <Text style={{
        color: '#88bfff',                // title color
        fontSize: 20,
        fontWeight: '500',
        padding: 20
      }}>
        {source}
      </Text>
    )
  }

  createNavBar(source, dest) {
    return (
      <View style={{
        height: height / 12,
        flexDirection: 'row',
        backgroundColor: '#00232d',       // navbar color
        alignItems: 'center',
        elevation: 3,
      }}
      >
        {this.showBackArrow(dest)}
        {this.renderTitle(source)}
      </View>
    )
  }


  render() {
    return (
      <Router>
        <Scene key="root">

          <Scene key="vocabHome"
            component={VocabHome}
            title="Units"
            //custom navbar ⭝
            navBar={() => this.createNavBar('Units', 'nope')} //params => (sourcePage,destinationPage/nope)
            initial={true}
          />

          <Scene key="deck"
            component={Deck}
            title="Deck"
            //to change color of back arrow change color value in backButtonTintColor (don't delete backButtonTextStyle as backarrow falls back to default color on doing that)
            //(i have no clue why)
            backButtonTextStyle={{}}
            backButtonTintColor='#88bfff'              //backArrowColor
            titleStyle={{
              color: '#88bfff'                         //title color
            }}
            navigationBarStyle={{
              backgroundColor: '#00232d',           //navbar color
            }}
          />

          <Scene key="word"
            component={Word}
            title="Word"
            //to change color of back arrow change color value in backButtonTintColor (don't delete backButtonTextStyle as backarrow falls back to default color on doing that)
            //(i have no clue why)
            backButtonTextStyle={{}}
            backButtonTintColor='#88bfff'              //backArrowColor
            titleStyle={{
              color: '#88bfff'                         //title color
            }}
            navigationBarStyle={{
              backgroundColor: '#00232d',           //navbar color
            }}
          />

          <Scene key="deckComplete"
            component={DeckComplete}
            title="DeckComplete"
            //to change color of back arrow change color value in backButtonTintColor (don't delete backButtonTextStyle as backarrow falls back to default color on doing that)
            //(i have no clue why)
            backButtonTextStyle={{}}
            backButtonTintColor='#88bfff'              //backArrowColor
            titleStyle={{
              color: '#88bfff'                         //title color
            }}
            navigationBarStyle={{
              backgroundColor: '#00232d',           //navbar color
            }}
          />

        </Scene>
      </Router>
      // <Screeens/>
    );
  }
}


// const Screens = StackNavigator({
//   VocabHome: { screen: VocabHome },
//   Deck: { screen: Deck },
//   Word: { screen: Word },
//   DeckComplete: { screen: DeckComplete },
// });
