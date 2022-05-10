// const test = document.querySelector(".test");
// const test1 = document.querySelector(".test");

// const person = [
//     {
//         id : 1,
//         fName : "Milad",
//         LName : "Amiri"
//     },
//     {
//         id : 2,
//         fName : "Ahmad",
//         LName : "khan"
//     },
//     {
//         id : 3,
//         fName : "Ali",
//         LName : "Ahmadi"
//     },
// ]

// const displayPerson = () => {
//     const div = document.createElement("div");
//     const map = person.map((item) => {
//         return `
//             <div>${item.fName} ${item.LName}</div>
//             <button class="btn" data-id=${item.id}>Show id</button>
//         `
//     });
//     div.innerHTML = (map).join(' ');
//     test.appendChild(div);
// }

// const findPerson = (id) => {
//     const btns = [...document.querySelectorAll(".btn")]
//     btns.forEach((btn) => {
//         const id = btn.dataset.id;
//         btn.addEventListener("click", () => {
//             const persons = person.find((item) => item.id === id);
//             const div = document.createElement("div");
//             div.innerHTML = `
//                 <div>${persons.fName} ${persons.LName}</div>
//             `
//             console.log(div)
//         })
//     })
// }


// document.addEventListener("DOMContentLoaded", () => {
//     displayPerson()
//     findPerson(1)
// });