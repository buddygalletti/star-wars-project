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
    try {
        let people = await goFetch();
        people = people.results;
        namesList = document.getElementById('names');
        const html = people.map(function(person){
            const item = `<li>${person.name}</li>`;
            return item;
        }).join('');
        namesList.innerHTML += html;
    } catch (error) {
        console.log(error);
    }
}

// const container = document.getElementsByClassName('flex-container');
// console.log(container);
// container.addEventListener('click', function(event){
//     console.log(event.target);
// });










renderNames();