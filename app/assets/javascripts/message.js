$(function() {

  function buildHTML(message){

    image = (message.image) ? `<img class= "lower-message__image" src=${message.image} >`:"";

    var html =
      `<div class="message" data-message-id=${message.id}>
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
          ${image}
        </div>
      </div>`
    return html;
  }

  $('.new_message').on('submit', function(e){  
    e.preventDefault(); 
      var formData = new FormData(this); 
      var url = $(this).attr('action')

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function(data){
        buildHTML(data);
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');  
        $('form')[0].reset();
    })
    .fail(function(){
      alert('投稿に失敗しました');
    })
  })
  

  var reloadMessages = function () {
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      if ('messages'.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.messages').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight},'fast');
        $(".form__submit").prop("disabled", false);
      }
    })
    .fail(function() {
      alert ('メッセージ送信に失敗しました');
    });
  }
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});






