import { AppProvider } from "context/AppContext";
import "../global.css";
import { Slot, Stack } from "expo-router";

export default function Layout() {
  return (
    <AppProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Optionally configure static options outside the route.*/}
        <Stack.Screen name="index" />
        <Stack.Screen name="screens/view-tickets" />
        <Stack.Screen
          name="screens/enter-ticket-details"
          options={{ presentation: "modal" }}
        />
        <Stack.Screen name="screens/view-report" />
      </Stack>
    </AppProvider>
  );
}
