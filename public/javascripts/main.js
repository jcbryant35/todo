// DELETE ALL
const delAllBtn = document.querySelector('#delAllBtn');
delAllBtn.addEventListener('click', delAllItems);

function delAllItems() {
    delAllBtn.style.transform = 'rotate(90deg)'

    localStorage.clear(); //LOCAL STORAGE CLEAR 

    fetch('/list', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => {
        if(res.ok) {
            res.status(200)
        } else {
            res.status(500)
        }
    })
    .then(window.location.reload())
    .catch(console.error)
}



// DELETE ONE
const delItemBtn = document.querySelectorAll('.delItemBtn');

for(i = 0; i < delItemBtn.length; i++) {
    delItemBtn[i].addEventListener('click', delItem);
};

for(let u = 0; u < delItemBtn.length; u++) {
    delItemBtn[u].addEventListener('click', (e) => {
        e.preventDefault()
        localStorage.removeItem(localStorage.key(u)); // LOCAL STORAGE REMOVE ONE
    })
}

function delItem() {
    
    fetch('/list/' + this.dataset.delete, {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => {
        if (res.ok) {
            return res.status(200)
        } else {
            res.status(500)
        }
    })
    .then(window.location.reload())
    .catch(console.error)
};




// UPDATE ONE
const updateItemBtn = document.querySelectorAll('.saveBtn');

for(i = 0; i < updateItemBtn.length; i++) {
    updateItemBtn[i].addEventListener('click', updateItem);    
};

function updateItem() {

    fetch('/list/' + this.dataset.update, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            item: document.querySelector('.editedText').value
        })
    })
    .then(res => {
        if (res.ok) {
            return res.status(200)
        } else {
            res.status(500)
        }
    })
    .then(window.location.reload())
    .catch(console.error)
};



// EDIT ITEM BUTTON
const editBtn = document.querySelectorAll('.editBtn');
const cancelBtn = document.querySelectorAll('.cancelBtn');

for(let r = 0; r < editBtn.length; r++) {
    editBtn[r].addEventListener('click', (e) => {
        let editor = document.querySelectorAll('.editText');
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'editedText';
        input.placeholder = 'Type here..'
        editor[r].innerHTML = '';
        editor[r].appendChild(input).focus();
        updateItemBtn[r].style.display = 'block';
        cancelBtn[r].style.display = 'block';       
        editBtn[r].style.display = 'none';
        delItemBtn[r].style.display = 'none';
        uncheck[r].style.display = 'none';
    })
}



// CHECK - UNCHECK ITEM VARIABLES
const check = document.querySelectorAll('i.check');
const uncheck = document.querySelectorAll('i.uncheck');
const li = document.querySelectorAll('li');
let savedChecks;
let myArr = [];


// Check-off Items 
    for(let i = 0; i < uncheck.length; i++) {
        uncheck[i].addEventListener('click', delItem)
        uncheck[i].addEventListener('click', (e) => { 
            if(e.target.classList.contains('uncheck')) {
                check[i].className = 'fas fa-check-circle check';
                check[i].style.display = 'block';
                uncheck[i].className = 'fas fa-check-circle check';
                li[i].style.textDecoration = 'line-through';
                li[i].style.borderColor = 'green';
                editBtn[i].style.display = 'none';
                delItemBtn[i].style.display = 'none';
                
    
                // LOCAL STORAGE SAVE 
                savedChecks = document.querySelectorAll('.saved-list-item');
                savedChecks = savedChecks[i].innerHTML;
                myArr.push(savedChecks);
                localStorage.setItem('checkItems'+ new Date().getTime(), JSON.stringify(myArr));
            } 
        });
    };



// RETRIEVE LOCAL STORAGE

for(let i = 0; i < localStorage.length; i++) {
    if(localStorage !== null) {
        document.querySelector('#savedList').innerHTML += JSON.parse(localStorage.getItem(localStorage.key(i)));
    }
}





// ADD CLEAR DONE BUTTON
if(localStorage.key('checkItems') !== null) {
    document.querySelector('#savedList').insertAdjacentHTML("afterend", '<button onclick="clearSavedStorage()" type="button" class="clearStorage">Clear Done</button>')
} 



// Clear saved checked "done" list section
const clearChecked =  document.querySelector('.clearStorage');

if(localStorage.key('checkItems') !== null) {
    clearChecked.style.background = 'transparent';
    clearChecked.style.padding = '5px';
    clearChecked.style.fontSize = '15px';
    clearChecked.style.borderRadius= '10px';
    clearChecked.style.outline = 'none';

    clearChecked.addEventListener('click', _ => {

        localStorage.clear();
        window.location.reload();    
    });    
}



// Capitalize first letter of input
document.querySelector('input').style.textTransform = 'capitalize';



// TIME
function currentTime() {
    var d = new Date();
    var hour = d.getHours();
    var mins = d.getMinutes();
    hour = updateTime(hour);
    mins = updateTime(mins);

    const clock = document.querySelector('#time');

    if(hour < 12) {
        clock.innerHTML = `${hour}:${mins} AM`
    }
    
    if(hour >= 12) {
        clock.innerHTML = `${hour - 12}:${mins} PM`
    } 

    if(hour == 0) {
        clock.innerHTML = `${hour = 12}:${mins} AM`
    }
    

    var t = setTimeout(() => {
        currentTime()
    }, 1000)    
}

function updateTime(t) {
    if(t < 10) {
        return '0' + t;
    } else {
        return t;
    }
}
 
window.onload = currentTime();



// DATE 
function currentDate() {
    var cd = new Date();
    var month = ["January", "February", "March", "April",
    "May", "June", "July", "August", "September", "October",
    "November", "December"];
    var day = cd.getDate();
    var year = cd.getFullYear();
    month = updateDate(month);
    day = updateDate(day);
    year = updateDate(year);

    const date = document.querySelector('#date');
    date.innerHTML = `${month[cd.getMonth()]} ${day}, ${year}`
    var t = setTimeout(() => {
        currentDate()
    }, 1000)    
}

function updateDate(dt) {
    return dt;
}
 
window.onload = currentDate();





// Uncheck Items 
/*for(let k = 0; k < check.length; k++) {
    check[k].addEventListener('click', (e) => {
        if(e.target.classList.contains('check')) {
            uncheck[k].className = 'far fa-circle uncheck';
            li[k].style.textDecoration = 'none';
            check[k].className = 'far fa-circle';
            check[k].style.display = 'none';
            editBtn[k].style.display = 'block';
            delItemBtn[k].style.display = 'block';


            localStorage.removeItem(localStorage.key(k)); // LOCAL STORAGE REMOVE ONE
        }
    })
};*/












