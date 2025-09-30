import './App.css'
import ControlledField from './Components/ControlledField';
import Etarget from './Components/Etarget';
import UnControlledField from './Components/UnControlledField';
import CustomHook from './Components/CustomHook';

function App() {
  return (
    <div className='formDiv'>
      <Etarget></Etarget>
      <ControlledField></ControlledField>
      <UnControlledField></UnControlledField>
      <CustomHook></CustomHook>
    </div>
  )
}

export default App
