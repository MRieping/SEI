/**
 * ...
 * https://wiki.selfhtml.org/wiki/JavaScript/File_Upload
 * @param {type} evt
 * @returns {undefined}
*/
function upload_images(evt) {
    var images = evt.target.files; // FileList object    
    // Auslesen der gespeicherten Dateien durch Schleife
    for (var i = 0, f; f = images[i]; i++) {
        // nur Bild-Dateien
        if (!f.type.match('image.*')) {
            continue;
        }
        var reader = new FileReader();
        reader.onload = (function (theFile) {
            return function (e) {
                // erzeuge Thumbnails.
                var thumbnail = document.createElement('img');
                thumbnail.className = 'thumbnail';
                thumbnail.src = e.target.result;
                thumbnail.title = theFile.name;
                if(images.length > 0) {
                    if(new_product.images_titles.includes(thumbnail.title)) {
                        // Do nothing
                    } else {
                        // show thumbnails without jquery
                        //document.getElementById('upload_images_sensor_list').insertBefore(thumbnail, null);
                        // show thumbnails with jquery
                        $(thumbnail).insertBefore("#upload_images_sensor_list");
                        $('.thumbnail').css("width", "42%");
                        $('.thumbnail').css("max-height", "42%");
                        new_product.images.push(thumbnail.src);
                        new_product.images_titles.push(thumbnail.title);
                    }
                } else {
                    // show thumbnails with jquery
                    $(thumbnail).insertBefore("#upload_images_sensor_list");
                    $('.thumbnail').css("width", "42%");
                    $('.thumbnail').css("max-height", "42%");
                    new_product.images.push(thumbnail.src);
                    new_product.images_titles.push(thumbnail.title);
                }
                console.log('New product after updates its images');
                console.log(new_product);
            };
        })(f);
        // Bilder als Data URL auslesen.
        reader.readAsDataURL(f);
        $("#upload_images_sensor_list").children().remove();
    }
}

// https://stackoverflow.com/questions/31287680/adding-delete-button-for-each-image-thumbnail-preview
// http://jsfiddle.net/kevalbhatt18/r0taz01L/1/
function upload_image () {
    $('#upload_images_div').on('click', '.closeDiv', function () {
        var title = $(this).prev().attr('title');
        for(i = 0; i < new_product.images.length; i++){
            if(title === new_product.images_titles[i]) {
                new_product.images.splice(i, 1);
                new_product.images_titles.splice(i, 1);
                console.log(new_product);
            }
        }
        $(this).prev().remove();
        $(this).remove();
        $('#upload_images_input').val("");
    });
    //var fileDiv = document.getElementById("upload");
    var fileInput = document.getElementById("upload_images_input");
    

    fileInput.addEventListener("change", function (e) {

        var filesVAR = this.files;

        showThumbnail(filesVAR);

    }, false);



    function showThumbnail(files) {
        
        for(i = 0; i < files.length; i++) {
        
            var file = files[i];
            
            if(new_product.images_titles.includes(file.name)) {
                // Do Nothing
            } else {
                var thumbnail = document.getElementById("upload_images_div");
                var pDiv = document.createElement("div");
                var image = document.createElement("img");
                var div = document.createElement("div");

                pDiv.setAttribute('class', 'pDiv');
                thumbnail.appendChild(pDiv);

                image.setAttribute('class', 'imgKLIK5');
                pDiv.appendChild(image);

                div.innerHTML = "X";
                div.setAttribute('class', 'closeDiv');
                pDiv.appendChild(div);

                image.file = file;
                var reader = new FileReader();
                reader.onload = (function (aImg) {
                    return function (e) {
                        aImg.className = 'thumbnail';
                        aImg.src = e.target.result;
                        aImg.title = file.name;
                        new_product.images.push(aImg.src);
                        new_product.images_titles.push(aImg.title);
                        console.log('New product after updates its images');
                        console.log(new_product);
                    };
                }(image));
                var ret = reader.readAsDataURL(file);
                var canvas = document.createElement("canvas");
                ctx = canvas.getContext("2d");
                image.onload = function () {
                    ctx.drawImage(image, 100, 100);
                };
            }
        }
    }
};

/**
 * ...
 * https://stackoverflow.com/questions/6150289/how-to-convert-image-into-base64-string-using-javascript
 * @param {type} element
 * @returns {undefined}

function encodeImageFileAsURL(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
        console.log('RESULT', reader.result);
    };
    reader.onload = (function (theFile) {
        return function (e) {
            // erzeuge Thumbnails.
            var vorschau = document.createElement('img');
            vorschau.className = 'vorschau';
            vorschau.src = e.target.result;
            vorschau.title = theFile.name;
            document.getElementById('list').insertBefore(vorschau, null);
            console.log(vorschau.currentSrc);
        };
    });
    reader.readAsDataURL(file);
} */

