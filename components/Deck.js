import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import EZSwiper from 'react-native-ezswiper';

const width = Dimensions.get('window').width;

const height = Dimensions.get('window').height;

let origindata = [{ key: '1', word: 'lol' }, { key: '2', word: 'gtg' }, { key: '3', word: 'ppl' }]

let currentDeck = 0;

export default class Deck extends Component {

  constructor(props) {
    super(props)
    this.state = { noOfCards: ['', '', ''] }
  }

  renderOriginw() {
    return origindata.map(ogdata => (<Text key={ogdata.key} style={styles.originList}>{ogdata.word}</Text>));
  }

  renderRow = (obj, index) => {
    let comp;
    let finalcomp;
    originWordsList = this.renderOriginw();

    finalcomp =
      <View style={[styles.deckCard, { backgroundColor: "#ffffff", borderRadius: 15, position: 'relative' }]}>
        <Text style={styles.deckTitle}>Deck {index+1}</Text>
        <Text style={styles.deckSubTitle}>Origin Words:</Text>
        <View>
          {originWordsList}
        </View>
        <View style={styles.deckButtonView}>
          <TouchableOpacity style={styles.deckButton} onPress={this.onPressDeckButton}>
            <Text style={styles.deckButtonText}>PRACTISE 📝</Text>
          </TouchableOpacity>
        </View>
      </View>

    return (finalcomp)
  }

  onPressDeckButton = () => {
    alert('Practise Deck '+currentDeck);
    this.props.navigation.navigate('Word', { deck: {currentDeck} });
  }

  onDidChange = (obj, index) => {
    console.log('onDidChange=>obj:' + obj + ' ,index:' + index);
    currentDeck = index;
  }

  static navigationOptions = {
    title: 'Decks',
    headerStyle: {
      backgroundColor: '#00232d',
    },
    headerTitleStyle: {
      color: '#88bfff',
      fontSize: 20,
      fontWeight: '200',
    },
    headerTintColor: '#88bfff',
  };

  render() {
    return (
      <View style={styles.container}>
        <EZSwiper style={[styles.swiper, { width: width, height: height/2 }]}
          dataSource={this.state.noOfCards}
          width={width}
          height={height/2.3}
          renderRow={this.renderRow}
          onDidChange={this.onDidChange}
          ratio={0.7}
          index={0}
          horizontal={true}
          loop={false} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2a8fe7'
  },
  swiper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2a8fe7',
  },
  deckCard: {
    flex: 1,
    alignItems: 'center',
    borderBottomColor: '#003665',
    borderBottomWidth: 3,
  },
  deckTitle:{
    fontFamily: 'Museo 700',
    fontSize: 35,
    margin: 25,
    color: '#00336c'
  },
  deckSubTitle:{
    fontFamily: 'Museo Sans_500',
    fontSize: 25,
    color: '#00336c'
  },
  originList:{
    fontFamily: 'Museo Sans Rounded_500',
    fontSize: 18,
    margin: 3,
    color: '#000000'
  },
  deckButtonView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    elevation: 20
  },
  deckButton:{
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: '#2a8fe7',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    elevation: 3,

  },
  deckButtonText:{
    fontFamily: 'Museo Sans Rounded_500',
    fontSize: 18,
    color: '#ffffff',
  }
});
