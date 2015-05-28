function createXHR(){if("undefined"!=typeof XMLHttpRequest)return new XMLHttpRequest;if("undefined"!=typeof ActiveXObject){if("string"!=typeof arguments.callee.activeXString)for(var e=["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"],t=0,s=e.length;s>t;t++)try{var n=new ActiveXObject(e[t]);return arguments.callee.activeXString=e[t],n}catch(o){}return new ActiveXObject(arguments.callee.activeXString)}throw new Error("No XHR, no theme.")}function xhr_get(e,t,s){var n=createXHR();n.onreadystatechange=function(){if(4==n.readyState){if(!(n.status>=200&&n.status<300||304==n.status))throw new Error("The XHR failed :(  [status:"+n.status+"]");var e=n.responseText;t(e)}},n.open("get",e,s),n.send(null)}function sel(e){return document.querySelector(e)}function createEl(e){return document.createElement(e)}function hideToast(){var e=sel(".notification.cmt-load");e.style.opacity="0",setTimeout(function(){e.parentElement.removeChild(e),def.toast_closed=!0},500)}function IsJsonString(e){try{JSON.parse(e)}catch(t){return!1}return!0}function loadCSSs(e,t){var s=!1;if(def.browser.hasLocalStorage?localStorage.hasOwnProperty("ts-toggle")&&"true"==localStorage.getItem("ts-toggle")&&(s=!0):s=!0,s&&isInSpecialRoom()&&(e&&(sel("#cm_css_badges")&&sel("#cm_css_badges").remove(),xhr_get("https://themescript.github.io/badges/badges.css",function(e){sel("head").innerHTML+="<style id='cm_css_badges'>"+e+"</style>"},!0)),t)){var n=def.customCSSs[location.href.split("/")[location.href.split("/").length-1]];sel("#cm_css_main")&&sel("#cm_css_main").remove(),"undefined"!=typeof localStorage["ts-current-css"]&&(n=localStorage.getItem("ts-current-css")),"undefined"!=typeof n&&xhr_get(n,function(e){sel("head").innerHTML+="<style id='cm_css_main'>"+e+"</style>"},!0)}}function loadMasterCSS(e){isInSpecialRoom()&&xhr_get(e,function(e){sel("#cm_css_main")&&sel("#cm_css_main").remove(),sel("head").innerHTML+="<style id='cm_css_main'>"+e+"</style>"},!0)}function removeCSSs(e,t){e&&sel("#cm_css_badges")&&sel("#cm_css_badges").remove(),t&&sel("#cm_css_main")&&sel("#cm_css_main").remove()}function isInSpecialRoom(){return"undefined"!=typeof def.customCSSs[location.href.split("/")[location.href.split("/").length-1]]}function settings_click_listener(){var e=sel("#user-settings .container");e.innerHTML+=def.settings_item_inner;var t,s="<option>_</option>",n="<option selected>_</option>",o="<option>--- Current room ---</option>",i="";"undefined"!=typeof localStorage["ts-current-css"]&&(i=def.room_names[_.invert(def.customCSSs)[localStorage["ts-current-css"]]]);for(t in def.room_names){var a=!1;i.length>0&&def.room_names[t]==i&&(a=!0),o+=a?n.replace("_",def.room_names[t]):s.replace("_",def.room_names[t])}e.innerHTML+='<div class="right"><select class="dropdown_themes">'+o+"</select></div>";var r=sel(".dropdown_themes");r.addEventListener("change",function(){var e,t=r.value;"--- Current room ---"!=t?(e=def.customCSSs[_.invert(def.room_names)[t]],localStorage.setItem("ts-current-css",e),loadMasterCSS(e)):("undefined"!=typeof localStorage["ts-current-css"]&&localStorage.removeItem("ts-current-css"),loadCSSs(!1,!0))}),def.settings_added_select=!0;var c=sel(".ts-toggle");setTimeout(function(){"true"==localStorage.getItem("ts-toggle")&&(c.className+=" selected")},10),c.addEventListener("click",function(){c.className.indexOf("selected")>=0?(c.classList.remove("selected"),localStorage.setItem("ts-toggle","false"),removeCSSs(!0,!0)):(c.classList.add("selected"),localStorage.setItem("ts-toggle","true"),loadCSSs(!0,!0))})}var ts_loaded="undefined"!=typeof def,def={notif_inner:'<div style="opacity: 1;top:0px;z-index:12;transition:all 0.3s linear;-webkit-transition:all 0.3s linear;-moz-transition:all 0.3s linear;-ms-transition:all 0.3s linear;-o-transition:all 0.3s linear;"class="notification cmt-load"><div class="left"><i class="icon icon-about-white"></i></div><div class="right"><span style="top: 25px;">__TEXT__</span></div></div>',settings_item_inner:'<div class="header"><span>Themescript</span></div><div class="left"><div class="item ts-toggle"><i class="icon icon-check-blue"></i><span>Turn on / off themescript</span></div></div>',toast_closed:!1,plugin:{load:"Themescript activated!"},customCSSs:{chilloutmixer:"https://themescript.github.io/master/master.css","a-test-room-2":"https://themescript.github.io/personal/wizzikz/master.css","this-is-it":"https://themescript.github.io/master/master.css"},room_names:{chilloutmixer:"Chillout Mixer v3","a-test-room-2":"Just a test room.","this-is-it":"El Jefe"},browser:{hasLocalStorage:"undefined"!=typeof Storage},not_settings_added_listener:!1,settings_added_listener:!1,settings_acc_added_listener:!1,settings_added_select:!1};sel("#toast-notifications").innerHTML+=def.notif_inner.replace("__TEXT__",def.plugin.load),setTimeout(function(){def.toast_closed||hideToast()},4e3),$(".notification.cmt-load").click(function(){hideToast()}),function(){var e=window.XMLHttpRequest.prototype.send;window.XMLHttpRequest.prototype.send=function(){var t=this,s=window.setInterval(function(){if(4==t.readyState){if(IsJsonString(t.responseText)){var e=$.parseJSON(t.responseText);e.hasOwnProperty("data")&&e.data.length>0&&e.data[0].hasOwnProperty("meta")&&e.data[0].meta.hasOwnProperty("slug")&&("undefined"!=typeof def.customCSSs[e.data[0].meta.slug]?loadCSSs(!1,!0):removeCSSs(!1,!0))}clearInterval(s)}},1);return e.apply(this,[].slice.call(arguments))}}(),localStorage.hasOwnProperty("ts-toggle")||localStorage.setItem("ts-toggle","true"),loadCSSs(!0,!0),def.browser.hasLocalStorage&&(ts_loaded||($("#footer-user .button:not(.settings)").on("click",function(){def.not_settings_added_listener||($("#user-menu .item.settings").on("click",function(){settings_click_listener()}),def.not_settings_added_listener=!0)}),$("#footer-user .button.settings").on("click",function(){settings_click_listener(),def.settings_acc_added_listener||$("#user-settings .tab-menu .account:not(.selected)").on("click",function(){def.settings_added_listener||($("#user-settings .tab-menu .application:not(.selected)").on("click",function(){settings_click_listener()}),def.settings_added_listener=!0),def.settings_acc_added_listener=!0})})));
