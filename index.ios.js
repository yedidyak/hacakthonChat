/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text, TextInput, TouchableOpacity,
  View
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import ChatScreen from './ChatScreen';

class react_native_navigation_bootstrap extends Component {

  constructor(props) {
    super(props);
    this.state ={
      name: 'name',
      channel: 'channel'
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          What's your name?
        </Text>

        <TextInput
          style={{height: 40, width: 200, borderWidth: 1, borderColor: 'grey', alignSelf: 'center'}}
          onChangeText={(name) => this.setState({name})}
          value={this.state.name}
        />


        <Text style={styles.welcome}>
          What channel do you want?
        </Text>


        <TextInput
            style={{height: 40, width: 200, borderWidth: 1, borderColor: 'grey', alignSelf: 'center'}}
            onChangeText={(channel) => this.setState({channel})}
            value={this.state.channel}

        />

        <TouchableOpacity onPress={() => this.startChat()}>
          <Text style={[styles.welcome, {color: 'blue'}]}>
            Chat!
          </Text>
        </TouchableOpacity>

      </View>
    );
  }

  startChat() {
    this.props.navigator.push({
      screen: 'chatScreen',
      title: this.state.channel,
      passProps: this.state
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
Navigation.registerComponent('chatScreen', () => ChatScreen);

Navigation.registerComponent('react-native-navigation-bootstrap', () => react_native_navigation_bootstrap);
Navigation.startSingleScreenApp({
  screen: {
    screen: 'react-native-navigation-bootstrap',
    title: 'Navigation Bootstrap'
  }
});
