import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  FlatList,
  StatusBar,
  TouchableWithoutFeedback,
  ToastAndroid,
} from 'react-native';

function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [todoList, setTodoList] = useState([]);

  const changeText = text => {
    setInputValue(text);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Math.random().toString(),
        text: inputValue.trim(),
      };
      setTodoList([...todoList, newTodo]);
      setInputValue('');
      setModalVisible(false);
      ToastAndroid.show('Todo added successfully', 2500);
    } else {
      ToastAndroid.show('Error: Please enter a todo', 2500);
    }
  };

  const handleTodo = id => {
    Alert.alert('What you want to do', null, [
      {
        text: 'Modify',
        onPress: () => [
          setModalVisible(true),
          setInputValue(todoList.find(todo => todo.id === id).text),
          setTodoList(todoList.filter(todo => todo.id !== id)),
          console.log('Modified'),
        ],
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel'),
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => [
          ToastAndroid.show('Delete', 1500),
          setTodoList(todoList.filter(todo => todo.id !== id)),
          console.log('Deleted'),
        ],
      },
    ]);
  };

  const renderTodoItem = ({item}) => (
    <TouchableOpacity
      style={styles.todoItem}
      onPress={() => handleTodo(item.id)}>
      <Text style={styles.todoText}>{item.text}</Text>
    </TouchableOpacity>
  );

  return (

      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text}>To Do List</Text>
        </View>
        <View style={styles.mainBody}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <TouchableWithoutFeedback onPress={() => [setModalVisible(false)]}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalbtText}>Need To Do</Text>
                  <TextInput
                    style={styles.edtext}
                    value={inputValue}
                    onChangeText={changeText}
                    placeholder="Enter the todo"
                  />
                  <View style={styles.rowOfModalbt}>
                    <TouchableOpacity
                      style={[styles.button, styles.btClear]}
                      onPress={() => setInputValue('')}>
                      <Text style={styles.modalbtText}>Clear</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.button, styles.btConfirm]}
                      onPress={handleAddTodo}>
                      <Text style={styles.modalbtText}>Confirm</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.bttext}>+ Add +</Text>
          </TouchableOpacity>
          <View style={styles.todoBody}>
            <FlatList
              data={todoList}
              renderItem={renderTodoItem}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.todoList}
            />
          </View>
        </View>
      </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  text: {
    fontSize: 50,
    color: 'black',
  },
  header: {
    backgroundColor: '#1e90ff',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: 'black',
    flexShrink: 0,
  },
  mainBody: {
    flex: 1,
  },
  button: {
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 3,
    backgroundColor: 'grey',
    borderColor: 'black',
    padding: 10,
  },
  bttext: {
    fontSize: 35,
    color: 'black',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    elevation: 5,
  },
  modalbtText: {
    fontSize: 25,
    color: 'black',
  },
  edtext: {
    fontSize: 20,
    borderBottomWidth: 2,
    color: 'black',
  },
  btClear: {
    alignItems: 'flex-start',
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  btConfirm: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    alignItems: 'flex-end',
  },
  rowOfModalbt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  //To Do
  todoList: {
    flexGrow: 1,
    width: '100%',
    paddingBottom: 50,
  },
  todoItem: {
    //flex:1,
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  todoText: {
    fontSize: 25,
    color: 'grey',
  },
  todoBody: {
    padding: 15,
    alignItems: 'flex-start',
  },
});

export default App;