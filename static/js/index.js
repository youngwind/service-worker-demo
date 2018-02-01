$.ajax('/getList').done(function (res) {
    res.data.forEach(item => {
        $('#list').append(`<li>${item}</li>`)
    })
});