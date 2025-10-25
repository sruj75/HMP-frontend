import { useRouter } from 'expo-router';
import { StyleSheet, Button, View } from 'react-native';
/**
 * Simple interface - Just a centered button
 * Clear call-to-action - "Start Voice Assistant"
 * Navigation trigger - Button navigates to ../assistant
 */

export default function StartScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Button
        onPress={() => router.navigate('../assistant')}
        title="Start Voice Assistant"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
