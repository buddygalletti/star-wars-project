// fetch the people objects and push them in here
const peopleObjs = [];


// go get the swapi people data from every page
async function goFetch() {
    try {
        const pageData = [];
        let url = 'https://swapi.co/api/people/';
        while(url !== null) {
            const response = await fetch(url);
            let data = await response.json();
            peopleObjs.push(...(data.results));
            pageData.push(data.results);
            url = data.next;
        }
        return pageData;
    } catch (error) {
        console.error(error);
    }
}


// populate the people div with every name we fetched
async function renderNames() {
    try {
        const people = await goFetch();
        namesList = document.getElementById('names');
        for(let i = 0; i < people.length; i++){
            let peopleFromPage = people[i];
            const html = peopleFromPage.map(function(person){
                const item = `<li>${person.name}</li>`;
                return item;
            }).join('');
            namesList.innerHTML += html;
        }
    } catch (error) {
        console.log(error);
    }
}

renderNames();


// use this function to build a table based on the right person object clicked
function tableBuilder(obj) {
    let table = document.createElement('table');
    // const headers = '<th>Character</th><th>Stats</th>'
    // table.innerHTML = headers;
    for(let stat in obj){
        if(stat === 'films' || stat === 'species' || stat === 'vehicles' || stat === 'starships') {
            continue;
        }
        let row = `<tr><td class='stat' style='text-align: left'>${stat[0].toUpperCase() + stat.slice(1)}</td><td style='text-align: right'>${obj[stat]}</td></tr>`;
        table.innerHTML += row;
    }
    console.log(table)
    return table;
}




// add all the event listener stuff here
const infoDiv = document.getElementById('info');
const names = document.getElementById('names');
const listItems = document.getElementsByTagName('li');
let nameClicked = '';


// this will add bold to li clicked and remove bold from previously clicked and then render the info div
names.addEventListener('click', function(event){
    for(let i = 0; i < listItems.length; i++){
        listItems[i].style.fontWeight = 'normal';
    }
    if(event.target.tagName === 'LI'){
        event.target.style.fontWeight = 'bold';
    }
    nameClicked = event.target.innerHTML;
    for(let i = 0; i < peopleObjs.length; i++){
        if(peopleObjs[i]['name'] === nameClicked){
            infoDiv.innerHTML = '';
            infoDiv.appendChild(tableBuilder(peopleObjs[i]));
            break;
        }
    }
});











console.log(peopleObjs);
