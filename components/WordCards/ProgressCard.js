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

let intervalFlag;
let intervalFlag2;

export default class ProgressCard extends Component {

  constructor(props) {
    super(props)

    const { viewed , mastered, needRev, currentlyLearning,  totalWords } = this.props.state;

    this.state = {
      viewed: viewed,
      viewedProgress: Math.round((viewed/totalWords)*100)/100,
      mastered: mastered,
      masteredProgress: Math.round((mastered/totalWords)*100)/100,
      needRev: needRev,
      needRevProgress: Math.round((needRev/totalWords)*100)/100,
      currentlyLearning: currentlyLearning,
      currentlyLearningProgress: Math.round((currentlyLearning/totalWords)*100)/100,
      totalWords: totalWords,
    };

  }

  animateProgressBar(){
    let initialViewed = this.state.viewed;
    let initialViewedProgress = this.state.viewedProgress;
    let targetViewedProgress = Math.floor((initialViewedProgress)*10)/10;
    let tempViewed = 0;
    let tempViewedProgress = 0.0;
    this.setState({ viewed : 0, viewedProgress : 0.0});
    intervalFlag = setInterval(() => {
      tempViewed = tempViewed + 1;
      tempViewedProgress = Math.round((tempViewedProgress + 0.1)*10)/10;;
      if (tempViewed <= initialViewed) {
        this.setState({ viewed :tempViewed });
      }
      if (tempViewedProgress <= targetViewedProgress) {
        this.setState({ viewedProgress :tempViewedProgress});
      }
    }, 120);
    if(this.state.viewedProgress == targetViewedProgress && this.state.viewed == initialViewed) {
      clearInterval(intervalFlag);
      setTimeout(() => {
        this.setState({
          viewed : initialViewed,
          viewedProgress : initialViewedProgress
        });
      },50);
    }
  }

  animateProgressCircles(){

    let initialMasteredProgress = this.state.masteredProgress;
    let tempMasteredProgress = 0.0;
    let targetMasteredProgress = Math.floor((initialMasteredProgress)*10)/10;

    let initialNeedRevProgress = this.state.needRevProgress;
    let tempNeedRevProgress = 0.0;
    let targetNeedRevProgress = Math.floor((initialNeedRevProgress)*10)/10;

    let initialCurrentlyLearningProgress = this.state.currentlyLearningProgress;
    let tempCurrentlyLearningProgress = 0.0;
    let targetCurrentlyLearningProgress = Math.floor((initialCurrentlyLearningProgress)*10)/10;

    this.setState({
       masteredProgress : 0.0,
       needRevProgress : 0.0,
       currentlyLearningProgress : 0.0,
     });

    setTimeout(() => {
      intervalFlag2 = setInterval(() => {
        if(this.state.masteredProgress == targetMasteredProgress
        && this.state.needRevProgress == targetNeedRevProgress
        && this.state.currentlyLearningProgress == targetCurrentlyLearningProgress){
          console.log('2beforeclear');
          clearInterval(intervalFlag2);
          console.log('imaster '+initialMasteredProgress);
          console.log('2afterclear');
          setTimeout(()=>{
            this.setState({
               masteredProgress : initialMasteredProgress,
               needRevProgress : initialNeedRevProgress,
               currentlyLearningProgress : initialCurrentlyLearningProgress,
             });
          },70);
        }

        if (tempMasteredProgress < targetMasteredProgress)
          tempMasteredProgress = Math.round((tempMasteredProgress + 0.1)*10)/10;

        if(tempNeedRevProgress < targetNeedRevProgress)
          tempNeedRevProgress = Math.round((tempNeedRevProgress + 0.1)*10)/10;

        if(tempCurrentlyLearningProgress < targetCurrentlyLearningProgress)
          tempCurrentlyLearningProgress = Math.round((tempCurrentlyLearningProgress + 0.1)*10)/10;

        if (tempMasteredProgress <= targetMasteredProgress) {
          this.setState({
             masteredProgress : tempMasteredProgress,
           });
        }
        if (tempNeedRevProgress <= targetNeedRevProgress) {
          this.setState({
             needRevProgress : tempNeedRevProgress,
           });
        }
        if (tempCurrentlyLearningProgress <= targetCurrentlyLearningProgress) {
          this.setState({
             currentlyLearningProgress : tempCurrentlyLearningProgress,
           });
        }

      }, 200);
    },100);
  }
  
  // componentDidMount() {
  //   this.animateProgressBar();
  //   this.animateProgressCircles();
  //   // console.log('afterhere');
  // }


  render() {
    return (
      <View style={styles.progressCardContainer}>
        <Text style={styles.viewedText}>Viewed {this.state.viewed} of {this.state.totalWords} words in this Deck</Text>
        <Progress.Bar
          style={styles.progressBar}
          progress={this.state.viewedProgress}
          color='#0372da'
          width={320}
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
              formatText={()=>(''+this.state.masteredProgress*100+'%')}
              textStyle={styles.circlePercentText}
              borderWidth={2}
              thickness={5}
            />
          </View>
          <View style={styles.circleProgessInnerContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.textNeedReview}>Currently</Text>
              <Text style={styles.textNeedReview}>Learning</Text>
            </View>
              <Progress.Circle
                progress={this.state.needRevProgress}
                color='#ddcc19'
                size={80}
                showsText={true}
                formatText={()=>(''+this.state.needRevProgress*100+'%')}
                textStyle={styles.circlePercentText}
                borderWidth={2}
                thickness={5}
              />
          </View>
          <View style={styles.circleProgessInnerContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.textCurrentlyLearningiew}>Need</Text>
              <Text style={styles.textCurrentlyLearningiew}>Review</Text>
            </View>
            <Progress.Circle
              progress={this.state.currentlyLearningProgress}
              color='#dd2800'
              size={80}
              showsText={true}
              formatText={()=>(''+this.state.currentlyLearningProgress*100+'%')}
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
    marginTop: 25,
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
  textCurrentlyLearningiew:{
    fontSize: 19,
    fontFamily: 'Museo Sans Rounded_500',
    color: '#dd2800',
  },
  circlePercentText:{
    fontSize: 18,
    fontFamily: 'Museo Sans Rounded_500',
  }
});
