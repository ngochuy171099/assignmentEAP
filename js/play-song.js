$(document).ready(function () {
    var search = location.search;
    var id = "";
    var sa = search.replace("?", "").split("&");
    for (var i of sa) {
        if (i.includes("id=")) {
            id = i.replace("id=", "");
        }
    }
    // console.log(id);
    if (id !== "") {
        $.ajax({
            url: "https://oauth2resourceserver20181116085012.azurewebsites.net/api/songs/" + id,
            method: "get",
            headers: {
                authorization: "Basic " + localStorage.getItem("accessToken"),
                "Content-Type": "application/json"
            },
            success: function (res) {
                $("#img").attr("src", res.thumbnail);
                $(".name").text(res.name);
                $(".author").text(res.author);
                $(".description").text(res.description);
                $("#player").attr("src", res.link);
                document.getElementById('player').play();
            },
            error: function (e) {
                console.log(e);
            }
        });
    } else {
        location.href = "/html/Home-Page.html";
    }

});