// სავარჯიშო 1

document.getElementById("btn").addEventListener("click", function(){
    const result = document.getElementById("movie").value.trimStart().trimEnd();
    document.getElementById("country").innerHTML = " ";
    document.getElementById("timeSince").innerHTML = " ";
    document.getElementById("actors").innerHTML = " ";
    const request = fetch(`http://www.omdbapi.com/?apikey=5190dd47&t=${result}`);
    request.then(response => response.json())
    .then(json => displayingDetails(json.Year, json.Actors, json.Country))
    .catch(() => {document.getElementById("timeSince").innerHTML = "Please check the title and try again"});
});

function displayingDetails(year, actors, country){
    let time;
    if (2022 - Number.parseInt(year) == 0) {
        time = "Movie was released this year"
    } else if(2022 - Number.parseInt(year) == 1){
        time = "Movie was released last year"
    } else(
        time = `Movie was released ${2022 - Number.parseInt(year)} years ago`
    );
    document.getElementById("timeSince").textContent = time;
    const actorsArr = actors.split(", ");
    const actorsFinal = [];
    actorsArr.forEach(el => {
        let index = el.indexOf(" ");
        let added = el.slice(0, index);
        actorsFinal.push(added);
    });
    document.getElementById("actors").innerText = actorsFinal.join(", ");
    const countries = country.split(", ");
    countries.forEach(country => {
        console.log(country);
        const request1 = fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`);
        request1.then(response1 => response1.json())
        .then(json1 => {
            creatingCountryDetails(json1[0].currencies, json1[0].cca2)
        }). catch(()=> console.log("onside error"))
    });
    
}


function creatingCountryDetails(currency, code){
    let currencyName, currencySymbol;
    for(let key in currency){
        currencyName = currency[key].name;
        currencySymbol = currency[key].symbol;
    }
    const div = document.createElement("div");
    const img = document.createElement("img");
    img.src = `https://flagpedia.net/data/flags/icon/36x27/${code.toLowerCase()}.png`;
    div.append(`${currencyName} - ${currencySymbol} `,img);
    document.getElementById("country").append(div);
}

document.getElementById("btn1").addEventListener("click", function(){
    const value1 = document.getElementById("movie1").value.trimStart().trimEnd();
    const value2 = document.getElementById("movie2").value.trimStart().trimEnd();
    const value3 = document.getElementById("movie3").value.trimStart().trimEnd();
    document.getElementById("runtime").textContent = ` `;
    document.getElementById("population").textContent = ` `;
    const arr = [value1, value2, value3];
    let runtime = 0;
    let population = 0;
    async function details(){
        for(let i = 0; i < arr.length; i++){
            const request2 = await fetch(`http://www.omdbapi.com/?apikey=5190dd47&t=${arr[i]}`);
            const response2 = await request2.json();
            runtime += Number.parseInt(response2.Runtime);
            const countriesHere = response2.Country.split(", ");
            for(let i = 0; i< countriesHere.length; i++){
                const request3 = await fetch(`https://restcountries.com/v3.1/name/${countriesHere[i]}?fullText=true`);
                const response3= await request3.json();
                population += Number(response3[0].population);
            }         
        }
        document.getElementById("runtime").textContent = `${runtime} minutes`;
        document.getElementById("population").textContent = `${population} people`;
    }
    details();
});


// სავარჯიშო 2

Promise.myAll = function(arr){
    const resolved = [];   
    let counter = 0;
    return new Promise((resolve, reject) => {
        arr.forEach((item, index) => {
            Promise.resolve(item)
            .then(value => {
                resolved[index] = value;
                counter++;
                if (counter === arr.length) {
                  resolve(resolved);
                }
              })
            .catch(error => reject(error));
        });
    });
};

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

Promise.myAll([promise1, promise2, promise3])
.then((values) => {
  console.log(values);
});