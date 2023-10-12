import { test, expect } from '@playwright/test';

test.skip('creation of todo should work', async ({ request }) => {

  //Arrange
  const title= "First test"

  //Act
  const resp=await request.post('/v1/todo',{
    data:{
        title
    },
    headers:{
      'Content-Type':'application/json'
    }
  })

  //Assert
  expect(resp.status()).toBe(201)
  const body=await resp.json()
  expect(body.id).not.toBe(null)
  expect(body.title).toBe(title)

  const respsingle= await request.get(`/v1/todo/${body.id}`)
  const bodysingle=await resp.json()
  expect(bodysingle.id).not.toBe(null)
  expect(bodysingle.title).toBe(title)
});

//Group test
test.describe("Group 1",()=>{
  test('Addition', () => {
    expect(2+5).toBe(7)
    
  });
  test('Multiplication', () => {
    expect(5*2).toBe(10)
    
  });
  test('Subtraction', () => {
    expect(5-2).toBe(3)
    
  });

})

//beforeEach/AfterEach
test.describe("Update todo",()=>{
  test.beforeEach(async ({request},testInfo)=>{
    const title="Testing"
    const resp1=await request.post('v1/todo',{
      data:{
        title
      },
      headers:{
        'Content-Type':'application/json'
      }

    })
    testInfo['body']=await resp1.json()
  })
    test("update data",async({request},testInfo)=>{
      const body=testInfo['body']
      const title="Testing In-progress"
      const resp=await request.patch(`v1/todo/${body.id}`,{
        data:{
          title
        },
        headers:{
          'Content-Type':'application/json'
        }
      })
      expect(resp.status()).toBe(200);
    })
    test.afterEach(async({request},testInfo)=>{
      const body=testInfo['body']
      await request.delete(`v1/todo/${body.id}`)
      

    })

  })
  

