const getEl = (element) => {
  return document.querySelector(element);
};
const rawData = localStorage.getItem("taskArr") || null;
let taskArr = rawData ? JSON.parse(rawData) : [];

function submitData(e) {
  e.preventDefault();
  const taskInfo = getEl("#task-info").value.trim();
  const dateInput = String(getEl("#date-input").value);
  const taskDate = dateInput.slice(8, 10);
  const taskMonth = dateInput.slice(5, 7);
  const taskYear = dateInput.slice(0, 4);
  const taskLevel = getEl("#task-level").value;
  let todayTime = new Date();
  let isValidated = true;
  if (taskInfo === "") {
    alert("Please input your task");
    isValidated = false;
    return;
  }
  if (taskDate < parseInt(todayTime.getDate())) {
    alert("Date can't be smaller than today!");
    isValidated = false;
    return;
  }
  if (taskMonth < parseInt(todayTime.getMonth() + 1)) {
    alert("Month can't be smaller than this month!");
    isValidated = false;
    return;
  }
  if (taskYear < parseInt(todayTime.getFullYear())) {
    alert("Year can't be smaller than this year!");
    isValidated = false;
    return;
  }
  let singleTask = { taskInfo, dateInput, taskLevel };
  isValidated === true ? (taskArr = [...taskArr, { ...singleTask }]) : null;
  localStorage.setItem("taskArr", JSON.stringify(taskArr));
}

function printData() {
  let filterBy = this.dataset.filter;
  let listTask = "";
  let filterArr = [];
  if (filterBy === "all") {
    filterArr = taskArr;
  }
  if (filterBy === "nor") {
    filterArr = [...taskArr].filter((task) => task.taskLevel === "Normal");
  }
  if (filterBy === "int") {
    filterArr = [...taskArr].filter(
      (task) => task.taskLevel === "Intermediate"
    );
  }
  if (filterBy === "urg") {
    filterArr = [...taskArr].filter((task) => task.taskLevel === "Urgent");
  }
  for (let task of filterArr) {
    listTask =
      listTask +
      `<div class="task">
      <h1>${task.taskInfo}</h1>
      <div class="task-delete" onclick='getEl(".delete-confirm").classList.add("visible")'></div>
      <div class="delete-confirm">
      <h2>Bạn có muốn xóa task ${task.taskInfo} không?</h2>
      <button id="confirmYes" onclick='this.parentElement.parentElement.remove();
      
      '>Yes</button>
      <button id="confirmNo" onclick='getEl(".delete-confirm").classList.remove("visible")'>No</button>
      </div>
      <p>Deadline: <span class="date-input">${task.dateInput}</span></p>
      <p>Level task: <button class="task-level">${task.taskLevel}</button></p>
      </div>`;
  }
  getEl(".task-container").innerHTML = listTask;
}

getEl("#submit").addEventListener("click", submitData);
getEl("#submit").addEventListener("click", printData);
[...document.getElementsByClassName("filter")].forEach((el) =>
  el.addEventListener("click", printData)
);
