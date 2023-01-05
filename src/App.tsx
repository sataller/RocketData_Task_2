import LoginForm from './LoginPage/LoginForm';
import styled from 'styled-components';

function App() {
  return (
    <AppWrapper>
      <LoginForm/>
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  width: 100%;
  display: flex;
  min-height: 100vh;
  align-items: center;
  background: #cdcdcd;
  justify-content: center;
`;

export default App;
