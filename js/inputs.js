/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var fastaText = "";
var dataText = "";
window.onload = function () {
    d3.select("#vis").style("visibility", "hidden");
    var fastafileInput = document.getElementById('fastafile');
    fastafileInput.addEventListener('change', function (e) {
        var file = fastafileInput.files[0];
        var textType = /fasta.*/;
        if (file.name.match(textType)) {
            var reader = new FileReader();
            reader.onload = function (e) {
                fastaText = reader.result;
            };
            reader.readAsText(file);
        } else {
            alert("File not supported!");
        }
    });
    var datafileInput = document.getElementById('datafile');
    datafileInput.addEventListener('change', function (e) {
        var file = datafileInput.files[0];
        var textType = /txt.*/;
        if (file.name.match(textType)) {
            var reader = new FileReader();
            reader.onload = function (e) {
                dataText = reader.result;
            };
            reader.readAsText(file);
        } else {
            alert("File not supported!");
        }
    });
};