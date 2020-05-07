function sum(arr) {
  let sumNum = 0;
  arr.forEach((element) => (sumNum += element));
  return sumNum;
}

Array.prototype.sum = function () {
  let sumNum = 0;
  this.forEach((element) => (sumNum += element));
  console.log(sumNum);
};
// [1,2,3,4,5,6].sum();
[1, 2, 3].concat([4, 5, 6]).sum();

function val() {
  return new Promise((resolve, reject) => {
    resolve(1);
    setTimeout(() => {
      resolve(2);
    }, 2000);
  });
}
val().then((resp) => {
  console.log(resp);
});
