function validateForm() {
  // Obtém os valores dos campos
  let firstName = document.getElementById("firstName").value;
  let email = document.getElementById("email").value;
  let zipcode = document.getElementById("zipcode").value;
  let lat = document.getElementById("lat").value;
  let lon = document.getElementById("lon").value;

  // Verifica se os campos estão vazios
  if (firstName === "") {
    alert("Por favor, insira o Primeiro Nome.");
    return false;
  }
  if (email === "") {
    alert("Por favor, insira o Email.");
    return false;
  }
  if (zipcode === "") {
    alert("Por favor, insira o CEP.");
    return false;
  }
  if (lat === "") {
    alert("Por favor, insira a Latitude.");
    return false;
  }
  if (lon === "") {
    alert("Por favor, insira a Longitude.");
    return false;
  }

  // Se todos os campos estiverem preenchidos, retorna true
  getZipWeatherData();
  return true;
}

async function getZipWeatherData() {
  let zipcode = document.getElementById("zipcode").value;
  try {
    const response = await fetch(`https://viacep.com.br/ws/${zipcode}/json/`);
    const data = await response.json();
    console.log(data);
    const street = document.getElementById("street");
    const district = document.getElementById("district");
    const cityUf = document.getElementById("cityUf");

    street.innerHTML = data.logradouro ?? " ";
    district.innerHTML = data.bairro ?? " ";
    cityUf.innerHTML = data.localidade ?? " " + "/" + data.uf ?? " ";
  } catch (error) {
    const errorZipcode = document.getElementById("errorZipcode");
    errorZipcode.innerHTML = "CEP inválido!";
    console.log(error.message);
  }

  const lat = document.getElementById("lat").value;
  const lon = document.getElementById("lon").value;

  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m`
    );
    const data = await response.json();

    const weatherData = document.getElementById("weatherData");
    const temperature = data.current ? data.current.temperature_2m : "N/A";
    weatherData.innerHTML = temperature + "° C";
  } catch (error) {
    if (error instanceof TypeError) {
      console.error("Erro de tipo:", error.message);
    } else if (error instanceof SyntaxError) {
      console.error("Erro de sintaxe JSON:", error.message);
    } else {
      console.error("Erro desconhecido:", error.message);
    }
    const errorLatLon = document.getElementById("errorLatLon");
    errorLatLon.innerHTML = "Ocorreu um erro ao obter os dados do clima.";
  }
}

function zipMask(zipcode) {
  if (zipcode.value.length == 5) {
    zipcode.value = zipcode.value + "-";
  }
}
function validarInputs() {
  const lat = parseFloat(inputLatitude.value);
  const lon = parseFloat(inputLongitude.value);

  if (isNaN(lat) || isNaN(lon)) {
    return false;
  }

  if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
    return false;
  }

  return true;
}
