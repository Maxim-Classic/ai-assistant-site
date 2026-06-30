function send() {
  var prompt = document.getElementById("prompt").value;
  var output = document.getElementById("output");
  output.innerHTML = "⏳ Отправка запроса...";

  var payload = JSON.stringify({
    model: "openai/gpt-4o-mini",
    messages: [{ role: "user", content: prompt }]
  });

  // Если fetch есть — пробуем
  if (typeof fetch === "function") {
    try {
      fetch("https://ai-assistant.animaximus64.workers.dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload
      })
      .then(function(res) { return res.json(); })
      .then(function(data) {
        var reply = data.choices[0].message.content;
        output.innerHTML = reply;
      })
      .catch(function(err) {
        console.log("fetch failed, fallback to XHR:", err);
        xhrFallback(payload, output);
      });
      return;
    } catch (e) {
      console.log("fetch threw, fallback:", e);
    }
  }

  // Старые браузеры → XHR
  xhrFallback(payload, output);
}

function xhrFallback(payload, output) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://ai-assistant.animaximus64.workers.dev", true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function() {
    if (xhr.readyState !== 4) return;

    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        var data = JSON.parse(xhr.responseText);
        var reply = data.choices[0].message.content;
        output.innerHTML = reply;
      } catch (e) {
        output.innerHTML = xhr.responseText;
      }
    } else {
      output.innerHTML = "Ошибка: " + xhr.status + " " + xhr.statusText;
    }
  };

  xhr.onerror = function() {
    output.innerHTML = "Сетевая ошибка при обращении к Worker";
  };

  xhr.send(payload);
}
