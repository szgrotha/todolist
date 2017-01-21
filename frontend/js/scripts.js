var jsPlus = document.getElementById('plus-icon');
var counter = 0;
jsPlus.addEventListener('click', addRow);

function addRow() {
	var inputJs = document.getElementById('text-input').value,
		line1 = '<tr id="' +counter+ '" class="row">',
		line2 = '<td class="col-1 border-color"><input id="check" name="check" type="checkbox" onchange="checkStatus(this)"></td>',
		line3 = '<td class="col-2 border-color"></td>',
		line4 = '<td class="col-3 no-done">' +inputJs+ '<img id="trash-ico" src="img/trash.png" alt="trash icon" onclick="deleteRow(this)"></td>',
		line5 = '</tr>';

		if (inputJs == '') { 
			alert('Pole nie może być puste!')
		} else {
			addRowToBase(inputJs, counter)
			counter++
			console.log('Licznik z addRow wynosi ' +counter)
			$(line1 + line2 + line3 + line4 + line5).insertAfter('.main-row')	
			
		}
	inputJs.value = '';
};


function checkStatus(checkbox) {
	var colId = $(checkbox).closest('tr');

	if (checkbox.checked) {
		$(colId).addClass("is-done")
		isDone(colId);

	} else {
		$(colId).removeClass("is-done")
		isNotDone(colId)
	}
}

function deleteRow(trash) {
	var jsId = $(trash).closest('tr')
	deleteRowBase(jsId)
	$(jsId).remove();
}

function updateToDo(row,job,isDone) {
	var counter = row,
		inputJs = job,
		line3 = '<td class="col-2 border-color"></td>',
		line4 = '<td class="col-3 no-done">' +inputJs+ '<img id="trash-ico" src="img/trash.png" alt="trash icon" onclick="deleteRow(this)"></td>',
		line5 = '</tr>';

			if (isDone === false ) {
				line1 = '<tr id="' +counter+ '" class="row">',
				line2 = '<td class="col-1 border-color"><input id="check" name="check" type="checkbox" onchange="checkStatus(this)"></td>';
			} else {
				line1 = '<tr id="' +counter+ '" class="row is-done">',
				line2 = '<td class="col-1 border-color"><input id="check" name="check" type="checkbox" onchange="checkStatus(this)" checked></td>';
			}
		
	$(line1 + line2 + line3 + line4 + line5).insertAfter('.main-row')
}

function updateCounter(row) {
	counter = row,
	counter = counter + 1
}