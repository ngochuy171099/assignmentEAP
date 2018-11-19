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
                let html = "";
                for (let song of res) {
                    html += `
                        <li class="list-group-item pl-0 pr-0 pt-2 pb-2">
                            <div class="row p-0">
                                <div class="col-1">
                                    <p class="text-primary">${song.id}</p>
                                </div>
    
                                <div class="col-2">
                                    <img class="img-listview-homepage float-right img-fluid"
                                         src="${song.thumbnail}">
                                </div>
    
                                <div class="col-6 p-0" style="font-size: 14px">
                                    <div><a class="text-dark" style="font-size: 16px; font-weight: 500;" href="/html/Play-Song.html?id=${song.id}">${song.name}</a></div>
                                    <span><a class="text-secondary" style="font-size: 11px"
                                             href="#">${song.singer}</a></span>
                                </div>
    
                                <div class="col-3 pr-0">
    
                                    <div style="font-size: 14px" class="mt-2 float-left pl-1 pr-2">
                                        <a class="text-secondary" href="#"><i class="fas fa-download"></i></a>
                                    </div>
    
                                    <div style="font-size: 14px" class="mt-2 float-left pl-2 pr-3">
                                        <a class="text-secondary" href="#"><i class="fas fa-plus"></i></a>
                                    </div>
    
                                    <div style="font-size: 14px" class="mt-2">
                                        <a class="text-secondary" href="#"><i class="fas fa-share-alt"></i></a>
                                    </div>
                                </div>
                            </div>
                        </li>
                    `
                }
                $("#ListSongs").html(html);
                console.log(res[0]);
            },
            error: function (e) {
                if (e.status === 403) {
                    location.href = `${OAUTH2_SERVER}?clientId=${CLIENT_ID}&scopes=${SCOPES}`;
                }
            }
        });
    }
});