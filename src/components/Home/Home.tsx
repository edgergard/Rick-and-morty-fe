import { CardList } from '../CardList/CardList';
import './Home.scss'


export const Home: React.FC = () => {
  return (
    <div className="container-home">
      <div className="home">
        <CardList />
      </div>
    </div>

  );
}