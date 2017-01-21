var db = new PouchDB('http://localhost:5984/toDoList');

window.onload = function () {
	baseUpdate();
};

function addRowToBase(inputJs, counter) {
	if (inputJs === '') {
		console.log('Pole nie może być puste!');
	} else {
		var doc = {
		  "_id": "row-" +counter,
		  "job": inputJs,
		  "number": counter,
		  "isDone" : false,
		};

		db.put(doc);
	}
}

function isDone(colId) {
	var doneId = $(colId).attr('id');
	db.get('row-'+doneId).then(function (doc) {
		doc.isDone = true;
  		return db.put(doc);
	}).then(function () {
		return db.get('row-'+doneId);
	}).then(function (doc) {
});
}

function isNotDone(colId) {
	var doneId = $(colId).attr('id');
	db.get('row-'+doneId).then(function (doc) {
		doc.isDone = false;
  		return db.put(doc);
	}).then(function () {
		return db.get('row-'+doneId);
	}).then(function (doc) {
});
}


function deleteRowBase(jsId) {
	console.log('Zadanie usunięte z bazy danych!');
	var rowId = $(jsId).attr('id');
	db.get('row-'+rowId).then(function (doc) {
  	doc._deleted = true;
  	return db.put(doc);

});
}

function baseUpdate() {
	db.allDocs({
		include_docs: true,
	}).then(function (result) {
		var  i = result.total_rows;
		if (i > 0) {
			for (var k = 0 ; k< i; k++) {
				var row = result.rows[k].doc.number,
					job = result.rows[k].doc.job,
					isDone = result.rows[k].doc.isDone;
					updateToDo(row,job,isDone);
					updateCounter(row);
			}
		} else console.log('Zakończono update bazy - baza pusta');
	});
}
