/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var fastaText = "";
var dataText = "";


window.onload = function () {
    $("#vis").hide();
    $("#structure").hide();
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
                 

function view(query,id) {
    //pdb:4F5S','pdb:4F5S'
    console.log(query);
    var query = "pdb:"+query;
    var glmol01 = new GLmol(id, true);
   var baseURL = '';
   if (query.substr(0, 4) == 'pdb:') {
      query = query.substr(4).toUpperCase();
      if (!query.match(/^[1-9][A-Za-z0-9]{3}$/)) {
         alert("Wrong PDB ID"); return;
      }
      uri = "http://www.pdb.org/pdb/files/" + query + ".pdb";
   } else if (query.substr(0, 4) == 'cid:') {
      query = query.substr(4);
      if (!query.match(/^[1-9]+$/)) {
         alert("Wrong Compound ID"); return;
      }
      uri = "http://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/" + query + 
        "/SDF?record_type=3d";
   }
   glmol01.defineRepresentation = function() {
   var all = this.getAllAtoms();
   var hetatm = this.removeSolvents(this.getHetatms(all));
   this.colorByAtom(all, {});
   this.colorByChain(all);
   var asu = new THREE.Object3D();
   this.drawBondsAsStick(asu, hetatm, this.cylinderRadius, this.cylinderRadius);
   this.drawBondsAsStick(asu, this.getResiduesById(this.getSidechains(this.getChain(all, ['A'])), [58, 87]), this.cylinderRadius, this.cylinderRadius);
   this.drawBondsAsStick(asu, this.getResiduesById(this.getSidechains(this.getChain(all, ['B'])), [63, 92]), this.cylinderRadius, this.cylinderRadius);
   this.drawCartoon(asu, all, this.curveWidth, this.thickness);
   this.drawSymmetryMates2(this.modelGroup, asu, this.protein.biomtMatrices);
   this.modelGroup.add(asu);
};
   $.get(uri, function(ret) {
       $("#" + id + "_src").val(ret);
      glmol01.loadMolecule();
   });
}

function enableView(){
    $("#structure").show();
}
