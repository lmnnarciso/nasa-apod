
  export function addDate(dt: Date, amount: number, dateType: string) {
    switch (dateType) {
      case 'days':
        return dt.setDate(dt.getDate() + amount) && dt
      case 'weeks':
        return dt.setDate(dt.getDate() + 7 * amount) && dt
      case 'months':
        return dt.setMonth(dt.getMonth() + amount) && dt
      case 'years':
        return dt.setFullYear(dt.getFullYear() + amount) && dt
    }
  }