import { Stack } from "expo-router";
import "../../global.css";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f8fafc",
        },
        headerTintColor: "#111827",
        headerTitleStyle: {
          fontWeight: "700",
          fontSize: 20,
        },
        contentStyle: {
          backgroundColor: "#f8fafc",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Pokedex",
          headerLargeTitle: true,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="details"
        options={{
          title: "Details",
          headerBackButtonDisplayMode: "minimal",
          presentation: "formSheet",
          sheetAllowedDetents: [0.3, 0.5, 0.7],
          sheetCornerRadius: 24,
          sheetGrabberVisible: true,
          headerStyle: {
            backgroundColor: "#ffffff",
          },
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}
