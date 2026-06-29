function send() {
  const prompt = document.getElementById("prompt").value;
  const output = document.getElementById("output");

  output.textContent = "⏳ Отправка запроса...";

  fetch("https://ai-assistant.animaximus64.workers.dev", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "openai/gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    })
  })
  .then(res => res.json())
  .then(data => {
    const reply = data.choices?.[0]?.message?.content || JSON.stringify(data);
    output.textContent = reply;
  })
  .catch(err => {
    output.textContent = "Ошибка: " + err;
  });
}
