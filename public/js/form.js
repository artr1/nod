$("form").submit(function(e) {
	e.preventDefault();//перехват события
	var form = $(this);//текущая форма
	$.ajax({
		type: "POST",
		url: form.attr("action"),//подставляется атрибут action
		data: form.serialize(),//передаем все данные формы
		success: function(data){
			var html = '<tr id="row-'+data.id+'"><td><div class="alert-tb alert-primary" data-id="'+data.id+'">'+data.name+'</div></td><td width="16px"><input class="delete" dataid='+data.id+' type="image" src="img/delete.png" onclick="del('+data.id+')"></td><td width="16px"><input type="image" src="img/ed.png"></td></tr>';
			$('table tbody').append(html);
			$('form')[0].reset();
			console.log(data);
			},
		});
	});


function del(id) {
	console.log(id);
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

function edit(id) {
	console.log(id);
	$("#row-"+id).replaceWith('<tr id="row-'+id+'"><td><div class="alert-tb alert-primary" data-id="'+id+'"></div></td><td width="16px"><input class="delete" dataid='+id+' type="image" src="img/delete.png" onclick="del('+id+')"></td><td width="16px"><input type="image" src="img/save.png"></td></tr>');
	// $.ajax({
	// 	type: "POST",
	// 	url: "/delete",
	// 	data: {dataid: id},
	// 	success: function(data){
	// 		console.log(data.success);
	// 		$("#row-"+id).remove();
	// 		},
	// 	});
};
