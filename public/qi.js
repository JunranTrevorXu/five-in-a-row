
	var color = 0;
	var i;
	var j;
	
	document.getElementById("pve").onclick = function () {
		
		localStorage.setItem('pl',0);
		xhrGet("pve", function(responseText){
			// add to document
			console.log("get:"+responseText);

			}, function(err){
				console.log(err);
			});
		}
	
	document.getElementById("pvp").onclick = function () {
		
		localStorage.setItem('pl', 1);
		xhrGet("pvp", function(responseText){
			// add to document
			console.log("get:"+responseText);

			}, function(err){
				console.log(err);
			});
		}
	
	
	
	function createXHR(){
		if(typeof XMLHttpRequest != 'undefined'){
			return new XMLHttpRequest();
		}else{
			try{
				return new ActiveXObject('Msxml2.XMLHTTP');
			}catch(e){
				try{
					return new ActiveXObject('Microsoft.XMLHTTP');
				}catch(e){}
			}
		}
		return null;
	}
	
	
	function xhrGet(url, callback, errback){
		var xhr = new createXHR();
		xhr.open("GET", url, true);
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				if(xhr.status == 200){
					callback(xhr.responseText);
				}else{
					errback('service not available');
				}
			}
		};
		xhr.timeout = 3000;
		xhr.ontimeout = errback;
		xhr.send();
	}
	
	
var Qi = new Array();

for (i = 0; i < 15; i++) {
	
	Qi[i] = new Array();
}

for (i = 0; i < 15; i++) {
	
	for (j = 0; j < 15; j++) {
		
		Qi[i].push(' ');
	}
}

function valid_move(i, j) {
    
		//console.log("call valid_move()");
		
        if (i >= 0 && i <= 14 && j >= 0 && j <= 14 && Qi[i][j] == ' ') return true;
        
        return false;
}

function move(i, j, c) {
        
		//console.log("call move()");
		
        if (i < 0 || i > 14|| j < 0 || j > 14) return false;
        
        if (Qi[i][j] != ' ') return false;
        
        Qi[i][j] = c;
        
        //System.out.println(i + ", " + j);
        
        return true;
}

