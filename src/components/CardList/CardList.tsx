import { Card } from '../Card/Card';

const list = [0, 0, 0 ,0, 0 ,0];

export const CardList: React.FC = () => {
  return (
    <>
    {list.map(() => (
      <Card />
    ))}
    </>
  )
}