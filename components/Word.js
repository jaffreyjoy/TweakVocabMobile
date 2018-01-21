import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import Tts from 'react-native-tts';

const width = Dimensions.get('window').width;

import FlipCard from 'react-native-flip-card';

export default class Card extends Component {

  static navigationOptions = {
    title: 'Word',
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
    this.state = {
      flip: false,
      type: 'origin',
      originWord: '',
      word: 'Ethnos',
      origin: 'Greek',
      meaning: 'Nation or Race',
      tip: 'Relates to specific region/race/nationality',
      example: '',
    }
  }

  renderBack = () => {
    if(this.state.type == 'origin'){
      return(
        <View style={styles.back}>
          <View style={styles.backMainWordStyle}>
            <Text style={styles.backMainWordText}>{this.state.word}</Text>
            <TouchableOpacity onPress={() => { Tts.speak(this.state.word); }}>
              <Text style={styles.backMainWordSpeechIcon}>🔊</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.backElements}>
            <Text style={styles.backMainText}>Origin : </Text>
            <Text style={styles.backSubText}>{this.state.origin}</Text>
          </View>
          <View style={styles.backElements}>
            <Text style={styles.backMainText}>Meaning : </Text>
            <Text style={styles.backSubText}>{this.state.meaning}</Text>
          </View>
          <View style={styles.backElements}>
            <Text style={styles.backMainText}>Tip : </Text>
            <Text style={styles.backSubText}>{this.state.tip}</Text>
          </View>
          <View style={styles.backBottomPadding}></View>
          <TouchableOpacity
            onPress={() => { this.setState({ flip: !this.state.flip });}}
          >
            <View style={styles.backButton}>
                <Text style={styles.backButtonText}>Click to see derived words ➜</Text>
            </View>
          </TouchableOpacity>
        </View>
      )
    }
  }

  render() {
    return (
      <View style={styles.flipCardContainer}>
        <FlipCard
          flip={this.state.flip}
          friction={8}
          perspective={1000}
          flipHorizontal={true}
          flipVertical={false}
          clickable={false}
          // alignWidth={true}
          onFlipEnd={(isFlipEnd) => { console.log('isFlipEnd', isFlipEnd) }}
        >
        {/* Face Side */}
        <View style={styles.face}>
          <View>
            <Text style={styles.frontWord}>{this.state.word}</Text>
            <Text style={styles.type}>({this.state.type})</Text>
          </View>
          <TouchableOpacity
            onPress={() => { this.setState({ flip: !this.state.flip });}}
          >
            <View style={styles.frontButton}>
                <Text style={styles.frontButtonText}>Click to see meaning  ➜</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* Back Side */}
        {this.renderBack()}
        </FlipCard>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flipCardContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2a8fe7'
  },
  face: {
    width: width - width/10,
    borderRadius:10,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  frontWord:{
    marginTop: 50,
    fontFamily: 'Museo Sans Rounded_500',
    fontSize: 40,
    color: '#001b54',
  },
  type:{
    marginBottom: 50,
    fontFamily: 'Museo Sans Rounded_300',
    alignSelf: 'center',
    fontSize: 25,
    color: '#5585ec',
  },
  frontButton: {
    width: width - width/10,
    height: 50,
    justifyContent: 'center',
    borderTopWidth: 1.5,
    borderTopColor: '#021f4f',
    backgroundColor: '#cadcf1',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  frontButtonText: {
    color: '#021f4f',
    textAlign: 'center',
    fontFamily: 'Museo Sans Rounded_500',
    fontSize: 22,
  },
  back: {
    width: width - width/10,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backMainWordStyle:{
    width: width - width/10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#021f4f',
    borderBottomWidth: 1,
    // marginTop: 15,
    marginBottom: 15,
    backgroundColor: '#ffffff',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  backMainWordText:{
    margin: 10,
    fontFamily: 'Museo Sans Rounded_500',
    fontSize: 30,
    color: '#001b54',
  },
  backMainWordSpeechIcon:{
    marginLeft: 5,
    fontSize: 22,
    color: '#rgba(255, 255, 255, 0)',
    textShadowColor: 'rgba(0, 20, 64, 0.86)',
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 1,
  },
  backElements : {
    flexDirection : 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    margin: 5,
    marginLeft: 18,
    marginRight: 18,
  },
  backMainText:{
    fontFamily: 'Museo Sans Rounded_500',
    fontSize: 23,
    color: '#001b54',
  },
  backSubText:{
    fontFamily: 'Museo Sans Rounded_300',
    fontSize: 23,
    color: '#00226a',
  },
  backBottomPadding:{
    marginBottom: 30,
  },
  backButton: {
    width: width - width/10,
    height: 50,
    justifyContent: 'center',
    borderTopWidth: 3,
    borderTopColor: '#021f4f',
    backgroundColor: '#cadcf1',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  backButtonText: {
    color: '#021f4f',
    textAlign: 'center',
    fontFamily: 'Museo Sans Rounded_500',
    fontSize: 22,
  },
});
