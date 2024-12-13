export const ReactTest2 = [
    {
      qnumber: 1,
      question: `
          import React, { useState, useEffect } from "react";
          function App() {
              const [state, setState] = useState({ count: 0 });
              useEffect(() => {
                  setState({ count: state.count + 1 });
              }, []);
              console.log("Render:", state.count);
              return <h1>{state.count}</h1>;
          }
          export default App;
        `,
      options: [
        "Render: 0",
        "Render: 1",
        "React Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.",
        "An infinite loop in the console showing Render: 0, 1, 2, ...",
      ],
      answer: "React Error: Too many re-renders. React limits the number of renders to prevent an infinite loop."
    },
    {
      qnumber: 2,
      question: `
          import React, { useState } from "react";
          function Counter() {
              const [count, setCount] = useState(0);
              const increment = () => setCount((prev) => prev + 1);
              const logCount = () => console.log(count);
  
              return (
                  <div>
                      <button onClick={increment}>Increment</button>
                      <button onClick={logCount}>Log Count</button>
                  </div>
              );
          }
          export default Counter;
        `,
      options: [
        "Logs the latest count value on every button click",
        "Always logs 0, regardless of the count value",
        "Logs the count value at the time the function was created",
        "Throws a runtime error",
      ],
      answer: "Logs the count value at the time the function was created"
    },
    {
      qnumber: 3,
      question: `
          import React, { useState } from "react";
          function App() {
              const [count, setCount] = useState(0);
              if (count === 2) {
                  const [error, setError] = useState(false);
              }
              return <button onClick={() => setCount(count + 1)}>Increment</button>;
          }
        `,
      options: [
        "Throws a runtime error due to hook rules violation",
        "Increments the count without errors",
        "Renders the button but does not allow incrementing",
        "Throws an error at compile time",
      ],
      answer: "Throws a runtime error due to hook rules violation"
    },
    {
      qnumber: 4,
      question: `
          import React, { useEffect } from "react";
          function App() {
              useEffect(() => {
                  const interval = setInterval(() => console.log("Tick"), 1000);
                  return () => clearInterval(interval);
              }, []);
              return <h1>Timer</h1>;
          }
          export default App;
        `,
      options: [
        "Logs 'Tick' every second and stops when unmounted",
        "Logs 'Tick' every second and never stops",
        "Throws an error due to missing dependencies",
        "Logs 'Tick' once and stops",
      ],
      answer: "Logs 'Tick' every second and stops when unmounted"
    },
    {
      qnumber: 5,
      question: `
          import React, { memo } from "react";
          const Child = memo(({ count }) => {
              console.log("Child render");
              return <h2>{count}</h2>;
          });
          function App() {
              const [count, setCount] = React.useState(0);
              const increment = () => setCount((prev) => prev + 1);
  
              return (
                  <div>
                      <button onClick={increment}>Increment</button>
                      <Child count={count} />
                  </div>
              );
          }
          export default App;
        `,
      options: [
        "Child renders only when count changes",
        "Child renders on every parent render",
        "Child never renders",
        "Throws an error due to improper memoization",
      ],
      answer: "Child renders only when count changes"
    },
    {
      qnumber: 6,
      question: `
          import React, { createContext, useContext } from "react";
          const MyContext = createContext();
          function App() {
              return (
                  <MyContext.Provider value={10}>
                      <Child />
                  </MyContext.Provider>
              );
          }
          function Child() {
              const value = useContext(MyContext);
              return <h1>{value}</h1>;
          }
          export default App;
        `,
      options: [
        "Displays '10'",
        "Throws an error due to missing context value",
        "Displays 'undefined'",
        "Displays 'null'",
      ],
      answer: "Displays '10'"
    },
    {
      qnumber: 7,
      question: `
          import React, { useReducer } from "react";
          function reducer(state, action) {
              switch (action.type) {
                  case "increment":
                      return state + 1;
                  default:
                      return state;
              }
          }
          function App() {
              const [count, dispatch] = useReducer(reducer, 0);
              return <button onClick={() => dispatch({ type: "increment" })}>{count}</button>;
          }
          export default App;
        `,
      options: [
        "Increments the count on button click",
        "Throws an error due to missing state property",
        "Logs an error in the console without rendering",
        "Displays an empty button",
      ],
      answer: "Increments the count on button click"
    },
    {
      qnumber: 8,
      question: `
          import React from "react";
          const App = React.forwardRef((props, ref) => (
              <button ref={ref}>{props.children}</button>
          ));
          export default App;
        `,
      options: [
        "Forwards the ref to the button element",
        "Throws an error because refs cannot be forwarded",
        "Does not forward the ref",
        "Throws an error due to missing prop types",
      ],
      answer: "Forwards the ref to the button element"
    },
    {
      qnumber: 9,
      question: `
          import React, { useEffect, useState } from "react";
          function App() {
              const [count, setCount] = useState(0);
              useEffect(() => {
                  const interval = setInterval(() => {
                      setCount((prev) => prev + 1);
                  }, 1000);
                  return () => clearInterval(interval);
              }, []);
              return <h1>{count}</h1>;
          }
          export default App;
        `,
      options: [
        "Increments the count every second",
        "Throws a warning about missing dependencies",
        "Throws an error due to excessive renders",
        "Displays '0' without incrementing",
      ],
      answer: "Increments the count every second"
    },
];
