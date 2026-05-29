import { colors } from "./colors";

export const defaultCategories = [
  {
    name: "income",
    displayName: "Renda",
    icon: "work",
    background: colors.categoryIncome,
    isIncome: true,
  },
  {
    name: "food",
    displayName: "Alimentacao",
    icon: "fastfood",
    background: colors.categoryFood,
    isIncome: false,
  },
  {
    name: "house",
    displayName: "Casa",
    icon: "home",
    background: colors.categoryHouse,
    isIncome: false,
  },
  {
    name: "education",
    displayName: "Educacao",
    icon: "book",
    background: colors.categoryEducation,
    isIncome: false,
  },
  {
    name: "travel",
    displayName: "Viagens",
    icon: "airplanemode-active",
    background: colors.categoryTravel,
    isIncome: false,
  },
  {
    name: "health",
    displayName: "Saude",
    icon: "favorite",
    background: colors.categoryHealth,
    isIncome: false,
  },
];
