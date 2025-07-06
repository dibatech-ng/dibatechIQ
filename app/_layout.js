// app/_layout.jsx
import { Slot } from 'expo-router';
import { UserDataProvider } from '../context/UserDataContext'; // your existing context
import { StatsProvider } from '../context/StatsContext'; // new stats context

export default function Layout() {
  return (
    <UserDataProvider>
      <StatsProvider>
        <Slot />
      </StatsProvider>
    </UserDataProvider>
  );
}
