/*****************************
 * CODING CHALLENGE 4
 */

/*
  Let's remember the first coding challenge where Mark and John compared their BMIs. Let's now implement the same functionality with objects and methods.
  1. For each of them, create an object with properties for their full name, mass, and height
  2. Then, add a method to each object to calculate the BMI. Save the BMI to the object and also return it from the method.
  3. In the end, log to the console who has the highest BMI, together with the full name and the respective BMI. Don't forget they might have the same BMI.

  Remember: BMI = mass / height^2 = mass / (height * height). (mass in kg and height in meter).

  GOOD LUCK 😀
*/

var msg;

var john = {
  fullName: 'John Doe',
  weight: 89,
  height: 1.92,
  bmi: function() {
    return this.weight / this.height ** 2;
  }
};

var mark = {
  fullName: 'Mark Smith',
  weight: 73,
  height: 1.50,
  bmi: function() {
    return (this.weight / this.height ** 2).toFixed(2);
  }
};

if (john.bmi() > mark.bmi())
  msg = john.fullName + ' has a higher BMI (' + john.bmi() + ') than Mark.';
else if (mark.bmi() > john.bmi())
  msg = mark.fullName + ' has a higher BMI (' + mark.bmi() + ') than John.';
else
  msg = mark.fullName + ' and ' + john.fullName + ' have the same BMI.';

console.log(msg);
