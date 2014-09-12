var divOpen=true;
function toggleDiv(){
       jQuery('.rich-stglpanel-body').slideToggle("slow");
   
     /*  jQuery('.rich-stglpanel-body').animate({
                    height:'toggle'
        }); */
        
       if(divOpen){
           jQuery('#showdiv').html('»');
           divOpen=false;
       }
       else {
           jQuery('#showdiv').html('«');
           divOpen=true;
       }
};

var menuShown = false;
function showMenu(){
         jQuery('#menudiv').show();
         menuShown = true;
}

function hideMenu(){
   
   menuShown = false;
   menutimer = setTimeout(function(){
              if(!menuShown)
                jQuery('#menudiv').hide();
        }, 6000);
}