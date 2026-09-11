import { Stack } from "expo-router";
import "../../global.css";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{
        title: "Pokedex", 
      
       }} />
      <Stack.Screen
        name="details"
        options={{
          title: "Details",
          headerBackButtonDisplayMode: "minimal",
          presentation: "formSheet",
          sheetAllowedDetents: [0.3, 0.5, 0.7],
          sheetCornerRadius: 24,
          sheetGrabberVisible: true,
        }}
      />
    </Stack>
  );
}
