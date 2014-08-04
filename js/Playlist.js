	function createPlaylist(){
		$.getJSON('tracks/index.json', function(result){
			playlist = result;
			$.each(result, function(i, field){
				$('#playlist').append('<li>'+(i+1) + '. ' + field.substring(field.indexOf('-')+1) + '</li>');
			});
		});
		
		$('.keys').nanoScroller({ preventPageScrolling: true });
		$('#playlist').off('click');
	}

	function loadMidiFromPlaylist(songIndex){
		
		if(songIndex < 0)
			songIndex = 0;
		else if(songIndex >= playlist.length)
			songIndex = playlist.length -1;
			
			
		if(typeof localStorage[songIndex] !== 'undefined'){
			player.loadFile(localStorage[songIndex], player.start);
		}
		else{
			$.ajax({
				url: 'tracks/' + playlist[songIndex],
				dataType: 'text',
				success: function(data){
					player.loadFile(data, player.start);
					try{
						localStorage[songIndex] = data;
					}
					catch(e){
						console.error('Local Storage Fail');
					}
				}
			});
		}
		
		var $list = $('li', $('#playlist'));
		var $previous = $($list.get(currentTrackIndex));
		$previous.removeClass('currentTrack');
		currentTrackIndex = songIndex;
		var str = playlist[currentTrackIndex];
		$('#songName').text('Currently Playing: ' + str.substring(str.indexOf('-')+1));
		var endTime = player.endTime;
		console.log((player.endTime >> 0)/1000);
		$('#songLength').text(formatClock(endTime/1000));
		var $actual = $($list.get(currentTrackIndex));
		$actual.addClass('currentTrack');
	}
	
	function formatClock(time){
		var min = (Math.round((time >> 0)/60)).toString();
		var seg = ((time >> 0)%60).toString();
		if(min.length == 1)
			min = '0' + min;
		if(seg.length == 1)
			seg = '0' + seg;
		return min+':'+seg;
	}
	
	function playlistClick(event){
		var $target = $(event.target);
		if($target.is('li')){
			var $list = $('li', $('#playlist'));
			var $current = $($list.get(currentTrackIndex));
			// $('#songName').text($item);
			$current.removeClass('currentTrack');
			$target.addClass('currentTrack');
			loadMidiFromPlaylist($list.index($target));
		}
	}