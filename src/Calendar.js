import React, { Component } from "react";
import moment from "moment";

export default class Calendar extends Component {
  render() {
    let myDate = moment(this.props.date);
    //first and last day of current month

    let weekArray = get_weekarray();

    //  let next_mo_days;
    //  let allflat;
    //  let weekArray;
    //  let weekarrays;
    //  let smallweeks = [];
    //  let  newWeekArr;

    function prev_mon_days() {
      const firstdate = moment(myDate).startOf("month");
      // .format("DD-MM-YYYY");
      let day_first = firstdate.day();

      // Sunday - Saturday : 0 - 6
      //trailing days of prev mo, count
      let prev_mo_days = 0;

      if (day_first == 0) {
        prev_mo_days = 6;
      } else {
        prev_mo_days = day_first - 1;
      }

      return prev_mo_days;
    }

    let prev_mo_days = prev_mon_days();
    //
    function next_mon_days() {
      const lastdate = moment(myDate).endOf("month");
      let day_last = lastdate.day();

      let next_mo_days = 0;
      if (day_last != 0) {
        next_mo_days = 7 - day_last;
      }

      return next_mo_days;
    }

    let next_mo_days = next_mon_days();

    //
    function count_all_days() {
      let last_m_days = [];
      for (let i = 0; i > -prev_mo_days; i--) {
        const datei = moment(myDate).date(i).format("DD");
        last_m_days.unshift(parseInt(datei));
      }

      //trailing next month DATES

      let next_m_days = [];
      for (let i = 1; i < next_mo_days + 1; i++) {
        const datei = moment(myDate).add(1, "months").date(i).format("DD");
        next_m_days.push(parseInt(datei));
      }

      //days in our month
      let cur_mo_count = [];
      let cur_mo_days = moment(myDate).daysInMonth();
      console.log(cur_mo_days);
      for (let i = 1; i <= cur_mo_days; i++) {
        cur_mo_count.push(i);
      }

      // console.log("last prev" + date0.format("YYYY-MM-DD"));

      // let last_mo_name = moment(last_mo+1, 'M').format('MMMM');

      let alldays = [...last_m_days, cur_mo_count, next_m_days];
      let allflat = alldays.flat(1);

      return allflat;
    }

    let allflat = count_all_days();

    //
    function get_weekarray() {
      let arr = moment.weekdays();
      var shifted = arr.shift();
      arr.push(shifted);

      return arr;
    }

    //

    function get_weekarrays() {
      let weekarrays = [],
        size = 7;

      while (allflat.length > 0) weekarrays.push(allflat.splice(0, size));

      return weekarrays;
    }

    let weekarrays = get_weekarrays();
    //

    function get_small_weeks() {
      let smallweeks = [];
      let firstweek = weekarrays[0];
      let prevmondays = firstweek.splice(0, prev_mo_days);

      smallweeks.push(prevmondays);
      smallweeks.push(firstweek);

      let threemoreweeks = weekarrays.slice(1, weekarrays.length - 1);
      smallweeks.push(threemoreweeks);
      //last week split

      let lastweek = weekarrays[weekarrays.length - 1];
      let nextmondays = [];
      for (let i = 0; i < next_mo_days; i++) {
        let popped = lastweek.pop();
        nextmondays.unshift(popped);
      }
      smallweeks.push(lastweek);
      smallweeks.push(nextmondays);
      return smallweeks;
    }

    //

    function get_newArr() {
      return weekArray.map((item) => {
        return item.slice(0, 3);
      });
    }

    let smallweeks = get_small_weeks();

    let newWeekArr = get_newArr();

    return (
      <div class="ui-datepicker">
        <div class="ui-datepicker-material-header">
          <div class="ui-datepicker-material-day">
            {weekArray[this.props.date.getDay() - 1]}
          </div>
          <div class="ui-datepicker-material-date">
            <div class="ui-datepicker-material-day-num">
              {moment(myDate).format("DD")}
            </div>
            <div class="ui-datepicker-material-month">
              {moment(myDate).format("MMM")}
            </div>
            <div class="ui-datepicker-material-year">
              {this.props.date.getFullYear()}
            </div>
          </div>
        </div>
        <div class="ui-datepicker-header">
          <div class="ui-datepicker-title">
            <span class="ui-datepicker-month">
              {moment(myDate).format("MMMM")}
            </span>
            &nbsp;
            <span class="ui-datepicker-year">
              {this.props.date.getFullYear()}
            </span>
          </div>
        </div>
        <table class="ui-datepicker-calendar">
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
            <col className="ui-datepicker-week-end" />
            <col className="ui-datepicker-week-end" />
          </colgroup>
          <thead>
            <tr>
              {newWeekArr.map((item, i) => (
                <th key={i} scope="col" title="item">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {smallweeks[0].map((item, i) => (
                <td key={i} className="ui-datepicker-other-month">
                  {item}
                </td>
              ))}
              {smallweeks[1].map((item, i) => (
                <td
                  key={i}
                  className={
                    item == +moment(myDate).format("DD")
                      ? "ui-datepicker-today"
                      : ""
                  }
                >
                  {item}
                </td>
              ))}
            </tr>
            {smallweeks[2].map((item, i) => (
              <tr key={i}>
                {item.map((subitem, i) => (
                  <td
                    key={i}
                    className={
                      subitem == +moment(myDate).format("DD")
                        ? "ui-datepicker-today"
                        : ""
                    }
                  >
                    {subitem}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              {smallweeks[3].map((item, i) => (
                <td
                  key={i}
                  className={
                    item == +moment(myDate).format("DD")
                      ? "ui-datepicker-today"
                      : ""
                  }
                >
                  {item}
                </td>
              ))}
              {smallweeks[4].map((item, i) => (
                <td key={i} className="ui-datepicker-other-month">
                  {item}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
