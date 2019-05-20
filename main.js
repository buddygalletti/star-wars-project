// go get the swapi people data from every page
async function goFetch() {
    try {
        const pageData = [];
        let url = 'https://swapi.co/api/people/';
        while(url !== null) {
            const response = await fetch(url);
            let data = await response.json();
            pageData.push(data.results);
            url = data.next;
        }
        console.log(pageData);
        return pageData;
    } catch (error) {
        console.error(error);
    }
}


// populate the people div with every name we fetched
async function renderNames() {
    try {
        const people = await goFetch();
        console.log(people);
        namesList = document.getElementById('names');
        for(let i = 0; i < people.length; i++){
            let peopleFromPage = people[i];
            const html = peopleFromPage.map(function(person){
                const item = `<li>${person.name}</li>`;
                return item;
            }).join('');
            console.log(html);
            namesList.innerHTML += html;
        }
    } catch (error) {
        console.log(error);
    }
}


// add all the event listener stuff here
const names = document.getElementById('names');
console.log(names);
names.addEventListener('click', function(event){
    console.log(event.target);
});










renderNames();
