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

import OriginDerivedWordCardFront from './OriginDerivedWordCardFront';
import ProgressCard from './ProgressCard';
import OriginWordCardBack from './OriginWordCardBack';
import DerivedWordCardBack from './DerivedWordCardBack';

var SQLite = require('react-native-sqlite-storage')
var db = SQLite.openDatabase({ name: 'tweak-data.db',  location: 'default'});

export default class Word extends Component {

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

    const { navigation, unit, chapter, deck } = this.props.navigation.state.params;

    this.state = {
      navigation: navigation,
      flip: false,
      wordId: 0,
      // type: 'origin',    //  comment this and uncomment next line to see proper derived word card
      type: 'derived',
      originWord: 'Ethnos',
      // word: 'Ethnos',    //  comment this and uncomment next line to see proper derived word card
      word: 'Ethnicity',
      origin: 'Greek',
      // meaning: 'nation or race',   //  comment this and uncomment next line to see proper derived word card
      meaning: 'relating to a population subgroup (within a larger or dominant national or cultural group) with a common national or cultural tradition',
      tip: 'Relates to specific region/race/nationality',
      example: '“Television shows should reflect the ethnic diversity of the country.”',
      statusFlag: 1,
      status: 'Viewed',
      viewedFlag: 1,
      viewed: 10,
      needRev: 3,
      currentlyLearning: 2,
      mastered: 5,
      totalWords: 15,
      unit: unit,
      chapter: chapter,
      deck: deck,
      mode: -1,
    }

  }


  flipCard(){
    this.setState({ flip: !this.state.flip });
  }

  componentWillMount() {
    console.log('over here');
    console.log(this.state.unit+" "+this.state.chapter+" "+this.state.deck)
    // initialDataFetch();
  }

  initialDataFetch(){
    //check if current table has entry of a word from the current deck
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM current WHERE unit=? AND chapter=? AND deck=?', [
          this.state.unit,
          this.state.chapter,
          this.state.deck,
        ],
        (tx, result) => {
          let { unit , chapter ,deck }  = this.props.data;
          if(result.rows.length>0) {                         //entry exists
            //so get word and its type
            this.setState({
              mode: result.rows.item(0).mode,
              word: result.rows.item(0).word,
              type: result.rows.item(0).type,
            });
            //get full details of the word
            if(this.state.type == 'origin') {            // if word type is origin get details of the origin word
              db.transaction((tx) => {
                tx.executeSql('SELECT * FROM origin WHERE origin_word = ? AND unit=? AND chapter=? AND deck =?', [
                  this.state.word,
                  this.state.unit,
                  this.state.chapter,
                  this.state.deck
                ],
                (tx, selectResult) => {
                  this.setState({
                    word: selectResult.rows.item(0).origin_word,
                    origin: selectResult.rows.item(0).origin,
                    meaning: selectResult.rows.item(0).meaning,
                    tip: selectResult.rows.item(0).tip,
                  })
                  // get and set data for progress card
                  getNsetDataforProgressCard();
                });
              });
            }
            else{                                      // if word type is derived get details of the derived word
              db.transaction((tx) => {
                tx.executeSql('SELECT * FROM derived WHERE derived_word = ? AND unit=? AND chapter=? AND deck =?', [
                  this.state.word,
                  this.state.unit,
                  this.state.chapter,
                  this.state.deck
                ],
                (tx, selectResult) => {
                  this.setState({
                    wordId: selectResult.rows.item(0).id,
                    word: selectResult.rows.item(0).derived_word,
                    originWord: selectResult.rows.item(0).origin_word,
                    meaning: selectResult.rows.item(0).meaning,
                    example: selectResult.rows.item(0).example,
                    viewedFlag: selectResult.rows.item(0).viewed,
                    statusFlag: selectResult.rows.item(0).status,
                  });
                   setStatusFromFetchedData(this.state.statusFlag);
                   // get and set data for progress card
                   getNsetDataforProgressCard();
                });
              });
            }
          }
          else{                               //entry doesn't exist so get the first origin word of the deck
            db.transaction((tx) => {
              tx.executeSql('SELECT * FROM origin LIMIT 1 WHERE unit=? AND chapter=? AND deck =?',[
                this.state.unit,
                this.state.chapter,
                this.state.deck
             ],
             (tx, selectResult) => {
                this.setState({
                  wordId: selectResult.rows.item(0).id,
                  word: selectResult.rows.item(0).origin_word,
                  type: 'origin',
                  origin: selectResult.rows.item(0).origin,
                  meaning: selectResult.rows.item(0).meaning,
                  tip: selectResult.rows.item(0).tip,
                })
                //update current table
                db.transaction((tx) => {
                  tx.executeSql('INSERT INTO current (word,type,unit,chapter,deck) VALUES (?,?,?,?,?)', [
                    selectResult.rows.item(0).origin_word,
                    'origin',
                    this.state.unit,
                    this.state.chapter,
                    this.state.deck,
                  ],
                    (tx, updateResult) => {
                    });
                });
                // get and set data for progress card
                getNsetDataforProgressCard();
              });
            });
          }
      });
    });
  }

  setStatusFromFetchedData(status) {
    if (status == 0 && viewedFlag == 1) {
      this.setState({ status: 'Viewed' });
    }
    else if (status == 1) {
      this.setState({ status: 'Mastered' });
    }
    else if (status == 2) {
      this.setState({ status: 'Currently Learning' });
    }
    else if (status == 3) {
      this.setState({ status: 'Need Review' });
    }
    else {
      this.setState({ status: 'Not Viewed' });
    }
  }


  seeDerivedWords(){
    db.transaction((tx) => {
      //change database value of viewed to 1
      tx.executeSql('UPDATE origin SET viewed=1 WHERE unit=? AND chapter=? AND deck=? AND origin_word=?', [
        this.state.unit,
        this.state.chapter,
        this.state.deck,
        this.state.word,
      ],
        (tx, updateResult) => {
        });
    });
    //get the first derived word
    db.transaction((tx) => {
      tx.executeSql('SELECT derived_word FROM derived WHERE unit=? AND chapter=? AND deck=? AND origin_word=? LIMIT 1', [
        this.state.unit,
        this.state.chapter,
        this.state.deck,
        this.state.word,
      ],
        (tx, selectResult) => {
          let word = selectResult.rows.item(0).derived_word;
          //update current table
          db.transaction((tx) => {
            tx.executeSql('UPDATE current SET word=?,type=? WHERE unit=? AND chapter=? AND deck=?', [
              word,
              'derived',
              this.state.unit,
              this.state.chapter,
              this.state.deck,
            ],
              (tx, updateResult) => {
              });
          });
        });
    });
    this.initialDataFetch();
    this.flipCard();
  }

  getNsetDataforProgressCard(){
    db.transaction((tx) => {
      tx.executeSql('SELECT COUNT(*) as noOfTotalWords FROM derived WHERE unit=? AND chapter=? AND deck=?', [
        this.state.unit,
        this.state.chapter,
        this.state.deck
      ],
      (tx, selectResult) => {
        this.setState({totalWords: selectResult.rows.item(0).noOfTotalWords});
      });
    });
    db.transaction((tx) => {
      tx.executeSql('SELECT COUNT(*) as noOfViewed FROM derived WHERE viewed=1 AND unit=? AND chapter=? AND deck=?', [
        this.state.unit,
        this.state.chapter,
        this.state.deck
      ],
      (tx, selectResult) => {
        this.setState({viewed: selectResult.rows.item(0).noOfViewed});
      });
    });
    db.transaction((tx) => {
      tx.executeSql('SELECT COUNT(*) as noOfMastered FROM derived WHERE status=1 AND unit=? AND chapter=? AND deck=?', [
        this.state.unit,
        this.state.chapter,
        this.state.deck
      ],
      (tx, selectResult) => {
        this.setState({mastered: selectResult.rows.item(0).noOfMastered});
      });
    });
    db.transaction((tx) => {
      tx.executeSql('SELECT COUNT(*) as noOfCurrentlyLearning FROM derived WHERE status=2 AND unit=? AND chapter=? AND deck=?', [
        this.state.unit,
        this.state.chapter,
        this.state.deck
      ],
      (tx, selectResult) => {
        this.setState({currentlyLearning: selectResult.rows.item(0).noOfCurrentlyLearning});
      });
    });
    db.transaction((tx) => {
      tx.executeSql('SELECT COUNT(*) as noOfNeedReview FROM derived WHERE status=2 AND unit=? AND chapter=? AND deck=?', [
        this.state.unit,
        this.state.chapter,
        this.state.deck
      ],
      (tx, selectResult) => {
        this.setState({needRev: selectResult.rows.item(0).noOfNeedReview});
      });
    });
  }

  seeMeaningForDerivedWord = () => {
    if (this.state.viewedFlag != 1) {
      // update the value of viewed in the table where word = current word
      db.transaction((tx) => {
        //change database value of viewed to 1
        tx.executeSql('UPDATE derived SET viewed=1 WHERE unit=? AND chapter=? AND deck=? AND derived_word=?', [
          this.state.unit,
          this.state.chapter,
          this.state.deck,
          this.state.word,
        ],
          (tx, updateResult) => {
            this.setState({
              viewed: this.state.viewed + 1,              //increment viewed count in state
              viewedFlag: 1,                              //set viewedFlag to one
              status: 'Viewed'                            //set status to viewed in state
            });
          });
      });
    }
    else {
      // do nothing
    }
  }

  changeStatusAndFetchNext = (newStatus) => {

    if(newStatus == 'Mastered') {
      if(this.state.status == 'Viewed' || this.state.status == 'Currently Learning'){
        //update new status to mastered
        db.transaction((tx) => {
          //change database value of status to 1 i.e. mastered
          tx.executeSql('UPDATE derived SET status=1 WHERE unit=? AND chapter=? AND deck=? AND derived_word=?', [
            this.state.unit,
            this.state.chapter,
            this.state.deck,
            this.state.word,
          ],
            (tx, updateResult) => {
            });
        });
      }
      else if(this.state.status == 'Need Review'){
        //update status to currrently learning
        db.transaction((tx) => {
          //change database value of status to 2 i.e. currently learning
          tx.executeSql('UPDATE derived SET status=2 WHERE unit=? AND chapter=? AND deck=? AND derived_word=?', [
            this.state.unit,
            this.state.chapter,
            this.state.deck,
            this.state.word,
          ],
            (tx, updateResult) => {
            });
        });
      }
    }
    else if(newStatus == 'Need Review'){
      if(this.state.status == 'Need Review'){
        //no need to update
      }
      else{
        //update status to need review
        db.transaction((tx) => {
          //change database value of viewed to 1
          tx.executeSql('UPDATE derived SET status=3 WHERE unit=? AND chapter=? AND deck=? AND derived_word=?', [
            this.state.unit,
            this.state.chapter,
            this.state.deck,
            this.state.word,
          ],
            (tx, updateResult) => {
            });
        });
      }
    }

    //get next word and store it in current AND change mode if necessary
    if(this.state.mode == -1){
      //normal mode
      db.transaction((tx) => {
        tx.executeSql('SELECT * FROM derived WHERE unit=? AND chapter=? AND deck=? AND origin_word=? AND id>? LIMIT 1', [
          this.state.unit,
          this.state.chapter,
          this.state.deck,
          this.state.originWord,
          this.state.wordId,
        ],
          (tx, selectResult) => {
            if(selectResult.rows.length > 0){
              let word = selectResult.rows.item(0).derived_word;
              //update current table
              db.transaction((tx) => {
                tx.executeSql('UPDATE current SET word=?,type=? WHERE unit=? AND chapter=? AND deck=?', [
                  word,
                  'derived',
                  this.state.unit,
                  this.state.chapter,
                  this.state.deck,
                ],
                  (tx, updateResult) => {
                  });
              });
            }
            else{
              //check if next word is origin or word from next deck
              db.transaction((tx) => {
                tx.executeSql('SELECT * FROM derived WHERE unit=? AND chapter=? AND deck=? AND id>? LIMIT 1', [
                  this.state.unit,
                  this.state.chapter,
                  this.state.deck,
                  this.state.wordId
                ],
                  (tx, selectCheckResult) => {
                    if(selectCheckResult.rows.length > 0){
                      //update current table with next origin word
                      db.transaction((tx) => {
                        tx.executeSql('UPDATE current SET word=?,type=? WHERE unit=? AND chapter=? AND deck=?', [
                          selectCheckResult.rows.item(0).origin_word,
                          'origin',
                          this.state.unit,
                          this.state.chapter,
                          this.state.deck,
                        ],
                          (tx, updateResult) => {
                          });
                      });
                    }
                    else{
                      //check if all are mastered
                      db.transaction((tx) => {
                        tx.executeSql('SELECT COUNT(*) as noOfMastered FROM derived WHERE status=1 AND unit=? AND chapter=? AND deck=?', [
                          this.state.unit,
                          this.state.chapter,
                          this.state.deck
                        ],
                        (tx, selectMasteredResult) => {
                          if(selectMasteredResult.rows.item(0).noOfMastered == this.state.totalWords){
                            //update current table mode to 1
                            db.transaction((tx) => {
                              tx.executeSql('UPDATE current SET mode=1 WHERE unit=? AND chapter=? AND deck=?', [
                                this.state.unit,
                                this.state.chapter,
                                this.state.deck,
                              ],
                                (tx, updateResult) => {
                                });
                            });
                            //navigate to completed deck page
                            this.props.navigation.navigate('DeckComplete', {
                              navigation: this.state.navigation,
                              unit: this.state.unit,
                              chapter: this.state.chapter,
                              deck: this.state.deck,
                            });
                          }
                          else{
                            //select word with max status where status > 1
                            db.transaction((tx) => {
                              tx.executeSql('SELECT derived_word FROM derived WHERE status=(SELECT MAX(status) FROM derived WHERE unit=? AND chapter=? AND deck=?) LIMIT 1', [
                                this.state.unit,
                                this.state.chapter,
                                this.state.deck
                              ],
                              (tx, selectReShowResult) => {
                                //update current table with word to be reshown and update mode to reshow i.e 0
                                db.transaction((tx) => {
                                  tx.executeSql('UPDATE current SET word=?,type=?,mode=0 WHERE unit=? AND chapter=? AND deck=?', [
                                    selectReShowResult.rows.item(0).derived_word,
                                    'derived',
                                    this.state.unit,
                                    this.state.chapter,
                                    this.state.deck
                                  ],
                                    (tx, updateResult) => {
                                    });
                                });
                              });
                            });
                          }
                        });
                      });
                    }
                  });
              });
            }

          });
      });
      this.initialDataFetch();
      this.flipCard();
    }
    else if(this.state.mode == 0){
      //reshow mode

      //check if all are mastered
      db.transaction((tx) => {
        tx.executeSql('SELECT COUNT(*) as noOfMastered FROM derived WHERE status=1 AND unit=? AND chapter=? AND deck=?', [
          this.state.unit,
          this.state.chapter,
          this.state.deck
        ],
        (tx, selectMasteredResult) => {
          //if yes
          //navigate to deck mastered page
          if(selectMasteredResult.rows.item(0).noOfMastered == this.state.totalWords){
            //update current table mode to 1
            db.transaction((tx) => {
              tx.executeSql('UPDATE current SET mode=1 WHERE unit=? AND chapter=? AND deck=?', [
                this.state.unit,
                this.state.chapter,
                this.state.deck,
              ],
                (tx, updateResult) => {
                });
            });
            //navigate to completed deck page
            this.props.navigation.navigate('DeckComplete', {
              navigation: this.state.navigation,
              unit: this.state.unit,
              chapter: this.state.chapter,
              deck: this.state.deck,
            });
          }
          else{
            //if no
            //select word with max status where status > 1 and id> current id
            db.transaction((tx) => {
              tx.executeSql('SELECT derived_word FROM derived WHERE id>? AND unit=? AND chapter=? AND deck=? AND status=(SELECT MAX(status) FROM derived WHERE id>? AND unit=? AND chapter=? AND deck=? AND status>1) LIMIT 1', [
                this.state.wordId,
                this.state.unit,
                this.state.chapter,
                this.state.deck,
                this.state.wordId,
                this.state.unit,
                this.state.chapter,
                this.state.deck
              ],
              (tx, selectReShowResult) => {
                if(selectReShowResult.rows.length > 0){
                  //if word found
                  //update current table with word to be reshown and update mode to reshow i.e 0
                  db.transaction((tx) => {
                    tx.executeSql('UPDATE current SET word=?,type=? WHERE unit=? AND chapter=? AND deck=?', [
                      selectReShowResult.rows.item(0).derived_word,
                      'derived',
                      this.state.unit,
                      this.state.chapter,
                      this.state.deck
                    ],
                      (tx, updateResult) => {
                      });
                  });
                }
                else{
                  //if word not found
                  //select word with max status where status > 1
                  db.transaction((tx) => {
                    tx.executeSql('SELECT derived_word FROM derived WHERE unit=? AND chapter=? AND deck=? AND status=(SELECT MAX(status) FROM derived WHERE unit=? AND chapter=? AND deck=?) LIMIT 1', [
                      this.state.unit,
                      this.state.chapter,
                      this.state.deck,
                      this.state.unit,
                      this.state.chapter,
                      this.state.deck
                    ],
                    (tx, selectReShowNewResult) => {
                      //update current table with word to be reshown and update mode to reshow i.e 0
                      db.transaction((tx) => {
                        tx.executeSql('UPDATE current SET word=?,type=? WHERE unit=? AND chapter=? AND deck=?', [
                          selectReShowNewResult.rows.item(0).derived_word,
                          'derived',
                          this.state.unit,
                          this.state.chapter,
                          this.state.deck
                        ],
                          (tx, updateResult) => {
                          });
                      });

                    });
                  });

                }

              });
            });

          }

        });
      });
      this.initialDataFetch();
      this.flipCard();
    }

    // this.setState({ status: newStatus });
    // // alert(newStatus);
    // this.flipCard();
  }


  renderFront = () => {
    return(
      <OriginDerivedWordCardFront state={this.state} flipCard={this.flipCard} seeMeaningForDerivedWord={this.seeMeaningForDerivedWord}/>
    )
  }

  chooseToShowProgress = () => {
    if(!this.state.flip){
      return(
        <ProgressCard state={this.state}/>
      );
    }
    else {
      //do nothing
    }
  }

  renderBack = () => {
    if(this.state.type == 'origin'){
      return(
        <OriginWordCardBack state={this.state} seeDerivedWords={this.seeDerivedWords}/>
      );
    }
    else{
      return(
        <DerivedWordCardBack state={this.state} changeStatusAndFetchNext={this.changeStatusAndFetchNext}/>
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
        {this.chooseToShowProgress()}
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
