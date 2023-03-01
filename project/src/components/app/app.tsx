import Home from '../../pages/home/home';

type AppProps = {
  rentAmount: number;
}

function App({rentAmount}: AppProps): JSX.Element {
  return <Home rentAmount={rentAmount} />;
}

export default App;
