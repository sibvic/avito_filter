function showInfo(message) {
    $('#error_message').css('display', 'inline');
    $('#error_message').addClass('success');
    $('#error_message').removeClass('warning');
    $('#error_message').html(message);
    setTimeout(function() {
        $('#error_message').css('display', 'none');
        $('#error_message').html('');
    }, 5000);
}

function set_read_mode(value) {
    if (value == "minify") {
        document.getElementById('read_show_mode').textContent = "Уменьшать";
        return;
    }
    if (value == "minify_and_label") {
        document.getElementById('read_show_mode').textContent = "Уменьшать и добавлять метку";
        return;
    }
    document.getElementById('read_show_mode').textContent = value;
}
function get_read_mode() {
    var selectedValue = document.getElementById('read_show_mode').textContent;
    if (selectedValue === "Уменьшать") {
        return "minify";
    }
    if (selectedValue === "Уменьшать и добавлять метку") {
        return "minify_and_label";
    }
    return "minify";
}
$('.dropdown-menu li a').on('click', function(){
    document.getElementById('read_show_mode').textContent = $(this).text();
});

function save_options() {
    chrome.storage.sync.set({
        read_show_mode: get_read_mode()
    }, function() {
        showInfo("Сохранено");
    });
}
function load_options() {
    chrome.storage.sync.get({
        read_show_mode: "minify"
    }, function(item) {
        set_read_mode(item.read_show_mode);
    });
}
document.getElementById('save_button').addEventListener('click', save_options);
load_options();