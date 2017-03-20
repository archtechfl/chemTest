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
  TouchableOpacity,
} from 'react-native';

// Import chemical database
import { chemicals } from './data/chemData.js'

export default class GeneralPlayground extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chemical: chemicals[0]
    };
    this._getChemical = this._getChemical.bind(this);
  }

  _getChemical(value){
    let selectedChemical = chemicals.filter(chemical => chemical.name === value);
    if (selectedChemical.length === 1) {
      this.setState({chemical: selectedChemical[0]});
    } else {
      this.setState({chemical: {}});
    }
  }

  render() {

    return (
      <View style={styles.container}>
        <Picker
          selectedValue={this.state.chemical.name}
          onValueChange={(value) => this._getChemical(value)}
          style={{width: Dimensions.get('window').width * 1, height: 100, position: 'relative', top: -150}}>
            {chemicals.map((chemical, index) => {
              return <Picker.Item label={chemical.name} value={chemical.name} key={index} />
            })}
        </Picker>
        <HazmatSymbol chemical={this.state.chemical}/>
      </View>
    );
  }
}

class HazmatSymbol extends Component {

    constructor(props) {
      super(props);
    }

    componentDidMount(){
      console.log("HazmatSymbol did mount");
    }

    render() {
        return (
            <View style={styles.hazmat}>
              <TouchableOpacity
                activeOpacity={0.5} 
                style={[styles.hazmatInnerSquare, styles.hazmatFlammability]}
                onPress={() => {
                    console.log("Tapped flammability level");
                }}>
                <Text style={styles.hazmatText}>{this.props.chemical.fire}</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                activeOpacity={0.5}
                style={[styles.hazmatInnerSquare, styles.hazmatReactivity]}
                onPress={() => {
                    console.log("Tapped reactivity level");
                }}>
                <Text style={styles.hazmatText}>{this.props.chemical.reactivity}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5} 
                style={[styles.hazmatInnerSquare, styles.hazmatHealth]}
                onPress={() => {
                    console.log("Tapped health level");
                }}>
                <Text style={styles.hazmatText}>{this.props.chemical.health}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5} 
                style={[styles.hazmatInnerSquare, styles.hazmatSpecial]}
                onPress={() => {
                    console.log("Tapped special notes");
                }}>
                <Text style={[styles.hazmatText, styles.hazmatSpecialText]}>{this.props.chemical.special}</Text>
              </TouchableOpacity>
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
