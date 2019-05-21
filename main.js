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
    const stats = Array.from(Object.keys(obj));
    console.log(stats);
    let table = document.createElement('table');
    for(let stat in stats){
        // console.log(stat, obj[stat]);
        let row = document.createElement('tr');
        let tdLeft = document.createElement('td');
        let tdRight = document.createElement('td');
        tdLeft.innerText = stat;
        tdRight.innerText = obj[stat];
        row.appendChild(tdLeft);
        row.appendChild(tdRight);
        table.appendChild(row);
    }
    console.log(table)
    return table;
}




// add all the event listener stuff here
const infoDiv = document.getElementById('info');
const names = document.getElementById('names');
const listItems = document.getElementsByTagName('li');
let nameClicked = '';

// this will add bold to li clicked and remove bold from previously clicked
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
            console.log(peopleObjs[i]);
            infoDiv.innerHTML = tableBuilder(peopleObjs[i]);
        }
    }
});











console.log(peopleObjs);
