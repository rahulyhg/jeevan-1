!function(e){e.extend(e.inputmask.defaults.aliases,{decimal:{mask:"~",placeholder:"",repeat:10,greedy:!1,numericInput:!0,digits:"*",groupSeparator:",",groupSize:3,autoGroup:!1,regex:{number:function(r,a,i,t){var n=e.inputmask.escapeRegex.call(this,r),o=e.inputmask.escapeRegex.call(this,i),p=isNaN(t)?t:"{0,"+t+"}";return new RegExp("^[+-]?(\\d+|\\d{1,"+a+"}(("+n+"\\d{"+a+"})?)+)("+o+"\\d"+p+")?$")}},onKeyDown:function(r,a){var i=e(this),t=this;if(r.keyCode==a.keyCode.TAB){var n=t._valueGet(),o=n.indexOf(a.radixPoint);if(-1!=o){for(var p=1;p<a.digits;p++)n[o+p]&&(n+="0");n!==i.val()&&i.val(n)}}},definitions:{"~":{validator:function(e,r,a,i,t){if(""==e)return!1;var n=i?r.slice(0,a):r.slice();n.splice(a,0,e);var o=n.join("");t.autoGroup&&(o=o.replace(new RegExp("\\"+t.groupSeparator,"g"),""));var p=t.regex.number(t.groupSeparator,t.groupSize,t.radixPoint,t.digits).test(o);if(!p&&(o+="0",p=t.regex.number(t.groupSeparator,t.groupSize,t.radixPoint,t.digits).test(o),!p)){var u=o.lastIndexOf(t.groupSeparator);for(d=o.length-u;3>=d;d++)o+="0";if(p=t.regex.number(t.groupSeparator,t.groupSize,t.radixPoint,t.digits).test(o),!p&&!i&&e==t.radixPoint&&(p=t.regex.number(t.groupSeparator,t.groupSize,t.radixPoint,t.digits).test("0"+o+"0")))return r[a]="0",a++,{pos:a}}if(0!=p&&!i){var n=r.slice();n.splice(a,0,"?");var g=n.join("");if(t.autoGroup||-1!=g.indexOf(t.groupSeparator)){g=g.replace(new RegExp("\\"+t.groupSeparator,"g"),"");for(var s=new RegExp("(-?[\\d?]+)([\\d?]{"+t.groupSize+"})");s.test(g);)g=g.replace(s,"$1"+t.groupSeparator+"$2")}r.length=g.length;for(var d=0,l=g.length;l>d;d++)r[d]=g.charAt(d);var c=r.indexOf("?");return r.splice(c,1),{pos:c}}return p},cardinality:1,prevalidator:null}},insertMode:!0,autoUnmask:!1},"non-negative-decimal":{regex:{number:function(r,a,i,t){var n=e.inputmask.escapeRegex.call(this,r),o=e.inputmask.escapeRegex.call(this,i),p=isNaN(t)?t:"{0,"+t+"}";return new RegExp("^[+]?(\\d+|\\d{1,"+a+"}(("+n+"\\d{"+a+"})?)+)("+o+"\\d"+p+")?$")}},alias:"decimal"},integer:{regex:{number:function(){return new RegExp("^([+-]?\\d*)$")}},alias:"decimal"}})}(jQuery);