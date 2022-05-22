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

function findBody(item) {
    var subitems = item.find("div");
    for (const element of subitems) {
        var subitem = $(element);
        if (subitem.attr("class").search("iva-item-body-") !== -1) {
            return subitem;
        }
    }
    return null;
}

function hideElements(body) {
    var subitems = body.find("div");
    for (const element of subitems) {
        var subitem = $(element);
        var className = subitem.attr("class");
        if (className.search("iva-item-descriptionStep-") !== -1
            || className == ""
            || className.search("va-item-dateInfoStep-") !== -1) {
            subitem.hide();
        }
    }
}

function makeSmall(item) {
    item.css("height", "50px");
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
                console.log(this);
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
    hideElements(body);
}

function onWindowLoad() {
    var allDivs = $('div');
    for (const element of allDivs) {
        var currentDiv = $(element);
        if (currentDiv.attr("data-marker") === "item") {
            processItem(currentDiv);
        }
    }
}

window.onload = onWindowLoad;