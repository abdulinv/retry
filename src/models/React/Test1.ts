export const ReactTest1 = [
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
      answer: "Render: 1",
    },
    {
      qnumber: 2,
      question: `
        import React, { useState } from "react";
        function Counter() {
            const [count, setCount] = useState(0);
            return (
                <button 
                 onClick={() => setCount(count)}>Count: {count}</button>
            );
        }
        export default Counter;
      `,
      options: [
        "The count value remains 0 on button click.",
        "The count value increments by 1 on each click.",
        "React throws an error.",
        "The count value doubles on each click.",
      ],
      answer: "The count value remains 0 on button click.",
    },
    {
      qnumber: 3,
      question: `
        import React, { useEffect } from "react";
        function App() {
            useEffect(() => {
                console.log("Effect runs");
            }, []);
            return <h1>Hello, World!</h1>;
        }
        export default App;
      `,
      options: [
        "Effect runs every time the component renders.",
        "Effect runs only once after the initial render.",
        "Effect runs every time the component re-renders.",
        "Effect never runs.",
      ],
      answer: "Effect runs only once after the initial render.",
    },
    {
      qnumber: 4,
      question: `
        import React, { useState } from "react";
        function App() {
            const [items, setItems] = useState([1, 2, 3]);
            const addItem = () => {
                setItems([4, ...items]);
            };
            console.log(items);
            return <button onClick={addItem}>Add Item</button>;
        }
        export default App;
      `,
      options: [
        "[1, 2, 3, 4]",
        "[4, 1, 2, 3]",
        "[1, 2, 3, 4, 4]",
        "React Error: Too many re-renders.",
      ],
      answer: "[4, 1, 2, 3]",
    },
    {
      qnumber: 5,
      question: `
        import React, { useState } from "react";
        function App() {
            const [text, setText] = useState("");
            return (
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            );
        }
        export default App;
      `,
      options: [
        "The input is read-only.",
        "The input updates as you type.",
        "React throws an error.",
        "The input only updates when it loses focus.",
      ],
      answer: "The input updates as you type.",
    },
    {
      qnumber: 6,
      question: `
        import React, { useEffect } from "react";
        function App() {
            useEffect(() => {
                console.log("Effect runs");
                return () => console.log("Cleanup runs");
            });
            return <h1>Hello, World!</h1>;
        }
        export default App;
      `,
      options: [
        "Effect and cleanup run on every render.",
        "Effect runs once; cleanup never runs.",
        "Effect runs on mount; cleanup runs on unmount.",
        "Effect never runs.",
      ],
      answer: "Effect and cleanup run on every render.",
    },
    {
      qnumber: 7,
      question: `
        import React, { useRef, useEffect } from "react";
        function App() {
            const ref = useRef(0);
            useEffect(() => {
                ref.current += 1;
            });
            console.log(ref.current);
            return <h1>Check Console</h1>;
        }
        export default App;
      `,
      options: [
        "Logs: 0",
        "Logs: 1",
        "Logs: 1, 2, 3... on every render",
        "React throws an error.",
      ],
      answer: "Logs: 1, 2, 3... on every render",
    },
    {
      qnumber: 8,
      question: `
        import React, { useState } from "react";
        function App() {
            const [count, setCount] = useState(5);
            const increment = () => setCount((prev) => prev + 1);
            const decrement = () => setCount((prev) => prev - 1);
            return (
                <>
                    <button onClick={increment}>+</button>
                    <button onClick={decrement}>-</button>
                    <p>Count: {count}</p>
                </>
            );
        }
        export default App;
      `,
      options: [
        "Count starts from 0 and updates correctly.",
        "Count starts from 5 and updates correctly.",
        "Count does not update on button clicks.",
        "React throws an error.",
      ],
      answer: "Count starts from 5 and updates correctly.",
    },
    {
      qnumber: 9,
      question: `
        import React, { useState, useEffect } from "react";
        function App() {
            const [flag, setFlag] = useState(false);
            useEffect(() => {
                setFlag((prev) => !prev);
            }, [flag]);
            console.log(flag);
            return <h1>Flag: {flag.toString()}</h1>;
        }
        export default App;
      `,
      options: [
        "Flag alternates between true and false correctly.",
        "React Error: Too many re-renders.",
        "Flag is always true.",
        "Flag is always false.",
      ],
      answer: "React Error: Too many re-renders.",
    },
    {
      qnumber: 10,
      question: `
        import React, { useState } from "react";
        function App() {
            const [count, setCount] = useState(0);
            return (
                <button onClick={() => setCount(count + 1)}>
                    Count: {count}
                </button>
            );
        }
        export default App;
      `,
      options: [
        "Count increments correctly.",
        "Count does not increment.",
        "React throws an error.",
        "Count decrements instead of incrementing.",
      ],
      answer: "Count increments correctly.",
    },
  ];
  