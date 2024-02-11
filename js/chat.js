$(document).ready(function () {
  const chatbotToggler = $(".chatbot-toggler");
  const closeBtn = $(".close-btn");
  const chatbox = $(".chatbox");
  const chatInput = $(".chat-input textarea");
  const sendChatBtn = $(".chat-input span");
  const message = $(".V");

  let userMessage = null;
  const inputInitHeight = chatInput.prop("scrollHeight");

  const createChatLi = (message, className) => {
    const chatLi = $("<li>").addClass("chat").addClass(className);
    let chatContent =
      className === "outgoing"
        ? $("<p>")
        : $("<span>")
            .addClass("material-symbols-outlined")
            .text("smart_toy")
            .add($("<p>"));
    chatLi.html(chatContent);
    chatLi.find("p").text(message);
    return chatLi;
  };

  const generateResponse = (chatElement) => {
    const thread=localStorage.getItem("thread")
    const messageElement = chatElement.find("p");
    const API_URL = "https://new-web-d0cb.onrender.com/api/";
    $.ajax({
      url: API_URL,
      method: "POST",
      data: { message: userMessage, thread:thread },
      success: (data) => {
        messageElement.text(data.response);
        localStorage.setItem("thread",data.thread)
      },
      error: () => {
        messageElement
          .addClass("error")
          .text("Oops! Something went wrong. Please try again.");
      },
      complete: () => chatbox.scrollTop(chatbox.prop("scrollHeight")),
    });
  };

  const handleChat = () => {
    userMessage = chatInput.val().trim();
    if (!userMessage) return;

    chatInput.val("");
    chatInput.css("height", `${inputInitHeight}px`);

    chatbox.append(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTop(chatbox.prop("scrollHeight"));

    setTimeout(() => {
      const incomingChatLi = createChatLi("Thinking...", "incoming");
      chatbox.append(incomingChatLi);
      chatbox.scrollTop(chatbox.prop("scrollHeight"));
      generateResponse(incomingChatLi);
    }, 500);
  };

  chatInput.on("input", () => {
    chatInput.css("height", `${inputInitHeight}px`);
    chatInput.css("height", `${chatInput.prop("scrollHeight")}px`);
  });

  chatInput.on("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
      e.preventDefault();
      handleChat();
    }
  });

  sendChatBtn.on("click", handleChat);
  closeBtn.on("click", () => $("body").removeClass("show-chatbot"));

  chatbotToggler.on("click", () => $("body").toggleClass("show-chatbot"));

  // message :
  setTimeout(function () {
    message.addClass("show");
    chatbotToggler.addClass('showT')
    var audio = new Audio('./js/message.mp3')
    audio.play();
  }, 10000);

  $("#close").click(function () {
    message.removeClass("show");
  });
  message.on("click", () => $("body").toggleClass("show-chatbot"));
  message.on("click", () => message.removeClass("show"));
  chatbotToggler.on("click", () => message.removeClass("show"));
  // end message
});
