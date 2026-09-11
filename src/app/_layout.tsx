import { Stack } from "expo-router";
import "../../global.css";

export default function RootLayout() {
  return <Stack >
    <Stack.Screen name="index" options={{ title: "Pokedex" }} />
    <Stack.Screen name="details" options={{
      title: "Details",
  headerBackButtonDisplayMode: "minimal",
  }} />
  </Stack>;
}
