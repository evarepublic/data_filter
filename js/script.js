"use strict";

const hideAllResponseBlocks = () => {
  const responseBlocksArray = Array.from(
    document.querySelectorAll("div.dialog__response-block")
  );
  console.log(responseBlocksArray);
  responseBlocksArray.forEach((block) => (block.style.display = "none"));
};

const showResponseBlock = (blockSelector, msgText, spanSelector) => {
  hideAllResponseBlocks();
  document.querySelector(blockSelector).style.display = "block";
  if (spanSelector) {
    document.querySelector(spanSelector).textContent = msgText;
  }
};

const showError = (msgText) =>
  showResponseBlock(".dialog__response-block_error", msgText, "#error");

const showResults = (msgText) =>
  showResponseBlock(".dialog__response-block_ok", msgText, "#ok");

const showNoResults = () =>
  showResponseBlock(".dialog__response-block_no-results");

const filterByType = (type, values) => {
  const valArr = [];
  values.split(", ").forEach((item) => {
    if (+item) {
      item = +item;
    } else if (item === "true" || item === "false") {
      item = item === "true" ? true : false;
    }
    valArr.push(item);
  });
  values = valArr.filter((value) => typeof value === type);
  try {
    const valuesArray = values.join(", ");
    const alertMsg = valuesArray.length
      ? `Данные с типом ${type}: ${valuesArray}`
      : `Отсутствуют данные типа ${type}`;
    showResults(alertMsg);
  } catch (err) {
    showError(`Ошибка: ${err}`);
  }
};

const filterButton = document.querySelector("#filter-btn");

filterButton.addEventListener("click", (e) => {
  const typeInput = document.querySelector("#type");
  const dataInput = document.querySelector("#data");

  if (dataInput.value === "") {
    dataInput.setCustomValidity("Поле не должно быть пустым!");
    showNoResults();
  } else {
    dataInput.setCustomValidity("");
    e.preventDefault();
    filterByType(typeInput.value.trim(), dataInput.value.trim());
  }
});
