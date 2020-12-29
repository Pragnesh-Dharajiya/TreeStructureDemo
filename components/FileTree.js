import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import data from './data.json';
import _ from 'lodash';

const FileTree = () => {
  return (
    <SafeAreaView>
      <View>
        <Tree data={data} />
      </View>
    </SafeAreaView>
  );
};

const Tree = ({data}) => {
  let formattedData = [];
  _.forEach(data, (item, key) => {
    item.key = key;
    formattedData.push(item);
  });

  return (
    <View>
      {formattedData.map((item) => (
        <Node item={item} />
      ))}
    </View>
  );
};

const Node = ({item}) => {
  console.log('node', item);
  const [isOpen, setIsOpen] = useState(false);

  let formattedChildData = [];
  _.forEach(item.children, (item, key) => {
    item.key = key;
    formattedChildData.push(item);
  });

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.folderView}>
        <TouchableOpacity onPress={() => toggle()}>
          {item.type !== 'file' && (
            <Image
              source={
                isOpen
                  ? require('../assets/ic_bleachDown.png')
                  : require('../assets/ic_bleach.png')
              }
              style={styles.bleachImage}
            />
          )}
        </TouchableOpacity>

        <Image
          source={
            item.type === 'file'
              ? require('../assets/ic_file.png')
              : require('../assets/ic_folder.png')
          }
          style={
            item.type === 'file' ? [styles.folderImage] : [styles.fileImage]
          }
        />
        <Text style={styles.headerText}>{item.key}</Text>
      </View>
      {isOpen &&
        formattedChildData.map((childNode) => (
          <View>
            <Node item={childNode} />
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {marginLeft: 20, marginTop: 5},
  folderView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bleachImage: {height: 15, width: 15},
  folderImage: {marginLeft: 50, marginTop: 5},
  fileImage: {marginLeft: 20},
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 5,
  },
});

export default FileTree;
