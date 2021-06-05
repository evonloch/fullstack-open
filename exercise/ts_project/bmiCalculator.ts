const calculateBmi = (h: number, w: number) => {
    const value : number = w / (h*h/10000);
    if(value <= 15) {
        return 'Very severely underweight';
    } else if (value > 15 && value <= 16) {
        return 'Severely underweight';
    }else if(value > 16 && value <= 18.5) {
        return 'Underweight';
    }else if(value > 18.5 && value <= 25) {
        return'Normal (healthy weight)';
    }else {
        return'Overweight';
    }

}

console.log(calculateBmi(180, 74));

export const parseAndCalculateBmi = (arg1: any, arg2: any) => {
    if (!arg1 || !arg2) {
      throw "You need to provide both height and weight";
    }
  
    const height = parseFloat(arg1);
    const weight = parseFloat(arg2);
  
    if (Number.isNaN(height) || Number.isNaN(weight)) {
      throw "Both height and weight need to be numbers";
    }
  
    return calculateBmi(height, weight);
  };
  
  if (process.argv.length > 2) {
    console.log(parseAndCalculateBmi(process.argv[2], process.argv[3]));
  }