function buildHTML(message){
  var image = message.image ?`<img src= "${message.image}">`:""; 
  var html =
    `<div class="chat-main" data-message-id=${message.id}>
      <div class="message-list__top">
        <div class="message-list__top__name">
          ${message.user_name}
        </div>
        <div class="message-list__top__date">
          ${message.created_at}
        </div>
      </div>
      <div class="message-list__message">
        <p class="lower-message__content">
          ${message.content}
        </p>
      </div>
      <img src=${message.image} >
    </div>`
    return html;
  }
$('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action');
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
  .done(function(data){
    var html = buildHTML(data);
    $('.message-list').append(html);
    $('.message-list').animate({scrollTop: $('.message-list')[0].scrollHeight}, 'fast');
    $('form')[0].reset();
    $(".form__submit").prop("disabled", false);
  })
  .fail(function() {
    alert ('メッセージ送信に失敗しました');
  });
});