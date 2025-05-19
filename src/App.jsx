import "./App.css";
import "./index.css";
import Weather from "./components/Weather";

function App() {
  return (
    <>
      <div className=" w-xl p-20 mx-auto  md:w-3/4 lg:w-1/2">
        <Weather />
      </div>
    </>
  );
}

export default App;
