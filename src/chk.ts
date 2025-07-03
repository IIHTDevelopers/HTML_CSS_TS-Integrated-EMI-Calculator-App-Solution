
(() => {
    const loanAmountInput = globalThis?.document?.getElementById("loanAmount") as HTMLInputElement;
    const interestRateInput = globalThis?.document?.getElementById("interestRate") as HTMLInputElement;
    const loanTenureInput = globalThis?.document?.getElementById("loanTenure") as HTMLInputElement;
    const calculateButton = globalThis?.document?.getElementById("calculateBtn") as HTMLButtonElement;
    const resultDiv = globalThis?.document?.getElementById("result") as HTMLDivElement;
  
    function calculateEMI(principal: number, rate: number, time: number): number {
      const monthlyRate = rate / (12 * 100);
      return (principal * monthlyRate * Math.pow(1 + monthlyRate, time)) /
             (Math.pow(1 + monthlyRate, time) - 1);
    }
  
    function displayEMI() {
      if (!loanAmountInput || !interestRateInput || !loanTenureInput || !resultDiv) return;
  
      const principal = parseFloat(loanAmountInput.value);
      const rate = parseFloat(interestRateInput.value);
      const time = parseFloat(loanTenureInput.value);
  
      if (isNaN(principal) || isNaN(rate) || isNaN(time)) {
        resultDiv.innerText = "Please enter valid inputs.";
        return;
      }
  
      const emi = calculateEMI(principal, rate, time);
      resultDiv.innerText = `EMI: ₹{emi.toFixed(2)}`;
    }
  
    if (calculateButton) {
      calculateButton.addEventListener("click", displayEMI);
    }
  
    // Expose for testing
    (globalThis as any).calculateEMI = calculateEMI;
    (globalThis as any).displayEMI = displayEMI;
  })();
  