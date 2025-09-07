// ====== Dados ======
const data = {
  portugal: {
    "Amadora": ["Linha4"],
    "Cascais": ["Linha4"],
    "Sintra": ["Linha4"],
    "Leiria": ["Linha5"],
    "Alcobaça": ["Linha5"],
    "Porto Oriente": ["Linha6"],
    "Gaia": ["Linha6"],
    "Almada": ["Linha7"],
    "Barreiro": ["Linha7"],
    "Santarém": ["Linha7"],
    "Troia": ["Linha11"],
    "Sesimbra": ["Linha11"],
    "Ovar": ["Linha11"],
    "Aveiro": ["Linha13"],
    "Coimbra": ["Linha13"],
    "Lisboa Oriente": ["Linha12"],
    "Loures": ["Linha13"],
    "Montijo": ["Linha13"],
    "Évora": ["Linha12"],
    "Boavista": ["Linha12"],
    "Viseu": ["Linha14"],
    "Guarda": ["Linha14"],
    "Castelo Branco": ["Linha14"],
    "Quarteira": ["Linha14"],
    "Faro": ["Linha14"],
    "Vila Real": ["Linha15"],
    "Chaves": ["Linha15"],
    "Penafiel": ["Linha15"],
    "Albufeira": ["Linha15"],
    "Portimão": ["Linha15"],
    "Matosinhos": ["Linha16"],
    "Braga": ["Linha16"],
    "Guimarães": ["Linha16"],
    "Maia": ["Linha16"]
  },
  espanha: {
    "Huelva": ["Linha1"],
    "Lepe": ["Linha1"],
    "Ronda": ["Linha2"],
    "Motril": ["Linha2"],
    "Jaen": ["Linha2"],
    "Mijas": ["Linha2"],
    "Málaga": ["Linha3"],
    "Rosaleda": ["Linha3"],
    "Puerto": ["Linha3"],
    "Cádiz": ["Linha3"],
    "Jerez": ["Linha3"],
    "Vigo": ["Linha8"],
    "City Vigo": ["Linha8"],
    "Nigrán": ["Linha8"],
    "Córdoba": ["Linha9"],
    "Alcalá": ["Linha9"],
    "Puente Genil": ["Linha9"],
    "Mérida": ["Linha10"],
    "Cáceres": ["Linha10"],
    "Badajoz": ["Linha10"],
    "Villanueva": ["Linha10"],
    "Camas": ["Linha17"],
    "San Juan": ["Linha17"],
    "Barrios": ["Linha17"],
    "Hermanas": ["Linha17"]
  }
};

// ====== Elementos ======
const btnPortugal = document.getElementById("btnPortugal");
const btnEspanha = document.getElementById("btnEspanha");
const search = document.getElementById("search");
const cityList = document.getElementById("cityList");
const infoBox = document.getElementById("infoBox");
const cityName = document.getElementById("cityName");
const lineInfo = document.getElementById("lineInfo");
const closeInfo = document.getElementById("closeInfo");

let currentCountry = null;

// ====== Normalizar texto (tirar acentos) ======
function normalizeText(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// ====== Mostrar cidades ======
function showCities(country) {
  currentCountry = country;
  search.value = "";
  renderCities(Object.keys(data[country]), country);
}

// ====== Renderizar lista ======
function renderCities(cities, country = currentCountry) {
  cityList.innerHTML = "";
  cities.sort().forEach(city => {
    const li = document.createElement("li");
    li.textContent = city;
    li.onclick = () => showInfo(city, country);
    cityList.appendChild(li);
  });
}

// ====== Mostrar info ======
function showInfo(city, country) {
  cityName.textContent = city;
  lineInfo.textContent = data[country][city].join(", ");
  infoBox.classList.remove("hidden");
}

// ====== Fechar info ======
closeInfo.onclick = () => {
  infoBox.classList.add("hidden");
};

// ====== Pesquisa global ======
search.addEventListener("input", () => {
  const term = normalizeText(search.value);
  if (term === "") {
    cityList.innerHTML = "";
    return;
  }

  let results = [];

  Object.entries(data).forEach(([country, cities]) => {
    Object.keys(cities).forEach(city => {
      if (normalizeText(city).includes(term)) {
        results.push({ city, country });
      }
    });
  });

  cityList.innerHTML = "";
  results
    .sort((a, b) => a.city.localeCompare(b.city))
    .forEach(result => {
      const li = document.createElement("li");
      li.textContent = result.city + (result.country === "portugal" ? " 🇵🇹" : " 🇪🇸");
      li.onclick = () => showInfo(result.city, result.country);
      cityList.appendChild(li);
    });
});

// ====== Botões ======
btnPortugal.onclick = () => showCities("portugal");
btnEspanha.onclick = () => showCities("espanha");