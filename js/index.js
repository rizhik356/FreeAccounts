import { renderTable } from "./renderTable.js";
import { renderPDF } from "./renderPDF.js";

const forms = {
    payForm: document.querySelector('.payForm'),
    dataForm: document.querySelector('.first-form'),
    footerForm: document.querySelector('.footer-form'),
};
let i = 0;

document.querySelector('.addPayment').addEventListener('click', (e) =>{
    e.preventDefault();
    renderTable(forms.payForm);
    forms.payForm.reset();
});

document.querySelector('.finish').addEventListener('click', (e) => {
    e.preventDefault();
    renderPDF(forms.dataForm, forms.footerForm, i);
    Object.values(forms).forEach((item) => item.reset());
    document.querySelector('.for-table').innerHTML = '';
    i = 0;
});
