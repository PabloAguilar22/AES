const reader = new FileReader();
$("#descifrar").click(function(){
    var key=$("#clave").val()
    
    reader.addEventListener('loadend', function() {
        document.getElementById('archivo').innerText = this.result;
    });
    console.log(key)
    document.getElementById('archivo').files[0].text().then(PromiseResult => {
        var msg=PromiseResult
        console.log(msg)
        var hashKey=CryptoJS.SHA3(key).toString().substr(0,getRadio());
        console.log(hashKey+" hash")
        var de=CryptoJS.AES.decrypt(msg, hashKey).toString(CryptoJS.enc.Utf8)
        $("#res").text(de)
        download("descifrado.txt",de)
    })
})

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
function getRadio()
{
    var select=256;
    var getSelectedValue = document.querySelector( 'input[name="bits"]:checked');
    if(getSelectedValue != null) {
      select=parseInt(getSelectedValue.value);
    }
    return select
}