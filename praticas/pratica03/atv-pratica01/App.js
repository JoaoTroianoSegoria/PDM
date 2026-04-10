import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable, StyleSheet } from "react-native";
import { useState } from "react";

import DespesaRecentes from "./screens/DespesaRecentes";
import GerenciarDespesa from "./screens/GerenciarDespesa";
import TodasDespesas from "./screens/TodasDespesas";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function criarDataDiasAtras(dias) {
  const data = new Date();
  data.setDate(data.getDate() - dias);
  return data;
}

const DESPESAS_INICIAIS = [
  {
    id: "d1",
    descricao: "Supermercado",
    valor: 86.9,
    data: criarDataDiasAtras(1),
  },
  {
    id: "d2",
    descricao: "Internet",
    valor: 119.9,
    data: criarDataDiasAtras(3),
  },
  {
    id: "d3",
    descricao: "Almoço",
    valor: 32.5,
    data: criarDataDiasAtras(5),
  },
  {
    id: "d4",
    descricao: "Academia",
    valor: 79.9,
    data: criarDataDiasAtras(9),
  },
];

function BotaoCabecalho({ icon, color, onPress }) {
  return (
    <Pressable
      android_ripple={{ color: "#d5dbdb" }}
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressedButton}
    >
      <Ionicons color={color} name={icon} size={24} />
    </Pressable>
  );
}

function BottonTabScreen({ navigation, despesas }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: "#17494d" },
        headerTintColor: "#f8fbfb",
        sceneStyle: { backgroundColor: "#eef4f4" },
        tabBarStyle: { backgroundColor: "#17494d" },
        tabBarActiveTintColor: "#f2be5c",
        tabBarInactiveTintColor: "#cfe0e1",
        headerRight: ({ tintColor }) => (
          <BotaoCabecalho
            color={tintColor}
            icon="add-circle-outline"
            onPress={() => navigation.navigate("GerenciarDespesa")}
          />
        ),
        tabBarIcon: ({ color, size }) => {
          const icones = {
            DespesaRecentes: "time-outline",
            TodasDespesas: "calendar-outline",
          };

          return (
            <Ionicons
              color={color}
              name={icones[route.name] || "wallet-outline"}
              size={size}
            />
          );
        },
      })}
    >
      <Tab.Screen name="DespesaRecentes" options={{ title: "Recentes" }}>
        {(props) => <DespesaRecentes {...props} despesas={despesas} />}
      </Tab.Screen>
      <Tab.Screen name="TodasDespesas" options={{ title: "Todas" }}>
        {(props) => <TodasDespesas {...props} despesas={despesas} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  const [despesas, setDespesas] = useState(DESPESAS_INICIAIS);

  function adicionarDespesa(despesaData) {
    setDespesas((despesasAtuais) => [
      {
        ...despesaData,
        id: new Date().getTime().toString(),
      },
      ...despesasAtuais,
    ]);
  }

  function atualizarDespesa(id, despesaData) {
    setDespesas((despesasAtuais) =>
      despesasAtuais.map((despesa) =>
        despesa.id === id ? { ...despesa, ...despesaData, id } : despesa,
      ),
    );
  }

  function removerDespesa(id) {
    setDespesas((despesasAtuais) =>
      despesasAtuais.filter((despesa) => despesa.id !== id),
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: "#17494d" },
            headerTintColor: "#f8fbfb",
            contentStyle: { backgroundColor: "#eef4f4" },
          }}
        >
          <Stack.Screen
            name="DespesasOverview"
            options={{ headerShown: false }}
          >
            {(props) => <BottonTabScreen {...props} despesas={despesas} />}
          </Stack.Screen>
          <Stack.Screen name="GerenciarDespesa">
            {(props) => (
              <GerenciarDespesa
                {...props}
                despesas={despesas}
                onAddExpense={adicionarDespesa}
                onDeleteExpense={removerDespesa}
                onUpdateExpense={atualizarDespesa}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  pressedButton: {
    opacity: 0.7,
  },
});
