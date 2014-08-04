function playerPauseStop(stop){
		if(stop){
			player.stop();
			$('#playerControl').attr('src', './images/play_1.png');
			$('#playerControl').attr('value', 'play');
		}
		else if(player.playing){
			player.pause(true);
			$('#playerControl').attr('src', './images/play_1.png');
			$('#playerControl').attr('alt', 'play');
		}
		else{
			player.resume();
			$('#playerControl').attr('src', './images/pause_1.png');
			$('#playerControl').attr('alt', 'pause');
		}
	}
	
	function parseColor(c){
			if(c.substr(0, 1) === '#'){
				c = c.substr(1);
			}
			return parseInt('0x'+c);
			
		}
	
	function initOptions(){
		
		for(x in MusicTheory.Synesthesia.data){
			if(x.indexOf('Jameson') === -1)
				$maps.append('<option>'+x+'</option>');
			else
				$maps.append('<option selected>'+x+'</option>');
		}
		$maps.change(function(){
			createColorMap($('#maps option:selected').text());
		});
		$('.colorType').change(function(){
			// document.getElementById('colorIndex').innerHTML = $('.colorType:checked').val() + this.value;
			drawRings = this.value === 'rings' ? true : false;
			clearFaces();
		})
		
		$('#animaterotation').change(function(event){
			animateRotation = $('#animaterotation').is(':checked');
		});
		
		$('#followmouse').change(function(event){
			followMouse = $('#followmouse').is(':checked');
		});
		
		
		$('#sliderX').slider({
			value: 0,
			max: 0.1,
			min: -0.1,
			step: 0.01,
			animate: true,
			slide: function(event, ui){
				rotateX = ui.value;
			}
		});
		
		$('#sliderY').slider({
			value: 0,
			max: 0.1,
			min: -0.1,
			step: 0.01,
			animate: true,
			slide: function(event, ui){
				rotateY = ui.value;
			}
		});
		
		
		
		$('#progressbar').slider(
			{
				range: 'min',
				max: 100,
				slide: function(event, ui){
					
					player.currentTime = (ui.value * player.endTime)/100;
					
				},
				start: function(event, ui){
					player.pause(true);
				},
				stop: function(event, ui){
					
					player.resume();
				},
				
				disabled: true
			}
		);
		
		$('#reset').click(function(event){
			rotateX = rotateY = 0;
			$('#sliderX').slider('option', 'value', 0);
			$('#sliderY').slider('option', 'value', 0);
			cubeGroup.rotation.x = rotateX;
			cubeGroup.rotation.y = rotateY;
			
			resetGame();
		});
		
		$('#songName').text('Currently Playing:');
		
		createPlaylist();
	}
	
	$(document).keypress(function(event){
			key = event.which;
			
			
			if(String.fromCharCode(key) === 'r'){
				drawRings = !drawRings;
			}
			else if(String.fromCharCode(key) === 'w'){
			
			}
			
			// geometry.__dirtyColors = true;
		}); 
	
	function onClick(event){
		//add click!
	}
	
	function dragEnter(event){
		event.stopPropagation();
		event.preventDefault();
	}
	
	function dragExit(evt) {
		evt.stopPropagation();
		evt.preventDefault();
	}

	function dragOver(evt) {
		evt.stopPropagation();
		evt.preventDefault();
	}
	
	function drop(evt) {
		evt.stopPropagation();
		evt.preventDefault();

		var files = evt.dataTransfer.files;
		var count = files.length;
		
		// Only call the handler if 1 or more files was dropped.
		if (count > 0)
			handleFiles(files);
	}
	
	function handleFiles(files) {
		var file = files[0];


		var reader = new FileReader();

		// init the reader event handlers
		// reader.onprogress = handleReaderProgress;
		reader.onloadend = function(e){
			var midiFile = e.target.result;
			player.loadFile(midiFile, player.start);
			
			$('#songName').text('Currently Playing: ' + file.name);
			
		};
		
		
		
		// begin the read operation
		reader.readAsDataURL(file);
		
		
	}