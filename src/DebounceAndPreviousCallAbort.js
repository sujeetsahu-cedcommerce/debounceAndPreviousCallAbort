import React from "react";
import { useState, useRef, useEffect } from "react";
const MakeRequest = async (id, signalOption = {}) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/1`,
    // "https://httpbin.org/delay/3",
    {
      ...signalOption,
    }
  );
  return response.json();
};

const DebounceAndPreviousCallAbort = (props) => {
  const { manage } = props;
  const debounceDelay = 100;
  const debounceTimer = useRef(0);
  const [id, setid] = useState("");

  const debouncedFetch = (id) => {
    setid(id);
    clearTimeout(debounceTimer.current);
    props?.controller?.current.abort();
    debounceTimer.current = setTimeout(async () => {
      try {
        if (id) {
          const result = await MakeRequest(id, {
            signal: props?.controller?.current?.signal,
          });
          console.log("result", result);
        }
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          console.log("err", err);
        }
      } finally {
        // setLoading(false);
      }
    }, debounceDelay);
  };

  useEffect(() => {
    console.log("sssssssssssss", props?.controller?.current?.signal);
    manage();
  }, [id]);

  return (
    <div>
      <form>
        <input
          autoComplete="off"
          type="text"
          id="order-no"
          value={id}
          placeholder="please enter"
          onChange={(e) => debouncedFetch(e.target.value)}
        />
      </form>
    </div>
  );
};

export default DebounceAndPreviousCallAbort;
