import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity
} from 'react-native';

const width = Dimensions.get('window').width;

import Tts from 'react-native-tts';

import FlipCard from 'react-native-flip-card';

import * as Progress from 'react-native-progress';

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
      type: 'origin',       //  comment this and uncomment next line to see proper derived word card
      // type: 'derived',
      originWord: 'Ethnos',
      word: 'Ethnos',    //  comment this and uncomment next line to see proper derived word card
      // word: 'Ethnic',
      origin: 'Greek',
      meaning: 'nation or race',   //  comment this and uncomment next line to see proper derived word card
      // meaning: 'relating to a population subgroup (within a larger or dominant national or cultural group) with a common national or cultural tradition',
      tip: 'Relates to specific region/race/nationality',
      example: '“Television shows should reflect the ethnic diversity of the country.”',
      status:'Need MORE Review',
    }
  }

  getStatusColor = () => {
    if(this.state.status == 'Viewed')
      return('#0372da');
    else if(this.state.status == 'Mastered')
      return('#3ed627');
    else if(this.state.status == 'Need Review')
      return('#d2c000');
    else if(this.state.status == 'Need MORE Review')
      return('#dd2800');
  }

  changeStatus = (newStatus) => {

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
          <TouchableOpacity
            onPress={() => { this.setState({ flip: !this.state.flip, status: 'Viewed' });}}
          >
            <View style={styles.backButton}>
                <Text style={styles.backButtonText}>Click to see derived words ➜</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
    else{
      return(
        <View style={styles.back}>
          <View style={styles.backMainWordStyle}>
            <Text style={styles.backMainWordText}>{this.state.word}</Text>
            <TouchableOpacity onPress={() => { Tts.speak(this.state.word); }}>
              <Text style={styles.backMainWordSpeechIcon}>🔊</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.backElements}>
            <Text style={[styles.backMainText,{fontSize : 20}]}>Origin word : </Text>
            <Text style={[styles.backSubText,{fontSize : 20}]}>{this.state.originWord}</Text>
          </View>
          <View style={styles.backElements}>
            <Text style={[styles.backMainText,{fontSize : 20}]}>Meaning : </Text>
            <Text style={[styles.backSubText,{fontSize : 20}]}>{this.state.meaning}</Text>
          </View>
          <View style={styles.backElements}>
            <Text style={[styles.backMainText,{fontSize : 20}]}>Example : </Text>
            <Text style={[styles.backSubText,{fontSize : 20}]}>{this.state.example}</Text>
          </View>
          <View style={styles.backElements}>
            <Text style={[styles.backMainText,{fontSize : 20}]}>Status : </Text>
            <View style={[styles.wordStatusStyle,{backgroundColor:this.getStatusColor()}]}>
              <Text style={styles.wordStatusText}>{this.state.status}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => { this.changeStatus('Mastered');}}
          >
            <View style={styles.masterButton}>
                <Text style={styles.masterButtonText}>😎 Mastered </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { this.changeStatus('Need Review');}}
          >
            <View style={styles.reviewButton}>
                <Text style={styles.reviewButtonText}>🤔 Need review</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { this.changeStatus('Need MORE Review');}}
          >
            <View style={styles.moreReviewButton}>
                <Text style={styles.moreReviewButtonText}>😵 Need MORE review </Text>
            </View>
          </TouchableOpacity>
        </View>
      );
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
        <View style={styles.front}>
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
  front: {
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
    margin: 8,
    marginLeft: 18,
    marginRight: 18,
  },
  backMainText:{
    fontFamily: 'Museo 500',
    fontSize: 22,
    color: '#001b54',
  },
  backSubText:{
    fontFamily: 'Museo Sans Rounded_300',
    fontSize: 22,
    color: '#00226a',
  },
  backButton: {
    width: width - width/10,
    height: 50,
    marginTop: 30,
    justifyContent: 'center',
    borderTopWidth: 2,
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
  masterButton:{
    width: width - width/10,
    marginTop: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 159, 3, 0.28)',
  },
  masterButtonText:{
    color: '#009f03',
    padding: 12,
    textAlign: 'center',
    fontFamily: 'Museo Sans Rounded_500',
    fontSize: 22,
  },
  reviewButton:{
    width: width - width/10,
    justifyContent: 'center',
    backgroundColor: 'rgba(222, 217, 0, 0.39)',
  },
  reviewButtonText:{
    color: '#c1ad00',
    padding: 12,
    textAlign: 'center',
    fontFamily: 'Museo Sans Rounded_500',
    fontSize: 22,
  },
  moreReviewButton:{
    width: width - width/10,
    justifyContent: 'center',
    backgroundColor: 'rgba(212, 41, 23, 0.34)',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  moreReviewButtonText:{
    color: '#d42917',
    padding: 12,
    textAlign: 'center',
    fontFamily: 'Museo Sans Rounded_500',
    fontSize: 22,
  },
  wordStatusStyle:{
    borderRadius: 15,
    padding: 3,
    paddingLeft: 10,
    paddingRight: 10,
  },
  wordStatusText:{
    color: '#ffffff',
    fontFamily: 'Museo Sans Rounded_500',
    fontSize: 18,
  },
});
