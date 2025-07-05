// app/_layout.jsx
import { Slot } from 'expo-router';
import { UserDataProvider } from '../context/UserDataContext'; // adjust if needed

export default function Layout() {
  return (
    <UserDataProvider>
      <Slot />
    </UserDataProvider>
  );
}
