

if (window.addEventListener) {
    window.addEventListener('load', loader, false); 
}
else { /* IE */ 
    window.attachEvent('onload', loader);
}

function createCookie(name,value,days) {
    if (days) {
	var date = new Date();
	date.setTime(date.getTime()+(days*24*60*60*1000));
	var expires = "; expires="+date.toGMTString();
    }
    else { 
	var expires = "";
    } 

    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');

    for(var i=0;i < ca.length;i++) {
	var c = ca[i];
	while (c.charAt(0)==' ') c = c.substring(1,c.length);
	if (c.indexOf(nameEQ) == 0) 
	    return c.substring(nameEQ.length,c.length);
    }

    return null;
}

function isIPad() {
    return navigator.userAgent.match(/iPad/i) != null;
}

function isIE6() { 
    //test for MSIE x.x;
    if ( /MSIE (\d+\.\d+);/.test(navigator.userAgent) ) { 
	var ieversion=new Number(RegExp.$1); // capture x.x portion and store as a number

	if (ieversion>=6 && ieversion < 7)
	    return true; 
    }

    return false; 
} 

function showoptions(v) { 
    var optionbarwrap = document.getElementById('optionbarwrap');

    var optionbarshow = document.getElementById('optionbarshow'); 
    var optionbarhide = document.getElementById('optionbarhide'); 

    if (!(optionbarwrap && optionbarshow && optionbarhide)) {
        return;  
    }

    optionbarshow.className = optionbarhide.className = 
	optionbarwrap.className = (v ? 'showingoptionbar' : 'hidingoptionbar');
} 

function showoptions_ie6(v)
{
    // IE6 can't handle class selectors on id selectors 
    var optionbarwrap = document.getElementById('optionbarwrap');	

    var optionbarshow = document.getElementById('optionbarshow'); 
    var optionbarhide = document.getElementById('optionbarhide'); 

    if (!(optionbarwrap && optionbarshow && optionbarhide)) {
        return;  
    }

    if (v) { 	
	optionbarwrap.style.display = 'block'; 
	optionbarshow.style.display = 'none'; 
	optionbarhide.style.display = 'block';
    } 
    else { 
	optionbarwrap.style.display = 'none'; 
	optionbarshow.style.display = 'block'; 
	optionbarhide.style.display = 'none';
    }
} 

function showoverlay(v) {
    document.getElementById('opaque').className = (v ? 'visible' : 'hidden');
    document.getElementById('overlay').className = (v ? 'visible' : 'hidden');
} 

function overlayimage(url, width, height) {
    var html = ''; 

    if (url) {
        var style = 'border: thick solid white; cursor: pointer; background: white;';

        if (width) { 
            style += "width: " + width + "px;"; 
        } 
        if (height) { 
            style += "height: " + height + "px;"; 
        } 

        html = '<img style="' + style + '" onclick="showoverlay(false);" src="' + url + '">'; 
    } 

    var db = document.getElementById('overlaycontent');
    db.innerHTML = html;  
    showoverlay(url != null);

    return false; // To override anchor default handler 
}

function showslicelist(v) { 
    // Everyone except IE6 (IE < 6.0 is unsupported) 
    var slicehide = document.getElementById('slicehide'); 
    var sliceshow = document.getElementById('sliceshow'); 
    var slicelist = document.getElementById('slicelist');
    var contents = document.getElementById('contents'); 

    if (!(slicehide && sliceshow && slicelist && contents)) {
        return; 
    } 

    slicelist.className = contents.className = 
	sliceshow.className = slicehide.className = 
	(v ? 'showingslicelist' : 'hidingslicelist'); 

    createCookie('showslicelist', v ? 'True' : 'False');
} 

function showslicelist_ie6(v)
{
    // IE6 can't handle class selectors on id selectors 
    var slicehide = document.getElementById('slicehide'); 
    var sliceshow = document.getElementById('sliceshow'); 
    var slicelist = document.getElementById('slicelist'); 
    var contents = document.getElementById('contents'); 
    var frame = document.getElementById('frame'); 

    if (!(slicehide && sliceshow && slicelist && contents)) {
        return; 
    } 

    if (v) { 
	sliceshow.style.display = 'none'; 
	slicehide.style.display = 'inline'; 
	slicelist.style.display = 'block';
    } 
    else { 
	sliceshow.style.display = 'inline'; 
	slicehide.style.display = 'none'; 
	slicelist.style.display = 'none';  
    } 

    createCookie('showslicelist', v ? 'True' : 'False');
} 

var showslicelist_f = isIE6() ? showslicelist_ie6 : showslicelist; 
var showoptions_f = isIE6() ? showoptions_ie6 : showoptions; 

function toggle_folder(expander) 
{ 
    expander.parentNode.className = (expander.parentNode.className == 'tree_folder_open') ?
        'tree_folder_closed' : 'tree_folder_open';

    if (expander.parentNode.className == 'tree_folder_open') {
        expander.title = 'Click to collapse';
        expander.firstChild.nodeValue = '\u25BC ';
    }
    else {
        expander.title= 'Click to expand';
        expander.firstChild.nodeValue = '\u25BA ';

    } 
} 

function expander_clicked(e) {
 
    if (e) {
        if (this != e.target) { return; }
    } 
    else { 
        if (this != window.event.srcElement) { return; } // IE 
    } 

    toggle_folder(this) 

    if (e) { 
        e.stopPropagation();
    }
    else { 
        window.event.cancelBubble = true; // IE
    }  
}

function make_folder_toggler(expander) {

    function expander_clicked(e) {
 
        if (e) {
            if (this != e.target) { return; }
        } 
        else { 
            if (this != window.event.srcElement) { return; } // IE 
        } 

        toggle_folder(expander) 

        if (e) { 
            e.stopPropagation();
        }
        else { 
            window.event.cancelBubble = true; // IE
        }  
    }

    return expander_clicked
} 

function tree() {
 
    // Setup expand/collapse 

    var spans = document.getElementsByTagName('span');

    for (i=0; i < spans.length; i++) {
	if (spans[i].className == 'tree_expander') { 
            var expander = spans[i]; 

            expander.onclick = expander_clicked; 
            if (expander.nextSibling.className == 'folder_item') {
                expander.nextSibling.onclick = make_folder_toggler(expander) 
            }
        }
    }	 
}

function px_to_number(n) { 
    return Number(n.substring(0, n.indexOf('px')));
} 

function ipad_cannot_display_p(e) { 
    // ipad HTMLImageElement.[width|height] = 0 when style="display: none;" 
    // We query the CSS directly
    var width = px_to_number(e.style.getPropertyValue('width'));
    var height = px_to_number(e.style.getPropertyValue('height'));

    return (width > 1000 || height > 1070);
} 

function loader() {

    tree(); 

    /* page is initially hidden to avoid flicker */ 
    var page = document.getElementById('page');
    var note = document.getElementById('unavailable_on_ipad');
    var warn_ipad = isIPad() && ipad_cannot_display_p(page); 
    
    page.className = warn_ipad ? 'hidden' : 'slice'; 
    note.className = warn_ipad ? 'visible' : 'hidden'; 
} 
