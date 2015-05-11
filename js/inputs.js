/* 
 Author : Islam Akef Ebeid
 Affiliations : University of Arkansas at Little Rock - Emerging Analytics Center
 */


var fastaText = "";
var dataText = "";
var firstPDB = "";
var secondPDB = "";
localFlag = false;
$(document).ready(function () {


    $("#localDiv").hide();
    $("#serverDiv").hide();
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

    $("input[type='radio']").click(function () {
        if ($(this).attr("id") == "local") {
            $("#localDiv").show();
            $("#serverDiv").hide();
            localFlag = true;
        }

        if ($(this).attr("id") == "server") {
            $("#serverDiv").show();
            $("#localDiv").hide();
            localFlag = false;
        }
    });

    var firstPdbInput = document.getElementById('viewMol1');
    firstPdbInput.addEventListener('change', function (e) {
        var file = firstPdbInput.files[0];
        var textType = /pdb.*/;
        if (file.name.match(textType)) {
            var reader = new FileReader();
            reader.onload = function (e) {
                firstPDB = reader.result;
            };
            reader.readAsText(file);
        } else {
            alert("File not supported!");
        }
    });

    var secondPdbInput = document.getElementById('viewMol2');
    secondPdbInput.addEventListener('change', function (e) {
        var file = secondPdbInput.files[0];
        var textType = /pdb.*/;
        if (file.name.match(textType)) {
            var reader = new FileReader();
            reader.onload = function (e) {
                secondPDB = reader.result;
            };
            reader.readAsText(file);
        } else {
            alert("File not supported!");
        }
    });


});

function handleFirstPDB(id) {
    var glmol01Obj = new GLmol(id, true);
    glmol01Obj.defineRepresentation = function () {
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
    $("#" + id + "_src").val(firstPDB);

    glmol01Obj.loadMolecule();
}

function handleSecondPDB(id) {
    var glmol01Obj = new GLmol(id, true);
    glmol01Obj.defineRepresentation = function () {
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
    $("#" + id + "_src").val(secondPDB);
    glmol01Obj.loadMolecule();
}

function view(query, id) {

    var glmol01Obj = new GLmol(id, true);
    var uri = '';
    query = query.toUpperCase();

    if (!query.match(/^[1-9][A-Za-z0-9]{3}$/)) {
        alert("Wrong PDB ID");
        return;
    }
    uri = "http://www.rcsb.org/pdb/files/" + query + ".pdb";
    glmol01Obj.defineRepresentation = function () {
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
    $.get(uri, function (ret) {
        $("#" + id + "_src").val(ret);
        glmol01Obj.loadMolecule();
    });
}