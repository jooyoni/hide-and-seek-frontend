import { useAppSelector } from '../store/store';

function GetMyData() {
  const myData = useAppSelector((state) => state.me);
  return myData;
}
export default GetMyData;
