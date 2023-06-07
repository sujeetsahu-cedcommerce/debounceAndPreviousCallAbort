import "./App.css";
import DebounceAndPreviousCallAbort from "./DebounceAndPreviousCallAbort";
import { useRef } from "react";
import DebounceAndPreviousCallAbortByOnClick from "./DebounceAndPreviousCallAbortByOnClick";
import Debouncing from "./Debouncing";

function App() {
  const controller = useRef();
  const manage = () => {
    controller.current = new AbortController();
  };

  return (
    <div className="App">
      <h1>Abort by onChange</h1>
      <DebounceAndPreviousCallAbort controller={controller} manage={manage} />
      <h1>Abort by onClick</h1>
      <DebounceAndPreviousCallAbortByOnClick
        controller={controller}
        manage={manage}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          controller.current?.abort();
          console.log("onClickkk", controller?.current?.signal);
        }}
      >
        Abort
      </button>
      <h1>Debounce only</h1>
      <Debouncing />
    </div>
  );
}

export default App;
