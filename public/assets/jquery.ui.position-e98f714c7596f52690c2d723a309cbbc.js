!function(t,i){function e(t,i,e){return[parseInt(t[0],10)*(a.test(t[0])?i/100:1),parseInt(t[1],10)*(a.test(t[1])?e/100:1)]}function o(i,e){return parseInt(t.css(i,e),10)||0}t.ui=t.ui||{};var n,l=Math.max,s=Math.abs,f=Math.round,r=/left|center|right/,h=/top|center|bottom/,p=/[\+\-]\d+%?/,c=/^\w+/,a=/%$/,d=t.fn.position;t.position={scrollbarWidth:function(){if(n!==i)return n;var e,o,l=t("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),s=l.children()[0];return t("body").append(l),e=s.offsetWidth,l.css("overflow","scroll"),o=s.offsetWidth,e===o&&(o=l[0].clientWidth),l.remove(),n=e-o},getScrollInfo:function(i){var e=i.isWindow?"":i.element.css("overflow-x"),o=i.isWindow?"":i.element.css("overflow-y"),n="scroll"===e||"auto"===e&&i.width<i.element[0].scrollWidth,l="scroll"===o||"auto"===o&&i.height<i.element[0].scrollHeight;return{width:n?t.position.scrollbarWidth():0,height:l?t.position.scrollbarWidth():0}},getWithinInfo:function(i){var e=t(i||window),o=t.isWindow(e[0]);return{element:e,isWindow:o,offset:e.offset()||{left:0,top:0},scrollLeft:e.scrollLeft(),scrollTop:e.scrollTop(),width:o?e.width():e.outerWidth(),height:o?e.height():e.outerHeight()}}},t.fn.position=function(i){if(!i||!i.of)return d.apply(this,arguments);i=t.extend({},i);var n,a,g,u,m,w=t(i.of),W=t.position.getWithinInfo(i.within),v=t.position.getScrollInfo(W),y=w[0],b=(i.collision||"flip").split(" "),x={};return 9===y.nodeType?(a=w.width(),g=w.height(),u={top:0,left:0}):t.isWindow(y)?(a=w.width(),g=w.height(),u={top:w.scrollTop(),left:w.scrollLeft()}):y.preventDefault?(i.at="left top",a=g=0,u={top:y.pageY,left:y.pageX}):(a=w.outerWidth(),g=w.outerHeight(),u=w.offset()),m=t.extend({},u),t.each(["my","at"],function(){var t,e,o=(i[this]||"").split(" ");1===o.length&&(o=r.test(o[0])?o.concat(["center"]):h.test(o[0])?["center"].concat(o):["center","center"]),o[0]=r.test(o[0])?o[0]:"center",o[1]=h.test(o[1])?o[1]:"center",t=p.exec(o[0]),e=p.exec(o[1]),x[this]=[t?t[0]:0,e?e[0]:0],i[this]=[c.exec(o[0])[0],c.exec(o[1])[0]]}),1===b.length&&(b[1]=b[0]),"right"===i.at[0]?m.left+=a:"center"===i.at[0]&&(m.left+=a/2),"bottom"===i.at[1]?m.top+=g:"center"===i.at[1]&&(m.top+=g/2),n=e(x.at,a,g),m.left+=n[0],m.top+=n[1],this.each(function(){var r,h,p=t(this),c=p.outerWidth(),d=p.outerHeight(),y=o(this,"marginLeft"),H=o(this,"marginTop"),T=c+y+o(this,"marginRight")+v.width,L=d+H+o(this,"marginBottom")+v.height,I=t.extend({},m),P=e(x.my,p.outerWidth(),p.outerHeight());"right"===i.my[0]?I.left-=c:"center"===i.my[0]&&(I.left-=c/2),"bottom"===i.my[1]?I.top-=d:"center"===i.my[1]&&(I.top-=d/2),I.left+=P[0],I.top+=P[1],t.support.offsetFractions||(I.left=f(I.left),I.top=f(I.top)),r={marginLeft:y,marginTop:H},t.each(["left","top"],function(e,o){t.ui.position[b[e]]&&t.ui.position[b[e]][o](I,{targetWidth:a,targetHeight:g,elemWidth:c,elemHeight:d,collisionPosition:r,collisionWidth:T,collisionHeight:L,offset:[n[0]+P[0],n[1]+P[1]],my:i.my,at:i.at,within:W,elem:p})}),t.fn.bgiframe&&p.bgiframe(),i.using&&(h=function(t){var e=u.left-I.left,o=e+a-c,n=u.top-I.top,f=n+g-d,r={target:{element:w,left:u.left,top:u.top,width:a,height:g},element:{element:p,left:I.left,top:I.top,width:c,height:d},horizontal:0>o?"left":e>0?"right":"center",vertical:0>f?"top":n>0?"bottom":"middle"};c>a&&s(e+o)<a&&(r.horizontal="center"),d>g&&s(n+f)<g&&(r.vertical="middle"),r.important=l(s(e),s(o))>l(s(n),s(f))?"horizontal":"vertical",i.using.call(this,t,r)}),p.offset(t.extend(I,{using:h}))})},t.ui.position={fit:{left:function(t,i){var e,o=i.within,n=o.isWindow?o.scrollLeft:o.offset.left,s=o.width,f=t.left-i.collisionPosition.marginLeft,r=n-f,h=f+i.collisionWidth-s-n;i.collisionWidth>s?r>0&&0>=h?(e=t.left+r+i.collisionWidth-s-n,t.left+=r-e):t.left=h>0&&0>=r?n:r>h?n+s-i.collisionWidth:n:r>0?t.left+=r:h>0?t.left-=h:t.left=l(t.left-f,t.left)},top:function(t,i){var e,o=i.within,n=o.isWindow?o.scrollTop:o.offset.top,s=i.within.height,f=t.top-i.collisionPosition.marginTop,r=n-f,h=f+i.collisionHeight-s-n;i.collisionHeight>s?r>0&&0>=h?(e=t.top+r+i.collisionHeight-s-n,t.top+=r-e):t.top=h>0&&0>=r?n:r>h?n+s-i.collisionHeight:n:r>0?t.top+=r:h>0?t.top-=h:t.top=l(t.top-f,t.top)}},flip:{left:function(t,i){var e,o,n=i.within,l=n.offset.left+n.scrollLeft,f=n.width,r=n.isWindow?n.scrollLeft:n.offset.left,h=t.left-i.collisionPosition.marginLeft,p=h-r,c=h+i.collisionWidth-f-r,a="left"===i.my[0]?-i.elemWidth:"right"===i.my[0]?i.elemWidth:0,d="left"===i.at[0]?i.targetWidth:"right"===i.at[0]?-i.targetWidth:0,g=-2*i.offset[0];0>p?(e=t.left+a+d+g+i.collisionWidth-f-l,(0>e||e<s(p))&&(t.left+=a+d+g)):c>0&&(o=t.left-i.collisionPosition.marginLeft+a+d+g-r,(o>0||s(o)<c)&&(t.left+=a+d+g))},top:function(t,i){var e,o,n=i.within,l=n.offset.top+n.scrollTop,f=n.height,r=n.isWindow?n.scrollTop:n.offset.top,h=t.top-i.collisionPosition.marginTop,p=h-r,c=h+i.collisionHeight-f-r,a="top"===i.my[1],d=a?-i.elemHeight:"bottom"===i.my[1]?i.elemHeight:0,g="top"===i.at[1]?i.targetHeight:"bottom"===i.at[1]?-i.targetHeight:0,u=-2*i.offset[1];0>p?(o=t.top+d+g+u+i.collisionHeight-f-l,t.top+d+g+u>p&&(0>o||o<s(p))&&(t.top+=d+g+u)):c>0&&(e=t.top-i.collisionPosition.marginTop+d+g+u-r,t.top+d+g+u>c&&(e>0||s(e)<c)&&(t.top+=d+g+u))}},flipfit:{left:function(){t.ui.position.flip.left.apply(this,arguments),t.ui.position.fit.left.apply(this,arguments)},top:function(){t.ui.position.flip.top.apply(this,arguments),t.ui.position.fit.top.apply(this,arguments)}}},function(){var i,e,o,n,l,s=document.getElementsByTagName("body")[0],f=document.createElement("div");i=document.createElement(s?"div":"body"),o={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},s&&t.extend(o,{position:"absolute",left:"-1000px",top:"-1000px"});for(l in o)i.style[l]=o[l];i.appendChild(f),e=s||document.documentElement,e.insertBefore(i,e.firstChild),f.style.cssText="position: absolute; left: 10.7432222px;",n=t(f).offset().left,t.support.offsetFractions=n>10&&11>n,i.innerHTML="",e.removeChild(i)}(),t.uiBackCompat!==!1&&!function(t){var e=t.fn.position;t.fn.position=function(o){if(!o||!o.offset)return e.call(this,o);var n=o.offset.split(" "),l=o.at.split(" ");return 1===n.length&&(n[1]=n[0]),/^\d/.test(n[0])&&(n[0]="+"+n[0]),/^\d/.test(n[1])&&(n[1]="+"+n[1]),1===l.length&&(/left|center|right/.test(l[0])?l[1]="center":(l[1]=l[0],l[0]="center")),e.call(this,t.extend(o,{at:l[0]+n[0]+" "+l[1]+n[1],offset:i}))}}(jQuery)}(jQuery);