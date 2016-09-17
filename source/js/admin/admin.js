console.log('ADMIN!!!!');

//test es6 spread operator
function addNumbers(x, y, z){
  return x + y + z;
}

console.log(addNumbers(...[1,2,3]));
