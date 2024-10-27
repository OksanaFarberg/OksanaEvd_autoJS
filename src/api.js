// const url = 'https://reqres.in'
/*
;(async () => {
  const response = await fetch(`${url}/api/users/2`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from('admin:123456').toString('base64')}`,
    },
    body: JSON.stringify({
      name: 'eorpheus21',
      job: 'leader23',
    }),
  })
  console.log('response.status', response.status)

  const data = await response.json()
  console.log('usser', data)
})()



//const url = 'https://bookstore.demoqa.com/Account/v1/GenerateToken'

;(async () => {
  const getToken = await fetch('https://bookstore.demoqa.com/Account/v1/GenerateToken', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userName: 'bob',
      password: '123Abcdef!'
    }),
  });

  const data = await getToken.json();
  console.log('status', getToken.status);
  console.log('data.token', data);

})()
*/