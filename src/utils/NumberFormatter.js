export default class NumberFormatter {

    currencyFormatDE(num) {
        return (
            num
            .toFixed(2) // always two decimal digits
            .replace('.', ',') // replace decimal point character with ,
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' €'
        ) // use . as a separator
    }
      
      numberFormat(num, dec) {
        return (
          num
            .toFixed(dec) // always two decimal digits
            .replace('.', ',') // replace decimal point character with ,
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
        ) // use . as a separator
    }
}