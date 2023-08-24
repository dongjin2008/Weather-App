let x = "3023-08-25"
const y = new Date(x)
const z = y.getDay()
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
console.log(dayNames[z])
