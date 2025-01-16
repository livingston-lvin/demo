const a = new Promise((res, rej) => {
  res('a');
});

const b = new Promise((res, rej) => {
  res('b');
});

a.then((res) => {
  console.log(res);
//   return b;
}).then((res) => {
  console.log(res);
});
