var ex_i = 0,
	ex_j = 0;

var ex_array = [],
	ex_change_array = [];

var ex_temp,temp,tmp;

var fuse = true;

var ex_next = function($bars){

        if(ex_i<ex_array.length&&fuse){

			if(ex_i==ex_array.length-1){fuse=false;}

            ex_temp=ex_array[ex_i];
            ex_j=ex_i-1;
            
            while(ex_j>-1&&ex_temp<ex_array[ex_j]){

                move_bar($bars[ex_j],"+=");

                move_bar($bars[ex_j + 1],"-=");

                ex_array[ex_j+1] = ex_array[ex_j];

                tmp = $bars[ex_j];
                $bars[ex_j] = $bars[ex_j + 1];
                $bars[ex_j + 1] = tmp;

                for(var k=0;k<=ex_j+1;k++)
                {$bars[k].css(normal_style);}
                ex_j--;
            }

            ex_array[ex_j+1]=ex_temp;

            for(var k=0;k<=ex_j+1;k++)
            {$bars[k].css(normal_style);}

       		ex_i++;
            

            $bars[ex_j+1].css(hl_style);
			$bars[ex_i].css(next_style);

        }

}

var ex_pre = function($bars,$org_bars){

	fuse=true;

	if(ex_i>0){

			ex_i--;

			move_bar($org_bars[ex_i],"",ex_i*wid)

			for(var k=0;k<ex_array.length;k++){
				if($bars[k].html()==ex_i){
					for(var l=1,r=ex_i-k;l<=r;l++){

						console.log(ex_i);

						move_bar($bars[k+l],"-=");

						tmp=$bars[k+l];
						$bars[k+l]=$bars[k+l-1];
						$bars[k+l-1]=tmp;
						
						ex_temp=ex_array[k+l];
						ex_array[k+l]=ex_array[k+l-1];
						ex_array[k+l-1]=ex_temp;
					}
				}
			}

			$bars[ex_i+1].css(pre_style);
			$org_bars[ex_i-1].css(hl_style);
			$org_bars[ex_i].css(next_style);
			$org_bars[ex_i+1].css(pre_style);
		}
}