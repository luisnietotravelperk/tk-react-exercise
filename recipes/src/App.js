import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './components/Navbar';

function App() {
  const Content = styled.div`
    max-width: 600px;
    margin: 0 auto 40px auto;
    padding: 20px;
  `

  return (
    <div className="App">
      <Navbar />
      <Content>
        <Outlet />
      </Content>
    </div>
  );
}

export default App;
