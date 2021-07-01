var moment = require('moment');

moment.locale('ru');

let today = new Date().toLocaleDateString()

console.log(today)

//first and last day of current month
console.log("current month first date");
    const firstdate = moment().startOf('month');
console.log(firstdate);

console.log("current month last date");
    const lastdate=moment().endOf('month');
    // .format("DD-MM-YYYY"); 
console.log(lastdate);

const day_first = firstdate.day();
const day_last = lastdate.day();
// Sunday - Saturday : 0 - 6

console.log(day_first, day_last);

//trailing days of prev mo, count
let prev_mo_days = 0;
if (day_first != 0) {
    prev_mo_days = day_first-1;
}
console.log(prev_mo_days)

//trailing days of next mo, count
let next_mo_days = 0;
if (day_last != 7) {
    next_mo_days = 7-day_last;
}
console.log(next_mo_days)

//current, next and prev months
var current_mo = moment().month() + 1;
let current_mo_name = moment(current_mo, 'M').format('MMMM');
// ;
let next_mo = moment().add(1, 'months').month();
let next_mo_name = moment(next_mo+1, 'M').format('MMMM');
let last_mo = moment().add(-1, 'months').month();

//trailing last month DATES

let last_m_days = []
for (i=0; i>(-prev_mo_days); i--){
    const datei = moment().date(i).format("DD");
    last_m_days.unshift(parseInt(datei));
}

console.log(last_m_days);

//trailing next month DATES

let next_m_days = []
for (i=1; i<next_mo_days+1; i++){
    const datei = moment().add(1, 'months').date(i).format("DD");
    next_m_days.push(parseInt(datei));
}

console.log(next_m_days);

//days in our month 
let cur_mo_count = []
let cur_mo_days = moment().daysInMonth();
console.log(cur_mo_days)
for (let i = 1; i <= cur_mo_days; i ++) {
    cur_mo_count.push(i);
  }

  console.log("our month" + cur_mo_count)

// console.log("last prev" + date0.format("YYYY-MM-DD"));

// let last_mo_name = moment(last_mo+1, 'M').format('MMMM');



// console.log( current_mo_name, next_mo_name, last_mo_name)


let alldays = [... last_m_days, cur_mo_count, next_m_days];
const allflat = alldays.flat(1)
let alldayslen = allflat.length;
console.log("ALL" + alldayslen)

let num_rows = alldayslen/7;
console.log("rows" +  " " + num_rows)

//our header cells
weekArray = moment.weekdays()


var shifted = weekArray.shift();
weekArray.push(shifted)

console.log(weekArray);

var weekarrays = [], size = 7;
    
while (allflat.length > 0)
  weekarrays.push(allflat.splice(0, size));

console.log(weekarrays);

 let newWeekArr = weekArray.map((item) => {return item.slice(0,3)});
 console.log(newWeekArr);