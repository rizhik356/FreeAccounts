import RenderAmmount from "./RenderAmmount.js";

const renderTable = (form) => {
    const newForm = new FormData(form);
    const name = newForm.get('paymentText');
    const number = newForm.get('paymentQuamnity') === '' ? 1 : newForm.get('paymentQuamnity');
    const counts = 'шт';
    const pay = new RenderAmmount(newForm.get('sumPayment'));
    const table = document.querySelector('.table');
    const sum = pay.toAmmountSum(number);
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="name">${name}</td>
      <td class="number">${number}</td>
      <td class="counts">${counts}</td>
      <td class="pay">${pay.toAmmount()}</td>
      <td class="sum">${sum}</td>
      <td  class="button"><button type="submit" class="btn btn-danger delete-btn">Удалить</button></td>
    `;

    if (table === null) {
        document.querySelector('.for-table').innerHTML = `
        <table class="table table-hover table-striped">
                                    <thead>
                                      <tr>
                                        <th scope="col">Наименование</th>
                                        <th scope="col">Кол-во</th>
                                        <th scope="col">Ед.</th>
                                        <th scope="col">Цена</th>
                                        <th scope="col">Сумма</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                  </table>
        `
    } 
    document.querySelector('tbody').append(tr);
    deleteTarget();
};

const deleteTarget = () => {
    const deleteBtn = document.querySelectorAll('.delete-btn');

    deleteBtn.forEach((btns) => {
        btns.addEventListener('click', (e) => {
          e.stopImmediatePropagation();  
          e.target.closest('tr').remove();
          if (document.querySelector('tbody').innerHTML.trim() == '') {
            document.querySelector('.table').remove();
          }
        });
    });
};

export { renderTable };