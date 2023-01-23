const NUMBERS = [
  { d: 0, c: "zero" },
  { d: 1, c: "one" },
  { d: 2, c: "two" },
  { d: 3, c: "three" },
  { d: 4, c: "four" },
  { d: 5, c: "five" },
  { d: 6, c: "six" },
  { d: 7, c: "seven" },
  { d: 8, c: "eight" },
  { d: 9, c: "nine" }
];
let endsWithOperator = /[+*-\/]$/;
let opp = /\s[(+\*-\/|$]\s*/;
let isOperator = /[+*-\/]/;
function B(props) {
  return (
    <button onClick={props.input} className="number" id={props.id}>
      <p>{props.digit}</p>
    </button>
  );
}

function O(props) {
  return (
    <button onClick={props.op} className="operator" id={props.name}>
      <p>{props.sign}</p>
    </button>
  );
}

function Love() {
  const [display, setDisplay] = React.useState(0);

  function input(d) {
    if (display === 0) {
      setDisplay(d);
    } else {
      setDisplay((prev) => `${prev}${d}`);
    }
  }
  function clear() {
    setDisplay(0);
  }

  function handleOp(e) {
    const operator = e.target.textContent;
    setDisplay(() => {
      if (/[+*-\/]/g.test(display)) {
        let fe = display.split(" ");
        let x = fe[fe.length - 1];

        if (x === "+" || x === "-" || x === "/" || x === "*") {
          x = operator;
          fe = fe.split("");
          fe[fe.length - 1] = x;
          console.log(fe);
          return fe.join("");
        } else {
          return fe.join("") + " " + operator + " ";
        }
      } else {
        let fe = display.toString();
        let x = fe[fe.length - 1];

        console.log("val" + x);
        if (x === "+" || x === "-" || x === "/" || x === "*") {
          x = operator;
          fe = fe.split("");
          fe[fe.length - 1] = x;
          console.log(fe);
          return fe.join("");
        } else {
          return fe + " " + operator + " ";
        }
      }
    });
  }

  function handleResult() {
    setDisplay((prev) => {
      let r = prev;
      return eval(prev);
    });
  }

  React.useEffect(() => {
    //console.log(display);
  }, [display]);

  function virgule(x) {
    let e = [];
    let t = x.split(" ");
    if (!t[t.length - 1].includes(".")) {
      e = Array.from(x);
      e.push(".");

      return e.join("");
    } else if (x.toString().includes(".") || x.toString().includes(opp)) {
      x = x.join("").split(" ");
      if (!x[x.length - 1].includes(".")) {
        x[x.length - 1] = x[x.length - 1] + ".";
      }
      console.log(x);
      return [...x].join(" ");
    }
  }

  function decimal() {
    setDisplay((prev) => {
      if (endsWithOperator.test(prev) === true) {
        let re = prev.split(isOperator);
        let number = [...prev];
        let t = [];
        let st = [];

        console.log("Lol" + t);
        //let div = prev.split(/\d+/g)
        re[re.length - 1] = virgule(re[re.length - 1]);
        return re.join("");
      } else {
        return virgule([...prev.toString()]);
        /*console.log("prev" + [...prev]);
         */
      }
    });
  }

  const NumberElements = NUMBERS.map((item) => (
    <B input={() => input(item.d)} id={item.c} digit={item.d} />
  ));
  return (
    <div className="container">
      <div className="display-container">
        <p id="display">{display}</p>
        <p>{display}</p>
      </div>
      <div className="pad">
        <div className="number-container">
          {NumberElements}

          <button onClick={decimal} className="number" id="decimal">
            DEC
          </button>
          <button className="number" onClick={clear} id="clear">
            AC
          </button>
        </div>
        <div className="operator-container">
          <O op={handleOp} sign="+" name="add" />
          <O op={handleOp} sign="-" name="subtract" />
          <O op={handleOp} sign="*" name="multiply" />
          <O op={handleOp} sign="/" name="divide" />
          <button onClick={handleResult} id="equals">
            =
          </button>
        </div>
      </div>
    </div>
  );
}
function App() {
  return (
    <div className="app">
      <Love />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
const element = <App />;

root.render(element);
