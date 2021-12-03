document.addEventListener('DOMContentLoaded', () => {
  getDogs()
  
  document.querySelector("#dog-form").addEventListener("submit", handleSubmit)
})

function getDogs() {
  fetch("http://localhost:3000/dogs/")
  .then(res => res.json())
  .then(dogData => {
    dogData.forEach(dog => {
      renderDog(dog)
    })
  })
}

function handleSubmit(event) {
  event.preventDefault()

  let dogNum = document.querySelector("input[type='submit']").id

  fetch(`http:localhost:3000/dogs/${dogNum}`)
  .then(res => res.json())
  .then(dogData => {
    updateDog(dogData)
  })
}

function renderDog(dog) {
  const tbody = document.querySelector("#table-body")
  const tr = document.createElement("tr")
  const td1 = document.createElement("td")
  const td2 = document.createElement("td")
  const td3 = document.createElement("td")
  const td4 = document.createElement("td")
  const btn = document.createElement("button")

  td1.innerText = dog.name
  td2.innerText = dog.breed
  td3.innerText = dog.sex
  td4.id = dog.id
  td4.appendChild(btn)
  btn.innerText = "Edit Dog"

  btn.addEventListener("click", () => {
    document.querySelector("input[name='name']").setAttribute("value", dog.name)
    document.querySelector("input[name='breed']").setAttribute("value", dog.breed)
    document.querySelector("input[name='sex']").setAttribute("value", dog.sex)
    document.querySelector("input[type='submit']").id = dog.id
  })

  tr.appendChild(td1)
  tr.appendChild(td2)
  tr.appendChild(td3)
  tr.appendChild(td4)
  tbody.appendChild(tr)
}

function updateDog(dog) {
  let editData = {
    name: document.querySelector("input[name='name']").value,
    breed: document.querySelector("input[name='breed']").value,
    sex: document.querySelector("input[name='sex']").value
  }

  fetch(`http://localhost:3000/dogs/${dog.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(editData)
  })
  .then(res => res.json())
  .then(dogData => {
    renderDog(dogData)
  
    clearTable()
    getDogs()
  })
}

function clearTable() {
  const dogTable = document.querySelector("tbody")
  while (dogTable.firstChild) {
    dogTable.removeChild(dogTable.firstChild)
  }
}
