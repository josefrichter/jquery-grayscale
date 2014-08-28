/* jQuery grayscale plugin converts color images to grayscale using canvas element
   requires jQuery (tested only with 1.5.2) and canvas compatible browser and IE
   (c) Josef Richter 2011 \ Christopher Hill 2011
   https://github.com/josefrichter/jquery-grayscale
   licensed under MIT license
   (see http://www.opensource.org/licenses/mit-license)
   Updated by MintyStark
*/

(function( $ ){

	$.fn.grayscale = function() {

		return this.each(function(){

			var $this = $(this);
	
			/* Set Css incase canvas doesn't work */
			$this.css('filter', 'grayscale(100%)');
			$this.css('-webkit-filter', 'grayscale(100%)');
			$this.css('-moz-filter', 'grayscale(100%)');
			$this.css('-ms-filter', 'grayscale(100%)');
			$this.css('-o-filter', 'grayscale(100%)');
			$this.css('filter', 'url(resources.svg#desaturate)');
			$this.css('filter', 'gray');
			$this.css('-webkit-filter', 'grayscale(1)');

			var type = $this.prop("tagName").toUpperCase();

			var canvas = document.createElement('canvas');
			var ctx = canvas.getContext('2d');

			var imgObj = new Image();
			var image_src;

			if(type == 'IMG')
			{
				image_src = $this.attr('src');
			}
			else
			{
				/* This could be done cleaner works for now */
				image_src = $this.css('background-image').split('(');
				image_src = image_src[1];
				image_src = image_src.replace('"', '').replace(')', '').replace('"', '').replace("'", '');
			}

			imgObj.src = image_src;

			imgObj.onload = function(){
				canvas.width = imgObj.width;
				canvas.height = imgObj.height;
				ctx.drawImage(imgObj, 0, 0);

				var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);

				for(var y = 0; y < imgPixels.height; y++)
				{
					for(var x = 0; x < imgPixels.width; x++)
					{
						var i = (y * 4) * imgPixels.width + x * 4;
						var avg = (imgPixels.data[i + 0] +  imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;

						imgPixels.data[i + 0] = avg;
						imgPixels.data[i + 1] = avg;
						imgPixels.data[i + 2] = avg;
					}
				}

				ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);

				if(type == 'IMG')
				{
					$this.attr('src',canvas.toDataURL());
				}
				else
				{
					$this.css('background-image','url('+canvas.toDataURL()+')');
				}

			}
		});
	};
})( jQuery );
