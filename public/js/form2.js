$("form").submit(function(e) {
	e.preventDefault();//перехват события
	var form = $(this);//текущая форма
	//console.log(form.serialize())
	$.ajax({
		type: "POST",
		url: form.attr("action"),//подставляется атрибут action
		data: form.serialize(),//передаем все данные формы
	//	dataType: "json",
	//	contentType: "application/json",
		success: function(data){
			var html = '<tr id="row-'+data.id+'"><td><div class="alert-tb alert-primary" data-id="'+data.id+'">'+data.name+'</div></td><td width="16px"><input class="delete" dataid='+data.id+' type="image" src="img/delete.png"></td><td width="16px"><input type="image" src="img/ed.png"></td></tr>';
			var htmlObj = $(html);
			$('table tbody').append(htmlObj);
			bindDeletBtn(htmlObj.find('.delete'));
			console.log(data);
			},
		});
	});



	function bindDeletBtn(obj){
		obj.click(function(){
			var id = $(this).attr('dataid');
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
		});

	}

bindDeletBtn($('.delete'))

/*

$(document).on('click','.delete',function(){
	var id = $(this).attr('dataid');
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
});*/
