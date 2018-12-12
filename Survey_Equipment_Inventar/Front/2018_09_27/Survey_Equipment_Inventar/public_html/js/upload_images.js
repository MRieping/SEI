/**
 * ...
 * https://wiki.selfhtml.org/wiki/JavaScript/File_Upload
 * @param {type} evt
 * @returns {undefined}
*/
function upload_images(evt) {
    console.log(evt);
    console.log(evt.target);
    console.log(evt.target.files);
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
                // show thumbnails without jquery
                //document.getElementById('upload_images_sensor_list').insertBefore(thumbnail, null);
                // show thumbnails with jquery
                $(thumbnail).insertBefore("#upload_images_sensor_list");
                $('.thumbnail').css("width", "100%");
                $('.thumbnail').css("max-height", "100%");
                new_product.images.push(thumbnail.src);
            };
        })(f);
        // Bilder als Data URL auslesen.
        reader.readAsDataURL(f);
    }
}

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