function win() {
    
		//console.log("call win()");
		
		for (var i = 0; i < 15; i++) {
        
            for (var j = 0; j < 15; j++) {
            
                if (Qi[i][j] != ' ') {
                
                    var c = Qi[i][j];
                    
                    if (i <= 10 && j <= 10 
                            && Qi[i + 1][j + 1] == c && Qi[i + 2][j + 2] == c && Qi[i + 3][j + 3] == c && Qi[i + 4][j + 4] == c) return true;
                    
                    else if (i <= 10 && j >= 4 && j <= 14  
                            && Qi[i + 1][j - 1] == c && Qi[i + 2][j - 2] == c && Qi[i + 3][j - 3] == c && Qi[i + 4][j - 4] == c) return true;
                    
                    else if (j <= 10
                            && Qi[i][j + 1] == c && Qi[i][j + 2] == c && Qi[i][j + 3] == c && Qi[i][j + 4] == c) return true;
                    
                    else if (i <= 10
                            && Qi[i + 1][j] == c && Qi[i + 2][j] == c && Qi[i + 3][j] == c && Qi[i + 4][j] == c) return true;
                    
                }
            }
        }
        
        return false;
    }
	
	//连续请求空位（包括位置i, j）
    function space(i, j, angle, num) {
    
        if (angle == 0) {
        
            for (var k = 0; k < num; k++) {
            
                if (i+k < 0 || i+k > 14 || Qi[i+k][j] != ' ') return false;
            }
            return true;
        }
        
        if (angle == 45) {
        
            for (var k = 0; k < num; k++) {
            
                if (i+k < 0 || i+k > 14 || j-k < 0 || j-k > 14 || Qi[i+k][j-k] != ' ') return false;
            }
            return true;
        }
        
        if (angle == 90) {
        
            for (var k = 0; k < num; k++) {
            
                if (j+k < 0 || j+k > 14 || Qi[i][j+k] != ' ') return false;
            }
            return true;
        }
        
        if (angle == 135) {
        
            for (var k = 0; k < num; k++) {
            
                if (i+k < 0 || i+k > 14 || j+k < 0 || j+k > 14 || Qi[i+k][j+k] != ' ') return false;
            }
            return true;
        }
        
        return false;
    }
    
    function value_0(i, j) {
    
		//console.log("call value_0()");
        //一连
        if ((i-1 < 0 || Qi[i-1][j] != Qi[i][j]) && (i+1 > 14 || Qi[i+1][j] != Qi[i][j])) {
        
            //死一
            if ((i-1 < 0 || Qi[i-1][j] != ' ') && (i+1 > 14 || Qi[i+1][j] != ' ')) return 0;
            
            //冲一 +4，+5
            //上顶
            if (i-1 < 0 || Qi[i-1][j] != ' ') {
				
				//跳子冲四
				if (i+4 < 15 && (Qi[i+1][j] == ' ') && (Qi[i+2][j] == Qi[i][j]) && (Qi[i+3][j] == Qi[i][j]) && (Qi[i+4][j] == Qi[i][j])) return 500;
                else if (space(i+1, j, 0, 4)) return 0;
                return 0;
            }
            //下顶
            if (i+1 > 14 || Qi[i+1][j] != ' ') {
            
				//跳子冲四
				if (i-4 >= 0 && (Qi[i-1][j] == ' ') && (Qi[i-2][j] == Qi[i][j]) && (Qi[i-3][j] == Qi[i][j]) && (Qi[i-4][j] == Qi[i][j])) return 500;
                else if (space(i-4, j, 0, 4)) return 0;
                return 0;
            }
            
            //跳子冲四
			if (i+4 < 15 && Qi[i+2][j] == Qi[i][j] && Qi[i+3][j] == Qi[i][j] && Qi[i+4][j] == Qi[i][j]) return 500;
			else if (i-4 >= 0 && Qi[i-2][j] == Qi[i][j] && Qi[i-3][j] == Qi[i][j] && Qi[i-4][j] == Qi[i][j]) return 500;
			
			//跳子活三
			if (i+4 < 15 && Qi[i+2][j] == Qi[i][j] && Qi[i+3][j] == Qi[i][j] && Qi[i+4][j] == ' ') return 500;
			else if (i-4 >= 0 && Qi[i-2][j] == Qi[i][j] && Qi[i-3][j] == Qi[i][j] && Qi[i-4][j] == ' ') return 500;
			
			//活一 +5
            if ((space(i-4, j, 0, 4) && space(i+1, j, 0, 1)) || (space(i-3, j, 0, 3) && space(i+1, j, 0, 2)) 
                    || (space(i-2, j, 0, 2) && space(i+1, j, 0, 3)) || (space(i-1, j, 0, 1) && space(i+1, j, 0, 4))) 
                return 20;
            //活一 +4
            if ((space(i-3, j, 0, 3) && space(i+1, j, 0, 1)) || (space(i-2, j, 0, 2) && space(i+1, j, 0, 2)) 
                    || (space(i-1, j, 0, 1) && space(i+1, j, 0, 3)))
                return 1;
            
            return 0;
        }  
        
        //二连
        //上一位
        if ((i-1 < 0 || Qi[i-1][j] != Qi[i][j]) && i+1 < 15 && Qi[i+1][j] == Qi[i][j] && (i+2 > 14 || Qi[i+2][j] != Qi[i][j])) {
        
            //死二
            if ((i-1 < 0 || Qi[i-1][j] != ' ') && (i+2 > 14 || Qi[i+2][j] != ' ')) return 0;
            
			//跳子冲四
			if (i+4 < 15 && Qi[i+2][j] == '' && Qi[i+3][j] == Qi[i][j] && Qi[i+4][j] == Qi[i][j]) return 500;
			else if (i-3 > 0 && Qi[i-1][j] == ' ' && Qi[i-2][j] == Qi[i][j] && Qi[i-3][j] == Qi[i][j]) return 500;
			
            //冲二 +3, +4
            //上顶
            if (i-1 < 0 || Qi[i-1][j] != ' ') {
            
                if (space(i+2, j, 0, 3)) return 1;
                return 0;
            }
            //下顶
            if (i+2 > 14 || Qi[i+2][j] != ' ') {
            
                if (space(i-3, j, 0, 3)) return 1;
                return 0;
            }
            
			//跳子活三
			if (i+4 < 15 && Qi[i+2][j] == '' && Qi[i+3][j] == Qi[i][j] && Qi[i+4][j] == ' ') return 500;
			else if (i-3 > 0 && Qi[i-1][j] == ' ' && Qi[i-2][j] == Qi[i][j] && Qi[i-3][j] == ' ') return 500;
			
            //活二 +4
            if ((space(i-3, j, 0, 3) && space(i+2, j, 0, 1)) || (space(i-2, j, 0, 2) && space(i+2, j, 0, 2)) 
                    || (space(i-1, j, 0, 1) && space(i+2, j, 0, 3))) return 100;
            //活二 +3
            if ((space(i-2, j, 0, 2) && space(i+2, j, 0, 1)) || (space(i-1, j, 0, 1) && space(i+2, j, 0, 2)))
                return 45;
            
            return 0;
        }
        //上二位
        if ((i-2 < 0 || Qi[i-2][j] != Qi[i][j]) && i-1 >= 0 && Qi[i-1][j] == Qi[i][j] && (i+1 > 14 || Qi[i+1][j] != Qi[i][j])) {
        
            //死二
            if ((i-2 < 0 || Qi[i-2][j] != ' ') && (i+1 > 14 || Qi[i+1][j] != ' ')) return 0;
            
			//跳子冲四
			if (i+3 < 14 && Qi[i+1][j] == ' ' && Qi[i+2][j] == Qi[i][j] && Qi[i+3][j] == Qi[i][j]) return 500;
			else if (i-4 > 0 && Qi[i-2][j] == ' ' && Qi[i-3][j] == Qi[i][j] && Qi[i-4][j] == Qi[i][j]) return 500;
			
            //冲二 +3, +4
            //上顶
            if (i-2 < 0 || Qi[i-2][j] != ' ') {
            
                if (space(i+1, j, 0, 3)) return 1;
                return 0;
            }
            //下顶
            if (i+1 > 14 || Qi[i+1][j] != ' ') {
            
                if (space(i-4, j, 0, 3)) return 1;
                return 0;
            }
            
			//跳子活三
			if (i+3 < 14 && Qi[i+1][j] == ' ' && Qi[i+2][j] == Qi[i][j] && ' ') return 500;
			else if (i-4 > 0 && Qi[i-2][j] == ' ' && Qi[i-3][j] == Qi[i][j] && Qi[i-4][j] == ' ') return 500;
			
            //活二 +4
            if ((space(i-4, j, 0, 3) && space(i+1, j, 0, 1)) || (space(i-3, j, 0, 2) && space(i+1, j, 0, 2)) 
                    || (space(i-2, j, 0, 1) && space(i+1, j, 0, 3))) return 100;
            //活二 +3
            if ((space(i-3, j, 0, 2) && space(i+1, j, 0, 1)) || (space(i-2, j, 0, 1) && space(i+1, j, 0, 2)))
                return 45;
            
            return 0;
        }
        
        //三连
        //上一位
        if ((i-1 < 0 || Qi[i-1][j] != Qi[i][j]) && i+1 < 15 && Qi[i+1][j] == Qi[i][j] && i+2 < 15 && Qi[i+2][j] == Qi[i][j] 
            && (i+3 > 14 || Qi[i+3][j] != Qi[i][j])) {
    
            //死三
            if ((i-1 < 0 || Qi[i-1][j] != ' ') && (i+3 > 14 || Qi[i+3][j] != ' ')) return 0;
            
			//跳子冲四
			if (i-2 > 0 && Qi[i-1][j] == ' ' && Qi[i-2][j] == Qi[i][j]) return 500;
			else if (i+4 < 15 && Qi[i+3][j] == ' ' && Qi[i+4][j] == Qi[i][j]) return 500;
			
            //冲三 +2， +3
            //上顶
            if (i-1 < 0 || Qi[i-1][j] != ' ') {
            
                if (space(i+3, j, 0, 2)) return 45;
                return 0;
            }
            //下顶
            if (i+3 > 14 || Qi[i+3][j] != ' ') {
            
                if (space(i-2, j, 0, 2)) return 45;
                return 0;
            }
            
            //活三 +3
            if ((space(i-2, j, 0, 2) && space(i+3, j, 0, 1)) || (space(i-1, j, 0, 1) && space(i+3, j, 0, 2))) return 500;
            //活三 +2
            if (space(i-1, j, 0, 1) && space(i+3, j, 0, 1)) return 100;
            
            return 0;
        }
        //上二位
        if ((i-2 < 0 || Qi[i-2][j] != Qi[i][j]) && i-1 >= 0 && Qi[i-1][j] == Qi[i][j] && i+1 < 15 && Qi[i+1][j] == Qi[i][j] 
            && (i+2 > 14 || Qi[i+2][j] != Qi[i][j])) {
    
            //死三
            if ((i-2 < 0 || Qi[i-2][j] != ' ') && (i+2 > 14 || Qi[i+2][j] != ' ')) return 0;
            
			//跳子冲四
			if (i-3 > 0 && Qi[i-2][j] == ' ' && Qi[i-3][j] == Qi[i][j]) return 500;
			else if (i+3 < 15 && Qi[i+2][j] == ' ' && Qi[i+3][j] == Qi[i][j]) return 500;
			
            //冲三 +2， +3
            //上顶
            if (i-2 < 0 || Qi[i-2][j] != ' ') {
            
                if (space(i+2, j, 0, 2)) return 45;
                return 0;
            }
            //下顶
            if (i+2 > 14 || Qi[i+2][j] != ' ') {
            
                if (space(i-3, j, 0, 2)) return 45;
                return 0;
            }
            
            //活三 +3
            if ((space(i-3, j, 0, 2) && space(i+2, j, 0, 1)) || (space(i-2, j, 0, 1) && space(i+2, j, 0, 2))) return 500;
            //活三 +2
            if (space(i-2, j, 0, 1) && space(i+2, j, 0, 1)) return 100;
            
            return 0;
        }
        //上三位
        if ((i-3 < 0 || Qi[i-3][j] != Qi[i][j]) && i-2 >= 0 && Qi[i-2][j] == Qi[i][j] && i-1 >= 0 && Qi[i-1][j] == Qi[i][j] 
            && (i+1 > 14 || Qi[i+1][j] != Qi[i][j])) {
    
            //死三
            if ((i-3 < 0 || Qi[i-3][j] != ' ') && (i+1 > 14 || Qi[i+1][j] != ' ')) return 0;
            
			//跳子冲四
			if (i-4 > 0 && Qi[i-3][j] == ' ' && Qi[i-4][j] == Qi[i][j]) return 500;
			else if (i+2 < 15 && Qi[i+1][j] == ' ' && Qi[i+2][j] == Qi[i][j]) return 500;
			
            //冲三 +2， +3
            //上顶
            if (i-3 < 0 || Qi[i-3][j] != ' ') {
            
                if (space(i+1, j, 0, 2)) return 45;
                return 0;
            }
            //下顶
            if (i+1 > 14 || Qi[i+1][j] != ' ') {
            
                if (space(i-4, j, 0, 2)) return 45;
                return 0;
            }
            
            //活三 +3
            if ((space(i-4, j, 0, 2) && space(i+1, j, 0, 1)) || (space(i-3, j, 0, 1) && space(i+1, j, 0, 2))) return 500;
            //活三 +2
            if (space(i-3, j, 0, 1) && space(i+1, j, 0, 1)) return 100;
            
            return 0;
        }
        
        //四连
        //上一位
        if ((i-1 < 0 || Qi[i-1][j] != Qi[i][j]) && i+1 < 15 && Qi[i+1][j] == Qi[i][j] && i+2 < 15 && Qi[i+2][j] == Qi[i][j] 
            && i+3 < 15 && Qi[i+3][j] == Qi[i][j] && (i+4 > 14 || Qi[i+4][j] != Qi[i][j])) {
    
            //死四
            if ((i-1 < 0 || Qi[i-1][j] != ' ') && (i+4 > 14 || Qi[i+4][j] != ' ')) return 0;
            
            //冲四 +1， +2
            //上顶
            if (i-1 < 0 || Qi[i-1][j] != ' ') {
            
                if (space(i+4, j, 0, 1)) return 500;
                return 0;
            }
            //下顶
            if (i+4 > 14 || Qi[i+4][j] != ' ') {
            
                if (space(i-1, j, 0, 1)) return 500;
                return 0;
            }
                        
            //活四 +2
            if (space(i-1, j, 0, 1) && space(i+4, j, 0, 1)) return 2000;
            
            return 0;
        }
        //上二位
        if ((i-2 < 0 || Qi[i-2][j] != Qi[i][j]) && i-1 >= 0 && Qi[i-1][j] == Qi[i][j] && i+1 < 15 && Qi[i+1][j] == Qi[i][j] 
            && i+2 < 15 && Qi[i+2][j] == Qi[i][j] && (i+3 > 14 || Qi[i+3][j] != Qi[i][j])) {
    
            //死四
            if ((i-2 < 0 || Qi[i-2][j] != ' ') && (i+3 > 14 || Qi[i+3][j] != ' ')) return 0;
            
            //冲四 +1， +2
            //上顶
            if (i-2 < 0 || Qi[i-2][j] != ' ') {
            
                if (space(i+3, j, 0, 1)) return 500;
                return 0;
            }
            //下顶
            if (i+3 > 14 || Qi[i+3][j] != ' ') {
            
                if (space(i-2, j, 0, 1)) return 500;
                return 0;
            }
                        
            //活四 +2
            if (space(i-2, j, 0, 1) && space(i+3, j, 0, 1)) return 2000;
            
            return 0;
        }
        //上三位
        if ((i-3 < 0 || Qi[i-3][j] != Qi[i][j]) && i-2 >= 0 && Qi[i-2][j] == Qi[i][j] && i-1 >= 0 && Qi[i-1][j] == Qi[i][j] 
            && i+1 < 15 && Qi[i+1][j] == Qi[i][j] && (i+2 > 14 || Qi[i+2][j] != Qi[i][j])) {
    
            //死四
            if ((i-3 < 0 || Qi[i-3][j] != ' ') && (i+2 > 14 || Qi[i+2][j] != ' ')) return 0;
            
            //冲四 +1， +2
            //上顶
            if (i-3 < 0 || Qi[i-3][j] != ' ') {
            
                if (space(i+2, j, 0, 1)) return 500;
                return 0;
            }
            //下顶
            if (i+2 > 14 || Qi[i+2][j] != ' ') {
            
                if (space(i-3, j, 0, 1)) return 500;
                return 0;
            }
                        
            //活四 +2
            if (space(i-3, j, 0, 1) && space(i+2, j, 0, 1)) return 2000;
            
            return 0;
        }
        //上四位
        if ((i-4 < 0 || Qi[i-4][j] != Qi[i][j]) && i-3 >= 0 && Qi[i-3][j] == Qi[i][j] && i-2 >= 0 && Qi[i-2][j] == Qi[i][j] 
            && i-1 >= 0 && Qi[i-1][j] == Qi[i][j] && (i+1 > 14 || Qi[i+1][j] != Qi[i][j])) {
    
            //死四
            if ((i-4 < 0 || Qi[i-4][j] != ' ') && (i+1 > 14 || Qi[i+1][j] != ' ')) return 0;
            
            //冲四 +1， +2
            //上顶
            if (i-4 < 0 || Qi[i-4][j] != ' ') {
            
                if (space(i+1, j, 0, 1)) return 500;
                return 0;
            }
            //下顶
            if (i+1 > 14 || Qi[i+1][j] != ' ') {
            
                if (space(i-4, j, 0, 1)) return 500;
                return 0;
            }
                        
            //活四 +2
            if (space(i-4, j, 0, 1) && space(i+1, j, 0, 1)) return 2000;
            
            return 0;
        }
        
        return 10000;
    }
    
    function value_45(i, j) {
    
		//console.log("call value_45()");
		
        //一连
        if ((i-1 < 0 || j+1 > 14 || Qi[i-1][j+1] != Qi[i][j]) && (i+1 > 14 || j-1 < 0 || Qi[i+1][j-1] != Qi[i][j])) {
        
            //死一
            if ((i-1 < 0 || j+1 > 14 || Qi[i-1][j+1] != ' ') && (i+1 > 14 || j-1 < 0 || Qi[i+1][j-1] != ' ')) return 0;
            
            //冲一 +4，+5
            //上顶
            if (i-1 < 0 || j+1 > 14 || Qi[i-1][j+1] != ' ') {
            
				//跳子冲四
				if (i+4 < 15 && j-4 >= 0 && Qi[i+1][j-1] == ' ' && Qi[i+2][j-2] == Qi[i][j] && Qi[i+3][j-3] == Qi[i][j] && Qi[i+4][j-4] == Qi[i][j]) return 500;
                else if (space(i+1, j-1, 45, 4)) return 0;
                return 0;
            }
            //下顶
            if (i+1 > 14 || j-1 < 0 || Qi[i+1][j-1] != ' ') {
				
				//跳子冲四
				if (i-4 >= 0 && j+4 < 15 && Qi[i-1][j+1] == ' ' && Qi[i-2][j+2] == Qi[i][j] && Qi[i-3][j+3] == Qi[i][j] && Qi[i-4][j+4] == Qi[i][j]) return 500;
                else if (space(i-4, j+4, 45, 4)) return 0;
                return 0;
            }
            
			//跳子冲四
			if (i+4 < 15 && j-4 >= 0 && Qi[i+2][j-2] == Qi[i][j] && Qi[i+3][j-3] == Qi[i][j] && Qi[i+4][j-4] == Qi[i][j]) return 500;
			else if (i-4 >= 0 && j+4 < 15 && Qi[i-2][j+2] == Qi[i][j] && Qi[i-3][j+3] == Qi[i][j] && Qi[i-4][j+4] == Qi[i][j]) return 500;
			
			//跳子活三
			if (i+4 < 15 && j-4 >= 0 && Qi[i+2][j-2] == Qi[i][j] && Qi[i+3][j-3] == Qi[i][j] && Qi[i+4][j-4] == ' ') return 500;
			else if (i-4 >= 0 && j+4 < 15 && Qi[i-2][j+2] == Qi[i][j] && Qi[i-3][j+3] == Qi[i][j] && Qi[i-4][j+4] == ' ') return 500;
			
            //活一 +5
            if ((space(i-4, j+4, 45, 4) && space(i+1, j-1, 45, 1)) || (space(i-3, j+3, 45, 3) && space(i+1, j-1, 45, 2)) 
                    || (space(i-2, j+2, 45, 2) && space(i+1, j-1, 45, 3)) || (space(i-1, j+1, 45, 1) && space(i+1, j-1, 45, 4))) 
                return 20;
            //活一 +4
            if ((space(i-3, j+3, 45, 3) && space(i+1, j-1, 45, 1)) || (space(i-2, j+2, 45, 2) && space(i+1, j-1, 45, 2)) 
                    || (space(i-1, j+1, 45, 1) && space(i+1, j-1, 45, 3)))
                return 1;
            
            return 0;
        }  
        
        //二连
        //上一位
        if ((i-1 < 0 || j+1 > 14 || Qi[i-1][j+1] != Qi[i][j]) && i+1 < 15 && j-1 >= 0 && Qi[i+1][j-1] == Qi[i][j] 
                && (i+2 > 14 || j-2 < 0 || Qi[i+2][j-2] != Qi[i][j])) {
        
            //死二
            if ((i-1 < 0 || j+1 > 14 || Qi[i-1][j+1] != ' ') && (i+2 > 14 || j-2 < 0 || Qi[i+2][j-2] != ' ')) return 0;
            
			//跳子冲四
			if (i+4 < 15 && j-4 > 0 && Qi[i+2][j-2] == '' && Qi[i+3][j-3] == Qi[i][j] && Qi[i+4][j-4] == Qi[i][j]) return 500;
			else if (i-3 > 0 && j+3 < 15 && Qi[i-1][j+1] == ' ' && Qi[i-2][j+2] == Qi[i][j] && Qi[i-3][j+3] == Qi[i][j]) return 500;
			
            //冲二 +3, +4
            //上顶
            if (i-1 < 0 || j+1 > 14 || Qi[i-1][j+1] != ' ') {
            
                if (space(i+2, j-2, 45, 3)) return 1;
                return 0;
            }
            //下顶
            if (i+2 > 14 || j-2 < 0 || Qi[i+2][j-2] != ' ') {
            
                if (space(i-3, j+3, 45, 3)) return 1;
                return 0;
            }
            
			//跳子活三
			if (i+4 < 15 && j-4 > 0 && Qi[i+2][j-2] == '' && Qi[i+3][j-3] == Qi[i][j] && Qi[i+4][j-4] == ' ') return 500;
			else if (i-3 > 0 && j+3 < 15 && Qi[i-1][j+1] == ' ' && Qi[i-2][j+2] == Qi[i][j] && Qi[i-3][j+3] == ' ') return 500;
			
            //活二 +4
            if ((space(i-3, j+3, 45, 3) && space(i+2, j-2, 45, 1)) || (space(i-2, j+2, 45, 2) && space(i+2, j-2, 45, 2)) 
                    || (space(i-1, j+1, 45, 1) && space(i+2, j-2, 45, 3))) return 100;
            //活二 +3
            if ((space(i-2, j+2, 45, 2) && space(i+2, j-2, 45, 1)) || (space(i-1, j+1, 45, 1) && space(i+2, j-2, 45, 2)))
                return 45;
            
            return 0;
        }
        //上二位
        if ((i-2 < 0 || j+2 > 14 || Qi[i-2][j+2] != Qi[i][j]) && i-1 >= 0 && j+1 < 15 && Qi[i-1][j+1] == Qi[i][j] 
                && (i+1 > 14 || j-1 < 0 || Qi[i+1][j-1] != Qi[i][j])) {
        
            //死二
            if ((i-2 < 0 || j+2 > 14 || Qi[i-2][j+2] != ' ') && (i+1 > 14 || j-1 < 0 || Qi[i+1][j-1] != ' ')) return 0;
            
			//跳子冲四
			if (i+3 < 14 && j-3 > 0 && Qi[i+1][j-1] == ' ' && Qi[i+2][j-2] == Qi[i][j] && Qi[i+3][j-3] == Qi[i][j]) return 500;
			else if (i-4 > 0 && j+4 < 15 && Qi[i-2][j+2] == ' ' && Qi[i-3][j+3] == Qi[i][j] && Qi[i-4][j+4] == Qi[i][j]) return 500;
			
            //冲二 +3, +4
            //上顶
            if (i-2 < 0 || j+2 > 14 || Qi[i-2][j+2] != ' ') {
            
                if (space(i+1, j-1, 45, 3)) return 1;
                return 0;
            }
            //下顶
            if (i+1 > 14 || j-1 < 0 || Qi[i+1][j-1] != ' ') {
            
                if (space(i-4, j+4, 45, 3)) return 1;
                return 0;
            }
            
			//跳子活三
			if (i+3 < 14 && j-3 > 0 && Qi[i+1][j-1] == ' ' && Qi[i+2][j-2] == Qi[i][j] && Qi[i+3][j-3] == ' ') return 500;
			else if (i-4 > 0 && j+4 < 15 && Qi[i-2][j+2] == ' ' && Qi[i-3][j+3] == Qi[i][j] && Qi[i-4][j+4] == ' ') return 500;
			
            //活二 +4
            if ((space(i-4, j+4, 45, 3) && space(i+1, j-1, 45, 1)) || (space(i-3, j+3, 45, 2) && space(i+1, j-1, 45, 2)) 
                    || (space(i-2, j+2, 45, 1) && space(i+1, j-1, 45, 3))) return 100;
            //活二 +3
            if ((space(i-3, j+3, 45, 2) && space(i+1, j-1, 45, 1)) || (space(i-2, j+2, 45, 1) && space(i+1, j-1, 45, 2)))
                return 45;
            
            return 0;
        }
        
        //三连
        //上一位
        if ((i-1 < 0 || j+1 > 14 || Qi[i-1][j+1] != Qi[i][j]) && i+1 < 15 && j-1 >= 0 && Qi[i+1][j-1] == Qi[i][j] 
                && i+2 < 15 && j-2 >= 0 && Qi[i+2][j-2] == Qi[i][j] && (i+3 > 14 || j-3 < 0 || Qi[i+3][j-3] != Qi[i][j])) {
    
            //死三
            if ((i-1 < 0 || j+1 > 14 || Qi[i-1][j+1] != ' ') && (i+3 > 14 || j-3 < 0 || Qi[i+3][j-3] != ' ')) return 0;
            
			//跳子冲四
			if (i-2 > 0 && j+2 < 15 && Qi[i-1][j+1] == ' ' && Qi[i-2][j+2] == Qi[i][j]) return 500;
			else if (i+4 < 15 && j-4 > 0&& Qi[i+3][j-3] == ' ' && Qi[i+4][j-4] == Qi[i][j]) return 500;
			
            //冲三 +2， +3
            //上顶
            if (i-1 < 0 || j+1 > 14 || Qi[i-1][j+1] != ' ') {
            
                if (space(i+3, j-3, 45, 2)) return 45;
                return 0;
            }
            //下顶
            if (i+3 > 14 || j-3 < 0 || Qi[i+3][j-3] != ' ') {
            
                if (space(i-2, j+2, 45, 2)) return 45;
                return 0;
            }
            
            //活三 +3
            if ((space(i-2, j+2, 45, 2) && space(i+3, j-3, 45, 1)) || (space(i-1, j+1, 45, 1) && space(i+3, j-3, 45, 2))) return 500;
            //活三 +2
            if (space(i-1, j+1, 45, 1) && space(i+3, j-3, 45, 1)) return 100;
            
            return 0;
        }
        //上二位
        if ((i-2 < 0 || j+2 > 14 || Qi[i-2][j+2] != Qi[i][j]) && i-1 >= 0 && j+1 < 15 && Qi[i-1][j+1] == Qi[i][j] 
                && i+1 < 15 && j-1 >= 0 && Qi[i+1][j-1] == Qi[i][j] && (i+2 > 14 || j-2 < 0 || Qi[i+2][j-2] != Qi[i][j])) {
    
            //死三
            if ((i-2 < 0 || j+2 > 14 || Qi[i-2][j+2] != ' ') && (i+2 > 14 || j-2 < 0 || Qi[i+2][j-2] != ' ')) return 0;
            
			//跳子冲四
			if (i-3 > 0 && j+3 < 15 && Qi[i-2][j+2] == ' ' && Qi[i-3][j+3] == Qi[i][j]) return 500;
			else if (i+3 < 15 && j-3 > 0 && Qi[i+2][j-2] == ' ' && Qi[i+3][j-3] == Qi[i][j]) return 500;
			
            //冲三 +2， +3
            //上顶
            if (i-2 < 0 || j+2 > 14 || Qi[i-2][j+2] != ' ') {
            
                if (space(i+2, j-2, 45, 2)) return 45;
                return 0;
            }
            //下顶
            if (i+2 > 14 || j-2 < 0 || Qi[i+2][j-2] != ' ') {
            
                if (space(i-3, j+3, 45, 2)) return 45;
                return 0;
            }
            
            //活三 +3
            if ((space(i-3, j+3, 45, 2) && space(i+2, j-2, 45, 1)) || (space(i-2, j+2, 45, 1) && space(i+2, j-2, 45, 2))) return 500;
            //活三 +2
            if (space(i-2, j+2, 45, 1) && space(i+2, j-2, 45, 1)) return 100;
            
            return 0;
        }
        //上三位
        if ((i-3 < 0 || j+3 > 14 || Qi[i-3][j+3] != Qi[i][j]) && i-2 >= 0 && j+2 < 15 && Qi[i-2][j+2] == Qi[i][j] 
                && i-1 >= 0 && j+1 < 15 && Qi[i-1][j+1] == Qi[i][j] && (i+1 > 14 || j-1 < 0 || Qi[i+1][j-1] != Qi[i][j])) {
    
            //死三
            if ((i-3 < 0 || j+3 > 14 || Qi[i-3][j+3] != ' ') && (i+1 > 14 || j-1 < 0 || Qi[i+1][j-1] != ' ')) return 0;
            
			//跳子冲四
			if (i-4 > 0 && j+4 < 15 && Qi[i-3][j+3] == ' ' && Qi[i-4][j+4] == Qi[i][j]) return 500;
			else if (i+2 < 15 && j-2 > 0 && Qi[i+1][j-1] == ' ' && Qi[i+2][j-2] == Qi[i][j]) return 500;
			
            //冲三 +2， +3
            //上顶
            if (i-3 < 0 || j+3 > 14 || Qi[i-3][j+3] != ' ') {
            
                if (space(i+1, j-1, 45, 2)) return 45;
                return 0;
            }
            //下顶
            if (i+1 > 14 || j-1 < 0 || Qi[i+1][j-1] != ' ') {
            
                if (space(i-4, j+4, 45, 2)) return 45;
                return 0;
            }
            
            //活三 +3
            if ((space(i-4, j+4, 45, 2) && space(i+1, j-1, 45, 1)) || (space(i-3, j+3, 45, 1) && space(i+1, j-1, 45, 2))) return 500;
            //活三 +2
            if (space(i-3, j+3, 45, 1) && space(i+1, j-1, 45, 1)) return 100;
            
            return 0;
        }
        
        //四连
        //上一位
        if ((i-1 < 0 || j+1 > 14 || Qi[i-1][j+1] != Qi[i][j]) && i+1 < 15 && j-1 >= 0 && Qi[i+1][j-1] == Qi[i][j] && i+2 < 15 && j-2 >= 0 
                && Qi[i+2][j-2] == Qi[i][j] && i+3 < 15 && j-3 >= 0 && Qi[i+3][j-3] == Qi[i][j] && (i+4 > 14 || j-4 < 0 || Qi[i+4][j-4] != Qi[i][j])) {
    
            //死四
            if ((i-1 < 0 || j+1 > 14 || Qi[i-1][j+1] != ' ') && (i+4 > 14 || j-4 < 0 || Qi[i+4][j-4] != ' ')) return 0;
            
            //冲四 +1， +2
            //上顶
            if (i-1 < 0 || j+1 > 14 || Qi[i-1][j+1] != ' ') {
            
                if (space(i+4, j-4, 45, 1)) return 500;
                return 0;
            }
            //下顶
            if (i+4 > 14 || j-4 < 0 || Qi[i+4][j-4] != ' ') {
            
                if (space(i-1, j+1, 45, 1)) return 500;
                return 0;
            }
                        
            //活四 +2
            if (space(i-1, j+1, 45, 1) && space(i+4, j-4, 45, 1)) return 2000;
            
            return 0;
        }
        //上二位
        if ((i-2 < 0 || j+2 > 14 || Qi[i-2][j+2] != Qi[i][j]) && i-1 >= 0 && j+1 < 15 && Qi[i-1][j+1] == Qi[i][j] && i+1 < 15 && j-1 >= 0 
                && Qi[i+1][j-1] == Qi[i][j] && i+2 < 15 && j-2 >= 0 && Qi[i+2][j-2] == Qi[i][j] && (i+3 > 14 || j-3 < 0 || Qi[i+3][j-3] != Qi[i][j])) {
    
            //死四
            if ((i-2 < 0 || j+2 > 14 || Qi[i-2][j+2] != ' ') && (i+3 > 14 || j-3 < 0 || Qi[i+3][j-3] != ' ')) return 0;
            
            //冲四 +1， +2
            //上顶
            if (i-2 < 0 || j+2 > 14 || Qi[i-2][j+2] != ' ') {
            
                if (space(i+3, j-3, 45, 1)) return 500;
                return 0;
            }
            //下顶
            if (i+3 > 14 || j-3 < 0 || Qi[i+3][j-3] != ' ') {
            
                if (space(i-2, j+2, 45, 1)) return 500;
                return 0;
            }
                        
            //活四 +2
            if (space(i-2, j+2, 45, 1) && space(i+3, j-3, 45, 1)) return 2000;
            
            return 0;
        }
        //上三位
        if ((i-3 < 0 || j+3 > 14 || Qi[i-3][j+3] != Qi[i][j]) && i-2 >= 0 && j+2 < 15 && Qi[i-2][j+2] == Qi[i][j] && i-1 >= 0 && j+1 < 15 
                && Qi[i-1][j+1] == Qi[i][j] && i+1 < 15 && j-1 >= 0 && Qi[i+1][j-1] == Qi[i][j] && (i+2 > 14 || j-2 < 0 || Qi[i+2][j-2] != Qi[i][j])) {
    
            //死四
            if ((i-3 < 0 || j+3 > 14 || Qi[i-3][j+3] != ' ') && (i+2 > 14 || j-2 < 0 || Qi[i+2][j-2] != ' ')) return 0;
            
            //冲四 +1， +2
            //上顶
            if (i-3 < 0 || j+3 > 14 || Qi[i-3][j+3] != ' ') {
            
                if (space(i+2, j-2, 45, 1)) return 500;
                return 0;
            }
            //下顶
            if (i+2 > 14 || j-2 < 0 || Qi[i+2][j-2] != ' ') {
            
                if (space(i-3, j+3, 45, 1)) return 500;
                return 0;
            }
                        
            //活四 +2
            if (space(i-3, j+3, 45, 1) && space(i+2, j-2, 45, 1)) return 2000;
            
            return 0;
        }
        //上四位
        if ((i-4 < 0 || j+4 > 14 || Qi[i-4][j+4] != Qi[i][j]) && i-3 >= 0 && j+3 < 15 && Qi[i-3][j+3] == Qi[i][j] && i-2 >= 0 && j+2 < 15 
                && Qi[i-2][j+2] == Qi[i][j] && i-1 >= 0 && j+1 < 15 && Qi[i-1][j+1] == Qi[i][j] && (i+1 > 14 || j-1 < 0 || Qi[i+1][j-1] != Qi[i][j])) {
    
            //死四
            if ((i-4 < 0 || j+4 > 14 || Qi[i-4][j+4] != ' ') && (i+1 > 14 || j-1 < 0 || Qi[i+1][j-1] != ' ')) return 0;
            
            //冲四 +1， +2
            //上顶
            if (i-4 < 0 || j+4 > 14 || Qi[i-4][j+4] != ' ') {
            
                if (space(i+1, j-1, 45, 1)) return 500;
                return 0;
            }
            //下顶
            if (i+1 > 14 || j-1 < 0 || Qi[i+1][j-1] != ' ') {
            
                if (space(i-4, j+4, 45, 1)) return 500;
                return 0;
            }
                        
            //活四 +2
            if (space(i-4, j+4, 45, 1) && space(i+1, j-1, 45, 1)) return 2000;
            
            return 0;
        }
        
        return 10000;
    }
    
    function value_90(i, j) {
    
		//console.log("call value_90()");
	
        //一连
        if ((j-1 < 0 || Qi[i][j-1] != Qi[i][j]) && (j+1 > 14 || Qi[i][j+1] != Qi[i][j])) {
        
            //死一
            if ((j-1 < 0 || Qi[i][j-1] != ' ') && (j+1 > 14 || Qi[i][j+1] != ' ')) return 0;
            
            //冲一 +4，+5
            //左顶
            if (j-1 < 0 || Qi[i][j-1] != ' ') {
				
				//跳子冲四
				if (j+4 < 15 && Qi[i][j+1] == ' ' && Qi[i][j+2] == Qi[i][j] && Qi[i][j+3] == Qi[i][j] && Qi[i][j+4] == Qi[i][j]) return 500;
                if (space(i, j+1, 90, 4)) return 0;
                return 0;
            }
            //右顶
            if (j+1 > 14 || Qi[i][j+1] != ' ') {
				
				//跳子冲四
				if (j-4 >= 0 && Qi[i][j-1] == ' ' && Qi[i][j-2] == Qi[i][j] && Qi[i][j-3] == Qi[i][j] && Qi[i][j-4] == Qi[i][j]) return 500;
                if (space(i, j-4, 90, 4)) return 0;
                return 0;
            }
            
			
			//跳子冲四
			if (j+4 < 15 && Qi[i][j+2] == Qi[i][j] && Qi[i][j+3] == Qi[i][j] && Qi[i][j+4] == Qi[i][j]) return 500;
			else if (j-4 >= 0 && Qi[i][j-2] == Qi[i][j] && Qi[i][j-3] == Qi[i][j] && Qi[i][j-4] == Qi[i][j]) return 500;
			
			//跳子活三
			if (j+4 < 15 && Qi[i][j+2] == Qi[i][j] && Qi[i][j+3] == Qi[i][j] && Qi[i][j+4] == ' ') return 500;
			else if (j-4 >= 0 && Qi[i][j-2] == Qi[i][j] && Qi[i][j-3] == Qi[i][j] && Qi[i][j-4] == ' ') return 500;
			
            //活一 +5
            if ((space(i, j-4, 90, 4) && space(i, j+1, 90, 1)) || (space(i, j-3, 90, 3) && space(i, j+1, 90, 2)) 
                    || (space(i, j-2, 90, 2) && space(i, j+1, 90, 3)) || (space(i, j-1, 90, 1) && space(i, j+1, 90, 4))) 
                return 20;
            //活一 +4
            if ((space(i, j-3, 90, 3) && space(i, j+1, 90, 1)) || (space(i, j-2, 90, 2) && space(i, j+1, 90, 2)) 
                    || (space(i, j-1, 90, 1) && space(i, j+1, 90, 3)))
                return 1;
            
            return 0;
        }  
        
        //二连
        //左一位
        if ((j-1 < 0 || Qi[i][j-1] != Qi[i][j]) && j+1 < 15 && Qi[i][j+1] == Qi[i][j] && (j+2 > 14 || Qi[i][j+2] != Qi[i][j])) {
        
            //死二
            if ((j-1 < 0 || Qi[i][j-1] != ' ') && (j+2 > 14 || Qi[i][j+2] != ' ')) return 0;
            
			//跳子冲四
			if (j+4 < 15 && Qi[i][j+2] == '' && Qi[i][j+3] == Qi[i][j] && Qi[i][j+4] == Qi[i][j]) return 500;
			else if (j-3 > 0 && Qi[i][j-1] == ' ' && Qi[i][j-2] == Qi[i][j] && Qi[i][j-3] == Qi[i][j]) return 500;
			
            //冲二 +3, +4
            //左顶
            if (j-1 < 0 || Qi[i][j-1] != ' ') {
            
                if (space(i, j+2, 90, 3)) return 1;
                return 0;
            }
            //右顶
            if (j+2 > 14 || Qi[i][j+2] != ' ') {
            
                if (space(i, j-3, 90, 3)) return 1;
                return 0;
            }
            
			//跳子活三
			if (j+4 < 15 && Qi[i][j+2] == '' && Qi[i][j+3] == Qi[i][j] && Qi[i][j+4] == ' ') return 500;
			else if (j-3 > 0 && Qi[i][j-1] == ' ' && Qi[i][j-2] == Qi[i][j] && Qi[i][j-3] == ' ') return 500;
			
            //活二 +4
            if ((space(i, j-3, 90, 3) && space(i, j+2, 90, 1)) || (space(i, j-2, 90, 2) && space(i, j+2, 90, 2)) 
                    || (space(i, j-1, 90, 1) && space(i, j+2, 90, 3))) return 100;
            //活二 +3
            if ((space(i, j-2, 90, 2) && space(i, j+2, 90, 1)) || (space(i, j-1, 90, 1) && space(i, j+2, 90, 2)))
                return 45;
            
            return 0;
        }
        //左二位
        if ((j-2 < 0 || Qi[i][j-2] != Qi[i][j]) && j-1 >= 0 && Qi[i][j-1] == Qi[i][j] && (j+1 > 14 || Qi[i][j+1] != Qi[i][j])) {
        
            //死二
            if ((j-2 < 0 || Qi[i][j-2] != ' ') && (j+1 > 14 || Qi[i][j+1] != ' ')) return 0;
            
			//跳子冲四
			if (j+3 < 15 && Qi[i][j+1] == ' ' && Qi[i][j+2] == Qi[i][j] && Qi[i][j+3] == Qi[i][j]) return 500;
			else if (j-4 > 0 && Qi[i][j-2] == ' ' && Qi[i][j-3] == Qi[i][j] && Qi[i][j-4] == Qi[i][j]) return 500;
			
            //冲二 +3, +4
            //左顶
            if (j-2 < 0 || Qi[i][j-2] != ' ') {
            
                if (space(i, j+1, 90, 3)) return 1;
                return 0;
            }
            //右顶
            if (j+1 > 14 || Qi[i][j+1] != ' ') {
            
                if (space(i, j-4, 90, 3)) return 1;
                return 0;
            }
            
			//跳子活三
			if (j+3 < 15 && Qi[i][j+1] == ' ' && Qi[i][j+2] == Qi[i][j] && Qi[i][j+3] == ' ') return 500;
			else if (j-4 > 0 && Qi[i][j-2] == ' ' && Qi[i][j-3] == Qi[i][j] && Qi[i][j-4] == ' ') return 500;
			
            //活二 +4
            if ((space(i, j-4, 90, 3) && space(i, j+1, 90, 1)) || (space(i, j-3, 90, 2) && space(i, j+1, 90, 2)) 
                    || (space(i, j-2, 90, 1) && space(i, j+1, 90, 3))) return 100;
            //活二 +3
            if ((space(i, j-3, 90, 2) && space(i, j+1, 90, 1)) || (space(i, j-2, 90, 1) && space(i, j+1, 90, 2)))
                return 45;
            
            return 0;
        }
        
        //三连
        //左一位
        if ((j-1 < 0 || Qi[i][j-1] != Qi[i][j]) && j+1 < 15 && Qi[i][j+1] == Qi[i][j] && j+2 < 15 && Qi[i][j+2] == Qi[i][j] 
            && (j+3 > 14 || Qi[i][j+3] != Qi[i][j])) {
    
            //死三
            if ((j-1 < 0 || Qi[i][j-1] != ' ') && (j+3 > 14 || Qi[i][j+3] != ' ')) return 0;
            
			//跳子冲四
			if (j-2 > 0 && Qi[i][j-1] == ' ' && Qi[i][j-2] == Qi[i][j]) return 500;
			else if (j+4 < 15 && Qi[i][j+3] == ' ' && Qi[i][j+4] == Qi[i][j]) return 500;
			
            //冲三 +2， +3
            //左顶
            if (j-1 < 0 || Qi[i][j-1] != ' ') {
            
                if (space(i, j+3, 90, 2)) return 45;
                return 0;
            }
            //右顶
            if (j+3 > 14 || Qi[i][j+3] != ' ') {
            
                if (space(i, j-2, 90, 2)) return 45;
                return 0;
            }
            
            //活三 +3
            if ((space(i, j-2, 90, 2) && space(i, j+3, 90, 1)) || (space(i, j-1, 90, 1) && space(i, j+3, 90, 2))) return 500;
            //活三 +2
            if (space(i, j-1, 90, 1) && space(i, j+3, 90, 1)) return 100;
            
            return 0;
        }
        //左二位
        if ((j-2 < 0 || Qi[i][j-2] != Qi[i][j]) && j-1 >= 0 && Qi[i][j-1] == Qi[i][j] && j+1 < 15 && Qi[i][j+1] == Qi[i][j] 
            && (j+2 > 14 || Qi[i][j+2] != Qi[i][j])) {
    
            //死三
            if ((j-2 < 0 || Qi[i][j-2] != ' ') && (j+2 > 14 || Qi[i][j+2] != ' ')) return 0;
            
			//跳子冲四
			if (j-3 > 0 && Qi[i][j-2] == ' ' && Qi[i][j-3] == Qi[i][j]) return 500;
			else if (j+3 < 15 && Qi[i][j+2] == ' ' && Qi[i][j+3] == Qi[i][j]) return 500;
			
            //冲三 +2， +3
            //左顶
            if (j-2 < 0 || Qi[i][j-2] != ' ') {
            
                if (space(i, j+2, 90, 2)) return 45;
                return 0;
            }
            //下顶
            if (j+2 > 14 || Qi[i][j+2] != ' ') {
            
                if (space(i, j-3, 90, 2)) return 45;
                return 0;
            }
            
            //活三 +3
            if ((space(i, j-3, 90, 2) && space(i, j+2, 90, 1)) || (space(i, j-2, 90, 1) && space(i, j+2, 90, 2))) return 500;
            //活三 +2
            if (space(i, j-2, 90, 1) && space(i, j+2, 90, 1)) return 100;
            
            return 0;
        }
        //左三位
        if ((j-3 < 0 || Qi[i][j-3] != Qi[i][j]) && j-2 >= 0 && Qi[i][j-2] == Qi[i][j] && j-1 >= 0 && Qi[i][j-1] == Qi[i][j] 
            && (j+1 > 14 || Qi[i][j+1] != Qi[i][j])) {
    
            //死三
            if ((j-3 < 0 || Qi[i][j-3] != ' ') && (j+1 > 14 || Qi[i][j+1] != ' ')) return 0;
            
			//跳子冲四
			if (j-4 > 0 && Qi[i][j-3] == ' ' && Qi[i][j-4] == Qi[i][j]) return 500;
			else if (j+2 < 15 && Qi[i][j+1] == ' ' && Qi[i][j+2] == Qi[i][j]) return 500;
			
            //冲三 +2， +3
            //左顶
            if (j-3 < 0 || Qi[i][j-3] != ' ') {
            
                if (space(i, j+1, 90, 2)) return 45;
                return 0;
            }
            //右顶
            if (j+1 > 14 || Qi[i][j+1] != ' ') {
            
                if (space(i, j-4, 90, 2)) return 45;
                return 0;
            }
            
            //活三 +3
            if ((space(i, j-4, 90, 2) && space(i, j+1, 90, 1)) || (space(i, j-3, 90, 1) && space(i, j+1, 90, 2))) return 500;
            //活三 +2
            if (space(i, j-3, 90, 1) && space(i, j+1, 90, 1)) return 100;
            
            return 0;
        }
        
        //四连
        //上一位
        if ((j-1 < 0 || Qi[i][j-1] != Qi[i][j]) && j+1 < 15 && Qi[i][j+1] == Qi[i][j] && j+2 < 15 && Qi[i][j+2] == Qi[i][j] 
            && j+3 < 15 && Qi[i][j+3] == Qi[i][j] && (j+4 > 14 || Qi[i][j+4] != Qi[i][j])) {
    
            //死四
            if ((j-1 < 0 || Qi[i][j-1] != ' ') && (j+4 > 14 || Qi[i][j+4] != ' ')) return 0;
            
            //冲四 +1， +2
            //左顶
            if (j-1 < 0 || Qi[i][j-1] != ' ') {
            
                if (space(i, j+4, 90, 1)) return 500;
                return 0;
            }
            //右顶
            if (j+4 > 14 || Qi[i][j+4] != ' ') {
            
                if (space(i, j-1, 90, 1)) return 500;
                return 0;
            }
                        
            //活四 +2
            if (space(i, j-1, 90, 1) && space(i, j+4, 90, 1)) return 2000;
            
            return 0;
        }
        //左二位
        if ((j-2 < 0 || Qi[i][j-2] != Qi[i][j]) && j-1 >= 0 && Qi[i][j-1] == Qi[i][j] && j+1 < 15 && Qi[i][j+1] == Qi[i][j] 
            && j+2 < 15 && Qi[i][j+2] == Qi[i][j] && (j+3 > 14 || Qi[i][j+3] != Qi[i][j])) {
    
            //死四
            if ((j-2 < 0 || Qi[i][j-2] != ' ') && (j+3 > 14 || Qi[i][j+3] != ' ')) return 0;
            
            //冲四 +1， +2
            //左顶
            if (j-2 < 0 || Qi[i][j-2] != ' ') {
            
                if (space(i, j+3, 90, 1)) return 500;
                return 0;
            }
            //右顶
            if (j+3 > 14 || Qi[i][j+3] != ' ') {
            
                if (space(i, j-2, 90, 1)) return 500;
                return 0;
            }
                        
            //活四 +2
            if (space(i, j-2, 90, 1) && space(i, j+3, 90, 1)) return 2000;
            
            return 0;
        }
        //左三位
        if ((j-3 < 0 || Qi[i][j-3] != Qi[i][j]) && j-2 >= 0 && Qi[i][j-2] == Qi[i][j] && j-1 >= 0 && Qi[i][j-1] == Qi[i][j] 
            && j+1 < 15 && Qi[i][j+1] == Qi[i][j] && (j+2 > 14 || Qi[i][j+2] != Qi[i][j])) {
    
            //死四
            if ((j-3 < 0 || Qi[i][j-3] != ' ') && (j+2 > 14 || Qi[i][j+2] != ' ')) return 0;
            
            //冲四 +1， +2
            //左顶
            if (j-3 < 0 || Qi[i][j-3] != ' ') {
            
                if (space(i, j+2, 90, 1)) return 500;
                return 0;
            }
            //右顶
            if (j+2 > 14 || Qi[i][j+2] != ' ') {
            
                if (space(i, j-3, 90, 1)) return 500;
                return 0;
            }
                        
            //活四 +2
            if (space(i, j-3, 90, 1) && space(i, j+2, 90, 1)) return 2000;
            
            return 0;
        }
        //上四位
        if ((j-4 < 0 || Qi[i][j-4] != Qi[i][j]) && j-3 >= 0 && Qi[i][j-3] == Qi[i][j] && j-2 >= 0 && Qi[i][j-2] == Qi[i][j] 
            && j-1 >= 0 && Qi[i][j-1] == Qi[i][j] && (j+1 > 14 || Qi[i][j+1] != Qi[i][j])) {
    
            //死四
            if ((j-4 < 0 || Qi[i][j-4] != ' ') && (j+1 > 14 || Qi[i][j+1] != ' ')) return 0;
            
            //冲四 +1， +2
            //左顶
            if (j-4 < 0 || Qi[i][j-4] != ' ') {
            
                if (space(i, j+1, 90, 1)) return 500;
                return 0;
            }
            //右顶
            if (j+1 > 14 || Qi[i][j+1] != ' ') {
            
                if (space(i, j-4, 90, 1)) return 500;
                return 0;
            }
                        
            //活四 +2
            if (space(i, j-4, 90, 1) && space(i, j+1, 90, 1)) return 2000;
            
            return 0;
        }
        
        return 10000;
    }
    
    function value_135(i, j) {
		
		//console.log("call value_135()");
		
        //一连
        if ((i-1 < 0 || j-1 < 0 || Qi[i-1][j-1] != Qi[i][j]) && (i+1 > 14 || j+1 > 14 || Qi[i+1][j+1] != Qi[i][j])) {
        
            //死一
            if ((i-1 < 0 || j-1 < 0 || Qi[i-1][j-1] != ' ') && (i+1 > 14 || j+1 > 14 || Qi[i+1][j+1] != ' ')) return 0;
            
            //冲一 +4，+5
            //上顶
            if (i-1 < 0 || j-1 < 0 || Qi[i-1][j-1] != ' ') {
				
				//跳子冲四
				if (i+4 < 15 && j+4 < 15 && Qi[i+1][j+1] == ' ' && Qi[i+2][j+2] == Qi[i][j] && Qi[i+3][j+3] == Qi[i][j] && Qi[i+4][j+4] == Qi[i][j]) return 500;
                else if (space(i+1, j+1, 135, 4)) return 0;
                return 0;
            }
            //下顶
            if (i+1 > 14 || j+1 > 14 || Qi[i+1][j+1] != ' ') {
				
				//跳子冲四
				if (i-4 >= 0 && j-4 >= 0 && Qi[i-1][j-1] == ' ' && Qi[i-2][j-2] == Qi[i][j] && Qi[i-3][j-3] == Qi[i][j] && Qi[i-4][j-4] == Qi[i][j]) return 500;
                else if (space(i-4, j-4, 135, 4)) return 0;
                return 0;
            }
            
			//跳子冲四
			if (i+4 < 15 && j+4 < 15 && Qi[i+2][j+2] == Qi[i][j] && Qi[i+3][j+3] == Qi[i][j] && Qi[i+4][j+4] == Qi[i][j]) return 500;
			else if (i-4 >= 0 && j-4 >= 0 && Qi[i-2][j-2] == Qi[i][j] && Qi[i-3][j-3] == Qi[i][j] && Qi[i-4][j-4] == Qi[i][j]) return 500;
			
			//跳子活三
			if (i+4 < 15 && j+4 < 15 && Qi[i+2][j+2] == Qi[i][j] && Qi[i+3][j+3] == Qi[i][j] && Qi[i+4][j+4] == ' ') return 500;
			else if (i-4 >= 0 && j-4 >= 0 && Qi[i-2][j-2] == Qi[i][j] && Qi[i-3][j-3] == Qi[i][j] && Qi[i-4][j-4] == ' ') return 500;
			
            //活一 +5
            if ((space(i-4, j-4, 135, 4) && space(i+1, j+1, 135, 1)) || (space(i-3, j-3, 135, 3) && space(i+1, j+1, 135, 2)) 
                    || (space(i-2, j-2, 135, 2) && space(i+1, j+1, 135, 3)) || (space(i-1, j-1, 135, 1) && space(i+1, j+1, 135, 4))) 
                return 20;
            //活一 +4
            if ((space(i-3, j-3, 135, 3) && space(i+1, j+1, 135, 1)) || (space(i-2, j-2, 135, 2) && space(i+1, j+1, 135, 2)) 
                    || (space(i-1, j-1, 135, 1) && space(i+1, j+1, 135, 3)))
                return 1;
            
            return 0;
        }  
        
        //二连
        //上一位
        if ((i-1 < 0 || j-1 < 0 || Qi[i-1][j-1] != Qi[i][j]) && i+1 < 15 && j+1 < 15 && Qi[i+1][j+1] == Qi[i][j] 
                && (i+2 > 14 || j+2 > 14 || Qi[i+2][j+2] != Qi[i][j])) {
        
            //死二
            if ((i-1 < 0 || j-1 < 0 || Qi[i-1][j-1] != ' ') && (i+2 > 14 || j+2 > 14 || Qi[i+2][j+2] != ' ')) return 0;
            
			//跳子冲四
			if (i+4 < 15 && j+4 < 15 && Qi[i+2][j+2] == '' && Qi[i+3][j+3] == Qi[i][j] && Qi[i+4][j+4] == Qi[i][j]) return 500;
			else if (i-3 > 0 && j-3 > 0 && Qi[i-1][j-1] == ' ' && Qi[i-2][j-2] == Qi[i][j] && Qi[i-3][j-3] == Qi[i][j]) return 500;
			
            //冲二 +3, +4
            //上顶
            if (i-1 < 0 || j-1 < 0 || Qi[i-1][j-1] != ' ') {
            
                if (space(i+2, j+2, 135, 3)) return 1;
                return 0;
            }
            //下顶
            if (i+2 > 14 || j+2 > 14 || Qi[i+2][j+2] != ' ') {
            
                if (space(i-3, j-3, 135, 3)) return 1;
                return 0;
            }
            
			//跳子活三
			if (i+4 < 15 && j+4 < 15 && Qi[i+2][j+2] == '' && Qi[i+3][j+3] == Qi[i][j] && Qi[i+4][j+4] == ' ') return 500;
			else if (i-3 > 0 && j-3 > 0 && Qi[i-1][j-1] == ' ' && Qi[i-2][j-2] == Qi[i][j] && Qi[i-3][j-3] == ' ') return 500;
			
            //活二 +4
            if ((space(i-3, j-3, 135, 3) && space(i+2, j+2, 135, 1)) || (space(i-2, j-2, 135, 2) && space(i+2, j+2, 135, 2)) 
                    || (space(i-1, j-1, 135, 1) && space(i+2, j+2, 135, 3))) return 100;
            //活二 +3
            if ((space(i-2, j-2, 135, 2) && space(i+2, j+2, 135, 1)) || (space(i-1, j-1, 135, 1) && space(i+2, j+2, 135, 2)))
                return 45;
            
            return 0;
        }
        //上二位
        if ((i-2 < 0 || j-2 < 0 || Qi[i-2][j-2] != Qi[i][j]) && i-1 >= 0 && j-1 >= 0 && Qi[i-1][j-1] == Qi[i][j] 
                && (i+1 > 14 || j+1 > 14 || Qi[i+1][j+1] != Qi[i][j])) {
        
            //死二
            if ((i-2 < 0 || j-2 < 0 || Qi[i-2][j-2] != ' ') && (i+1 > 14 || j+1 > 14 || Qi[i+1][j+1] != ' ')) return 0;
            
			//跳子冲四
			if (i+3 < 15 && j+3 < 15 && Qi[i+1][j+1] == ' ' && Qi[i+2][j+2] == Qi[i][j] && Qi[i+3][j+3] == Qi[i][j]) return 500;
			else if (i-4 > 0 && j-4 > 0 && Qi[i-2][j-2] == ' ' && Qi[i-3][j-3] == Qi[i][j] && Qi[i-4][j-4] == Qi[i][j]) return 500;
			
            //冲二 +3, +4
            //上顶
            if (i-2 < 0 || j-2 < 0 || Qi[i-2][j-2] != ' ') {
            
                if (space(i+1, j+1, 135, 3)) return 1;
                return 0;
            }
            //下顶
            if (i+1 > 14 || j+1 > 14 || Qi[i+1][j+1] != ' ') {
            
                if (space(i-4, j-4, 135, 3)) return 1;
                return 0;
            }
            
			//跳子活三
			if (i+3 < 15 && j+3 < 15 && Qi[i+1][j+1] == ' ' && Qi[i+2][j+2] == Qi[i][j] && Qi[i+3][j+3] == ' ') return 500;
			else if (i-4 > 0 && j-4 > 0 && Qi[i-2][j-2] == ' ' && Qi[i-3][j-3] == Qi[i][j] && Qi[i-4][j-4] == ' ') return 500;
			
            //活二 +4
            if ((space(i-4, j-4, 135, 3) && space(i+1, j+1, 135, 1)) || (space(i-3, j-3, 135, 2) && space(i+1, j+1, 135, 2)) 
                    || (space(i-2, j-2, 135, 1) && space(i+1, j+1, 135, 3))) return 100;
            //活二 +3
            if ((space(i-3, j-3, 135, 2) && space(i+1, j+1, 135, 1)) || (space(i-2, j-2, 135, 1) && space(i+1, j+1, 135, 2)))
                return 45;
            
            return 0;
        }
        
        //三连
        //上一位
        if ((i-1 < 0 || j-1 < 0 || Qi[i-1][j-1] != Qi[i][j]) && i+1 < 15 && j+1 < 15 && Qi[i+1][j+1] == Qi[i][j] 
                && i+2 < 15 && j+2 < 15 && Qi[i+2][j+2] == Qi[i][j] && (i+3 > 14 || j+3 > 14 || Qi[i+3][j+3] != Qi[i][j])) {
    
            //死三
            if ((i-1 < 0 || j-1 < 0 || Qi[i-1][j-1] != ' ') && (i+3 > 14 || j+3 > 14 || Qi[i+3][j+3] != ' ')) return 0;
            
			//跳子冲四
			if (i-2 > 0 && j-2 > 0 && Qi[i-1][j-1] == ' ' && Qi[i-2][j-2] == Qi[i][j]) return 500;
			else if (i+4 < 15 && j+4 < 15 && Qi[i+3][j+3] == ' ' && Qi[i+4][j+4] == Qi[i][j]) return 500;
			
            //冲三 +2， +3
            //上顶
            if (i-1 < 0 || j-1 < 0 || Qi[i-1][j-1] != ' ') {
            
                if (space(i+3, j+3, 135, 2)) return 45;
                return 0;
            }
            //下顶
            if (i+3 > 14 || j+3 > 14 || Qi[i+3][j+3] != ' ') {
            
                if (space(i-2, j-2, 135, 2)) return 45;
                return 0;
            }
            
            //活三 +3
            if ((space(i-2, j-2, 135, 2) && space(i+3, j+3, 135, 1)) || (space(i-1, j-1, 135, 1) && space(i+3, j+3, 135, 2))) return 500;
            //活三 +2
            if (space(i-1, j-1, 135, 1) && space(i+3, j+3, 135, 1)) return 100;
            
            return 0;
        }
        //上二位
        if ((i-2 < 0 || j-2 < 0 || Qi[i-2][j-2] != Qi[i][j]) && i-1 >= 0 && j-1 >= 0 && Qi[i-1][j-1] == Qi[i][j] 
                && i+1 < 15 && j+1 < 15 && Qi[i+1][j+1] == Qi[i][j] && (i+2 > 14 || j+2 > 14 || Qi[i+2][j+2] != Qi[i][j])) {
    
            //死三
            if ((i-2 < 0 || j-2 < 0 || Qi[i-2][j-2] != ' ') && (i+2 > 14 || j+2 > 14 || Qi[i+2][j+2] != ' ')) return 0;
            
			//跳子冲四
			if (i-3 > 0 && j-3 > 0 && Qi[i-2][j-2] == ' ' && Qi[i-3][j-3] == Qi[i][j]) return 500;
			else if (i+3 < 15 && j+3 < 15 && Qi[i+2][j+2] == ' ' && Qi[i+3][j+3] == Qi[i][j]) return 500;
			
            //冲三 +2， +3
            //上顶
            if (i-2 < 0 || j-2 < 0 || Qi[i-2][j-2] != ' ') {
            
                if (space(i+2, j+2, 135, 2)) return 45;
                return 0;
            }
            //下顶
            if (i+2 > 14 || j+2 > 14 || Qi[i+2][j+2] != ' ') {
            
                if (space(i-3, j-3, 135, 2)) return 45;
                return 0;
            }
            
            //活三 +3
            if ((space(i-3, j-3, 135, 2) && space(i+2, j+2, 135, 1)) || (space(i-2, j-2, 135, 1) && space(i+2, j+2, 135, 2))) return 500;
            //活三 +2
            if (space(i-2, j-2, 135, 1) && space(i+2, j+2, 135, 1)) return 100;
            
            return 0;
        }
        //上三位
        if ((i-3 < 0 || j-3 < 0 || Qi[i-3][j-3] != Qi[i][j]) && i-2 >= 0 && j-2 >= 0 && Qi[i-2][j-2] == Qi[i][j] 
                && i-1 >= 0 && j-1 >= 0 && Qi[i-1][j-1] == Qi[i][j] && (i+1 > 14 || j+1 > 14 || Qi[i+1][j+1] != Qi[i][j])) {
    
            //死三
            if ((i-3 < 0 || j-3 < 0 || Qi[i-3][j-3] != ' ') && (i+1 > 14 || j+1 > 14 || Qi[i+1][j+1] != ' ')) return 0;
            
			//跳子冲四
			if (i-4 > 0 && j-4 > 0 && Qi[i-3][j-3] == ' ' && Qi[i-4][j-4] == Qi[i][j]) return 500;
			else if (i+2 < 15 && j+2 < 15 && Qi[i+1][j+1] == ' ' && Qi[i+2][j+2] == Qi[i][j]) return 500;
			
            //冲三 +2， +3
            //上顶
            if (i-3 < 0 || j-3 < 0 || Qi[i-3][j-3] != ' ') {
            
                if (space(i+1, j+1, 135, 2)) return 45;
                return 0;
            }
            //下顶
            if (i+1 > 14 || j+1 > 14 || Qi[i+1][j+1] != ' ') {
            
                if (space(i-4, j-4, 135, 2)) return 45;
                return 0;
            }
            
            //活三 +3
            if ((space(i-4, j-4, 135, 2) && space(i+1, j+1, 135, 1)) || (space(i-3, j-3, 135, 1) && space(i+1, j+1, 135, 2))) return 500;
            //活三 +2
            if (space(i-3, j-3, 135, 1) && space(i+1, j+1, 135, 1)) return 100;
            
            return 0;
        }
        
        //四连
        //上一位
        if ((i-1 < 0 || j-1 < 0 || Qi[i-1][j-1] != Qi[i][j]) && i+1 < 15 && j+1 < 15 && Qi[i+1][j+1] == Qi[i][j] && i+2 < 15 && j+2 < 15 
                && Qi[i+2][j+2] == Qi[i][j] && i+3 < 15 && j+3 < 15 && Qi[i+3][j+3] == Qi[i][j] && (i+4 > 14 || j+4 > 14 || Qi[i+4][j+4] != Qi[i][j])) {
    
            //死四
            if ((i-1 < 0 || j-1 < 0 || Qi[i-1][j-1] != ' ') && (i+4 > 14 || j+4 > 14 || Qi[i+4][j+4] != ' ')) return 0;
            
            //冲四 +1， +2
            //上顶
            if (i-1 < 0 || j-1 < 0 || Qi[i-1][j-1] != ' ') {
            
                if (space(i+4, j+4, 135, 1)) return 500;
                return 0;
            }
            //下顶
            if (i+4 > 14 || j+4 > 14 || Qi[i+4][j+4] != ' ') {
            
                if (space(i-1, j-1, 135, 1)) return 500;
                return 0;
            }
                        
            //活四 +2
            if (space(i-1, j-1, 135, 1) && space(i+4, j+4, 135, 1)) return 2000;
            
            return 0;
        }
        //上二位
        if ((i-2 < 0 || j-2 < 0 || Qi[i-2][j-2] != Qi[i][j]) && i-1 >= 0 && j-1 >= 0 && Qi[i-1][j-1] == Qi[i][j] && i+1 < 15 && j+1 < 15 
                && Qi[i+1][j+1] == Qi[i][j] && i+2 < 15 && j+2 < 15 && Qi[i+2][j+2] == Qi[i][j] && (i+3 > 14 || j+3 > 14 || Qi[i+3][j+3] != Qi[i][j])) {
    
            //死四
            if ((i-2 < 0 || j-2 < 0 || Qi[i-2][j-2] != ' ') && (i+3 > 14 || j+3 > 14 || Qi[i+3][j+3] != ' ')) return 0;
            
            //冲四 +1， +2
            //上顶
            if (i-2 < 0 || j-2 < 0 || Qi[i-2][j-2] != ' ') {
            
                if (space(i+3, j+3, 135, 1)) return 500;
                return 0;
            }
            //下顶
            if (i+3 > 14 || j+3 > 14 || Qi[i+3][j+3] != ' ') {
            
                if (space(i-2, j-2, 135, 1)) return 500;
                return 0;
            }
                        
            //活四 +2
            if (space(i-2, j-2, 135, 1) && space(i+3, j+3, 135, 1)) return 2000;
            
            return 0;
        }
        //上三位
        if ((i-3 < 0 || j-3 < 0 || Qi[i-3][j-3] != Qi[i][j]) && i-2 >= 0 && j-2 >= 0 && Qi[i-2][j-2] == Qi[i][j] && i-1 >= 0 && j-1 >= 0 
                && Qi[i-1][j-1] == Qi[i][j] && i+1 < 15 && j+1 < 15 && Qi[i+1][j+1] == Qi[i][j] && (i+2 > 14 || j+2 > 14 || Qi[i+2][j+2] != Qi[i][j])) {
    
            //死四
            if ((i-3 < 0 || j-3 < 0 || Qi[i-3][j-3] != ' ') && (i+2 > 14 || j+2 > 14 || Qi[i+2][j+2] != ' ')) return 0;
            
            //冲四 +1， +2
            //上顶
            if (i-3 < 0 || j-3 < 0 || Qi[i-3][j-3] != ' ') {
            
                if (space(i+2, j+2, 135, 1)) return 500;
                return 0;
            }
            //下顶
            if (i+2 > 14 || j+2 > 14 || Qi[i+2][j+2] != ' ') {
            
                if (space(i-3, j-3, 135, 1)) return 500;
                return 0;
            }
                        
            //活四 +2
            if (space(i-3, j-3, 135, 1) && space(i+2, j+2, 135, 1)) return 2000;
            
            return 0;
        }
        //上四位
        if ((i-4 < 0 || j-4 < 0 || Qi[i-4][j-4] != Qi[i][j]) && i-3 >= 0 && j-3 >= 0 && Qi[i-3][j-3] == Qi[i][j] && i-2 >= 0 && j-2 >= 0 
                && Qi[i-2][j-2] == Qi[i][j] && i-1 >= 0 && j-1 > 0 && Qi[i-1][j-1] == Qi[i][j] && (i+1 > 14 || j+1 > 14 || Qi[i+1][j+1] != Qi[i][j])) {
    
            //死四
            if ((i-4 < 0 || j-4 < 0 || Qi[i-4][j-4] != ' ') && (i+1 > 14 || j+1 > 14 || Qi[i+1][j+1] != ' ')) return 0;
            
            //冲四 +1， +2
            //上顶
            if (i-4 < 0 || j-4 < 0 || Qi[i-4][j-4] != ' ') {
            
                if (space(i+1, j+1, 135, 1)) return 500;
                return 0;
            }
            //下顶
            if (i+1 > 14 || j+1 > 14 || Qi[i+1][j+1] != ' ') {
            
                if (space(i-4, j-4, 135, 1)) return 500;
                return 0;
            }
                        
            //活四 +2
            if (space(i-4, j-4, 135, 1) && space(i+1, j+1, 135, 1)) return 2000;
            
            return 0;
        }
        
        return 10000;
    }
	
	function value(i, j, color) {
    
		//console.log("call value()");
	
        if (Qi[i][j] != ' ') return 0;
        
        Qi[i][j] = 'X';
        
        var a = value_0(i, j);
        
        var b = value_45(i, j);
        
        var c = value_90(i, j);
        
        var d = value_135(i, j);
        
        Qi[i][j] = 'O';
        
        var e = value_0(i, j);
        
        var f = value_45(i, j);
        
        var g = value_90(i, j);
        
        var h = value_135(i, j);
        
        Qi[i][j] = ' ';
                
		if (color == 0 && e+f+g+h >= 1000) console.log("black crisis at:"+i+", "+j+" : "+(e+f+g+h));
		else if (color == 1 && a+b+c+d >= 1000) console.log("white crisis at:"+i+", "+j+" : "+(a+b+c+d));
		
        return a+b+c+d+e+f+g+h;
    }
	
	function AI(c, color) {
        
		//console.log("call AI()");
		
        var _i = 0;
        
        var _j = 0;
        
        var max_value = 0;
        
        for (var i = 0; i < 15; i++) {
        
            for (var j = 0; j < 15; j++) {
                
                 var temp_value =  value(i, j, color);
                 //if (temp_value >= 1000) console.log("| "+i+" , "+j+": "+temp_value+" |");
                 if (temp_value > max_value) {
                     
                     _i = i;
                     _j = j;
                     max_value = temp_value;
                 }
                 if (temp_value == max_value) {
                 
                     var index = Math.floor(Math.random() * 2);
                     if (index == 1) {
                         
                         _i = i;
                         _j = j;
                     }
                 }
            }
            //System.out.println("\n");
        }
		
		//console.log("max:   "+_i+", "+_j+": "+max_value);
        index = move(_i, _j, c);
						
		if (index) {
			
			var _zi = document.createElement('div');
			_zi.className="zi";
			if (color == 1) _zi.style.backgroundColor="white";
			else _zi.style.backgroundColor="black";
			document.getElementById(_i+","+_j).appendChild(_zi);
			console.log("logically: "+_i+" , "+_j);
		}
        else {
        
            for (var i = 0; i < 15; i++) {
            
                for (var j = 0; j < 15; j++) {
                
                    if (Qi[i][j] == ' ') {
                        
                        move(i, j, c);
						var _zi = document.createElement('div');
						_zi.className="zi";
						if (color == 1) _zi.style.backgroundColor="white";
						else _zi.style.backgroundColor="black";
						document.getElementById(i+","+j).appendChild(_zi);
						console.log("randomly: "+i+" , "+j);
						i = 15;
                        j = 15;
                    }
                }
            }
        }      
    }
	
	function count() {
    
        var x = 0;
        
        var o = 0;
        
        for (var i = 0; i < 15; i++) {
        
            for (var j = 0; j < 15; j++) {
                
                if (Qi[i][j] == 'X') x++;
                
                else if (Qi[i][j] == 'O') o++;
            }
        }
        
        //System.out.printf("X: %d  |  O: %d  |  total:%d\n", x, o, x + o);
        
        if (x + o < 225) return 0;
        return 1;
    }

	
	for (i = 0; i < 15; i++) {
		
		for (j = 0; j < 15; j++) {
		
			
			var _div = document.createElement('div');
			_div.className="cube";
			_div.id=i+","+j;
			/*if ((i+j) % 2 == 0) _div.style.backgroundColor="red";
			else _div.style.backgroundColor="green";
			_div.style.opacity = "0.2";
			*/
			document.getElementById("grid").appendChild(_div);
			
			document.getElementById(_div.id).onclick = function () {
		
				var pos = this.id.indexOf(",");
				var _i = this.id.slice(0,pos);
				var _j = this.id.slice(pos+1,this.id.length);
				//alert(_i+":"+_j);
				alert(localStorage.getItem('pl'));
				
				if (localStorage.getItem('pl') == 0) {
					
					if (valid_move(_i, _j)) {
						
						move(_i, _j, 'X');
						var _zi = document.createElement('div');
						_zi.className="zi";
						_zi.style.backgroundColor="black";
						document.getElementById(this.id).appendChild(_zi);
						if (win()) {
							
							setTimeout(function() {alert("PLAYER WINS!!!");}, 500);
						}
						else {
							
							setTimeout(function() { AI('O', 1); }, 500);
							setTimeout(function() {if(win()) {alert("AI WINS!!!")}}, 1000);
						}
					}
					else alert("invalid move!");
				}
				else if (localStorage.getItem('pl') == 1) {
					
					if (valid_move(_i, _j)) {
						
						move(_i, _j, 'X');
						var _zi = document.createElement('div');
						_zi.className="zi";
						if (color == 0) _zi.style.backgroundColor="black";
						else _zi.style.backgroundColor="white";
						color = 1 - color;
						document.getElementById(this.id).appendChild(_zi);
						if (win()) {
							
							if (color == 1) alert("black wins!!!");
							else alert("white wins!!!");
						}
					}
					else alert("invalid move!");
				}
			}
		}
	}
	
	
