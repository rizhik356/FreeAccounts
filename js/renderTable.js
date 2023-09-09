const renderTable = (form) => {
    const newForm = new FormData(form);
    const name = newForm.get('paymentText');
    const number = newForm.get('paymentQuamnity') === '' ? 1 : newForm.get('paymentQuamnity');
    const counts = 'шт';
    const pay = newForm.get('sumPayment');
    const table = document.querySelector('.table');
    const sum = number * pay;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${name}</td>
      <td>${number}</td>
      <td>${counts}</td>
      <td>${pay}</td>
      <td>${sum}</td>
      <td><button type="submit" class="btn btn-danger delete-btn">Удалить</button></td>
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