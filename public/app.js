//dependency
const socket = io();

//selection
const nameForm = document.getElementById("name_form");
const nameFormArea = document.querySelector(".name");
const roomArea = document.querySelector(".room");

//set name
nameForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = nameForm[0].value;

  if (!name) return;
  socket.emit("setName", name, () => {
    nameFormArea.hidden = true;
    roomArea.hidden = false;
  });
});
