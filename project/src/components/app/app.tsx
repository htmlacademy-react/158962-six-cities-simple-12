import Main from '../../pages/main/main';

type AppProps = {
  rentAmount: number;
}

const App = ({rentAmount}: AppProps): JSX.Element => <Main rentAmount={rentAmount} />;

export default App;
