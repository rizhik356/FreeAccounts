const renderPDF = (form) => {
    const newForm = new FormData(form);
    const entries = [...newForm.entries()];
    const accountData = {};

    entries.forEach(([key, value]) => accountData[key] = value);
    console.log(accountData);
};

export { renderPDF };
