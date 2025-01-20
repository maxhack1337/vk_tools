const formatValueInt = (value: number) => {
        if (value >= 1000000000) {
          return Math.floor(value / 1000000000) * 1000000000;
        } else if (value >= 1000000) {
          return Math.floor(value / 1000000) * 1000000;
        } else if (value >= 10000) {
          return Math.floor(value / 1000) * 1000;
        } else {
          return value;
        }
}
      
export default formatValueInt;