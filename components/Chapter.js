import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Card from './Card';

export default class App extends Component {

  render() {
    return (
      <View style={styles.cont}>
        <Card/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cont:{
    flex:1,
    alignItems: 'center',
  }
});
