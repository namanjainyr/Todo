
var addButton = document.getElementById("addButton");
var clearButton = document.getElementById('clearButton');
var addInput = document.getElementById("itemInput");
var todoList = document.getElementById("todoList");
var listArray = [];




function listItemObj(content, status) {
    this.content = '';
    this.status = 'incomplete';
    this.date = '';
}

function refreshLocal() {
    var todos = listArray;
    localStorage.removeItem('todoList');
    localStorage.setItem('todoList', JSON.stringify(todos));
}

var changeToComp = function () {
    var parent = this.parentElement;
    parent.className = 'col-md-3 cell uncompleted well';
    this.innerText = 'Incomplete';
    this.removeEventListener('click', changeToComp);
    this.addEventListener('click', changeToInComp);
    changeListArray(parent.firstChild.innerText, 'complete');
}

var changeToInComp = function () {
    var parent = this.parentElement;
    parent.className = 'col-md-3 cell completed well';
    this.innerText = 'Complete';
    this.removeEventListener('click', changeToInComp);
    this.addEventListener('click', changeToComp);

    changeListArray(parent.firstChild.innerText, 'incomplete');
}

var clearList = function () {
    var confirmation = confirm("Are you serious?");
    if (confirmation) {
        listArray = [];
        localStorage.removeItem('todoList');
        todoList.innerHTML = '';
    }
}

var removeItem = function () {
    var parent = this.parentElement.parentElement;
    parent.removeChild(this.parentElement);

    var data = this.parentElement.firstChild.innerText;
    for (var i = 0; i < listArray.length; i++) {
        if (listArray[i].content == data) {
            listArray.splice(i, 1);
            refreshLocal();
            break;
        }
    }
}

var changeListArray = function (data, status) {
    for (var i = 0; i < listArray.length; i++) {
        if (listArray[i].content == data) {
            listArray[i].status = status;
            refreshLocal();
            break;
        }
    }
}

var createItemDom = function (text, status, date) {
    var listItem = document.createElement('div');
    var itemLabel = document.createElement('label');
    var itemdateLabel = document.createElement('label');
    var itemCompBtn = document.createElement('button');
    var itemIncompBtn = document.createElement('button');

    listItem.className = (status == 'incomplete') ? 'col-md-3 cell completed well' : 'col-md-3 cell uncompleted well';
    
    itemLabel.innerText = text;
    itemdateLabel.innerHTML = date;
    itemdateLabel.className = 'date';
    itemCompBtn.className = 'btn btn-sm btn-success';
    itemCompBtn.innerText = (status == 'incomplete') ? 'Complete' : 'Incomplete';
    if (status == 'incomplete') {
        itemCompBtn.addEventListener('click', changeToComp);
    } else {
        itemCompBtn.addEventListener('click', changeToInComp);
    }

    itemIncompBtn.className = 'btn btn-sm btn-danger';
    itemIncompBtn.innerText = 'Delete';
    itemIncompBtn.addEventListener('click', removeItem);

    listItem.appendChild(itemLabel);
    listItem.appendChild(itemdateLabel);
    listItem.appendChild(itemCompBtn);
    listItem.appendChild(itemIncompBtn);

    return listItem;
}

var getCurrentDate = function () {
    var currentdate = new Date();
    return currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
}

var addToList = function () {

    var newItem = new listItemObj();
    newItem.content = addInput.value;
    newItem.date = getCurrentDate();
    listArray.push(newItem);

    refreshLocal();

    var item = createItemDom(addInput.value, 'incomplete', newItem.date);
    todoList.appendChild(item);
    addInput.value = "";
}

window.onload = function () {

    var list = localStorage.getItem('todoList');
    console.log(list);
    if (list != null) {
        todos = JSON.parse(list);
        listArray = todos;


        for (var i = 0; i < listArray.length; i++) {
            var item = createItemDom(listArray[i].content, listArray[i].status, listArray[i].date);
            todoList.appendChild(item);

        }
    }
}

addButton.addEventListener('click', addToList);
clearButton.addEventListener('click', clearList);