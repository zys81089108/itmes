require(['config'],function(){
	require(['tools'],function(tools){
		new Promise(function(resolve, reject){
			var options_t = {
				url : '/html/component/header.html',
				type : 'get',
				success : function(data){
					tools.$('header')[0].innerHTML = data;
					resolve();
			    }
		    };
		    var options_b = {
		    	url : '/html/component/footer.html',
		    	tyoe : 'get',
		    	success : function(data){
		    		tools.$('footer')[0].innerHTML = data;
		    		resolve();
		    	}
		    }
		tools.ajax(options_t);
		tools.ajax(options_b);
		}).then(()=>{

			//------- header footer --------
			require(['header', 'footer'], function(nav,bullet){
				nav.init();
				bullet.init();
			});
		}).then(()=>{
			//--------- wheel banner --------
			require(['wheel'],function(banner){
				banner.init();
			})
		})
	})
})
