$(document).ready(function() {
    fillTable();
    $(`#createSpaceStationButton`).on(`click`, createSpaceStation);
    $(`#spaceStationsList tbody`).on('click', 'tr button.btn-danger', deleteSpaceStation);
    $(`#spaceStationsList tbody`).on('click', 'tr', showSpaceStationInfo);
    $(`#spaceStationsList tbody`).on('click', 'tr button.btn-edit', editSpaceStation);
    $(`#findSpaceStationButton`).on('click', findSpaceStation);
});

function fillTable() {
    $(`#SpaceStationInfoId`).text('');
    $(`#SpaceStationInfoName`).text('');
    $(`#SpaceStationInfoNecessity`).text('');
    $(`#SpaceStationInfoCapacity`).text('');
    let tableContent = '';
    $.getJSON('/service/space_stations', function(data) {
        $.each(data, function() {
            tableContent += `<tr id="${this.id}">`;
            tableContent += `<td>${this.id}</td>`;
            tableContent += `<td>${this.name}</td>`;
            tableContent += `<td>${this.necessity}</td>`;
            tableContent += `<td>${this.capacity}</td>`;
            tableContent += `<td><button type="button" class="btn btn-danger">Delete</button></td>`
            tableContent += `<td><button type="button" class="btn btn-edit">Edit</button></td>`
            tableContent += `</tr>`;
        });
        $(`#spaceStationsList tbody`).html(tableContent);
    });
}

function createSpaceStation(event) {
    event.preventDefault();
    let id = $(`#inputId`).val();
    let name = $(`#inputName`).val();
    let necessity = $(`#inputNecessity`).val();
    let capacity = $(`#inputCapacity`).val();
    if (!id.trim().length || !name.trim().length || !necessity.trim().length || !capacity.trim().length) {
        alert(`Заповніть всі поля`);
        return;
    }
    $.ajax({
        url: `/service/space_stations`,
        type: `POST`,
        data: {id: id, name: name, necessity: necessity, capacity: capacity},
        success: function(result) {
            alert(result);
            fillTable();
        }
    });
}

function showSpaceStationInfo(event) {
    event.preventDefault();
    let spaceStationId = $(this).attr("id");
    $.getJSON(`/service/space_stations/${spaceStationId}`, function(data) {
        $(`#spaceStationInfoId`).text(data.id);
        $(`#spaceStationInfoName`).text(data.name);
        $(`#spaceStationInfoNecessity`).text(data.necessity);
        $(`#spaceStationInfoCapacity`).text(data.capacity);
    });
}

function deleteSpaceStation(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    let data = $(this).parent().parent();
    let id = $(data).find(`td:nth-child(1)`).text();
    $.ajax({
        url: `/service/space_stations/${id}`,
        type: `DELETE`,
        success: function(result) {
            alert(result);
            fillTable();
        }
    });
}



function findSpaceStation(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    let data = $(this).parent().parent();
    let id = $(data).find(`td:nth-child(1)`).text();
    let id1 = $(`#inputWhatToFind`).val();
    console.log(id1);
        $.ajax({
            url: `/service/space_stations/${id1}`,
            type: `GET`,
            data: {id: id1},
            success: function(result) {
                alert(result);
                fillTable();
            }
        });
}

function editSpaceStation(event) {
    event.preventDefault();
    let data = $(this).parent().parent();
    let id = $(data).find(`td:nth-child(1)`).text();
    let name = $(`#inputName`).val();
    let necessity = $(`#inputNecessity`).val();
    let capacity = $(`#inputCapacity`).val();
    // if ( !name.trim().length || !mass.trim().length || !capacity.trim().length) {
    //     alert(`Please, fill in all of the fields`);
    //     return;
    // }

    $.ajax({
        url: `/service/space_stations/${id}`,
        type: `POST`,
        data: {id: id, name:name,necessity:necessity, capacity: capacity},
        success: function (result) {
            alert(result);
            fillTable();
        }
    });
}
