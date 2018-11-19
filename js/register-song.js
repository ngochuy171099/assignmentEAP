function doSubmit() {

    let form = document.forms.postsong;

    var data = {
        "name": form.name.value,
        "description": form.description.value,
        "singer": form.singer.value,
        "author": form.author.value,
        "thumbnail": form.thumbnail.value,
        "link": form.link.value
    };
    if (localStorage.getItem("accessToken")) {
        $.ajax({
            url: "https://oauth2resourceserver20181116085012.azurewebsites.net/api/songs",
            method: "post",
            data: JSON.stringify(data),
            headers: {
                Authorization: "Basic " + localStorage.getItem("accessToken"),
                "Content-Type": "application/json"
            },
            success: function (res) {
                location.href = "/html/Home-page.html";
                console.log(res);
            },
            error: function (e) {
                if (e.status === 403) {
                    location.href = `${OAUTH2_SERVER}?clientId=${CLIENT_ID}&scopes=${SCOPES}`;
                }
            }
        });
    }
}