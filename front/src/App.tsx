import {Route} from 'react-router-dom'
import {MainLayout} from './components/MainLayout'
import {Timetable} from './components/Timetable'
import {Appointment} from './components/Appointment'
function App() {
  return (
    <MainLayout>
      <Route exact path='/' component={Appointment} />
      <Route path='/timetable' component={Timetable} />
    </MainLayout>
  );
}

export default App;
