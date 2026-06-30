function send() {
  var prompt = document.getElementById("prompt").value;
  var output = document.getElementById("output");
  output.textContent = "⏳ Отправка запроса...";

  var payload = JSON.stringify({
    model: "openai/gpt-4o-mini",
    messages: [{ role: "user", content: prompt }]
  });

  // Try fetch if available
  if (typeof fetch === "function") {
    try {
      fetch("https://ai-assistant.animaximus64.workers.dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        mode: "cors"
      })
      .then(function(res) { return res.json(); })
      .then(function(data) {
        var reply = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || JSON.stringify(data);
        output.textContent = reply;
      })
      .catch(function(err) {
        // If fetch exists but fails (e.g., TLS), fallback to XHR
        console.warn("fetch failed, falling back to XHR:", err);
        xhrFallback(payload, output);
      });
      return;
    } catch (e) {
      // fetch exists but throws synchronously
      console.warn("fetch threw, using XHR fallback:", e);
    }
  }

  // Fallback for old browsers
  xhrFallback(payload, output);
}

function xhrFallback(payload, output) {
  try {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://ai-assistant.animaximus64.workers.dev", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) return;
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          var data = JSON.parse(xhr.responseText);
          var reply = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || xhr.responseText;
          output.textContent = reply;
        } catch (e) {
          output.textContent = xhr.responseText;
        }
      } else {
        output.textContent = "Ошибка: " + xhr.status + " " + xhr.statusText;
      }
    };
    xhr.onerror = function() {
      output.textContent = "Сетевая ошибка при обращении к Worker";
    };
    xhr.send(payload);
  } catch (e) {
    output.textContent = "Браузер не поддерживает отправку запросов";
  }
}
function send() {
  var prompt = document.getElementById("prompt").value;
  var output = document.getElementById("output");
  output.textContent = "⏳ Отправка запроса...";

  var payload = JSON.stringify({
    model: "openai/gpt-4o-mini",
    messages: [{ role: "user", content: prompt }]
  });

  // Try fetch if available
  if (typeof fetch === "function") {
    try {
      fetch("https://ai-assistant.animaximus64.workers.dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        mode: "cors"
      })
      .then(function(res) { return res.json(); })
      .then(function(data) {
        var reply = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || JSON.stringify(data);
        output.textContent = reply;
      })
      .catch(function(err) {
        // If fetch exists but fails (e.g., TLS), fallback to XHR
        console.warn("fetch failed, falling back to XHR:", err);
        xhrFallback(payload, output);
      });
      return;
    } catch (e) {
      // fetch exists but throws synchronously
      console.warn("fetch threw, using XHR fallback:", e);
    }
  }

  // Fallback for old browsers
  xhrFallback(payload, output);
}

function xhrFallback(payload, output) {
  try {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://ai-assistant.animaximus64.workers.dev", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) return;
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          var data = JSON.parse(xhr.responseText);
          var reply = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || xhr.responseText;
          output.textContent = reply;
        } catch (e) {
          output.textContent = xhr.responseText;
        }
      } else {
        output.textContent = "Ошибка: " + xhr.status + " " + xhr.statusText;
      }
    };
    xhr.onerror = function() {
      output.textContent = "Сетевая ошибка при обращении к Worker";
    };
    xhr.send(payload);
  } catch (e) {
    output.textContent = "Браузер не поддерживает отправку запросов";
  }
}
