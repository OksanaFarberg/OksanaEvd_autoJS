 
 //

// describe("Публикация в телеграмм", () => {
//   it("telegrammbot", async () => {
//      const TELEGRAM_TOKEN = "7663492188:AAFgSaFtBO8CwMAv4XVhTgmwZHdMu2DNkEI";
//     const response = await fetch(
//       `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           chat_id: "-1002369026484",
//           text: "Я публикую это сообщение через запуск теста в Visual Studio Code",
//         }),
//       }
//     );
//     const result = await response.json();
//    //  console.log(result);
//    // expect(response.status).toEqual(200);
//     expect(result.ok).toBe(true);
//     expect(result.result.chat.title).toBe("Bot_qaJS_push");
//     expect(result.result.chat.id).toBe(-1002369026484);
//   });
// });
