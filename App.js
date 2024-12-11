import { GlobalStateProvider } from './src/GlobalState'
import { Index } from './src/Index'
import { useFonts } from 'expo-font'


export default function App() {

  /*
    App Colors ----
    Primary: #31511E
    Secondary: #859F3D
    Dark: #1A1A19
    Light: #F6FCDF
  */
  useFonts({
    'Markazi-Medium': require('./assets/fonts/MarkaziText-Medium.ttf'),
    'Markazi': require('./assets/fonts/MarkaziText-Regular.ttf'),
    'Karla-Medium': require('./assets/fonts/Karla-Medium.ttf'),
    'Karla-Bold': require('./assets/fonts/Karla-Bold.ttf'),
    'Karla-ExtraBold': require('./assets/fonts/Karla-ExtraBold.ttf'),
    'Karla': require('./assets/fonts/Karla-Regular.ttf'),
  })

  return (
    <GlobalStateProvider>
      <Index />
    </GlobalStateProvider>
  )
}

