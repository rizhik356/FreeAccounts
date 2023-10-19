class RenderAmmount {

    constructor(num) {
        this.num = num;
    }

    toNormalize() {
       return this.num.replace(',', '.');
    }

    toAmmount(num = this.toNormalize()) {
        const renderAmmountFromNormalize = new Intl.NumberFormat('ru', { style: 'currency', currency: 'RUB'});
        return renderAmmountFromNormalize.format(num);
    }

    toAmmountWithoutCurrency() {
        return this.toAmmount(this.num).slice(0, -2);
    }

    toNumber() {
        return Number(this.num.replaceAll(' ', '').replace(',', '.'));
    }

    toAmmountSum(items) {
        const sum = this.num * items;
        return this.toAmmount(sum);
    }
}

export default RenderAmmount;