const button=document.getElementById("button");
const form=document.querySelector("form");
const body=document.querySelector("body");
//button.addEventListener("click",);
button.addEventListener("click",api);
form.addEventListener("submit",persistance);
window.addEventListener("load",api);

function persistance(e) {
  e.preventDefault();
}

async function api(e) {
  try {
    e.preventDefault();
    let city=document.getElementById("cityname").value;
    if (city==="") {
      city="Johannesburg";
    }
    response=await fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&APPID=1ab1890ed4b51e5281fe0dc5e57a7f36&units=metric');
    data=await response.json();
    populate(data);
  } catch (error) {
    console.log(error);
  }
}

function getdate() {
  const months=["January","February","March","April","May","June","July","August","September","October","November","December"];
  let dateVal=new Date();
  let day=dateVal.getDate();
  let month=dateVal.getMonth();
  let year=dateVal.getFullYear();
  month=months[month];
  let answer=day+" "+month+" "+year;
  return answer;
}

function getsymbol(data) {
  let weather=data.weather[0].main;
  if (weather==="Rainy") {
    return document.getElementById("1");
  } else if (weather==="Clouds") {
    return document.getElementById("2");
  } else if (weather==="Clear") {
    return document.getElementById("3");
  } else if (weather==="Thunderstorm") {
    return document.getElementById("4");
  } else if (weather==="Drizzle") {
    return document.getElementById("5");
  } else if (weather==="Snow") {
    return document.getElementById("6");
  } else if (weather==="Tornado") {
    return document.getElementById("8");
  } else {
    return document.getElementById("7");
  }
}

function populate(data) {
  let citytext=document.getElementById("citytext");
  let date=document.getElementById("date");
  let description=document.getElementById("description");

  citytext.innerText=data.name;
  date.innerText=getdate();
  description.innerText=data.weather[0].main;

  let temp=document.getElementById("maintemp");
  let highnlow=document.getElementById("highnlow");

  temp.innerText=Math.round(data.main.temp)+"\u00B0C";
  highnlow.innerText=Math.round(data.main.temp_max)+"\u00B0C/"+Math.round(data.main.temp_min)+"\u00B0C";

  let feel=document.getElementById("feel");
  let humidity=document.getElementById("humidity");
  let wind=document.getElementById("wind");

  feel.innerText="Feels like: "+data.main.feels_like+"\u00B0C";
  humidity.innerText="Humidity levels: "+data.main.humidity+"%";
  let calcspeed=data.wind.speed*3.6;
  wind.innerText="Wind: "+Math.round(calcspeed*100)/100+"KM/H";

  let symbol=document.getElementById("weathersymbol");

  if (symbol.firstChild!==null) {
    symbol.firstChild.remove();
  }
  symbol.appendChild(getsymbol(data));
}

