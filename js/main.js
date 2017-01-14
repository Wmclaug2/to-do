window.onload = () => {
    // grab all elements used
    var submitButton = document.getElementById('submit-new-to-do');
    var textBox = document.getElementById('new-to-do-item');
    var toDoListContainer = document.getElementById('to-do-container');
    
    // Array used to store to do items
    let toDoList = [];
    if (localStorage.getItem('toDoList')){
        console.log(localStorage.getItem('toDoList'));
        toDoList = localStorage.getItem('toDoList').split(',');
    }
     console.log(toDoList);

    // take all created elements and renderToDoList
    function renderToDoList (...createdElements) {
        toDoListContainer.innerHTML = '';
        for(var element of createdElements){
            element.style.backgroundColor = '#CDE6F5';
            toDoListContainer.appendChild(element);
        }    
    }
    
    // create elements
    function createElements (...toDoItems) {
        let items =[] ;
        for(let item of toDoItems) {
            let newToDo = createNewToDo(capitalize(item));
            let newDiv = createNewDiv();
            let newRemovalButton = createRemovalButtons()
            newDiv.appendChild(newRemovalButton);
            newDiv.appendChild(newToDo);
            items.push(newDiv);
        }
        console.log(items);
        return items;
    }
    function createNewToDo (item) {
        var newToDo = document.createElement('h2');
        newToDo.className = 'to-do-text';
        newToDo.textContent = item;
        return newToDo;
    }
    function createNewDiv () {
        let newDiv = document.createElement('div');
        newDiv.className = 'to-do-item';
        return newDiv;
    }
    function createRemovalButtons () {
        let removalButton = document.createElement('button');
        removalButton.innerHTML = '<i class="fa fa-check-square-o" aria-hidden="true"></i>';
        removalButton.addEventListener('click', removeItem);
        removalButton.className = 'removeItem remove-item';
        return removalButton;
    }

    // add and remove from items array
    function addItemToList (item) {
        toDoList.push(item);
    }
    function removeItem () {
        let itemInArray = this.parentNode.childNodes[1].textContent;
        let index = toDoList.indexOf(itemInArray);
        toDoList.splice(index, 1);
        var div = this.parentNode;
        div.parentNode.removeChild(div);
        localStorage.clear();
        populateStorage();
    }
    
    //Tools
    function clearTextBox () {
        textBox.value = '';
    }
    function getToDoListLength () {
        return toDoList.length;
    }
    function capitalize (item) {
        return item.charAt(0).toUpperCase()+item.slice(1);
    }
    function populateStorage () {
        localStorage.setItem('toDoList', toDoList);
    }
    renderToDoList(...createElements(...toDoList));
    // Event Listeners
    textBox.addEventListener ('keypress', (event) => {
        if (event.keyCode == 13) {
            submitButton.click();
        }
    });
    submitButton.addEventListener ('click', () => {
        let newItem = textBox.value;
        if (newItem == '' || newItem == ' '){
            console.log('empty');
        } else {
            clearTextBox();
            addItemToList(newItem);
            let createdElements = createElements(...toDoList);
            renderToDoList(...createdElements);
            populateStorage();
        }
    });
}