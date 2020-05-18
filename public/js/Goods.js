$(document).ready(function() {
    fillTable();
    $(`#createGoodsButton`).on(`click`, createGoods);
    $(`#goodsList tbody`).on('click', 'tr button.btn-danger', deleteGoods);
    $(`#goodsList tbody`).on('click', 'tr', showGoodsInfo);
    $(`#goodsList tbody`).on('click', 'tr button.btn-edit', editGoods);
    $(`#findGoodsButton`).on('click', findGoods);
});

function fillTable() {
    $(`#goodsInfoId`).text('');
    $(`#goodsInfoCode`).text('');
    $(`#goodsInfoName`).text('');
    $(`#goodsInfoMass`).text('');
    let tableContent = '';
    $.getJSON('/service/goods', function(data) {
        $.each(data, function() {
            tableContent += `<tr id="${this.id}">`;
            tableContent += `<td>${this.id}</td>`;
            tableContent += `<td>${this.code}</td>`;
            tableContent += `<td>${this.name}</td>`;
            tableContent += `<td>${this.mass}</td>`;
            tableContent += `<td><button type="button" class="btn btn-danger">Видалити</button></td>`
            tableContent += `<td><button type="button" class="btn btn-edit">Редагувати</button></td>`
            tableContent += `</tr>`;
        });
        $(`#goodsList tbody`).html(tableContent);
    });
}

function createGoods(event) {
    event.preventDefault();
    let id = $(`#inputId`).val();
    let code = $(`#inputCode`).val();
    let name = $(`#inputName`).val();
    let mass = $(`#inputMass`).val();
    if (!id.trim().length || !code.trim().length || !name.trim().length || !mass.trim().length) {
        alert(`Будь ласка,заповніть всі поля`);
        return;
    }
    $.ajax({
        url: `/service/goods`,
        type: `POST`,
        data: {id: id, code: code, name: name, mass: mass},
        success: function(result) {
            alert(result);
            fillTable();
        }
    });
}

function showGoodsInfo(event) {
    event.preventDefault();
    let goodsId = $(this).attr("id");
    $.getJSON(`/service/goods/${goodsId}`, function(data) {
        $(`#goodsInfoId`).text(data.id);
        $(`#goodsInfoCode`).text(data.code);
        $(`#goodsInfoName`).text(data.name);
        $(`#goodsInfoMass`).text(data.mass);
    });
}

function deleteGoods(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    let data = $(this).parent().parent();
    let id = $(data).find(`td:nth-child(1)`).text();
    $.ajax({
        url: `/service/goods/${id}`,
        type: `DELETE`,
        success: function(result) {
            alert(result);
            fillTable();
        }
    });
}
function findGoods(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    let data = $(this).parent().parent();
    let id = $(data).find(`td:nth-child(1)`).text();
    let id1 = $(`#inputWhatToFind`).val();
    $.ajax({
        url: `/service/goods/${id1}`,
        type: `GET`,
        data: {id: id1},
        success: function(result) {
            alert(result);
            fillTable();
        }
    });
}

function editGoods(event) {
    event.preventDefault();
    let data = $(this).parent().parent();
    let id = $(data).find(`td:nth-child(1)`).text();
    let code = $(`#inputCode`).val();
    let name = $(`#inputName`).val();
    let mass = $(`#inputMass`).val();
    // if ( !name.trim().length || !mass.trim().length || !capacity.trim().length) {
    //     alert(`Please, fill in all of the fields`);
    //     return;
    // }

    $.ajax({
        url: `/service/goods/${id}`,
        type: `POST`,
        data: {id: id, code:code,name:name, mass: mass},
        success: function (result) {
            alert(result);
            fillTable();
        }
    });
}
