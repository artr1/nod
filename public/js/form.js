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
			var html = '<tr><td><div class="alert-tb alert-primary">'+data.name+'</div></td><td width="16px"><input type="image" src="img/delete.png"></td><td width="16px"><input type="image" src="img/ed.png"></td></tr>';
			$('table tbody').prepend(html);
			console.log(data);
			},
		});
	});
