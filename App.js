import { GlobalStateProvider } from './src/GlobalState'
import { Index } from './src/Index'
/*
App Colors ----
Primary: #31511E
Secondary: #859F3D
Dark: #1A1A19
Light: #F6FCDF
*/

export default function App() {

  return (
    <GlobalStateProvider>
      <Index />
    </GlobalStateProvider>
  )
}

