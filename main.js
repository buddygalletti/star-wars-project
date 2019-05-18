console.log("I am in");

async function goFetch() {
    try {
        const response = await fetch('https://swapi.co/api/people/?format=json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function renderNames() {
    let people = await goFetch();
    people = people.results;
    namesList = document.getElementById('names');
    const html = people.map(function(person){
        const item = `<li>${person.name}</li>`;
        return item;
    }).join('');
    namesList.innerHTML += html;
}

renderNames();


