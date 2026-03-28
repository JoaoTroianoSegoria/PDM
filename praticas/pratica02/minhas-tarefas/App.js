import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { rotulo_btn_cadastro_meta, rotulo_input_meta } from 'mensagens';
import MetaInput from './components/MetaInput';
import MetasList from './components/MetasList';

export default function App() {
  const [inputMetaText, setInputMetaText] = useState('');
  const [metas, setMetas] = useState([]);

  function metaInputHandler(inputText) {
    setInputMetaText(inputText);
  }

  function adicionarMetaHandler() {
    if (inputMetaText.trim().length === 0) return; 
    setMetas([...metas, inputMetaText]);
    setInputMetaText(''); 
  }

  return (
    <View style={styles.mainContainer}>
      <View style={{ flex: 1 }}>
        <MetaInput 
          placeholder={rotulo_input_meta}
          buttonTitle={rotulo_btn_cadastro_meta}
          onInputChange={metaInputHandler}
          onAddMeta={adicionarMetaHandler}
          inputValue={inputMetaText}
        />
      </View>
      <View style={styles.metaContainer}>
        <MetasList array={metas} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 30,
    flex: 1,
  },
  metaContainer: {
    flex: 5, 
  },
});