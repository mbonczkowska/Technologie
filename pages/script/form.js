$(function () {
    var socket = io.connect();
    $zgloszenie = $('#formularz');
    $wybrany = $('#wybrany');
    $imie = $('#inputName');
    $nazwisko = $('#inputSurname');
    $email = $('#inputEmail');
    $telefon = $('#inputPhone');
    $panel= $('#panel');

    $zgloszenie.submit(function (e) {
        e.preventDefault();

        socket.emit('zgloszenie do adopcji',  {wybrany : $wybrany.val(),telefon: $telefon.val(),email:$email.val(),nazwisko:$nazwisko.val(),imie:$imie.val()});
        $panel.show();
        $imie.val('');
        $nazwisko.val('');
        $email.val('');
        $telefon.val('');
    });
});