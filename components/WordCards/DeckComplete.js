import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity
} from 'react-native';

const width = Dimensions.get('window').width;

export default class DeckComplete extends Component {

  static navigationOptions = {
    title: 'Deck Complete',
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

  constructor(props) {
    super(props)
    const { navigation, unit, chapter, deck } = this.props.navigation.state.params;
    this.state = {
      navigation: navigation,
      unit: unit,
      chapter: chapter,
      deck: deck
     };
  }

  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.congrats}>Congratulations!!!</Text>
          <Text style={styles.popper}>🎉🎉🎉</Text>
          <Text style={styles.lineOne}>You have successfully</Text>
          <Text style={styles.mastered}>MASTERED</Text>
          <Text style={styles.deckNo}>Deck {this.state.deck}</Text>
        <TouchableOpacity onPress={() => {
          this.props.navigation.navigate('Deck', {
            navigation: this.state.navigation,
            unit: this.state.unit,
            chapter: this.state.chapter,
            deck: this.state.deck,
          });
        }}>
          <View style={styles.button}>
              <Text style={styles.buttonText}>Practise other decks  ➜</Text>
          </View>
        </TouchableOpacity>
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
  congrats:{
    fontSize: 45,
    fontFamily: 'Museo Sans Rounded_500',
    color: '#ffffff',
  },
  popper:{
    fontSize: 45,
    marginBottom: 25,
    color: '#ffffff',
  },
  lineOne:{
    fontSize: 30,
    fontFamily: 'Museo Sans Rounded_500',
    alignSelf: 'center',
    color: '#002654',
  },
  mastered:{
    fontSize: 30,
    fontFamily: 'Museo Sans Rounded_500',
    alignSelf: 'center',
    color: '#6dff34',
    elevation: 5,
  },
  deckNo:{
    fontSize: 40,
    fontFamily: 'Museo 700',
    color: '#ffffff',
    margin: 10,
  },
  button:{
    marginTop: 70,
    backgroundColor: '#ffffff',
    borderRadius: 30,
  },
  buttonText:{
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 25,
    paddingRight: 25,
    fontSize: 27,
    fontFamily: 'Museo Sans Rounded_500',
    color: '#2a8fe7',
  }
});
