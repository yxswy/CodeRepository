// 剪切板获取文件
var blob;
//获取body对象
var body = document.getElementsByTagName("body");
//定义body标签绑定的粘贴事件处理函数
var fun = function (e: ClipboardEvent) {
    console.log(e)
    //获取图片内容
    blob = e.clipboardData?.items[0].getAsFile() as Blob;
    //判断是不是图片，最好通过文件类型判断
    var isImg = (blob && 1) || -1;
    var reader = new FileReader();
    if (isImg >= 0) {
        //将文件读取为 DataURL
        reader.readAsDataURL(blob);
    }
    //文件读取完成时触发
    reader.onload = function (event) {
        //获取base64流
        var base64_str = event?.target?.result;
        console.log(base64_str)
        //div中的img标签src属性赋值，可以直接展示图片
    }
}
//通过body标签绑定粘贴事件，注意有些标签绑定粘贴事件可能出错
body[0].removeEventListener('paste', fun);
body[0].addEventListener('paste', fun);