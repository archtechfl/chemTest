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
  ScrollView,
} from 'react-native';

// Import chemical database
import { chemicals } from './data/chemData.js'
import { descriptions } from './data/descriptions.js'

export default class GeneralPlayground extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chemical: chemicals[0],
      activeDescription: "",
      hasLongDescription: false
    };
    this._getChemical = this._getChemical.bind(this);
  }

  componentDidMount() {
    // Check chemical special notes length
    this._checkDescriptionLength(this.state.chemical);
  }

  _getChemical(value){
    let selectedChemical = chemicals.filter(chemical => chemical.name === value);
    if (selectedChemical.length === 1) {
      this.setState({
        chemical: selectedChemical[0],
        activeDescription: ""
      });
      this._checkDescriptionLength(selectedChemical[0]);
    } else {
      this.setState({
        chemical: {},
        activeDescription: "",
        hasLongDescription: false
      });
    }
  }

  _checkDescriptionLength(chemical){
    let hasMultipleNotes = chemical.special.match(/\s|\,/g) ? true : false;
    this.setState({hasLongDescription: hasMultipleNotes});
  }

  _updateDescription(type){
    let currentLevel = this.state.chemical[type];
    this.setState({activeDescription: descriptions[type][currentLevel]});
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={{flex: 1, marginBottom: 30}}>
          <Picker
            selectedValue={this.state.chemical.name}
            onValueChange={(value) => this._getChemical(value)}
            style={{width: Dimensions.get('window').width * 1, height: 100 }}>
              {chemicals.map((chemical, index) => {
                return <Picker.Item label={chemical.name} value={chemical.name} key={index} />
              })}
          </Picker>
        </View>
        <View style={{flex: 1, marginBottom: 30}}>
          <HazmatSymbol chemical={this.state.chemical} hasLongDescription={this.state.hasLongDescription} updateDescription={this._updateDescription.bind(this)}/>
        </View>
        <ScrollView style={{flex: 1}}>
          <Text style={{padding: 20, fontSize: 18}}>{this.state.activeDescription}</Text>
        </ScrollView>
      </View>
    );
  }
}

class HazmatSymbol extends Component {

    constructor(props) {
      super(props);
      this.descriptions = descriptions;
      this.updateDescription = this.props.updateDescription;
    }

    render() {
        return (
            <View style={styles.hazmat}>
              <TouchableOpacity
                activeOpacity={0.5} 
                style={[styles.hazmatInnerSquare, styles.hazmatFlammability]}
                onPress={() => {
                    this.updateDescription("fire");
                }}>
                <Text ref="fire" style={styles.hazmatText}>{this.props.chemical.fire}</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                activeOpacity={0.5}
                style={[styles.hazmatInnerSquare, styles.hazmatReactivity]}
                onPress={() => {
                    this.updateDescription("reactivity");
                }}>
                <Text ref="reactivity" style={styles.hazmatText}>{this.props.chemical.reactivity}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5} 
                style={[styles.hazmatInnerSquare, styles.hazmatHealth]}
                onPress={() => {
                    this.updateDescription("health");
                }}>
                <Text ref="health" style={styles.hazmatText}>{this.props.chemical.health}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5} 
                style={[styles.hazmatInnerSquare, styles.hazmatSpecial]}
                onPress={() => {
                    this.updateDescription("special");
                }}>
                <Text ref="special" style={[styles.hazmatText, styles.hazmatSpecialText, this.props.hasLongDescription && styles.longDescription]}>{this.props.chemical.special}</Text>
              </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
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
  },
  longDescription: {
    fontSize: 18,
    lineHeight: 18,
    top: 10,
    left: 8
  }
});

AppRegistry.registerComponent('GeneralPlayground', () => GeneralPlayground);
