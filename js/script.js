document.getElementById("submit").addEventListener("click", () => {
  const searchInput = document.getElementById("search").value; // اخذ القيمة من الزر للبحث

  const apiKey = "1cde79211b53435593f164314233107"; // مفتاح api
  const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${searchInput}&days=3`; //url api

  fetch(apiUrl) // الحصول على البيانات من لينك api
    .then((response) => response.json()) //تحويل استجابة api الى جيسون
    .then((data) => {
      const forecastData = data.forecast.forecastday; //الحصول على البيانات من api

      const forecastContainer = document.getElementById("forecast");

      forecastContainer.innerHTML = "";

      forecastData.forEach((item) => {
        const forecastElement = document.createElement("div"); // انشاء عنصر جديد لعرض الطقس
        forecastElement.className = "forecast";

        const date = new Date(item.date); //تحويل التاريخ ليوم
        const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

        //عرض محتوى الطقس في html
        forecastElement.innerHTML = `
          <div class="forecast-header">
            <div class="day">${dayName}</div>
          </div>
          <div class="forecast-content">
            <div class="forecast-icon">
              <img src="${item.day.condition.icon}" alt="" width="48">
            </div>
            <div class="degree">${item.day.maxtemp_c}<sup>o</sup>C</div>
            <small>${item.day.mintemp_c}<sup>o</sup></small>
            <div class="custom">${item.day.condition.text}</div>
          </div>
        `;

        forecastContainer.appendChild(forecastElement);
      });
    })
    .catch((error) => {
      console.log("Error:", error); //اذا كان هناك خلل في بيانات api اعرض زسالة خطا
    });
});
//
