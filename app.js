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
let isOperator = /[+*-\/]+/;
let moreOp = /[+*-\/]{2,}/;

function Digit(props) {
  
  // This is the component to render each digits!
  
  return (
    <button onClick={props.input} className="number" id={props.id}>
      <p>{props.digit}</p>
    </button>
  );
}

function Operator(props) {
  
  //This is a component to render the operators
  return (
    <button onClick={props.op} className="operator" id={props.name}>
      {props.sign}
    </button>
  );
}

function Love() {
 
  // A state that take care of the input displayed on the calculator
  const [display, setDisplay] = React.useState(0);
 
     React.useEffect(() => {
    console.log("Input changed to: " + display);
  },);
  
 
  
  

  function input(d) {
    
    /// A function that update the input
    if (display === 0 || display === "0") {
      //If the input is zero replay it with the inputed number
      setDisplay(d);
    } 
    
    else if(display.toString()[0]!== 0 || display.toString()[0]!== "0") {
      setDisplay((prev) => {
        let result = prev.toString()

        if(result[result.length - 1].match(/[0-9|.]+/))
          
          // If the input number is a digit or "." 
          {
            console.log(result.[result.length-1] + "hey")
            return (result !== 0 || result !== "0") && `${result}${d}`
          }
        
        else{
          
          // Add a space if the input is not a digit
        return (result !== 0 || result !== "0") && `${result} ${d}`;
        }})
    }
  }
  function clear() {
    //A  function to clear the display and return it to zero
    setDisplay(0);
  }

  function handleOp(e) {
    
    // A function that handles the operators
    
      /// First check if the input has already operators
    if (/[+*-\/]/g.test(display)) {
      let res = display.toString()
      
        if(isOperator.test(res[res.length - 1]))
          {
            
            setDisplay(prev => {
              
              let good = [...prev]
            
              // Check if the input operator is not minus
              if(!e.match(/-/)){
                // Check if there is already an operator before minus, removes it.
                if(good[good.length - 2].match(isOperator))
                  {

                    good = good.slice(0,good.length - 1)
                  }
                
                good[good.length - 1] = e
              }
              
              
              else if(e.match(/[-]+/)){
                
                // If the operator is minus, add it to the input without removing the previous operator
              good.push(e)
              }

              good = good.join("")   
              return good
            })

            
          }
        else{
          setDisplay(prev => {
          
          return prev + " " + e
        })
        }
      }
      else{
        setDisplay(prev => {
          
          return prev + " " + e
        })
      }
  }

  function handleResult() {
    
    // A function that displays the result
    setDisplay((prev) => {
      
      if(prev.toString()[0] === 0 || prev.toString()[0] === "0")
        {
          console.log("first number is " +[...prev])
          prev = prev.toString().substring(1,prev.length)
          console.log(prev)
        }
      return eval(prev);
    });
  }



  function virgule(x) {
    
    // A function to add the comma
    let e = [];
    let t = x.toLocaleString().split(" ");
    if (!t[t.length - 1].includes(".")) {
      return x.toString() + "."
    } 
    else if (t[t.length - 1].includes(".")) {
      //x = x.join("").split(" ");
      
      return x.toLocaleString()
      
    }
  }

  function decimal() {
    
    // A function to proceed with decimal operation
    setDisplay((prev) => {
        return virgule(prev);
        /*console.log("prev" + [...prev]);
         */
    });
  }

  const NumberElements = NUMBERS.map((item) => (
    <Digit input={() => input(item.d)} id={item.c} digit={item.d} />
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
            .
          </button>
          <button className="number" onClick={clear} id="clear">
            AC
          </button>
        </div>
        <div className="operator-container">
          <Operator op={()=>handleOp("+")} sign="+" name="add" />
          <Operator op={()=>handleOp("-")} sign="-" name="subtract" />
          <Operator op={()=>handleOp("*")} sign="*" name="multiply" />
          <Operator op={()=>handleOp("/")} sign="/" name="divide" />
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
