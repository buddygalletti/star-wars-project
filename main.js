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


async function renderNames(people) {
    people = Array.from(people);
    namesList = document.getElementById('names');
    people.forEach(function(person){
        const item = `<li>${person.name}</li>`;
        namesList.appendChild(item);
    });
}

// const starWarsPeople = goFetch().then(renderNames);

console.log(goFetch());

