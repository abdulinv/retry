export const ReactTest3 = [
    {
      qnumber: 1,
      question: `
          import React, { useContext, createContext } from "react";
          const UserContext = createContext();
          function App() {
              return (
                  <UserContext.Provider value="John">
                      <Child />
                  </UserContext.Provider>
              );
          }
          function Child() {
              const name = useContext(UserContext);
              return <h1>{name}</h1>;
          }
          export default App;
        `,
      options: [
        "Displays 'John'",
        "Throws an error due to missing context",
        "Displays 'undefined'",
        "Displays 'null'",
      ],
    },
    {
      qnumber: 2,
      question: `
          import React from "react";
          class ErrorBoundary extends React.Component {
              constructor(props) {
                  super(props);
                  this.state = { hasError: false };
              }
              static getDerivedStateFromError(error) {
                  return { hasError: true };
              }
              componentDidCatch(error, errorInfo) {
                  console.error("Error caught:", error, errorInfo);
              }
              render() {
                  if (this.state.hasError) {
                      return <h1>Something went wrong.</h1>;
                  }
                  return this.props.children;
              }
          }
          function BuggyComponent() {
              throw new Error("Oops!");
          }
          function App() {
              return (
                  <ErrorBoundary>
                      <BuggyComponent />
                  </ErrorBoundary>
              );
          }
          export default App;
        `,
      options: [
        "Displays 'Something went wrong.'",
        "Throws an error and crashes the app",
        "Renders an empty screen",
        "Displays 'Oops!' on the screen",
      ],
    },
    {
      qnumber: 3,
      question: `
          import React, { useState } from "react";
          function Parent() {
              const [value, setValue] = useState("Hello");
              return <Child message={value} />;
          }
          const Child = React.memo(({ message }) => {
              console.log("Child rendered");
              return <h1>{message}</h1>;
          });
          export default Parent;
        `,
      options: [
        "Child renders only once unless 'value' changes",
        "Child renders on every parent render",
        "Child never renders",
        "Throws an error due to improper React.memo usage",
      ],
    },
    {
      qnumber: 4,
      question: `
          import React, { Suspense } from "react";
          const LazyComponent = React.lazy(() => import("./LazyComponent"));
          function App() {
              return (
                  <Suspense fallback={<div>Loading...</div>}>
                      <LazyComponent />
                  </Suspense>
              );
          }
          export default App;
        `,
      options: [
        "Displays 'Loading...' until LazyComponent is loaded",
        "Throws an error due to missing Suspense",
        "Renders LazyComponent immediately",
        "Displays 'null' while loading",
      ],
    },
    {
      qnumber: 5,
      question: `
          import React, { forwardRef, useRef } from "react";
          const Input = forwardRef((props, ref) => <input ref={ref} {...props} />);
          function App() {
              const inputRef = useRef();
              return (
                  <>
                      <Input ref={inputRef} />
                      <button onClick={() => inputRef.current.focus()}>Focus</button>
                  </>
              );
          }
          export default App;
        `,
      options: [
        "Focuses the input field on button click",
        "Throws an error because refs cannot be forwarded",
        "Renders without the button functionality",
        "Displays a warning about the forwarded ref",
      ],
    },
    {
      qnumber: 6,
      question: `
          import React from "react";
          function withLogging(WrappedComponent) {
              return function LoggingComponent(props) {
                  console.log("Rendering:", WrappedComponent.name);
                  return <WrappedComponent {...props} />;
              };
          }
          function Hello() {
              return <h1>Hello, world!</h1>;
          }
          const EnhancedHello = withLogging(Hello);
          function App() {
              return <EnhancedHello />;
          }
          export default App;
        `,
      options: [
        "Logs 'Rendering: Hello' and displays 'Hello, world!'",
        "Throws an error because HOCs are deprecated",
        "Displays 'Hello, world!' without logging",
        "Logs 'Rendering: App' instead of 'Hello'",
      ],
    },
    {
      qnumber: 7,
      question: `
          import React, { useReducer } from "react";
          function reducer(state, action) {
              if (action.type === "increment") return state + 1;
              if (action.type === "decrement") return state - 1;
              return state;
          }
          function App() {
              const [count, dispatch] = useReducer(reducer, 0);
              return (
                  <>
                      <button 
                        onClick={
                        () => dispatch({ type: "increment" })}>+</button>
                      <button 
                        onClick={
                        () => dispatch({ type: "decrement" })}>-</button>
                      <h1>{count}</h1>
                  </>
              );
          }
          export default App;
        `,
      options: [
        "Increments and decrements the count correctly",
        "Throws an error due to missing initial state",
        "Logs an error without rendering buttons",
        "Displays 'undefined' initially",
      ],
    },
    {
      qnumber: 8,
      question: `
          import React, { useState, useEffect } from "react";
          function App() {
              const [width, setWidth] = useState(window.innerWidth);
              useEffect(() => {
                  const handleResize = () => setWidth(window.innerWidth);
                  window.addEventListener("resize", handleResize);
                  return () => window.removeEventListener("resize", handleResize);
              }, []);
              return <h1>{width}</h1>;
          }
          export default App;
        `,
      options: [
        "Updates the width on window resize",
        "Throws an error due to missing dependencies",
        "Displays the initial width without updates",
        "Logs an error when resizing the window",
      ],
    },
    {
      qnumber: 9,
      question: `
          import React from "react";
          import { BrowserRouter as Router, Route, Link } from "react-router-dom";
          function App() {
              return (
                  <Router>
                      <Link to="/about">About</Link>
                      <Route path="/about" component={() => <h1>About Page</h1>} />
                  </Router>
              );
          }
          export default App;
        `,
      options: [
        "Navigates to 'About Page' on clicking the link",
        "Throws an error due to incorrect Route usage",
        "Displays 'undefined' instead of the About Page",
        "Throws an error because Router is not imported",
      ],
    },
    // Additional questions focusing on advanced topics like React Profiler, concurrent mode, and custom hooks can be added similarly.
  ];
  