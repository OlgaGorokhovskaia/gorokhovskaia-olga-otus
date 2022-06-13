
export async function getAllCurrentWeatherByCity(cityList) {
    return Promise.all(
        cityList.map((city, i) => {
            return new Promise((resolve) => {
            const delay = i * 500;

            setTimeout(() => {
                getCoordinatesByCity(city)
                    .then(data => {
                        if (data.latt) {
                            getCurrentWeather(data).then(res => { 
                                res.city = city;
                                return res;
                            }).then(resolve);
                        }
                    })
                    .catch(err => ({ err, city }));
                }, delay);
            })
        })
    );
};  

export async function getCoordinatesByCity(city) {
    try {
        const response = await fetch(`https://geocode.xyz/${city}?json=1`);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

export async function getCountriesDictionary() {
    try {
        const response = await fetch('https://countriesnow.space/api/v0.1/countries');
        const json = await response.json();
        
        return await json.data;
    } catch (error) {
        console.log(error);
    }
};

export async function getWeatherForcast({latt, longt}) {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latt}&longitude=${longt}&hourly=weathercode&hourly=temperature_2m&next_days`);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};


export async function getCurrentWeather({latt, longt}) {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latt}&longitude=${longt}&current_weather=true`);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}


export function getDataFromStorage(key) {
    try {
      const data = JSON.parse(localStorage.getItem(key));
      return data;
    } catch {
      return [];
    }
};


