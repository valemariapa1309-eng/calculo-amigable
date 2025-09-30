import { useState } from "react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay("0.");
      setNewNumber(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleOperation = (op: string) => {
    const currentValue = parseFloat(display);
    
    if (previousValue !== null && operation && !newNumber) {
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    } else {
      setPreviousValue(currentValue);
    }
    
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (prev: number, current: number, op: string): number => {
    switch (op) {
      case "+":
        return prev + current;
      case "-":
        return prev - current;
      case "×":
        return prev * current;
      case "÷":
        return current !== 0 ? prev / current : 0;
      default:
        return current;
    }
  };

  const handleEquals = () => {
    if (previousValue !== null && operation) {
      const currentValue = parseFloat(display);
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleBackspace = () => {
    if (display.length === 1) {
      setDisplay("0");
      setNewNumber(true);
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const handlePercentage = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
    setNewNumber(true);
  };

  const handleToggleSign = () => {
    const value = parseFloat(display);
    setDisplay(String(value * -1));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[hsl(280,60%,20%)] to-[hsl(320,70%,25%)]">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-8 text-foreground">
          Calculadora Magica Rosada
        </h1>
        
        <div 
          className="backdrop-blur-xl bg-[var(--glass-bg)] p-6 rounded-3xl border border-white/10"
          style={{ boxShadow: "var(--shadow-glow)" }}
        >
          {/* Display */}
          <div className="bg-[hsl(var(--calc-display))] rounded-2xl p-6 mb-6 min-h-[100px] flex items-center justify-end">
            <div className="text-[hsl(var(--calc-display-text))] text-5xl font-light tracking-wider break-all text-right">
              {display}
            </div>
          </div>

          {/* Buttons Grid */}
          <div className="grid grid-cols-4 gap-3">
            {/* Row 1 */}
            <CalcButton onClick={handleClear} variant="special">
              C
            </CalcButton>
            <CalcButton onClick={handleToggleSign} variant="special">
              +/-
            </CalcButton>
            <CalcButton onClick={handlePercentage} variant="special">
              %
            </CalcButton>
            <CalcButton onClick={() => handleOperation("÷")} variant="operator">
              ÷
            </CalcButton>

            {/* Row 2 */}
            <CalcButton onClick={() => handleNumber("7")} variant="number">
              7
            </CalcButton>
            <CalcButton onClick={() => handleNumber("8")} variant="number">
              8
            </CalcButton>
            <CalcButton onClick={() => handleNumber("9")} variant="number">
              9
            </CalcButton>
            <CalcButton onClick={() => handleOperation("×")} variant="operator">
              ×
            </CalcButton>

            {/* Row 3 */}
            <CalcButton onClick={() => handleNumber("4")} variant="number">
              4
            </CalcButton>
            <CalcButton onClick={() => handleNumber("5")} variant="number">
              5
            </CalcButton>
            <CalcButton onClick={() => handleNumber("6")} variant="number">
              6
            </CalcButton>
            <CalcButton onClick={() => handleOperation("-")} variant="operator">
              -
            </CalcButton>

            {/* Row 4 */}
            <CalcButton onClick={() => handleNumber("1")} variant="number">
              1
            </CalcButton>
            <CalcButton onClick={() => handleNumber("2")} variant="number">
              2
            </CalcButton>
            <CalcButton onClick={() => handleNumber("3")} variant="number">
              3
            </CalcButton>
            <CalcButton onClick={() => handleOperation("+")} variant="operator">
              +
            </CalcButton>

            {/* Row 5 */}
            <CalcButton onClick={handleBackspace} variant="number" className="col-span-1">
              ←
            </CalcButton>
            <CalcButton onClick={() => handleNumber("0")} variant="number">
              0
            </CalcButton>
            <CalcButton onClick={handleDecimal} variant="number">
              .
            </CalcButton>
            <CalcButton onClick={handleEquals} variant="equals">
              =
            </CalcButton>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CalcButtonProps {
  onClick: () => void;
  variant: "number" | "operator" | "special" | "equals";
  children: React.ReactNode;
  className?: string;
}

const CalcButton = ({ onClick, variant, children, className = "" }: CalcButtonProps) => {
  const variants = {
    number: "bg-[hsl(var(--calc-number-btn))] text-[hsl(var(--calc-number-text))] hover:bg-[hsl(var(--calc-number-btn))]/80",
    operator: "bg-[hsl(var(--calc-operator-btn))] text-[hsl(var(--calc-operator-text))] hover:bg-[hsl(var(--calc-operator-btn))]/80",
    special: "bg-[hsl(var(--calc-special-btn))] text-[hsl(var(--calc-special-text))] hover:bg-[hsl(var(--calc-special-btn))]/80",
    equals: "bg-[hsl(var(--calc-equals-btn))] text-[hsl(var(--calc-special-text))] hover:bg-[hsl(var(--calc-equals-btn))]/80",
  };

  return (
    <Button
      onClick={onClick}
      className={`h-16 text-2xl font-medium rounded-xl transition-all duration-200 active:scale-95 border-0 ${variants[variant]} ${className}`}
      style={{ boxShadow: "var(--shadow-btn)" }}
    >
      {children}
    </Button>
  );
};

export default Index;
