$(document).ready(function() {
    fillTable();
    $(`#createGoodstoPlanetButton`).on(`click`, createGoodstoPlanet);
    $(`#goodstoPlanetsList tbody`).on('click', 'tr button.btn-danger', deleteGoodstoPlanet);
});

function fillTable() {
    $(`#goodstoPlanetInfoId`).text('');
    $(`#goodstoPlanetInfoPlanet`).text('');
    $(`#goodstoPlanetInfoGoods`).text('');
    let tableContent = '';
    $.getJSON('/service/goodstoPlanets', function(data) {
        $.each(data, function() {
            tableContent += `<tr id="${this.id}">`;
            tableContent += `<td>${this.id}</td>`;
            tableContent += `<td>${this.planet}</td>`;
            tableContent += `<td>${this.goods}</td>`;
            tableContent += `<td><button type="button" class="btn btn-danger">Видалити</button></td>`
            tableContent += `</tr>`;
        });
        $(`#goodstoPlanetsList tbody`).html(tableContent);
    });
}

function createGoodstoPlanet(event) {
    event.preventDefault();
    let id = $(`#inputId`).val();
    let planet = $(`#inputPlanet`).val();
    let goods = $(`#inputGoods`).val();
    if (!id.trim().length || !planet.trim().length || !goods.trim().length) {
        alert(`Please, fill in all of the fields`);
        return;
    }
    $.ajax({
        url: `/service/goodstoPlanets`,
        type: `POST`,
        data: {id: id, planet: planet, goods: goods},
        success: function(result) {
            alert(result);
            fillTable();
        }
    });
}

function showGoodstoPlanetInfo(event) {
    event.preventDefault();
    let goodstoPlanetId = $(this).attr("id");
    $.getJSON(`/service/goodstoPlanets/${goodstoPlanetId}`, function(data) {
        $(`#goodstoPlanetInfoId`).text(data.id);
        $(`#goodstoPlanetInfoPlanet`).text(data.planet);
        $(`#goodstoPlanetInfoGoods`).text(data.goods);
    });
}


function deleteGoodstoPlanet(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    let data = $(this).parent().parent();
    let id = $(data).find(`td:nth-child(1)`).text();
    $.ajax({
        url: `/service/goodstoPlanets/${id}`,
        type: `DELETE`,
        success: function(result) {
            alert(result);
            fillTable();
        }
    });
    
}
