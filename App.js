/**
  * Author : Jaffrey Joy
  * Copyright (c) 2018 All Rights Reserved
**/

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const height = Dimensions.get('window').height;

var SQLite = require('react-native-sqlite-storage')
// var db = SQLite.openDatabase({ name: 'tweak.db', createFromLocation: '~storage/tweak.db'});
var db = SQLite.openDatabase({ name: 'tweak-datax.db', createFromLocation: '~storage/tweak.db'});
// var db = SQLite.openDatabase({ name: 'tweak-data.db',  location: 'default'});

import { Actions, Router, Scene } from 'react-native-router-flux';

import VocabHome from './components/VocabHome';
import Deck from './components/Deck';
import Word from './components/WordCards/Word';
import DeckComplete from './components/WordCards/DeckComplete';


export default class App extends Component {

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
            initial={true}
          />

          <Scene key="deck"
            component={Deck}
            title="Decks"
            //custom navbar ⭝
            navBar={() => this.createNavBar('Deck', 'vocabHome')} //params => (sourcePage,destinationPage/nope)
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
            hideNavBar={true}
          />

        </Scene>
      </Router>
    );
  }
}
