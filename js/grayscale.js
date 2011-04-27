// jQuery grayscale plugin
// converts color images to grayscale using canvas element
// requires jQuery (tested only with 1.5.2) and canvas compatible browser
// (c) Josef Richter 2011
// https://github.com/josefrichter/jquery-grayscale

(function( $ ){

  $.fn.grayscale = function() {
  
		return this.each(function(){    

			var $this = $(this);
				
			$this.load(function(){
					
				var canvas = document.createElement('canvas');
			  var ctx = canvas.getContext('2d');

			  var imgObj = new Image();
			  imgObj.src = $this.attr('src');

			  canvas.width = imgObj.width;
			  canvas.height = imgObj.height;

			  ctx.drawImage(this, 0, 0);


			  var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);

			  for(var y = 0; y < imgPixels.height; y++){
		    	for(var x = 0; x < imgPixels.width; x++){
		      	var i = (y * 4) * imgPixels.width + x * 4;
		        var avg = (imgPixels.data[i] + 
		                   imgPixels.data[i + 1] + 
		                   imgPixels.data[i + 2]
		                    ) / 3;
		        imgPixels.data[i] = avg; 
		        imgPixels.data[i + 1] = avg; 
		        imgPixels.data[i + 2] = avg;
		      }
		    }

		    ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
				$this.attr('src',canvas.toDataURL());
				
				});

		});

  };
})( jQuery );