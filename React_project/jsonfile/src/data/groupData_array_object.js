
const weatherGroups = [
  "Thunderstorm",
  "Drizzle",
  "Rain",
  "Snow",
  "Atmosphere",
  "Clear",
  "Clouds",
  "Extreme"
];
const Thunderstorm = {
  "name": "천둥구름",
  "id": {
    "200": {
      "english": "thunderstorm with light rain",
      "korean": "가벼운 비를 동반한 천둥구름"
    },
    "201": {
      "english": "thunderstorm with rain",
      "korean": "비를 동반한 천둥구름"
    },
    "202": {
      "english": "thunderstorm with heavy rain",
      "korean": "폭우를 동반한 천둥구름"
    },
    "210": {
      "english": "light thunderstorm",
      "korean": "약한 천둥구름"
    },
    "211": {
      "english": "thunderstorm",
      "korean": "천둥구름"
    },
    "212": {
      "english": "heavy thunderstorm",
      "korean": "강한 천둥구름"
    },
    "221": {
      "english": "ragged thunderstorm",
      "korean": "불규칙적 천둥구름"
    },
    "230": {
      "english": "thunderstorm with light drizzle",
      "korean": "약한 연무를 동반한 천둥구름"
    },
    "231": {
      "english": "thunderstorm with drizzle",
      "korean": "연무를 동반한 천둥구름"
    },
    "232": {
      "english": "thunderstorm with heavy drizzle",
      "korean": "강한 안개비를 동반한 천둥구름"
    }
  }
};

const Drizzle = {
  "name": "안개비",
  "id": {
    "300": {
      "english": "light intensity drizzle",
      "korean": "가벼운 안개비"
    },
    "301": {
      "english": "drizzle",
      "korean": "안개비"
    },
    "302": {
      "english": "heavy intensity drizzle",
      "korean": "강한 안개비"
    },
    "310": {
      "english": "light intensity drizzle rain",
      "korean": "가벼운 적은비"
    },
    "311": {
      "english": "drizzle rain",
      "korean": "적은비"
    },
    "312": {
      "english": "heavy intensity drizzle rain",
      "korean": "강한 적은비"
    },
    "313": {
      "english": "shower rain and drizzle",
      "korean": "소나기와 안개비"
    },
    "314": {
      "english": "heavy shower rain and drizzle",
      "korean": "강한 소나기와 안개비"
    },
    "321": {
      "english": "shower drizzle",
      "korean": "소나기"
    }
  }
};

const Rain = {
  "name": "비",
  "id": {
    "500": {
      "english": "light rain",
      "korean": "악한 비"
    },
    "501": {
      "english": "moderate rain",
      "korean": "중간 비"
    },
    "502": {
      "english": "heavy intensity rain",
      "korean": "강한 비"
    },
    "503": {
      "english": "very heavy rain",
      "korean": "매우 강한 비"
    },
    "504": {
      "english": "extreme rain",
      "korean": "극심한 비"
    },
    "511": {
      "english": "freezing rain",
      "korean": "우박"
    },
    "520": {
      "english": "light intensity shower rain",
      "korean": "약한 소나기 비"
    },
    "521": {
      "english": "shower rain",
      "korean": "소나기 비"
    },
    "522": {
      "english": "heavy intensity shower rain",
      "korean": "강한 소나기 비"
    },
    "531": {
      "english": "ragged shower rain",
      "korean": "불규칙적 소나기 비"
    }
  }
};

const Snow = {
  "name": "눈",
  "id": {
    "600": {
      "english": "light snow",
      "korean": "가벼운 눈"
    },
    "601": {
      "english": "snow",
      "korean": "눈"
    },
    "602": {
      "english": "heavy snow",
      "korean": "강한 눈"
    },
    "611": {
      "english": "sleet",
      "korean": "진눈깨비"
    },
    "612": {
      "english": "shower sleet",
      "korean": "소나기 진눈깨비"
    },
    "615": {
      "english": "light rain and snow",
      "korean": "약한 비와 눈"
    },
    "616": {
      "english": "rain and snow",
      "korean": "비와 눈"
    },
    "620": {
      "english": "light shower snow",
      "korean": "약한 소나기 눈"
    },
    "621": {
      "english": "shower snow",
      "korean": "소나기 눈"
    },
    "622": {
      "english": "heavy shower snow",
      "korean": "강한 소나기 눈"
    }
  }
};

const Atmosphere = {
  "name": "안개 및 먼지",
  "id": {
    "701": {
      "english": "mist",
      "korean": "박무"
    },
    "711": {
      "english": "smoke",
      "korean": "연기"
    },
    "721": {
      "english": "haze",
      "korean": "연무"
    },
    "731": {
      "english": "sand, dust whirls",
      "korean": "모래 먼지"
    },
    "741": {
      "english": "fog",
      "korean": "안개"
    },
    "751": {
      "english": "sand",
      "korean": "모래"
    },
    "761": {
      "english": "dust",
      "korean": "먼지"
    },
    "762": {
      "english": "volcanic ash",
      "korean": "화산재"
    },
    "771": {
      "english": "squalls",
      "korean": "돌풍"
    },
    "781": {
      "english": "tornado",
      "korean": "토네이도"
    }
  }
};

const Clear = {
  "name": "맑음",
  "id": {
    "800": {
      "english": "clear sky",
      "korean": "구름 한 점 없는 맑은 하늘"
    }
  }
};

const Clouds = {
  "name": "흐림",
  "id": {
    "801": {
      "english": "few clouds",
      "korean": "약간의 구름이 낀 하늘"
    },
    "802": {
      "english": "scattered clouds",
      "korean": "드문드문 구름이 낀 하늘"
    },
    "803": {
      "english": "broken clouds",
      "korean": "구름이 거의 없는 하늘"
    },
    "804": {
      "english": "overcast clouds",
      "korean": "구름으로 뒤덮인 흐린 하늘"
    }
  }
};

const Extreme = {
  "name": "경고",
  "id": {
    "900": {
      "english": "tornado",
      "korean": "토네이도"
    },
    "901": {
      "english": "tropical storm",
      "korean": "태풍"
    },
    "902": {
      "english": "hurricane",
      "korean": "허리케인"
    },
    "903": {
      "english": "cold",
      "korean": "한랭"
    },
    "904": {
      "english": "hot",
      "korean": "고온"
    },
    "905": {
      "english": "windy",
      "korean": "바람부는"
    },
    "906": {
      "english": "hail",
      "korean": "우박"
    },
    "951": {
      "english": "calm",
      "korean": "바람이 거의 없는"
    },
    "952": {
      "english": "light breeze",
      "korean": "약한 바람"
    },
    "953": {
      "english": "gentle breeze",
      "korean": "부드러운 바람"
    },
    "954": {
      "english": "moderate breeze",
      "korean": "중간 세기 바람"
    },
    "955": {
      "english": "fresh breeze",
      "korean": "신선한 바람"
    },
    "956": {
      "english": "strong breeze",
      "korean": "센 바람"
    },
    "957": {
      "english": "high win",
      "korean": "돌풍에 가까운 센 바람"
    },
    "958": {
      "english": "gale",
      "korean": "돌풍"
    },
    "959": {
      "english": "severe gale",
      "korean": "심각한 돌풍"
    },
    "960": {
      "english": "storm",
      "korean": "폭풍"
    },
    "961": {
      "english": "violent storm",
      "korean": "강한 폭풍"
    },
    "962": {
      "english": "hurricane",
      "korean": "허리케인"
    }
  }
};
