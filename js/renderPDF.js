import { sum_letters } from "./AmmountInWords.js";

const renderPDF = (form1, form2, i) => {
    const newForm = new FormData(form1);
    const entries = [...newForm.entries()];
    const accountData = {};

    entries.forEach(([key, value]) => accountData[key] = value);
    const price = renderAccountPrice();

    const docDefinition = {
        info: {
          title: 'Счет на оплату',
          author: 'rizhik356',
          subject: 'Счет на оплату',
          keywords: 'Счет',
        },
        pageSize: 'A4',
        pageMargins: [ 40, 60, 40, 60 ],
        content:  [
            {
                table: {
                    widths: ['*', '*', 'auto', '*'],
                    body: [
                        [{colSpan:2, rowSpan: 3, text: [
                            { text: `${accountData.bank}`},
                            { text: '\n\nБанк получателя', fontSize: 10 }
                        ]}, {}, 
                        { text: 'БИК', fontSize: 13 },
                        { text: `${accountData.BIK}`}
                    ],
                    ['', '', 'Сч. №', `${accountData.correctionAccount}`],
					['', '', { colSpan: 2, text: ''}, ''],
                    [{ text: `ИНН ${accountData.INN}`}, 'КПП', 'Сч. №', `${accountData.accountNumber}`],
                    [{ colSpan:2, text: [
                        { text: `${accountData.name}`},
                        { text: '\n\nБанк получателя', fontSize: 10 }
                    ]}, {}, 
                    {},
                    {},
                    ]
                    ]
                }
            },
            {
                text: `Счет на оплату № ${makeNumAccount(form2)} от ${makeData(form2, 'inputDatePayment')} г.`,
                style: 'header',
                bold: true,
                alignment: 'left',
                margin: [0, 20, 0, 0],
            },
            {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 2 } ]},
            {
                columns: [
                    {
                        width: 'auto',
                        text: `Поставщик\n(Исполнитель):`,
                        margin: [0, 0, 15, 0]
                    },
                    {
                        width: '*',
                        text: `${accountData.name}, ${accountData.INN}, ${accountData.adress}, тел.: ${accountData.phone}`
                    }
                ],
                margin:[0, 10, 0, 0],
            },
            {
                columns: [
                    {
                        width: 'auto',
                        text: `Покупатель\n(Заказчик):`,
                        margin: [0, 0, 15, 0]
                    },
                    {
                        width: '*',
                        text: `${accountData.name2}, ${accountData.INN2}, ${accountData.index2}, ${accountData.KPP2}, ${accountData.adress2}`
                    }
                ],
                margin:[0, 10, 0, 0],
            },
            {
                columns: [
                    {
                        width: 'auto',
                        text: `Основание:`,
                        margin: [0, 15, 15, 0],
                    },
                    {
                        width: '*',
                        text: `Основной договор`,
                        bold: true,
                        margin: [0, 15, 0, 15],
                    }
                ]
            },
            makeTable(price),
            {
                columns: [
                    {
                        width: '*',
                        text: '',
                    },
                    {
                        width: 'auto',
                        text: 'Итого:',
                        bold: true
                    }, 
                    {
                        width: 'auto',
                        text: makeSum('formatSum'),
                        margin: [15, 0, 0, 0],
                    }
                ],
                margin: [0, 15, 0, 0],
            },
            {
                columns: [
                    {
                        width: '*',
                        text: '',
                    },
                    {
                        width: 'auto',
                        text: 'В том числе НДС:',
                        bold: true
                    }, 
                    {
                        width: 'auto',
                        text: makeNDS(form2, 'nds'),
                        margin: [15, 0, 0, 0],
                    }
                ],
                margin: [0, 15, 0, 0],
            },
            {
                columns: [
                    {
                        width: '*',
                        text: '',
                    },
                    {
                        width: 'auto',
                        text: 'Всего к оплате:',
                        bold: true
                    }, 
                    {
                        width: 'auto',
                        text: makeNDS(form2, 'sum'),
                        margin: [15, 0, 0, 0],
                    }
                ],
                margin: [0, 15, 0, 0],
            },
            {
                columns: [
                    {
                        width: 'auto',
                        text: `Всего наименований ${i}, на сумму ${makeNDS(form2, 'sum')} руб.`,
                    }
                ]
            },
            {
                columns: [
                    {
                        width: 'auto',
                        text: sum_letters(makeNDS(form2, 'sumWithoutRender')),
                        bold: true,
                        margin: [0, 5, 0, 0],
                    }
                ]
            },
            {
                columns: [
                    {
                        width: 'auto',
                        text: `Оплатить не позднее ${makeData(form2, 'inputMaxDatePayment')} г.`,
                        margin: [0, 15, 0, 0],
                    }
                ]
            },
            {
                columns: [
                    {
                        width: 'auto',
                        text: 'Оплата данного счета означает согласие с условиями поставки товара.',
                        margin: [0, 5, 0, 0],
                    }
                ]
            },
            {
                columns: [
                    {
                        width: 'auto',
                        text: 'Уведомление об оплате обязательно, в противном случае не гарантируется наличие товара на складе.',
                        margin: [0, 5, 0, 0],
                    }
                ]
            },
            {
                columns: [
                    {
                        width: 'auto',
                        text: 'Товар отпускается по факту прихода денег на р/с Поставщика, самовывозом, при наличии доверенности и паспорта.',
                        margin: [0, 5, 0, 15],
                    }
                ]
            },
            {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 2 } ]},
            {
                columns: [
                    {
                        width: 'auto',
                        text: 'Предприниматель',
                        bold: true,
                        margin: [0, 0, 80, 0]
                    },
                    {
                        table: {
                            widths: ['*'],
                            body: [
                                [
                                    {
                                        text: `${accountData.name}`,
                                        border: [false, false, false, true],
                                        alignment: 'right',
                                    }
                                ]
                            ]
                        }
                    }
                ],
                margin: [0, 15, 0, 0],
            }
        ]
      }
      // eslint-disable-next-line no-undef
      pdfMake.createPdf(docDefinition).open();
};
const makeNumAccount = (form2) => {
    const form = new FormData(form2)
    .get('numAccount');
    return form === '' ? 1 : form;
}

