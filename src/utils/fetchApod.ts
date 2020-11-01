function formatDate(date:string) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}


export const fetchApod = async (day: string = '') => {
let date = "";
if(day !== ""){
 date = `&date=${formatDate(day)}`
 console.log("date", date)
}
  return fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_API_KEY}${date}`,{
      
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }
  )
}