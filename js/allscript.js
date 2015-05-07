(function($){
	$.fn.extend({
		
		minusInstaFeed : function(options, callback){
			
			var defaults = {
				userID: 515483853,
				accessToken: '343577867.39b4e50.4448c0bb9f1e48889eac72a447005a93',
				loadingClass: 'loading',
				maxCount: null,
			};
			
			var options = $.extend(defaults, options);
			
			return this.each(function(){
				
				var o = options, el = $( this ), url = 'https://api.instagram.com/v1/users/'+ o.userID +'/media/recent/?access_token=' + o.accessToken;
				
				function getAjax( callback ){
					
					el.addClass( o.loadingClass );
					
					$.ajax({
						type: "GET",
						url: url,
						contentType: "application/json; charset=utf-8",
						dataType: "JSONP",
						timeout: 10000,
						error: function() { el.removeClass( o.loadingClass ); },
						success: function ( data ) { 
							if( callback != undefined ) callback( data );
						}
					}); 
				}
				
				getAjax(function( obj ){
					el.removeClass( o.loadingClass );
					writeTheme( obj["data"] );
				});
				
				function writeTheme( obj ){
	
					var theme = '<div class="list"><ul>',
						template = '<li><div class="column id">{{id}}</div><div class="column thumb"><a href="{{link}}" target="_blank"><img src="{{thumb}}" border="0" /></a></div></li>';
					
					for( var i = 0; i < obj.length; ++i ){
						var o = obj[ i ], id = o['caption']['id'], lnk = o['link'], thumb = o['images']['thumbnail']['url'], text = o['caption']['text']; console.log(o);
						theme += template.replace(/{{id}}/g, id).replace(/{{link}}/g, lnk).replace(/{{thumb}}/g, thumb).replace(/{{text}}/g, text);
					}
						theme += '</ul></div>';
					
					el.html( theme );
										
					if( callback != undefined ) callback();
 				}
				
				
				
			});
		}
	})
})(jQuery, window);