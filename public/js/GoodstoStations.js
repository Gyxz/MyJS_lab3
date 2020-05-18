$(document).ready(function() {
    fillTable();
    $(`#createGoodstoStationButton`).on(`click`, createGoodstoStation);
    $(`#goodstoStationsList tbody`).on('click', 'tr button.btn-danger', deleteGoodstoStation);
    $(`#goodstoStationsList tbody`).on('click', 'tr', showGoodstoStationInfo);
    $(`#ShowLessThen30`).on('click', showLessThen30);
    $(`#goodstoStationsListLessThen30 tbody`).on(showGoodstoStationInfo);
});

function fillTable() {
    $(`#goodstoStationInfoId`).text('');
    $(`#goodstoStationInfoSpaceStation`).text('');
    $(`#goodstoStationInfoGoods`).text('');
    let tableContent = '';
    $.getJSON('/service/goodstoStations', function(data) {
        $.each(data, function() {
            tableContent += `<tr id="${this.id}">`;
            tableContent += `<td>${this.id}</td>`;
            tableContent += `<td>${this.spaceStation}</td>`;
            tableContent += `<td>${this.goods}</td>`;
            tableContent += `<td><button type="button" class="btn btn-danger">Видалити</button></td>`
            tableContent += `</tr>`;
        });
        $(`#goodstoStationsList tbody`).html(tableContent);
    });
}

function fillTable2(result) {
    let tableContent = '';
        result.forEach((value)=>{
            tableContent += `<tr id="${this.id}">`;
            tableContent += `<td>${value.id}</td>`;
            tableContent += `<td>${value.name}</td>`;
            tableContent += `<td>${value.necessity}</td>`;
            tableContent += `<td>${value.capacity}</td>`;
            tableContent += `</tr>`;
            $(`#goodstoStationsListLessThen30 tbody`).html(tableContent);
        })
}


function createGoodstoStation(event) {
    event.preventDefault();
    let id = $(`#inputId`).val();
    let spaceStation = $(`#inputSpaceStation`).val();
    let goods = $(`#inputGoods`).val();
    if (!id.trim().length || !spaceStation.trim().length || !goods.trim().length) {
        alert(`Please, fill in all of the fields`);
        return;
    }
    $.ajax({
        url: `/service/goodstoStations`,
        type: `POST`,
        data: {id: id, spaceStation: spaceStation, goods: goods},
        success: function(result) {
            alert(result);
            fillTable();
        }
    });
}

function showGoodstoStationInfo(event) {
    event.preventDefault();
    let goodstoStationId = $(this).attr("id");
    $.getJSON(`/service/goodstoStations/${goodstoStationId}`, function(data) {
        $(`#goodstoStationInfoId`).text(data.id);
        $(`#goodstoStationInfoSpaceStation`).text(data.spaceStation);
        $(`#goodstoStationInfoGoods`).text(data.goods);
    });
}

function showLessThen30(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    let i =30;
    $.ajax({
        url: `/service/goodstoStations/${i}`,
        type: `POST`,
        success: function(result) {
            fillTable2(result);
        }
    });
}


function deleteGoodstoStation(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    let data = $(this).parent().parent();
    let id = $(data).find(`td:nth-child(1)`).text();
    $.ajax({
        url: `/service/goodstoStations/${id}`,
        type: `DELETE`,
        success: function(result) {
            alert(result);
            fillTable();
        }
    });
    
}
