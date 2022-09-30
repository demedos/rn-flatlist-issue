import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

const App = () => {
  const {width, height} = useWindowDimensions();

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <FlatList
          data={Array.from({length: 20})}
          horizontal
          pagingEnabled
          onMomentumScrollEnd={e => {
            const _index = Math.round(
              e.nativeEvent.contentOffset.x /
                e.nativeEvent.layoutMeasurement.width,
            );
          }}
          getItemLayout={(_data, index) => {
            return {
              index,
              length: width,
              offset: width * index,
            };
          }}
          renderItem={info => {
            return (
              <View style={[styles.container, {width, height}]}>
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1657299143228-f971e4887268?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3467&q=80',
                  }}
                  style={{
                    width,
                    height,
                  }}
                />
                <View style={styles.info}>
                  <Text>Page</Text>
                  <Text style={styles.text}>{info.index + 1}</Text>
                  <Text>{`width: ${width}, height: ${height}`}</Text>
                </View>
              </View>
            );
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  info: {
    position: 'absolute',
    alignItems: 'center',
    marginTop: 32,
  },
  text: {
    fontSize: 72,
    color: 'black',
  },
});
