function cifrado()
{   
    //lectura de archivo
    var archivo=document.getElementById("archivo");
    var reader = new FileReader();
    reader.readAsDataURL (archivo.files [0]); 
    //final lectura

    reader.onload = function()
    {
        
        reader.addEventListener('loadend', function() 
        {
            document.getElementById('archivo').innerText = this.result;
        });
        document.getElementById('archivo').files[0].text().then(PromiseResult => 
        {
            var texto=PromiseResult;//archivo
            //console.log(texto);

            var clave=document.getElementById("clave").value;//alor de la llave
            //console.log(clave);

            var longClave=getRadio();//longitud clave
            //console.log(longClave)
            var claveHash=CryptoJS.SHA3(clave).toString().substr(0,longClave);
            //console.log(claveHash);
           
            //cifrado
            var textcifrad=CryptoJS.AES.encrypt(texto,claveHash);//aplicar algoritmo de cifrado

            download("cifrado.txt",textcifrad);

            //console.log(textcifrad);
            document.getElementById("resultado").innerHTML = textcifrad;//redultado de cifrar

            document.getElementById("file").value = "";
        })
    }
}

function getRadio()
{
    var select=256;
    var getSelectedValue = document.querySelector( 'input[name="nbit"]:checked');   
    if(getSelectedValue != null) {   
        select=parseInt(getSelectedValue.value);
        //console.log(typeof getSelectedValue);
    }
    //console.log(select);
    return select
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
