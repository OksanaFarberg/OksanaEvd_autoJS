const keyAgewq = 'afdreee'

const firstObj = {
  name: 'OKsa',
  age: 181,
  [keyAgewq]: 2900,
  rerere: 'quququ',
  roles: ['mentor', 'tescher'],
  greet: function () {
    console.log('hi, baby')
  },
  sociales: {
    vk: 'myvk',
    tg: 'mytg',
  },
  'key with spasic': 'param pam',
}

// let { age , ...yree} = firstObj
// console.log( yree);
// -------------
// тут через Object.assign соединяем пустой объект с любым другим и получаем 
// новый объект с новой ссылкой на новую память
const newObj2 = Object.assign({}, firstObj);
// абсолютно аналогично происходит тут, но через спред-рест оператор 
// создали новый объект и в него записали все ключ-значения
const newObj45 = { ... firstObj};
console.log(newObj2); 
console.log(newObj45);
  

/* const name = firstObj.name
const age = firstObj.age
const roles = firstObj.roles
const rerere = firstObj.name
*/
// сверху и снизу одинаковые записи! создали переменные из свойств объекта
// плюс все что не вошло влоди в переменную rest 
const {name, age, roles, rerere, ...qrest} = firstObj
console.log(qrest);

if('sociales' in firstObj) console.log('22sociales');

for(const kluch in firstObj) {
   // console.log(`свойство: ${kluch}, value: ${firstObj[kluch]}`);
    console.log(firstObj[kluch]);
}

// console.log(process.env.SERVER_URL);