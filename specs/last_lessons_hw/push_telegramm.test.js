describe("Публикация в телеграмм", () => {
  it("telegrammbot", async () => {
    const tokenBot = "7663492188:AAFgSaFtBO8CwMAv4XVhTgmwZHdMu2DNkEI";
    const response = await fetch(
      `https://api.telegram.org/bot${tokenBot}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: "-1002369026484",
          text: "Я публикую это соо через запуск теста в Visul Studio Code",
        }),
      }
    );
    const result = await response.json();
    console.log(result);
    expect(response.ok).toBe(true);
    expect(result.ok).toBe(true);
    expect(result.result.chat.id).toBe(-1002369026484);
  });
});
