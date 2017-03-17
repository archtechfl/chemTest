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
  View
} from 'react-native';

// Import chemical database
import { chemicals } from './data/chemData.js'

export default class GeneralPlayground extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Circle/>
        <Roundrel/>
        <HazmatSymbol/>
      </View>
    );
  }
}

class Circle extends Component {
    render() {
        return (
            <View style={styles.circle} />
        )
    }
}

class Roundrel extends Component {
    render() {
        return (
            <View style={styles.roundrel}>
              <View style={styles.roundrelInner}/>
            </View>
        )
    }
}

class HazmatSymbol extends Component {
    render() {
        return (
            <View style={styles.hazmat}>
              <View style={[styles.hazmatInnerSquare, styles.hazmatFlammability]}><Text style={styles.hazmatText}>1</Text></View>
              <View style={[styles.hazmatInnerSquare, styles.hazmatReactivity]}><Text style={styles.hazmatText}>1</Text></View>
              <View style={[styles.hazmatInnerSquare, styles.hazmatHealth]}><Text style={styles.hazmatText}>1</Text></View>
              <View style={[styles.hazmatInnerSquare, styles.hazmatSpecial]}><Text style={[styles.hazmatText, styles.hazmatSpecialText]}>OX</Text></View>
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
    borderWidth: 1
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 100/2,
    backgroundColor: 'red'
  },
  roundrel: {
    borderWidth: 15,
    height: 100,
    width: 100,
    borderRadius: 100/2,
    borderColor: 'red',
    marginTop: 10
  },
  roundrelInner: {
    height: 50,
    width: 50,
    borderRadius: 100/2,
    backgroundColor: 'red',
    position: 'absolute',
    right: 10,
    top: 10
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
