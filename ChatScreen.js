
import React, { Component } from 'react';
import {View, ListView, Text, TextInput, TouchableOpacity} from 'react-native';
import * as firebase from 'firebase';
import _ from 'lodash';


const config = {
  apiKey: "AIzaSyDlGqFXQ6TenRQeIUq7oEh5gBUbK6t_rhY",
  authDomain: "hackathonchat.firebaseapp.com",
  databaseURL: "https://hackathonchat.firebaseio.com",
  storageBucket: "hackathonchat.appspot.com",
  messagingSenderId: "1058980599391"
};
const firebaseApp = firebase.initializeApp(config);

export default class ChatScreen extends Component{

  constructor(props) {
    super(props);
    this.state={
      ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      message: ''
    }
    this.db = firebaseApp.database().ref('/channels/' + props.channel);
  }

  componentDidMount() {
    this.db.on('value', (snap) => {
      const messages = [];
      snap.forEach((item) => {
        messages.push(item.val());
      })

      _.sortBy(messages, 'timestamp');

      this.setState({
        ds: this.state.ds.cloneWithRows(messages)
      })

    })
  }

  send() {
    this.db.push({
      sender: this.props.name,
      text: this.state.message,
      timestamp: Date.now()
    })
    this.setState({message:''})
  }

  renderRow(row) {
    return (
        <View style={{padding: 10}}>
          <Text style={{fontSize: 16, color: 'green'}}>
            {row.sender}
          </Text>


          <Text style={{fontSize: 20}}>
            {row.text}
          </Text>
        </View>
    )
  }

  render() {
    return (
        <View style={{flex: 1}}>
          <ListView
              style={{flex: 1}}
              dataSource={this.state.ds}
              renderRow={(row)=>this.renderRow(row)}
          />

          <View style={{flexDirection: 'row'}}>
            <TextInput
                style={{flex: 1, height: 40, borderWidth: 1, borderColor: 'grey', alignSelf: 'center'}}
                onChangeText={(message) => this.setState({message})}
                value={this.state.message}
            />
            <TouchableOpacity onPress={() => this.send()}>
              <Text style={[{color: 'blue', padding: 10}]}>
                Send!
              </Text>
            </TouchableOpacity>

          </View>
        </View>
    )
  }
}