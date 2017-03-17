/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Picker,
  Dimensions,
} from 'react-native';

// Import chemical database
import { chemicals } from './data/chemData.js'

export default class GeneralPlayground extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chemical: {}
    };
  }

  render() {

    let chemicalSelected = this.state.chemical;

    return (
      <View style={styles.container}>
        <Picker
          selectedValue={chemicalSelected}
          onValueChange={(value) => this.setState({chemical: value})}
          style={{width: Dimensions.get('window').width * 1, height: 100, position: 'relative', top: -150}}>
            {chemicals.map((chemical, index) => {
              return <Picker.Item label={chemical.name} value={chemical} key={index} />
            })}
        </Picker>
        <HazmatSymbol chemical={this.state.chemical}/>
      </View>
    );
  }
}

class HazmatSymbol extends Component {
    render() {
        return (
            <View style={styles.hazmat}>
              <View style={[styles.hazmatInnerSquare, styles.hazmatFlammability]}><Text style={styles.hazmatText}>{this.props.chemical.fire}</Text></View>
              <View style={[styles.hazmatInnerSquare, styles.hazmatReactivity]}><Text style={styles.hazmatText}>{this.props.chemical.reactivity}</Text></View>
              <View style={[styles.hazmatInnerSquare, styles.hazmatHealth]}><Text style={styles.hazmatText}>{this.props.chemical.health}</Text></View>
              <View style={[styles.hazmatInnerSquare, styles.hazmatSpecial]}><Text style={[styles.hazmatText, styles.hazmatSpecialText]}>{this.props.chemical.special}</Text></View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
  },
  hazmat: {
    borderWidth: 2,
    borderColor: 'black',
    width: 100,
    height: 100,
    transform: [{rotate: '45deg'}],
    marginTop: 30,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  hazmatInnerSquare: {
    height: 48,
    width: 48,
    borderWidth: 2
  },
  hazmatFlammability: {
    backgroundColor: 'red'
  },
  hazmatReactivity: {
    backgroundColor: 'yellow'
  },
  hazmatHealth: {
    backgroundColor: 'blue'
  },
  hazmatSpecial: {
    backgroundColor: 'white',
  },
  hazmatText: {
    fontSize: 30,
    fontWeight: '600',
    transform: [{rotate: '-45deg'}],
    backgroundColor: 'transparent',
    textAlign: 'center',
    position: 'relative',
    left: -2,
    top: -2,
    width: 48,
    height: 48,
    lineHeight: 48
  },
  hazmatSpecialText: {
    fontSize: 24,
    position: 'relative',
    left: -2,
    top: -2
  }
});

AppRegistry.registerComponent('GeneralPlayground', () => GeneralPlayground);
