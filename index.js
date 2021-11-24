/* Your Code Here */
function createEmployeeRecord(employeeInfo) {
    return {
        firstName: employeeInfo[0],
        familyName: employeeInfo[1],
        title: employeeInfo[2],
        payPerHour: employeeInfo[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

function createEmployeeRecords(employeeListArray) {
    return employeeListArray.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(dateStamp) { //"YYYY-MM-DD HHMM"
    let [date, hour] = dateStamp.split(' ')
    this.timeInEvents.push(
        {
            type: "TimeIn",
            hour: parseInt(hour, 10),
            date: date,
        }
    )
    return this
}

function createTimeOutEvent(dateStamp) { //"YYYY-MM-DD HHMM"
    let [date, hour] = dateStamp.split(' ')
    this.timeOutEvents.push(
        {
            type: "TimeOut",
            hour: parseInt(hour, 10),
            date: date,
        }
    )
    return this
}

function hoursWorkedOnDate(dateStamp) {
    let clockIn = this.timeInEvents.find(({ date }) => date === dateStamp)
    let clockOut = this.timeOutEvents.find(({ date }) => date === dateStamp)
    return (clockOut.hour - clockIn.hour) / 100
}

function wagesEarnedOnDate(dateStamp) {
    let hours = hoursWorkedOnDate.call(this, dateStamp)
    return hours * this.payPerHour
}

function findEmployeeByFirstName(srcArray, firstName) {
    let result = srcArray.find(employee => employee.firstName === firstName)
    return result
}

function calculatePayroll(employeeList) {
    let total = employeeList.reduce((accumulator, employee) => {
        return accumulator + allWagesFor.call(employee)
    }, 0)
    return total
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

