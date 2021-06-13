import users from './users.js';

const refs = {
    wrapper: document.querySelector('.wrapper'),
    input1: document.querySelector('.input'),
    button1: document.querySelector('.btnSearch'),
}

function createCard (user) {
    const newDiv = document.createElement('div');
    const email = document.createElement('p');
    const phone = document.createElement('p');
    const name = document.createElement('p');
    
email.textContent = user.email;
phone.textContent = user.phone;
name.textContent = user.name;

newDiv.append(name, phone, email);
newDiv.classList.add('card');
newDiv.style.width = "360px";
newDiv.style.height = "150px";
newDiv.style.border = "1px solid black";
newDiv.style.padding = "5px";
newDiv.style.margin = "10px";
newDiv.style.cursor = "pointer";

return newDiv;
}

const cards = users.map(user => createCard(user));

refs.wrapper.append(...cards);

refs.button1.addEventListener('click', () => {
    const inputValue = refs.input1.value;
    if(!inputValue) return;
    const resUsers = users.filter(user => user.name.includes(inputValue)||user.email.includes(inputValue)||user.phone.includes(inputValue));
    //console.log(resUsers);
    const cards = resUsers.map(user => createCard(user));
    //console.log(cards)
    refs.wrapper.innerHTML = '';
    refs.wrapper.append(...cards);
    refs.input1.value = '';
});

refs.wrapper.addEventListener('click', (event) => {
    if(event.target.classList.contains('wrapper')) {
      return;  
    }
    if(event.target.tagName==="P"){
      alert(event.target.parentElement.innerHTML);
    }
    alert(event.target.innerHTML); 
})
