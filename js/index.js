const OAUTH2_SERVER = "https://oauth2server20181116083841.azurewebsites.net/oauth2/authorization";
const CLIENT_ID = "c0c61d63-1ba7-444a-be40-a91c0894a40c";
const SCOPES = "http://basicscope.com,http://songresourcescope.com,http://videoscope.com";

$(document).ready(function () {
    if (localStorage.getItem("accessToken")) {
        $.ajax({
            url: "https://oauth2resourceserver20181116085012.azurewebsites.net/api/songs",
            method: "get",
            headers: {
                authorization: "Basic " + localStorage.getItem("accessToken")
            },
            success: function (res) {
                console.log(res);
            },
            error: function (e) {
                if (e.status === 403) {
                    location.href = `${OAUTH2_SERVER}?clientId=${CLIENT_ID}&scopes=${SCOPES}`;
                }
            }
        });
    }
});