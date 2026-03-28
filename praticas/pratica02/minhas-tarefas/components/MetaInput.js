import { View, TextInput, Button, StyleSheet } from 'react-native';

function MetaInput(props) {
  return (
    <View style={styles.inputContainer}>
      <View style={{ width: '65%' }}>
        <TextInput
          style={styles.inputText}
          placeholder={props.placeholder}
          onChangeText={props.onInputChange}
          value={props.inputValue}
        />
      </View>

      <View style={{ width: '30%' }}>
        <Button 
          title={props.buttonTitle} 
          onPress={props.onAddMeta} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24, 
  },
  inputText: {
    borderColor: '#cccccc',
    borderWidth: 1,
    padding: 8,
  },
});

export default MetaInput;