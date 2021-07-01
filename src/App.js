
import './App.css';
import Calendar from './Calendar'

const now = new Date(2021,2,8);

// внутри компонента App:

function App() {
  return (
    <Calendar date={now} />
  );
}

export default App;
