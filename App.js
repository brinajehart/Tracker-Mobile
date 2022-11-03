import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';

const App: () => Node = () => {
  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text style={{ fontSize: 30 }}>{"Tracker"}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
