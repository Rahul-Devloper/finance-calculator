import readline from 'readline'
import calculator from './calculator.js'
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.question(
  'What do you want to calculate? (emi / si / ci / roi / sip / mortgage / currency/ dfp): ',
  (choice) => {
    switch (choice.toLowerCase()) {
      case 'emi':
        rl.question(
          'Enter principal, rate, tenure (comma-separated): ',
          (input) => {
            const [p, r, t] = input.split(',').map(Number)
            const emi = calculator.calculateEMI(p, r, t)
            console.log(`Your EMI is: ₹${emi}`)
            rl.close()
          }
        )
        break

      case 'si':
        rl.question(
          'Enter principal, rate, time (comma-separated): ',
          (input) => {
            const [p, r, t] = input.split(',').map(Number)
            const si = calculator.calculateSimpleInterest(p, r, t)
            console.log(`Your Simple Interest is: ₹${si}`)
            rl.close()
          }
        )
        break

      case 'ci':
        rl.question(
          'Enter principal, rate, time, frequency (comma-separated): ',
          (input) => {
            const [p, r, t, f] = input.split(',').map(Number)
            const ci = calculator.calculateCompoundInterest(p, r, t, f)
            console.log(`Your Compound Interest is: ₹${ci}`)
            rl.close()
          }
        )
        break

      case 'roi':
        rl.question('Enter gain and cost (comma-separated): ', (input) => {
          const [gain, cost] = input.split(',').map(Number)
          const roi = calculator.calculateROI(gain, cost)
          console.log(`Your ROI is: ${roi}%`)
          rl.close()
        })
        break

      case 'sip':
        rl.question(
          'Enter monthly investment, annual rate, years (comma-separated): ',
          (input) => {
            const [mi, rate, years] = input.split(',').map(Number)
            const fv = calculator.calculateSIP(mi, rate, years)
            console.log(`Your SIP future value is: ₹${fv}`)
            rl.close()
          }
        )
        break

      case 'mortgage':
        rl.question(
          'Enter principal, annual rate, years (comma-separated): ',
          (input) => {
            const [p, r, y] = input.split(',').map(Number)
            const payment = calculator.calculateMortgage(p, r, y)
            console.log(`Your monthly mortgage payment is: ₹${payment}`)
            rl.close()
          }
        )
        break

      case 'currency':
        rl.question('Enter amount and rate (comma-separated): ', (input) => {
          const [amount, rate] = input.split(',').map(Number)
          const converted = calculator.convertCurrency(amount, rate)
          console.log(`Converted amount: ₹${converted}`)
          rl.close()
        })
        break

      case 'dfp':
        rl.question(
          'Enter total debt, monthly payment, annual interest rate (comma-separated): ',
          (input) => {
            const [debt, payment, rate] = input.split(',').map(Number)
            const result = calculator.calculateDebtFreePlan(debt, payment, rate)
            console.log(result)
            rl.close()
          }
        )
        break

      default:
        rl.close()
    }
  }
)
