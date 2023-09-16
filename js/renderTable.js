const renderTable = (form) => {
    const newForm = new FormData(form);
    const name = newForm.get('paymentText');
    const number = newForm.get('paymentQuamnity') === '' ? 1 : newForm.get('paymentQuamnity');
    const counts = 'шт';
    const pay = newForm.get('sumPayment').replace(',', '.');
    const table = document.querySelector('.table');
    const normalizeSum = new Intl.NumberFormat('ru', { style: 'currency', currency: 'RUB'});
    const sum = normalizeSum.format(pay * number);
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="name">${name}</td>
      <td class="number">${number}</td>
      <td class="counts">${counts}</td>
      <td class="pay">${normalizeSum.format(pay)}</td>
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
          e.target.closest('tr').remove();
          if (document.querySelector('tbody').innerHTML.trim() == '') {
            document.querySelector('.table').remove();
          }
        });
    });
};

export { renderTable };