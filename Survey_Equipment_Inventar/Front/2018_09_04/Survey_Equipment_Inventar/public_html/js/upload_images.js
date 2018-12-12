/**
 * ...
 * https://wiki.selfhtml.org/wiki/JavaScript/File_Upload
 * @param {type} evt
 * @returns {undefined}

function dateiauswahl(evt) {
    var dateien = evt.target.files; // FileList object
    // Auslesen der gespeicherten Dateien durch Schleife
    for (var i = 0, f; f = dateien[i]; i++) {
        // nur Bild-Dateien
        if (!f.type.match('image.*')) {
            continue;
        }
        var reader = new FileReader();
        reader.onload = (function (theFile) {
            return function (e) {
                // erzeuge Thumbnails.
                var vorschau = document.createElement('img');
                vorschau.className = 'vorschau';
                vorschau.src = e.target.result;
                vorschau.title = theFile.name;
                document.getElementById('list')
                        .insertBefore(vorschau, null);
                console.log(vorschau.currentSrc);
            };
        })(f);
        // Bilder als Data URL auslesen.
        reader.readAsDataURL(f);
    }
}
// Auf neue Auswahl reagieren und gegebenenfalls Funktion dateiauswahl neu ausführen.
document.getElementById('files')
    .addEventListener('change', dateiauswahl, false); */

/**
 * ...
 * https://stackoverflow.com/questions/6150289/how-to-convert-image-into-base64-string-using-javascript
 * @param {type} element
 * @returns {undefined}
 */
function encodeImageFileAsURL(element) {
  var file = element.files[0];
  var reader = new FileReader();
                // erzeuge Thumbnails.
                var vorschau = document.createElement('img');
                vorschau.className = 'vorschau';
                vorschau.src = reader.result;
                document.getElementById('list')
                        .insertBefore(vorschau, null);
  reader.onloadend = function() {
    console.log('RESULT', reader.result);
  };
  reader.readAsDataURL(file);
}

