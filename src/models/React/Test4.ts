export const ReactTest4 = [
    {
      qnumber: 1,
      question: `
          import React, { useState, useEffect } from "react";
          function App() {
              const [count, setCount] = useState(0);
              const [double, setDouble] = useState(0);
              
              useEffect(() => {
                  setDouble(count * 2);
              }, [double]);
  
              return (
                  <div>
                      <button onClick={() => setCount(count + 1)}>Increment</button>
                      <p>Count: {count}</p>
                      <p>Double: {double}</p>
                  </div>
              );
          }
          export default App;
        `,
      options: [
        "Throws an infinite render error",
        "Count increments, Double updates correctly",
        "Double updates only when the button is clicked twice",
        "Count increments, Double does not update",
      ],
    },
    {
      qnumber: 2,
      question: `
          import React, { useRef, useEffect } from "react";
          function App() {
              const ref = useRef(0);
              useEffect(() => {
                  ref.current += 1;
              }, []);
              console.log(ref.current);
              return <h1>Ref Count: {ref.current}</h1>;
          }
          export default App;
        `,
      options: [
        "Logs '1' and displays 'Ref Count: 1'",
        "Logs '0' and displays 'Ref Count: 0'",
        "Logs '1' but displays 'Ref Count: 0'",
        "Throws an error due to improper ref access",
      ],
    },
    {
      qnumber: 3,
      question: `
          import React, { useEffect, useLayoutEffect, useState } from "react";
          function App() {
              const [value, setValue] = useState("A");
              useEffect(() => {
                  console.log("useEffect");
                  setValue("B");
              }, []);
              useLayoutEffect(() => {
                  console.log("useLayoutEffect");
                  setValue("C");
              }, []);
  
              return <h1>{value}</h1>;
          }
          export default App;
        `,
      options: [
        "Logs 'useLayoutEffect', 'useEffect' and displays 'C'",
        "Logs 'useEffect', 'useLayoutEffect' and displays 'C'",
        "Throws an error due to conflicting updates",
        "Displays 'B' without any logs",
      ],
    },
    {
      qnumber: 4,
      question: `
          import React, { useState, useMemo } from "react";
          function App() {
              const [count, setCount] = useState(0);
              const expensiveCalculation = useMemo(() => {
                  console.log("Expensive calculation");
                  return count * 2;
              }, []);
  
              return (
                  <div>
                      <button onClick={() => setCount(count + 1)}>Increment</button>
                      <p>Value: {expensiveCalculation}</p>
                  </div>
              );
          }
          export default App;
        `,
      options: [
        "Displays 'Expensive calculation' once, value does not update",
        "Displays 'Expensive calculation' on every increment",
        "Throws an error due to missing dependency in useMemo",
        "Displays 'Expensive calculation' once, value updates correctly",
      ],
    },
    {
      qnumber: 5,
      question: `
          import React from "react";
          import { BrowserRouter as Router, Route, useParams } from "react-router-dom";
          function Profile() {
              const { id } = useParams();
              return <h1>Profile ID: {id}</h1>;
          }
          function App() {
              return (
                  <Router>
                      <Route path="/profile/:id" component={Profile} />
                  </Router>
              );
          }
          export default App;
        `,
      options: [
        "Displays 'Profile ID: <id>' correctly based on the route",
        "Throws an error due to improper Route usage",
        "Displays 'Profile ID: undefined' always",
        "Throws an error due to missing BrowserRouter",
      ],
    },
    {
      qnumber: 6,
      question: `
          import React, { useState } from "react";
          function App() {
              const [list, setList] = useState([1, 2, 3]);
              const handleClick = () => {
                  setList((prevList) => [...prevList, prevList.length + 1]);
              };
  
              return (
                  <div>
                      <button onClick={handleClick}>Add</button>
                      {list.map((item) => (
                          <p key={item}>{item}</p>
                      ))}
                  </div>
              );
          }
          export default App;
        `,
      options: [
        "Adds new items to the list correctly",
        "Throws a key duplication error",
        "Renders duplicate items on every button click",
        "Throws an error due to improper state update",
      ],
    },
    {
      qnumber: 7,
      question: `
          import React, { useState } from "react";
          function Parent() {
              const [show, setShow] = useState(true);
              return (
                  <>
                      <button onClick={() => setShow((prev) => !prev)}>Toggle</button>
                      {show && <Child />}
                  </>
              );
          }
          function Child() {
              console.log("Child Mounted");
              return <h1>Child Component</h1>;
          }
          export default Parent;
        `,
      options: [
        "Logs 'Child Mounted' each time the component is toggled on",
        "Logs 'Child Mounted' only once",
        "Throws an error when toggling",
        "Displays duplicate Child components",
      ],
    },
    {
      qnumber: 8,
      question: `
          import React, { useRef, useState } from "react";
          function App() {
              const countRef = useRef(0);
              const [state, setState] = useState(0);
  
              const handleClick = () => {
                  countRef.current += 1;
                  setState(countRef.current);
              };
  
              return (
                  <>
                      <button onClick={handleClick}>Update</button>
                      <p>{state}</p>
                  </>
              );
          }
          export default App;
        `,
      options: [
        "Updates the count correctly",
        "Displays an outdated value on button click",
        "Throws an error due to state-ref mismatch",
        "Displays undefined initially",
      ],
    },
    // Questions 9-15 can follow similar complexity levels covering Concurrent Mode, Suspense, Context updates with useReducer, and error handling with custom hooks.
  ];
  