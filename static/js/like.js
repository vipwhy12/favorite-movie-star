$(document).ready(function () {
  // index.html 로드가 완료되면 자동으로 showStar() 함수를 호출합니다.
    showStar();
});


function showStar() {
    //1. #star_box의 내부 html 태그를 모두 삭제합니다. 
    $('#star_box').empty()

    //2. 서버에 GET방식으로 /api/list 라는 주소로 star_list를 요청한다.
    $.ajax({
        type: "GET",
        url: "/api/list",
        data: {},
        success: function (response) {
            //3.성공했을 때, 요청한 star_list를 가지고 Card를 만든다
            let stars = response['stars_list']

            if (response["result"] == "success") {
                for (let i = 0; i < stars.length; i++) {
                    makeCard(stars[i]["img_url"], stars[i]["name"], stars[i]["recent"], stars[i]["like"] )
                }
            }
        },
    });
}

function likeStar(name) {
    $.ajax({
        type: "POST",
        url: "/api/like",
        data: {'name_give' : name},
        success: function (response) {
            if (response["result"] == "success") {
                 // 2. '좋아요 완료!' 얼럿을 띄웁니다.
                alert('좋아요 완료!')
                 // 3. 변경된 정보를 반영하기 위해 새로고침합니다.
                window.location.reload()
            }
        },
    });
    }

function deleteStar(name) {
    $.ajax({
        type: "POST",
        url: "/api/delete",
        data: {'name_give' : name},
        success: function (response) {
            if (response["result"] == "success") {
                // 2. '좋아요 완료!' 얼럿을 띄웁니다.
                alert('삭제 완료!')
                // 3. 변경된 정보를 반영하기 위해 새로고침합니다.
                window.location.reload()
            }
        },
    });
    }


function makeCard(image, name, recent, like) {
    let tempHtml = `<div class="card">
                        <div class="card-content">
                            <div class="media">
                                <div class="media-left">
                                    <figure class="image is-48x48">
                                    <img src=${image}
                                        alt="Placeholder image" />
                                    </figure>
                                </div>
                                <div class="media-content">
                                    <a href="#" target="_blank" class="star-name title is-4">${name} (좋아요: ${like})</a>
                                    <p class="subtitle is-6">${recent}</p>
                                </div>
                            </div>
                        </div>
                        <footer class="card-footer">
                            <a href="#" onclick="likeStar('${name}')" class="card-footer-item has-text-info">
                                위로!
                                <span class="icon">
                                    <i class="fas fa-thumbs-up"></i>
                                </span>
                            </a>
                            <a href="#" onclick="deleteStar('${name}')" class="card-footer-item has-text-danger">
                                삭제
                                <span class="icon">
                                    <i class="fas fa-ban"></i>
                                </span>
                            </a>
                        </footer>
                    </div>`;
    $("#star-box").append(tempHtml);                
}