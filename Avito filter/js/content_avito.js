var options = {};

function findItemContent(item) {
    var subitems = item.find("div");
    for (const element of subitems) {
        var subitem = $(element);
        if (subitem.attr("class").search("iva-item-content-") !== -1) {
            return subitem;
        }
    }
    return null;
}

function findDivByClassStart(item, classStart) {
    var subitems = item.find("div");
    for (const element of subitems) {
        var subitem = $(element);
        if (subitem.attr("class").search(classStart) !== -1) {
            return subitem;
        }
    }
    return null;
}

function findBody(item) { return findDivByClassStart(item, "iva-item-body-"); }

function hideElements(body) {
    var subitems = body.find("div");
    for (const element of subitems) {
        var subitem = $(element);
        var className = subitem.attr("class");
        if (className === undefined) {
            continue;
        }
        if (className.search("iva-item-descriptionStep-") !== -1
            || className == ""
            || className.search("va-item-dateInfoStep-") !== -1) {
            subitem.hide();
        }
    }
}

function findSlider(item) {
    if (item === null || item === undefined) {
        return null;
    }
    return findDivByClassStart(item, "iva-item-slider-"); 
}

function scaleImage(content) {
    var slider = findSlider(content);
    slider.css("height", "50px");
    var slider_item = findDivByClassStart(slider, "photo-slider-item-");
    if (slider_item === null) {
        return;
    }
    slider_item.css("height", "100px");
}

function processItem(item) {
    var id = item.attr("data-item-id");
    if (id === null || id === undefined) {
        return;
    }
    const status = localStorage.getItem(id);
    if (status === null) {
        item.hover(
            function() {
                localStorage.setItem(id, 'h');
            },
            function() {
            }
        );
        return;
    }
    var content = findItemContent(item);
    if (content === null) {
        return;
    }
    var body = findBody(content);
    if (body === null) {
        return;
    }
    markAsRead(body, content);
}

function addLabel(body, text) {
    body.prepend("<div><p>" + text + "</p></div>");
}

function markAsRead(body, content) {
    if (options.read_show_mode === "minify") {
        hideElements(body);
        scaleImage(content);
    } else {
        addLabel(body, "ПРОСМОТРЕНО");
        hideElements(body);
        scaleImage(content);
    }
}

function processAll() {
    var allDivs = $('div');
    for (const element of allDivs) {
        var currentDiv = $(element);
        if (currentDiv.attr("data-marker") === "item") {
            processItem(currentDiv);
        }
    }
}

function onWindowLoad() {
    chrome.storage.sync.get({
        read_show_mode: "minify"
    }, function(item) {
        options = item;
        processAll();
    });
}

window.onload = onWindowLoad;