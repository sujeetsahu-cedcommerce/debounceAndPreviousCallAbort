import React, { useEffect, useState } from "react";

const Debouncing = () => {
  const [text, setText] = useState("");
  useEffect(() => {
    if (text) {
      let timer = setTimeout(() => {
        // fetch(`https://jsonplaceholder.typicode.com/${text}`)
        fetch(`https://jsonplaceholder.typicode.com/users/1`)
          .then((response) => response.json())
          .then((json) => console.log(json));
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [text]);

  const handleChange = (e) => {
    setText(e.target.value);
  };
  console.log("text", text);

  return (
    <div>
      <input
        type="text"
        value={text}
        placeholder="please enter"
        onChange={handleChange}
      />
    </div>
  );
};

export default Debouncing;
