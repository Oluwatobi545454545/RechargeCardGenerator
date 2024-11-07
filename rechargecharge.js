
const inputCode = document.getElementById('inputcode');
const inputPin = document.getElementById('inputpin');
const tbody = document.getElementById('tbody');
const selector = document.getElementById('select');
const amount = document.getElementById('amount');

if (!localStorage.getItem("userobject")) {
  localStorage.setItem("userobject", "[]");
}

function Generate() {
  const code = Math.floor(Math.random() * 1000000000000);
  inputCode.value = code;
    localStorage.setItem("generatedCode", inputCode.value)
}

function savePin() {
  const userObject = {
    selector: selector.value,
    amount: amount.value,
    pin: inputCode.value,
    isUsed: false,
    dateCreated: new Date().toLocaleDateString(),
    dateUsed: null,
  };

  const arr = JSON.parse(localStorage.getItem('userobject'));
  arr.push(userObject);
  localStorage.setItem("userobject", JSON.stringify(arr));
  window.location.reload();
}

function display() {
  const array = JSON.parse(localStorage.getItem("userobject"));
  tbody.innerHTML = '';

  array.forEach((element, index) => {
    const row = `
      <tr>
        <td class="sn">${index + 1}</td>
        <td>${element.selector}</td>
        <td>${element.amount}</td>
        <td>*311*${element.pin}#</td>
        <td>${element.isUsed ? "Used" : "Not Used"}</td>
        <td>${element.dateCreated}</td>
        <td>${element.dateUsed ? element.dateUsed : "----"}</td>
        <td><button class="delete" onclick="deleteRow(${index})">Delete</button></td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

function Recharge() {
  if (inputPin.value === '') {
    alert('Please enter a PIN');
    return;
  }

  const array = JSON.parse(localStorage.getItem("userobject"));
  for (let i = 0; i < array.length; i++) {
    if (array[i].pin === inputPin.value) {
      array[i].isUsed = true;
      array[i].dateUsed = new Date().toLocaleDateString();
      localStorage.setItem("userobject", JSON.stringify(array));
      display();
      return;
    }
  }
  alert('PIN not found');
}

function deleteRow(index) {
  const array = JSON.parse(localStorage.getItem("userobject"));
  array.splice(index, 1);
  localStorage.setItem("userobject", JSON.stringify(array));
  display();
}

display();
