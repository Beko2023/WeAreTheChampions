import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://wearethechampions-7822c-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementInDB = ref(database, "endorsement-list");

const inputFieldEl = document.getElementById("input-field");
const publishButtonEl = document.getElementById("add-button");
const endorsementListEl = document.getElementById("endorsement-list");
const fromEl = document.getElementById("fromEl");
const toEl = document.getElementById("toEl");

publishButtonEl.addEventListener("click", function () {
  let toElValue = `To ${toEl.value} 
  ${inputFieldEl.value} 
  From ${fromEl.value}`;

  push(endorsementInDB, toElValue);

  clearInputFieldEl();
});

onValue(endorsementInDB, function (snapshot) {
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());

    clearEndorsementListEl();

    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i];
      let currentItemID = currentItem[0];
      let currentItemValue = currentItem[1];

      appendItemToEndorsementListEl(currentItem);
    }
  } else {
    endorsementListEl.innerHTML = "";
  }
});

function clearEndorsementListEl() {
  endorsementListEl.innerHTML = "";
}

function clearInputFieldEl() {
  inputFieldEl.value = "";
}

function appendItemToEndorsementListEl(item) {
  let itemID = item[0];
  let itemValue = item[1];

  let newEl = document.createElement("li");

  newEl.textContent = itemValue;

  newEl.addEventListener("click", function () {
    let exactLocationOfItemInDB = ref(database, `endorsement-list/${itemID}`);

    remove(exactLocationOfItemInDB);
  });

  endorsementListEl.append(newEl);
}
