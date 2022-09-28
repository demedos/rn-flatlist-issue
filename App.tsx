import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

const App = () => {
  const {width, height} = useWindowDimensions();
  const [page, setPage] = useState(1);
  const flatListRef = useRef<FlatList>(null);

  const isPortrait = height > width;
  useEffect(() => {
    flatListRef.current?.scrollToIndex({index: page - 1, animated: false});
  }, [isPortrait, page]);

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <FlatList
          ref={flatListRef}
          data={Array.from({length: 20})}
          horizontal
          pagingEnabled
          onMomentumScrollEnd={e => {
            const index = Math.round(
              e.nativeEvent.contentOffset.x /
                e.nativeEvent.layoutMeasurement.width,
            );
            setPage(index + 1);
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
                <Text>Page</Text>
                <Text style={styles.text}>{info.index + 1}</Text>
                <Text>{`width: ${width}, height: ${height}`}</Text>
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
    borderColor: 'red',
    borderWidth: 3,
    alignItems: 'center',
    paddingTop: 12,
  },
  text: {
    fontSize: 72,
    color: 'black',
  },
});
