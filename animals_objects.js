// "use strict";

// window.addEventListener("DOMContentLoaded", start);

// const allAnimals = [];

// function start() {
//   loadJSON();
// }

// function loadJSON() {
//   fetch("animals.json")
//     .then((response) => response.json())
//     .then((jsonData) => {
//       // when loaded, prepare objects
//       prepareObjects(jsonData);
//     });
// }

// function prepareObjects(jsonData) {
//   jsonData.forEach((jsonObject) => {
//     // Fullname strengen splittes op i sit eget array
//     const newArray = jsonObject.fullname.split(" ");

//     // Der laves et nyt objekt hvor værdier fra det nye array tilgås ved hjælp af index
//     const animal = {
//       name: newArray[0],
//       type: newArray[3],
//       desc: newArray[2],
//       age: jsonObject.age,
//     };

//     // Man bruger push for at tilføje de nye objekter til allAnimals arrayet der bruges længere nede
//     allAnimals.push(animal);
//   });
//   displayList();
// }

// function displayList() {
//   // clear the list
//   document.querySelector("#list tbody").innerHTML = "";

//   // build a new list
//   allAnimals.forEach(displayAnimal);
// }

// function displayAnimal(animal) {
//   // create clone
//   const clone = document.querySelector("template#animal").content.cloneNode(true);

//   // set clone data
//   clone.querySelector("[data-field=name]").textContent = animal.name;
//   clone.querySelector("[data-field=desc]").textContent = animal.desc;
//   clone.querySelector("[data-field=type]").textContent = animal.type;
//   clone.querySelector("[data-field=age]").textContent = animal.age;

//   // append clone to list
//   document.querySelector("#list tbody").appendChild(clone);
// }

// //Lave alle filtreringsknapper til variabler
// const allAnimalsFilterButton = document.querySelector("#all");
// const onlyCatsFilterButton = document.querySelector("#cats");
// const onlyDogsFilterButton = document.querySelector("#dogs");

// //Henter alle td

// // Her er koden der kun får de elektriske frem
// onlyCatsFilterButton.addEventListener("click", () => {
//   const table = document.querySelector("#list tbody");
//   const onlyCat = allAnimals.filter(isCat);
//   table.textContent = "";
//   displayList(onlyCat);
// });

// function isCat(animal) {
//   if (animal.type === "cat") {
//     return true;
//   } else {
//     return false;
//   }
// }

"use strict";

window.addEventListener("DOMContentLoaded", start);

const allAnimals = [];

function start() {
  loadJSON();
}

function loadJSON() {
  fetch("animals.json")
    .then((response) => response.json())
    .then((jsonData) => {
      prepareObjects(jsonData);
    });
}

function prepareObjects(jsonData) {
  jsonData.forEach((jsonObject) => {
    const newArray = jsonObject.fullname.split(" ");
    const animal = {
      name: newArray[0],
      type: newArray[3],
      desc: newArray[2],
      age: jsonObject.age,
    };
    allAnimals.push(animal);
  });
  displayList();
}

// Changed the displayList function to accept an optional 'animals' parameter
function displayList(animals = allAnimals) {
  document.querySelector("#list tbody").innerHTML = "";
  animals.forEach(displayAnimal);
}

function displayAnimal(animal) {
  const clone = document.querySelector("template#animal").content.cloneNode(true);
  clone.querySelector("[data-field=name]").textContent = animal.name;
  clone.querySelector("[data-field=desc]").textContent = animal.desc;
  clone.querySelector("[data-field=type]").textContent = animal.type;
  clone.querySelector("[data-field=age]").textContent = animal.age;
  document.querySelector("#list tbody").appendChild(clone);
}

const allAnimalsFilterButton = document.querySelector("#all");
const onlyCatsFilterButton = document.querySelector("#cats");
const onlyDogsFilterButton = document.querySelector("#dogs");

onlyCatsFilterButton.addEventListener("click", () => {
  // Filter only cat entries and display them
  const onlyCat = allAnimals.filter(isCat);
  displayList(onlyCat);
});

onlyDogsFilterButton.addEventListener("click", () => {
  const onlyDog = allAnimals.filter(isDog);
  displayList(onlyDog);
});

allAnimalsFilterButton.addEventListener("click", () => {
  // Display the full list of animals when "All" button is clicked
  displayList();
});

function isCat(animal) {
  return animal.type === "cat";
}

function isDog(animal) {
  return animal.type === "dog";
}
