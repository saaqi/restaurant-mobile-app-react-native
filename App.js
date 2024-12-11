import { GlobalStateProvider } from './src/GlobalState'
import { Index } from './src/Index'
import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'

/*
App Colors ----
Primary: #31511E
Secondary: #859F3D
Dark: #1A1A19
Light: #F6FCDF
*/

export default function App() {

  const [loaded, error] = useFonts({
    'Markazi-Text': require('./assets/fonts/MarkaziText-Medium.ttf'),
  })

  if (!loaded && !error) {
    return null;
  }

  return (
    <GlobalStateProvider>
      <Index />
      <StatusBar style="auto" />
    </GlobalStateProvider>
  )
}

