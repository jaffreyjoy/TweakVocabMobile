import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import ChapterCard from './ChapterCard';

export default class Chapter extends Component {

  render() {
    return (
      <View style={styles.cont}>
        <ChapterCard navigation={this.props.navigation}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cont:{
    flex:1,
  }
});
