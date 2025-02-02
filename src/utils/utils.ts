 export const formattedCurrency = (amount: number) =>  new Intl.NumberFormat('ru-RU', {
     style: 'currency',
     currency: 'RUB'
 }).format(amount);