$("#formInsert").submit(function(e) {
	e.preventDefault();//перехват события
	var form = $(this);//текущая форма
	$.ajax({
		type: "POST",
		url: form.attr("action"),//подставляется атрибут action
		data: form.serialize(),//передаем все данные формы
		success: function(data){
			var html = '<tr id="row-'+data.id+'"><td><div class="alert-tb alert-primary" data-id="'+data.id+'" onclick="edit('+data.id+')">'+data.name+'</div></td><td width="16px"><input class="delete" dataid='+data.id+' type="image" src="img/delete.png" onclick="del('+data.id+')"></td><td width="16px"><input type="image" src="img/ed.png" onclick="edit("'+data.id+'")"></td></tr>';
			$('table tbody').append(html);
			$('form')[0].reset();
			//console.log(data);
			},
		});
	});


function del(id) {
	//console.log(id);
	$.ajax({
		type: "POST",
		url: "/delete",
		data: {dataid: id},
		success: function(data){
			console.log(data.success);
			$("#row-"+id).remove();
			},
		});
};

function edit(row) {
	console.log(row.id);
	$("#row-"+row.id).replaceWith('<tr id="row-'+row.id+'"><td><form action="/edit" method="post" id="formEdit" class="form"><input type="hidden" name="id" value="'+row.id+'"><input type="text" name="programNameEdit" required="1" dataid="'+row.id+'" class="form-control"/></form></td><td colspan=2 width="16px"><button class="btn btn-link formSubmitBtn" type="button" ><input type="image" id="edit" src="img/save.png"></button></td></tr>');


	function sendForm(e){
		e.preventDefault();//перехват события
		$.ajax({
			type: "POST",
			url: "/edit",
			data: $('#formEdit').serialize(),
			success: function(data){
				$("#row-"+row.id).replaceWith('<tr id="row-'+row.id+'"><td><div class="alert-tb alert-primary" data-id="'+row.id+'" onclick="edit('+row.id+')">'+data.programName+'</div></td><td width="16px"><input class="delete" dataid='+row.id+' type="image" src="img/delete.png" onclick="del('+row.id+')"></td><td width="16px"><input type="image" src="img/ed.png" onclick="edit("'+row.id+'")"></td></tr>');
				},
			});
	}

	$('.formSubmitBtn').click(sendForm);
	$('#formEdit').submit(sendForm);

	$(document).mouseup(function (e){
		var container = $("#formEdit");
		var save = $("#edit");
		if (!container.is(e.target) && !save.is(e.target) && container.has(e.target).length === 0) {
				$("#row-"+row.id).replaceWith('<tr id="row-'+row.id+'"><td><div class="alert-tb alert-primary" data-id="'+row.id+'" onclick="edit('+JSON.stringify(row.program)+')">'+row.program+'</div></td><td width="16px"><input class="delete" dataid='+row.id+' type="image" src="img/delete.png" onclick="del('+row.id+')"></td><td width="16px"><input type="image" src="img/ed.png" onclick="edit("'+row.id+'")"></td></tr>');
			}
	});

};
