// @ts-check

// 判断是否移动端
function isMobile() {
  return /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(
    navigator.userAgent
  );
}

function chooseStyle() {
  if (isMobile()) {
    //判断访问环境是 移动端 则加载以下样式
    setStyle(["./css/indexmobile.css"]);
  } else {
    setStyle(["./css/indexpc.css"]);
  }
}

function setStyle(cssArr) {
  let i = 0;
  const len = cssArr.length;
  for (i; i < len; i++) {
    document.write(
      '<link href="' + cssArr[i] + '" type="text/css" rel=stylesheet>'
    );
  }
}

chooseStyle();

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
    $(".imgList")
      .find("li")
      .removeClass("imgOn")
      .eq(num)
      .css({ opacity: 0.15 })
      .addClass("imgOn")
      .animate({ opacity: 1.0 }, 1000);
  }

  const AppStoreloadbtn = $("#AppStoreloadbtn");
  const Androidloadbtn = $("#Androidloadbtn");
  const AppStoreloadImg = $("#AppStoreload");
  const AndroidloadImg = $("#Androidload");
  if (!isMobile()) {
    AppStoreloadbtn.on("mouseover", function () {
      AppStoreloadImg.attr("src", "./img/apple.png");
    });
    AppStoreloadbtn.on("mouseout", function () {
      AppStoreloadImg.attr("src", "./img/applehover.png");
    });

    Androidloadbtn.on("mouseover", function () {
      AndroidloadImg.attr("src", "./img/Android.png");
    });
    Androidloadbtn.on("mouseout", function () {
      AndroidloadImg.attr("src", "./img/Androidhover.png");
    });
  } else {
    AppStoreloadImg.attr("src", "./img/applehover.png");
    AndroidloadImg.attr("src", "./img/Androidhover.png");
  }

  AppStoreloadbtn.on("click", function () {
    window.open("https://apps.apple.com/app/%E7%A6%8Fuu/id866768101");
  });

  Androidloadbtn.on("click", function () {
    let ajax;
    if (window.XMLHttpRequest) {
      ajax = new XMLHttpRequest();
    } else {
      ajax = new ActiveXObject("Microsoft.XMLHTTP");
    }
    ajax.onreadystatechange = function () {
      if (ajax.readyState === 4 && ajax.status === 200) {
        const data = JSON.parse(ajax.responseText);
        // 安全原因，https的网页不能访问http内容
        window.open(data.url.replace("http:", "https:"));
      }
    };
    // fzuhelper.west2.online 现在兼顾了 URL 的功能,前端页面要么放后端要么就得换域名
    ajax.open("get", "https://fzuhelper.west2.online/api/v2/url/version.json");
    ajax.send();
  });
});