//machine learning code


document.getElementById("back").onclick = function () {
	var num_draw = 0;
	alert("machine learning start!!");
	printX();
	for (var i = 0; i < 100; i++) {
		
		color = 0;
		while (!win() && count() != 1) {
			
			//alert("AI moves");
			
			if (color == 1) AI('O', color);
			else AI('X', color);
			color = 1 - color;
			if (color == 1) printX();
			else printO();
			console.log("game : "+i);
		}
		if (count() == 1) num_draw++;//alert("draw");
		//else if (color == 0) alert("white wins");
		//else alert("black wins");
		clean();
	}
	
	alert("num of draw:"+num_draw);
}

function clean() {
	
	for (var i = 0; i < 15; i++) {
		
		for (var j = 0; j < 15; j++) {
			
			Qi[i][j] = ' ';
		}
	}
}

function printX() {
        
        console.log("__|   0     1     2     3     4     5     6     7     8     9     10    11    12    13    14  ");
        
        
        for (var i = 0; i < 10; i++) {
        
            
            
			var out = i+"  |";
            for (var j = 0; j < 15; j++) {
            
                out += ("  "+Qi[i][j]+"  |");
            }
            
			console.log(out);
            console.log("");
            
        }
        
        for (var i = 10; i < 15; i++) {
        
            
            
			var out = i+" |";
            for (var j = 0; j < 15; j++) {
            
                out += "  "+Qi[i][j]+"  |";
            }
            console.log(out);
            console.log("");
            
        }
		
            console.log("");
			
            console.log("");
			
            console.log("");
			
            console.log("");
			
            console.log("");
    }
    
function printO() {
        
        console.log("__|   a     b     c     d     e     f     g     h     i     j     k     l     m     n     o   ");
        
        
        for (var i = 0; i < 10; i++) {
        
            
            
			var out = i+"  |";
            for (var j = 0; j < 15; j++) {
            
                out += ("  "+Qi[i][j]+"  |");
            }
            
			console.log(out);
            console.log("");
            
        }
        
        for (var i = 10; i < 15; i++) {
        
            
            
			var out = i+" |";
            for (var j = 0; j < 15; j++) {
            
                out += "  "+Qi[i][j]+"  |";
            }
            console.log(out);
            console.log("");
            
        }
		
		
            console.log("");
			
            console.log("");
			
            console.log("");
			
            console.log("");
			
            console.log("");
    }



	
	