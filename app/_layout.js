// app/_layout.jsx
import { Slot } from 'expo-router';
import { UserDataProvider } from '../context/UserDataContext';
import { StatsProvider } from '../context/StatsContext';

export default function Layout() {
  return (
    <UserDataProvider>
      <StatsProvider>
        <Slot />
      </StatsProvider>
    </UserDataProvider>
  );
}
