/**
  * Author : Jaffrey Joy
  * Copyright (c) 2018 All Rights Reserved
**/

import React, { Component } from 'react';
import {
  AppRegistry,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { StackNavigator } from 'react-navigation';

import Chapter from './Chapter';

export default class VocabHome extends Component {

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

const styles = StyleSheet.create({
  scrollContainer:{
    flex:1,
    backgroundColor: '#2a8fe7',
  },
  chapterContainer:{
    alignItems: 'center',
  }
});