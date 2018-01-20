import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

export default class Card extends Component {

  render() {
    return (
      <View style={styles.cardBody}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderText}>Chapters</Text>
        </View>
        <View style={styles.cardContent}>
          <TouchableOpacity style={styles.cardElements} onPress={this._onPressButton}>
            <Text style={styles.cardElementText}>Chapter</Text>
            <Text style={styles.cardElementText}>1</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardElementsTwoParent}>
            <TouchableOpacity style={styles.cardElementsTwo} onPress={this._onPressButton}>
              <Text style={styles.cardElementText}>Chapter</Text>
              <Text style={styles.cardElementText}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardElementsTwo} onPress={this._onPressButton}>
              <Text style={styles.cardElementText}>Chapter</Text>
              <Text style={styles.cardElementText}>3</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardBody:{
    alignItems: 'center',
    width: 380,
    flex:1,
    margin: 20,
    backgroundColor: '#ffffff',
    borderRadius:10,
    borderBottomColor: '#002647',
    borderBottomWidth: 3,
    elevation:10
  },
  cardHeader:{
    width: 380,
    padding:10,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderBottomColor: '#2a8fe7',
    borderBottomWidth: 1,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    elevation: 5
  },
  cardHeaderText:{
    alignItems: 'center',
    fontFamily: 'Museo 500',
    fontSize: 25,
    color: '#06337c',
  },
  cardContent:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  cardElements:{
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 100,
    borderColor: '#002040',
    backgroundColor: '#d9e6ff',
    borderWidth: 2,
    marginTop: 20,
    elevation: 15,

  },
  cardElementText:{
    alignItems: 'center',
    fontFamily: 'Museo Sans_300',
    fontSize: 18,
    color: '#004182',
    padding: 5
  },
  cardElementsTwo:{
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 100,
    borderColor: '#002040',
    backgroundColor: '#d9e6ff',
    borderWidth: 2,
    margin: 20,
    elevation: 15,
  },
  cardElementsTwoParent:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
