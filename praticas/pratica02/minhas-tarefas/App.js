import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
// Você pode manter os imports do util se quiser usar o nome em algum lugar, 
// mas para a prática vamos focar nos componentes de UI.

export default function App() {
  return (
    <View style={styles.container}>
      {/* 1. CABEÇALHO */}
      <Text style={styles.title}>Minhas Tarefas</Text>

      {/* 2. ÁREA DE INSERÇÃO (Input + Botão) */}
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="Digite uma nova tarefa..." 
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* 3. LISTA DE TAREFAS (Estática/Hardcoded) */}
      <View style={styles.itemsContainer}>
        
        {/* Card de Tarefa 01 */}
        <View style={styles.card}>
          <Text style={styles.cardText}>Estudar Componentes Core do React Native para a aula de PDM</Text>
          <TouchableOpacity>
            <Text style={styles.deleteText}>X</Text>
          </TouchableOpacity>
        </View>

        {/* Card de Tarefa 02 */}
        <View style={styles.card}>
          <Text style={styles.cardText}>Configurar o ambiente do Android Studio</Text>
          <TouchableOpacity>
            <Text style={styles.deleteText}>X</Text>
          </TouchableOpacity>
        </View>

        {/* Card de Tarefa 03 */}
        <View style={styles.card}>
          <Text style={styles.cardText}>Finalizar o commit da Prática 02</Text>
          <TouchableOpacity>
            <Text style={styles.deleteText}>X</Text>
          </TouchableOpacity>
        </View>

      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5', // Um cinza bem clarinho para o fundo
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1C1C1C',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row', // Coloca input e botão na mesma linha
    alignItems: 'center',
    marginBottom: 30,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#DDD',
    fontSize: 16,
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  itemsContainer: {
    marginTop: 10,
  },
  card: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    // Sombra para o card (Android)
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    color: '#333',
    width: '85%', // Garante que o texto não passe por cima do X
  },
  deleteText: {
    color: '#FF5B5B',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 5,
  },
});