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

export default class DerivedWordCardBack extends Component {

  constructor(props) {
    super(props)
    this.state = this.props.state;
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

  render() {
    return (
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
          onPress={() => { this.props.changeStatus('Mastered');}}
        >
          <View style={styles.masterButton}>
              <Text style={styles.masterButtonText}>😎 Mastered </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { this.props.changeStatus('Need Review');}}
        >
          <View style={styles.reviewButton}>
              <Text style={styles.reviewButtonText}>🤔 Need review</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { this.props.changeStatus('Need MORE Review');}}
        >
          <View style={styles.moreReviewButton}>
              <Text style={styles.moreReviewButtonText}>😵 Need MORE review </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  backOriginButton: {
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
  backOriginButtonText: {
    color: '#021f4f',
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
});
