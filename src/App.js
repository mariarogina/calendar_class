import logo from './logo.svg';
import './App.css';
import Calendar from './Calendar'

const now = new Date(1987,1,2);

// внутри компонента App:

function App() {
  return (
    <Calendar date={now} />
  );
}

export default App;
