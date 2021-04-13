const weatherMixin = {
  methods: {
    convertDate(unixTimestamp) {
      const date = new Date(unixTimestamp * 1000);

      const day = `0${date.getDate()}`.substr(-2);
      const month = `0${+date.getMonth() + 1}`.substr(-2);
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    },
    convertDateWithTime(unixTimestamp) {
      const date = new Date(unixTimestamp * 1000);

      const minutes = `0${date.getMinutes()}`.substr(-2);
      const hours = `0${date.getHours()}`.substr(-2);
      const day = `0${date.getDate()}`.substr(-2);
      const month = `0${+date.getMonth() + 1}`.substr(-2);

      return `${day}/${month}, ${hours}:${minutes}`;
    },
    getIcon(iconCode) {
      switch (iconCode) {
        case '01d':
        case '01n':
          return 'mdi-weather-sunny';
        case '02d':
        case '02n':
          return 'mdi-weather-partly-cloudy';
        case '03n':
        case '03d':
          return 'mdi-weather-cloudy';
        case '04d':
        case '04n':
          return 'mdi-cloud';
        case '09d':
        case '09n':
          return 'mdi-weather-rainy';
        case '10d':
        case '10n':
          return 'mdi-weather-pouring';
        case '11d':
        case '11n':
          return 'mdi-weather-lightning-rainy';
        case '13d':
        case '13n':
          return 'mdi-weather-snowy';
        case '50d':
        case '50n':
          return 'mdi-weather-fog';
      }
    }
  }
};

export default weatherMixin;
