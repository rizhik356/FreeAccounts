import { renderTable } from "./renderTable.js";
import { renderPDF } from "./renderPDF.js";

const payForm = document.querySelector('.payForm');
const dataForm = document.querySelector('.first-form')
document.querySelector('.addPayment').addEventListener('click', (e) =>{
    e.preventDefault();
    renderTable(payForm);
    payForm.reset();
});

document.querySelector('.finish').addEventListener('click', (e) => {
    e.preventDefault();
    renderPDF(dataForm);
    dataForm.reset();
})