const makeData = (form2, name) => {
    const form = new FormData(form2);
    const dateControl = form.get(name);
    const date = new Date(dateControl);
    let formatter1 = new Intl.DateTimeFormat("ru");
    return formatter1.format(date);
};

const makeNDS = (form2, rule) => {
    const form = new FormData(form2);
    const getForm = form.get('NDSSelect');
    const normalizeNds = getForm !== 'Без НДС' ? Number(getForm.slice(0, -1)) : 0;
    const sum = makeSum('sum'); 
    const sumWithNds = sum + (normalizeNds * sum) / 100;
    if (rule === 'nds') {
        return getForm;
    } if (rule === 'sum') {
        const formatToSumWithNds = new Intl.NumberFormat('ru', { style: 'currency', currency: 'RUB'})
        .format(sumWithNds).slice(0, -2);
        return formatToSumWithNds;
    } if (rule === 'sumWithoutRender') {
        return sumWithNds;
    }
};

const makeSum = (rule) => {
    const renderPrice = renderAccountPrice();
    const renderPriceToNumber = renderPrice.reduce((acc, item) => {
       return Number(item.sum.replace(' ', '').replace(',', '.')) + acc
    }, 0);
         if (rule === 'sum') {
            return renderPriceToNumber;
         } if (rule === 'formatSum') {
            const formatToCuurency = new Intl.NumberFormat('ru', { style: 'currency', currency: 'RUB'});
            return formatToCuurency.format(renderPriceToNumber).slice(0, -2);
         }
}

const renderAccountPrice = () => {
    const accountPrice = [];
    const tableBody = document.querySelector('tbody');
    const tableRows = tableBody.querySelectorAll('tr');
    tableRows.forEach((tableRow) => {
        const priceData = {};
    Array.from(tableRow.querySelectorAll('td'))
    .filter((item) => !item.classList.contains('button'))
    .forEach((item) => {
        if (item.classList.contains('sum') || item.classList.contains('pay')) {
            priceData[item.classList] = item.textContent.slice(0, -2);
        } else {
            priceData[item.classList] = item.textContent;
        }
    });
     accountPrice.push(priceData);
    });
    return accountPrice;
};

const makeTable = (price) => {
    const newTable = {
        table: {
            widths: ['auto','*', 'auto', 'auto', 'auto', 'auto'],
            body: [
                ['№','Наименование работ, услуг', 'Кол-вo', 'Ед.', 'Цена', 'Сумма'],
            ],
        }
    };

    price.map((item, i) => {
       const arr = [];
       i += 1;
       Object.values(item).forEach((value) => arr.push(value));
       arr.unshift(i);
       newTable.table.body.push(arr);
    });
return newTable;


}

export { renderPDF };
