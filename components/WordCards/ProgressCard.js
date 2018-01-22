import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity
} from 'react-native';

const width = Dimensions.get('window').width;

import * as Progress from 'react-native-progress';

export default class ProgressCard extends Component {

  constructor(props) {
    super(props)

    const { viewed , mastered, needRev, needMoreRev,  totalWords } = this.props.state;

    this.state = {
      viewed: viewed,
      viewedProgress: viewed/totalWords,
      mastered: mastered,
      masteredProgress: mastered/totalWords,
      needRev: needRev,
      needRevProgress: needRev/totalWords,
      needMoreRev: needMoreRev,
      needMoreRevProgress: needMoreRev/totalWords,
      totalWords: totalWords,
    };

  }

  render() {
    return (
      <View style={styles.progressCardContainer}>
        <Text style={styles.viewedText}>Viewed {this.state.viewed} of {this.state.totalWords} words in this Deck</Text>
        <Progress.Bar
          style={styles.progressBar}
          progress={this.state.viewedProgress}
          color='#0372da'
          width={330}
          height={12}
          borderRadius={12}
          borderWidth={2.5}
          borderColor='#0372da'
        />
        <View style={styles.circleProgessContainer}>
          <View style={styles.circleProgessInnerContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.textMastered}>Mastered</Text>
              <Text style={styles.textMastered}>words</Text>
            </View>
            <Progress.Circle
              progress={this.state.masteredProgress}
              color='#3ed627'
              size={80}
              showsText={true}
              formatText={()=>(''+Math.round(this.state.masteredProgress*100)+'%')}
              textStyle={styles.circlePercentText}
              borderWidth={2}
              thickness={5}
            />
          </View>
          <View style={styles.circleProgessInnerContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.textNeedReview}>Need</Text>
              <Text style={styles.textNeedReview}>Review</Text>
            </View>
              <Progress.Circle
                progress={this.state.needRevProgress}
                color='#ddcc19'
                size={80}
                showsText={true}
                formatText={()=>(''+Math.round(this.state.needRevProgress*100)+'%')}
                textStyle={styles.circlePercentText}
                borderWidth={2}
                thickness={5}
              />
          </View>
          <View style={styles.circleProgessInnerContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.textNeedMoreReview}>MORE</Text>
              <Text style={styles.textNeedMoreReview}>Review</Text>
            </View>
            <Progress.Circle
              progress={this.state.needMoreRevProgress}
              color='#dd2800'
              size={80}
              showsText={true}
              formatText={()=>(''+Math.round(this.state.needMoreRevProgress*100)+'%')}
              textStyle={styles.circlePercentText}
              borderWidth={2}
              thickness={5}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  progressCardContainer: {
    width: width - width/10,
    borderRadius:10,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  progressBar:{
    alignSelf: 'flex-start',
    marginLeft:20,
    marginRight:20,
  },
  viewedText:{
    alignSelf: 'flex-start',
    marginLeft: 22,
    marginTop: 15,
    marginBottom: 3,
    fontFamily: 'Museo Sans Rounded_500',
    fontSize: 18,
    color: '#001b54',
  },
  circleProgessContainer:{
    // borderColor: '#000',
    // borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft:20,
    marginRight:20,
    marginTop:15,
    marginBottom: 20,
    padding: 7,
  },
  circleProgessInnerContainer:{
    // borderColor: '#000',
    // borderWidth: 2,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 3,
  },
  textContainer:{
    // borderColor: '#000',
    // borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  textMastered:{
    fontSize: 19,
    fontFamily: 'Museo Sans Rounded_500',
    color: '#3ed627',
  },
  textNeedReview:{
    fontSize: 19,
    fontFamily: 'Museo Sans Rounded_500',
    color: '#ddcc19',
  },
  textNeedMoreReview:{
    fontSize: 19,
    fontFamily: 'Museo Sans Rounded_500',
    color: '#dd2800',
  },
  circlePercentText:{
    fontSize: 18,
    fontFamily: 'Museo Sans Rounded_500',
  }
});
