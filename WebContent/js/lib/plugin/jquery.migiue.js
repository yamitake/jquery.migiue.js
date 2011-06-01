/**
 jquery.migiue.js ver0.1

The MIT License

Copyright (c) 2011 yapr

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
 */
(function($) {
	$.fn.migiue = function(options){
		/**
		 * default Options
		 */
		var defaults ={
			url         : 'http://twitter.com/statuses/user_timeline/8045662.rss' , //rss feed url
			random      : true ,//ランダムに表示するか
			linked      : true ,//リンクさせるかどうか
			link        : 'http://www.nicovideo.jp/migiue?f=y' , //リンクさせた時の遷移
			num_entries : 20   ,
			show_user   : false
		};
		
		//必要条件のチェック
		if(!window['google']){
			$(this).html('jquery.migiue.jsを使用には、Google AJAX API(http://www.google.com/jsapi)が必要です。');
			return;
		}    

		if (!window['google']['feeds']){
			google.load("feeds", "1");
		}

		return this.each(function(){
			var opts = $.extend(defaults , options);

			var feed = new google.feeds.Feed(opts.url);
			feed.setNumEntries(opts.num_entries);
			
			var self = this;
			feed.load(function(result) {
				if (!result.error) {
					var index = opts.random ? parseInt(Math.random()*result.feed.entries.length) : 0;
					var text  = result.feed.entries[index].title;
					if(!opts.show_user){
						text = text.substring(text.indexOf(':') + 1 , text.length);
					}
					if(opts.linked){
						text = '<a href="' + opts.link + '" target="_blank" >' + text + '</a>';
					}
					
					$(self).html(text);
				}else{
					$(self).html(result.error.code + ":" + result.error.message);
				}
			});
		});
	};
})(jQuery);