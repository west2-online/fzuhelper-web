// @ts-check

// 判断是否移动端
function goPAGE() {
    // if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    if (/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(navigator.userAgent)) {
        // window.location.href="移动端url";
        //判断访问环境是 移动端 则加载以下样式
        setStyle(['./css/indexmovingend.css']);
    } else {
        // window.location.href="pc端url";
        setStyle(['./css/indexpc.css']);
    }
}

function setStyle(cssArr) {
    let i = 0
    const len = cssArr.length;
    for (i; i < len; i++) {
        document.write('<link href="' + cssArr[i] + '" type="text/css" rel=stylesheet>');
    }
}

goPAGE();        // 调用function

$(function () {

    let curIndex = 0;

    setInterval(function () {
        if (curIndex < $(".imgList li").length - 1) {
            curIndex++;
        } else {
            curIndex = 0;
        }

        changeTo(curIndex);
    }, 3000);

    function changeTo(num) {
        $(".imgList").find("li").removeClass("imgOn").eq(num).css({opacity: 0.15}).addClass("imgOn").animate({opacity: 1.0}, 1000);
    }

    const windowWidth = $(window).width();
    const AppStoreloadbtn = $('#AppStoreloadbtn');
    const Androidloadbtn = $('#Androidloadbtn');
    if (windowWidth > 600) {
        AppStoreloadbtn.on('mouseover', function () {
            $('#AppStoreload').attr('src', './img/apple.png');
        })
        AppStoreloadbtn.on('mouseover', function () {
            $('#AppStoreload').attr('src', './img/applehover.png');
        })

        Androidloadbtn.on('mouseover', function () {
            $('#Androidload').attr('src', './img/Android.png');
        })
        Androidloadbtn.on('mouseover', function () {
            $('#Androidload').attr('src', './img/Androidhover.png');
        })
    }

    // var offWidth = window.screen.width / 32; //这里用宽度/30表示1rem取得的px
    // document.getElementsByTagName("html")[0].style.fontSize = offWidth + 'px';

    if (windowWidth < 600) {
        $('#AppStoreload').attr('src', './img/applehover.png');
        $('#Androidload').attr('src', './img/Androidhover.png');
    }

    AppStoreloadbtn.on('click', function () {
        window.open("https://apps.apple.com/app/%E7%A6%8Fuu/id866768101");
    })

    Androidloadbtn.on('click', function () {
        // var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
        let ajax
        if (window.XMLHttpRequest) {
            ajax = new XMLHttpRequest();
        } else {
            ajax = new ActiveXObject("Microsoft.XMLHTTP");
        }
        ajax.onreadystatechange = function () {
            if (ajax.readyState === 4 && ajax.status === 200) {
                const data = JSON.parse(ajax.responseText);
                // console.log(url);
                window.open(data.url.replace("http:", "https:"));
            }
        }
        ajax.open('get', 'https://url.w2fzu.com/version.json');
        ajax.send();
    })

})
