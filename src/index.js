document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/dogs")
    .then((res) => res.json())
    .then((dogs) => displayDogs(dogs))
    .catch((error) => console.error(error));
});

//Function to display dogs
function displayDogs(dogs) {
  dogs.forEach((dog) => {
    const tbody = document.querySelector("#table-body");
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${dog.name}</td>
    <td>${dog.breed}</td>
    <td>${dog.sex}</td>
    <td><button class="editBtn">Edit</button></td>
    `;
    tbody.appendChild(tr);

    const editBtn = tr.querySelector(".editBtn");
    editBtn.addEventListener("click", () => {
      populateForm(dog);
    });

    //Handle form submit
    const form = document.getElementById("dog-form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      fetch(`http://localhost:3000/dogs/${currentDog.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    });
  });
}

//Function to populate the input form
function populateForm(dog) {
  const name = document.querySelector("#dog-form input:nth-of-type(1)");
  const breed = document.querySelector("#dog-form input:nth-of-type(2)");
  const sex = document.querySelector("#dog-form input:nth-of-type(3)");
  name.value = dog.name;
  breed.value = dog.breed;
  sex.value = dog.sex;
  currentDog = dog;
}
