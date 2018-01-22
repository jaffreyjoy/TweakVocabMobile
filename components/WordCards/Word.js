import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity
} from 'react-native';

const width = Dimensions.get('window').width;

import FlipCard from 'react-native-flip-card';

import * as Progress from 'react-native-progress';

import OriginDerivedWordCardFront from './OriginDerivedWordCardFront';

import OriginWordCardBack from './OriginWordCardBack';

import DerivedWordCardBack from './DerivedWordCardBack';

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
      // type: 'origin',       //  comment this and uncomment next line to see proper derived word card
      type: 'derived',
      originWord: 'Ethnos',
      // word: 'Ethnos',    //  comment this and uncomment next line to see proper derived word card
      word: 'Ethnic',
      origin: 'Greek',
      // meaning: 'nation or race',   //  comment this and uncomment next line to see proper derived word card
      meaning: 'relating to a population subgroup (within a larger or dominant national or cultural group) with a common national or cultural tradition',
      tip: 'Relates to specific region/race/nationality',
      example: '“Television shows should reflect the ethnic diversity of the country.”',
      status:'Need MORE Review',
    }
  }

  flipCard = () => {
    this.setState({flip : !this.state.flip});
  }

  // getStatusColor = () => {
  //   if(this.state.status == 'Viewed')
  //     return('#0372da');
  //   else if(this.state.status == 'Mastered')
  //     return('#3ed627');
  //   else if(this.state.status == 'Need Review')
  //     return('#d2c000');
  //   else if(this.state.status == 'Need MORE Review')
  //     return('#dd2800');
  // }

  changeStatus = (newStatus) => {
    this.setState({status : newStatus});
    alert(newStatus);
    this.flipCard();
  }

  renderFront = () => {
    return(
      <OriginDerivedWordCardFront state={this.state} changeStatus={this.changeStatus}/>
    )

  }

  renderBack = () => {
    if(this.state.type == 'origin'){
      return(
        <OriginWordCardBack state={this.state} changeStatus={this.changeStatus}/>
      );
    }
    else{
      return(
        <DerivedWordCardBack state={this.state} changeStatus={this.changeStatus}/>
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
          {this.renderFront()}

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
});
