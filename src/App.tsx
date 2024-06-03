import './App.css';

import MainProvider from './main.provide';
import Layout from './layout';

function App() {
  return (
    <MainProvider>
      <Layout />
    </MainProvider>
  );
}

export default App;
