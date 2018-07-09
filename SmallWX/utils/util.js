const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function weekDay() {
  var weekDay;
  var week = new Date().getDay()
  console.log(week)
  switch (week) {
    case 0: 
      weekDay = '星期日'
      break;
    case 1:
      weekDay = '星期一'
      break;
    case 2:
      weekDay = '星期二'
      break;
    case 3:
      weekDay = '星期三'
      break;
    case 4:
      weekDay = '星期四'
      break;
    case 5:
      weekDay = '星期五'
      break;
    case 6:
      weekDay = '星期六'
      break;
  }
  return weekDay;
}

module.exports = {
  formatTime,
  weekDay
}
