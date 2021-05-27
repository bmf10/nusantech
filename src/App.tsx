import "./App.css";
import { ChangeEvent, FC, useState } from "react";

interface Value {
  readonly number: Array<number>;
  readonly check: Array<boolean>;
}

const initialValue: Value = {
  number: [0, 0, 0],
  check: [true, true, true],
};

const App: FC = () => {
  const [result, setResult] = useState<number | string>();
  const [value, setValue] = useState<Value>(initialValue);

  const onChangeNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const number: Array<number> = value.number;
    number[parseInt(e.target.name)] = parseInt(e.target.value);
    setValue({ ...value, number });
  };

  const onChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const check: Array<boolean> = value.check;
    check[parseInt(e.target.name)] = e.target.checked;
    setValue({ ...value, check });
  };

  const submit = (accumulator: "/" | "*" | "+" | "-") => {
    const { number, check } = value;
    const active = check.filter((v) => v === true);

    if (active.length >= 2) {
      const firstActiveIndex = check.findIndex((v) => v === true);
      const res: number = number.reduce((prev, curr, index) => {
        if (index === firstActiveIndex) return prev;

        switch (accumulator) {
          case "+":
            if (check[index] === true) return prev + curr;
            return prev;
          case "-":
            if (check[index] === true) return prev - curr;
            return prev;
          case "*":
            if (check[index] === true) return prev * curr;
            return prev;
          case "/":
            if (check[index] === true) return prev / curr;
            return prev;
          default:
            return prev;
        }
      }, number[firstActiveIndex] as number);

      setResult(res);
    } else {
      setResult("Error");
    }
  };

  return (
    <div className="container">
      <div className="box">
        <div className="row">
          <input
            defaultValue="0"
            onChange={onChangeNumber}
            name="0"
            className="input-number"
            type="number"
          />
          <input
            defaultChecked
            name="0"
            type="checkbox"
            onChange={onChangeCheckbox}
          />
        </div>
        <div className="row">
          <input
            defaultValue="0"
            onChange={onChangeNumber}
            name="1"
            className="input-number"
            type="number"
          />
          <input
            defaultChecked
            name="1"
            type="checkbox"
            onChange={onChangeCheckbox}
          />
        </div>
        <div className="row">
          <input
            defaultValue="0"
            onChange={onChangeNumber}
            name="2"
            className="input-number"
            type="number"
          />
          <input
            defaultChecked
            name="2"
            type="checkbox"
            onChange={onChangeCheckbox}
          />
        </div>
        <div className="row">
          <button className="button" type="button" onClick={() => submit("+")}>
            +
          </button>
          <button className="button" type="button" onClick={() => submit("-")}>
            -
          </button>
          <button className="button" type="button" onClick={() => submit("/")}>
            /
          </button>
          <button className="button" type="button" onClick={() => submit("*")}>
            *
          </button>
        </div>
        <hr />
        <p>Result: {result}</p>
      </div>
    </div>
  );
};

export default App;
