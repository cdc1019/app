$(function() {
    $.ajax({
        url: '/api/list',
        dataType: 'json',
        success: function(data) {
            var html = "";
            data.mag.list.forEach(function(file) {

                html += `  <dl>
                                <dt>
                                <img src="${file.img}" alt="">
                                </dt>
                                <dd>
                                    <b>${file.title}</b>
                                </dd>
                           </dl>`
            })
            $('.list_dl').html(html)
        }
    })
})