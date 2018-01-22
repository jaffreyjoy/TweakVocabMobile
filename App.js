import React, { Component } from 'react';
import {
  AppRegistry,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { StackNavigator } from 'react-navigation';

import Chapter from './components/Chapter';
import Deck from './components/Deck';
import Word from './components/WordCards/Word';

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
});
