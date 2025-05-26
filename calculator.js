// fs
// import fs from "fs";
const fs = require("fs");

// EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
function calculateEMI(principal, annualRate, tenureYears) {
    const monthlyRate = annualRate / 12 / 100;
    const tenureMonths = tenureYears * 12;
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
      (Math.pow(1 + monthlyRate, tenureMonths) - 1);
    return emi.toFixed(2);
  }
  
  // Compound Interest = P * (1 + r/n)^(nt)
  function calculateCompoundInterest(principal, rate, time, frequency = 1) {
    const amount =
      principal * Math.pow(1 + rate / (100 * frequency), frequency * time);
    return (amount - principal).toFixed(2);
  }
  
  function calculateSimpleInterest(principal, rate, time) {
    const interest = (principal * rate * time) / 100;
    return interest.toFixed(2);
  }
  function calculateROI(gain, cost) {
    const roi = ((gain - cost) / cost) * 100;
    return roi.toFixed(2);
  }
  function calculateSIP(monthlyInvestment, annualRate, years) {
    const r = annualRate / 12 / 100;
    const n = years * 12;
    const fv = (monthlyInvestment * ((Math.pow(1 + r, n) - 1) * (1 + r))) / r;
    return fv.toFixed(2);
  }
  
  function calculateMortgage(principal, annualRate, years) {
    const monthlyRate = annualRate / 12 / 100;
    const months = years * 12;
    const payment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
    return payment.toFixed(2);
  }
  function convertCurrency(amount, rate) {
    return (amount * rate).toFixed(2);
  }

  function calculateDebtFreePlan(totalDebt, monthlyPayment, annualInterestRate) {
    const monthlyRate = annualInterestRate / 12 / 100;
    let balance = totalDebt;
    let months = 0;
    let totalInterest = 0;

    const rows = [["Month", "Balance", "Interest", "Principal"]];
  
    while (balance > 0 && months < 600) { // safeguard for infinite loops
      const interest = balance * monthlyRate;
      const principal = monthlyPayment - interest;
  
      if (principal <= 0) {
        throw new Error("Monthly payment too low to cover interest. Debt cannot be paid off.");
      }
  
      balance -= principal;
      totalInterest += interest;
      months++;
      rows.push([
        months,
        balance.toFixed(2),
        interest.toFixed(2),
        principal.toFixed(2),
      ]);
    //   console.log({
    //     month: months,
    //     balance: balance.toFixed(2),
    //     interest: interest.toFixed(2),
    //     principal: principal.toFixed(2)
    //   })
    }
  
    const csvContent = rows.map(row => row.join(",")).join("\n");
  fs.writeFileSync("debt_schedule.csv", csvContent);
    const today = new Date();
    const debtFreeDate = new Date(today.setMonth(today.getMonth() + months));
  
    return {
      monthsToPayOff: months,
      debtFreeDate: debtFreeDate.toDateString(),
      totalInterestPaid: totalInterest.toFixed(2),
      csvFile : "debt_schedule.csv"
    };
  }
  
  
  module.exports = {
    calculateEMI,
    calculateCompoundInterest,
    calculateSimpleInterest,
    calculateROI,
    calculateSIP,
    calculateMortgage,
    convertCurrency,
    calculateDebtFreePlan,
  };
  