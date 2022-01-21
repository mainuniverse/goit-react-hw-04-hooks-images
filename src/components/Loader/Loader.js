import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

function Spinner() {
  return (
      <Loader
        type="oval"
        color="#00BFFF"
        height={100}
        width={100}
       timeout={3000}
      ariaLabel='loading'
      />
  );
}
export default Spinner;

// import Loader from "react-loader-spinner";
// export default class App extends React.Component {
//   //other logic
//   render() {
//     return (
//       <Loader
//         type="Puff" "TailSpin" "Watch"
//         color="#00BFFF"
//         height={100}
//         width={100}
//         timeout={3000} //3 secs
//       />
//     );
//   }
// }