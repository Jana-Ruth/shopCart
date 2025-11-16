
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StripeProvider } from "@stripe/stripe-react-native";
import Toast from 'react-native-toast-message';



export default function RootLayout() {
  
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (

      <>
      <StripeProvider
      publishableKey="pk_test_51SQp3GBSytUCCMZOg67uR3n6DSDDDtpD0izlxd9JsKlagmdss3TeWOVWpR3sUma12dplVxiKA8K53SHgAO3d1RcR00gc3S4wGk" // 🔑 your actual Stripe test key here
      merchantIdentifier="merchant.com.yourapp" // Apple Pay identifier (safe to leave as is if not using)
      urlScheme="yourapp" // optional: only if you use deep linking
    >
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    <Toast/>
    </StripeProvider>
      </>
    
  );
}
