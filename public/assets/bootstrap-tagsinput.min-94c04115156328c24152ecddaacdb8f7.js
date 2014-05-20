!function(t){"use strict";function e(e,n){this.itemsArray=[],this.$element=t(e),this.$element.hide(),this.isSelect="SELECT"===e.tagName,this.multiple=this.isSelect&&e.hasAttribute("multiple"),this.objectItems=n&&n.itemValue,this.$container=t('<div class="bootstrap-tagsinput"></div>'),this.$input=t('<input size="1" type="text" />').appendTo(this.$container),this.$element.after(this.$container),this.build(n)}function n(t,e){if("function"!=typeof t[e]){var n=t[e];t[e]=function(t){return t[n]}}}function i(t,e){if("function"!=typeof t[e]){var n=t[e];t[e]=function(){return n}}}function a(t){return t?s.text(t).html():""}function o(t){var e=0;if(document.selection){t.focus();var n=document.selection.createRange();n.moveStart("character",-t.value.length),e=n.text.length}else(t.selectionStart||"0"==t.selectionStart)&&(e=t.selectionStart);return e}var r={tagClass:function(){return"label label-info"},itemValue:function(t){return t?t.toString():t},itemText:function(t){return this.itemValue(t)},freeInput:!0};e.prototype={constructor:e,add:function(e,n){var i=this;if(e===!1||e){if("object"==typeof e&&!i.objectItems)throw"Can't add objects when itemValue option is not set";if(!e.toString().match(/^\s*$/)){if(i.isSelect&&!i.multiple&&i.itemsArray.length>0&&i.remove(i.itemsArray[0]),"string"==typeof e&&"INPUT"===this.$element[0].tagName){var o=e.split(",");if(o.length>1){for(var r=0;r<o.length;r++)this.add(o[r],!0);return n||i.pushVal(),void 0}}var s=i.options.itemValue(e),u=i.options.itemText(e),c=i.options.tagClass(e);if(!t.grep(i.itemsArray,function(t){return i.options.itemValue(t)===s})[0]){i.itemsArray.push(e);var l=t('<span class="tag '+a(c)+'">'+a(u)+'<span data-role="remove"></span></span>');if(l.data("item",e),i.$input.before(l),i.isSelect&&!t('option[value="'+escape(s)+'"]')[0]){var p=t("<option selected>"+a(u)+"</option>");p.data("item",e),p.attr("value",s),i.$element.append(p)}n||i.pushVal(),i.$element.trigger(t.Event("itemAdded",{item:e}))}}}},remove:function(e,n){var i=this;i.objectItems&&(e="object"==typeof e?t.grep(i.itemsArray,function(t){return i.options.itemValue(t)==i.options.itemValue(e)})[0]:t.grep(i.itemsArray,function(t){return i.options.itemValue(t)==e})[0]),e&&(t(".tag",i.$container).filter(function(){return t(this).data("item")===e}).remove(),t("option",i.$element).filter(function(){return t(this).data("item")===e}).remove(),i.itemsArray.splice(i.itemsArray.indexOf(e),1)),n||i.pushVal(),i.$element.trigger(t.Event("itemRemoved",{item:e}))},removeAll:function(){var e=this;for(t(".tag",e.$container).remove(),t("option",e.$element).remove();e.itemsArray.length>0;)e.itemsArray.pop();e.pushVal()},refresh:function(){var e=this;t(".tag",e.$container).each(function(){var n=t(this),i=n.data("item"),o=e.options.itemValue(i),r=e.options.itemText(i),s=e.options.tagClass(i);if(n.attr("class",null),n.addClass("tag "+a(s)),n.contents().filter(function(){return 3==this.nodeType})[0].nodeValue=a(r),e.isSelect){var u=t("option",e.$element).filter(function(){return t(this).data("item")===i});u.attr("value",o)}})},items:function(){return this.itemsArray},pushVal:function(){var e=this,n=t.map(e.items(),function(t){return e.options.itemValue(t).toString()});e.$element.val(n,!0).trigger("change")},build:function(e){var a=this;a.options=t.extend({},r,e);var s=a.options.typeahead||{};a.objectItems&&(a.options.freeInput=!1),n(a.options,"itemValue"),n(a.options,"itemText"),n(a.options,"tagClass"),a.options.source&&(s.source=a.options.source),s.source&&t.fn.typeahead&&(i(s,"source"),a.$input.typeahead({source:function(e,n){function i(t){for(var e=[],i=0;i<t.length;i++){var r=a.options.itemText(t[i]);o[r]=t[i],e.push(r)}n(e)}this.map={};var o=this.map,r=s.source(e);t.isFunction(r.success)?r.success(i):t.when(r).then(i)},updater:function(t){a.add(this.map[t])},matcher:function(t){return-1!==t.toLowerCase().indexOf(this.query.trim().toLowerCase())},sorter:function(t){return t.sort()},highlighter:function(t){var e=new RegExp("("+this.query+")","gi");return t.replace(e,"<strong>$1</strong>")}})),a.$container.on("click",t.proxy(function(){a.$input.focus()},a)),a.$container.on("keydown","input",t.proxy(function(e){var n=t(e.target);switch(e.which){case 8:if(0===o(n[0])){var i=n.prev();i&&a.remove(i.data("item"))}break;case 46:if(0===o(n[0])){var r=n.next();r&&a.remove(r.data("item"))}break;case 37:var s=n.prev();0===n.val().length&&s[0]&&(s.before(n),n.focus());break;case 39:var u=n.next();0===n.val().length&&u[0]&&(u.after(n),n.focus());break;case 13:a.options.freeInput&&(a.add(n.val()),n.val(""),e.preventDefault())}n.attr("size",Math.max(1,n.val().length))},a)),a.$container.on("click","[data-role=remove]",t.proxy(function(e){a.remove(t(e.target).closest(".tag").data("item"))},a)),"INPUT"===a.$element[0].tagName?a.add(a.$element.val()):t("option",a.$element).each(function(){a.add(t(this).attr("value"),!0)})},destroy:function(){var t=this;t.$container.off("keypress","input"),t.$container.off("click","[50role=remove]"),t.$container.remove(),t.$element.removeData("tagsinput"),t.$element.show()},focus:function(){this.$input.focus()}},t.fn.tagsinput=function(n,i){var a=[];return this.each(function(){var o=t(this).data("tagsinput");if(o){var r=o[n](i);void 0!==r&&a.push(r)}else o=new e(this,n),t(this).data("tagsinput",o),a.push(o),"SELECT"===this.tagName&&t("option",t(this)).attr("selected","selected"),t(this).val(t(this).val())}),"string"==typeof n?a.length>1?a:a[0]:a},t.fn.tagsinput.Constructor=e;var s=t("<div />");t(function(){t("input[data-role=tagsinput], select[multiple][data-role=tagsinput]").tagsinput()})}(window.jQuery);