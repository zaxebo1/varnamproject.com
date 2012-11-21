function initPreviewMode(){if(typeof Storage=="undefined")return;var e=localStorage.previewMode||"both";logglePreview(e)}function logglePreview(e){$("#"+e+"Btn").click()}function selectLastUsedLanguage(){if(typeof Storage!="undefined"&&localStorage.language){var e=JSON.parse(localStorage.language);$(".dropdown-toggle").html(e.name+" <span class='caret'></span>"),$("#selected_lang").data("lang",e.code)}}function updatePreview(e){if(!$("#preview_div").is(":visible")&&!e)return;var t=document.getElementById("preview");t.contentWindow.document.body.innerHTML=converter.makeHtml(Varnam.editor.getValue())}function savePreviewMode(e){if(typeof Storage=="undefined")return;localStorage.previewMode=e}function toggleErrorMessageVisibility(e){e?$("#network-error").fadeIn("slow"):$("#network-error").fadeOut("slow")}(function(){function c(){e.live("click",function(){p($(this).text()),n=!0}),$(i).keydown(function(e){if(e.keyCode===s.ESCAPE)w(),u.focus();else if(m(e.keyCode)){var t=$(this).find(":selected").text();if(t!==undefined&&t!==""){p(t);if(e.keyCode==s.ENTER)return e.preventDefault(),e.stopPropagation(),n=!0,!0}}})}function p(e){var t=S(u),n=t.start,r=u.charCoords(n),i=t.word;i!==""&&(u.replaceRange(e,n,t.end),u.focus()),w(),d(e)}function d(e){if(f===undefined||f==="en")return;$.post("learn",{text:e,lang:f})}function v(){var e=$("#popup select").find(":selected").text();e!==undefined&&e!==""&&p(e)}function m(e){var t=$.inArray(e,o)==-1?!1:!0;return t?!0:!1}function g(e,r){var i=$.event.fix(r);if(i.type!="keydown")return;n=!1;if(i.keyCode==s.ESCAPE){w();return}if(t){if(i.keyCode===s.DOWN_ARROW)return $("#popup select").focus(),i.preventDefault(),i.stopPropagation(),!0;if(m(i.keyCode)){v();if(i.keyCode===s.ENTER)return i.preventDefault(),i.stopPropagation(),n=!0,!0}}else if(i.keyCode==s.SPACE){n=!0;var o=S(u);h[o.word]=o}else m(i.keyCode)&&(n=!0)}function y(){var e=S(u),t=u.charCoords(e.start);e.word!==""?b(t.x,t.y,e.word):w()}function b(e,n,r){if(f==="en")return;var i={text:r,lang:f};show_error=!1,w(),request=$.ajax({url:"tl?"+$.param(i),dataType:"jsonp",crossDomain:"true",success:function(r){l!==null&&l(!1),html="";var i=0,s=$("#popup > select");if(h[r.input]!==undefined)wordToReplace=h[r.input],actualValueAtThatPos=u.getRange(wordToReplace.start,wordToReplace.end),actualValueAtThatPos==r.input&&u.replaceRange(r.result[0],wordToReplace.start,wordToReplace.end),delete h[r.input];else if(S(u).word==r.input){$.each(r.result,function(e,t){e===0?html+="<option selected>"+t+"</option>":html+="<option>"+t+"</option>",i<t.length&&(i=t.length),$(s).html(html).css("width",i+2+"em")}),$(s).html(html).css("height",r.result.length+1+"em");var o=$("#popup").css("display","block").css("left",e+"px").css("top",n+15+"px"),a=o.height(),f=o.width(),c=$(".CodeMirror");n+a>c.position().top+c.innerHeight()&&o.css("top",n-a+"px"),e+f>c.position().left+c.innerWidth()&&o.css("left",e-f+"px"),t=!0}},error:function(e,t,n){show_error=!0,window.setTimeout(function(){show_error&&l!==null&&l(!0)},2e3)}})}function w(){$("#popup").css("display","none"),t=!1}function E(e){return e===null||e===""||e==" "||e=="\n"||e=="."||e=="	"||e=="\r"||e=='"'||e=="'"||e=="?"||e=="!"||e==","||e=="("||e==")"||e==""||e=="\f"||e==""||e=="\u2028"||e=="\u2029"||e=="\r"||e=="\n"||e==";"?!0:!1}function S(e){var t=e.getCursor(),n=0,r=0,i=e.getValue().length+1,s=t.ch;n=t;while(s){text=e.getRange({line:t.line,ch:s-1},{line:t.line,ch:s});if(E(text))break;--s,n={line:t.line,ch:s}}r=t,s=t.ch;while(s<i){text=e.getRange({line:t.line,ch:s},{line:t.line,ch:s+1});if(E(text))break;++s,r={line:t.line,ch:s}}return{start:n,end:r,word:e.getRange(n,r)}}function x(e,t,i,s,o){window.clearTimeout(r);if(n)return;r=window.setTimeout(function(){y()},10),a!==null&&a(e,t,i,s,o)}window.Varnam={};var e=$("#popup select option"),t=!1,n=!1,r,i="#popup select",s={ESCAPE:27,ENTER:13,TAB:9,SPACE:32,PERIOD:190,DOWN_ARROW:40,QUESTION:191,EXCLAMATION:49,COMMA:188,LEFT_BRACKET:57,RIGHT_BRACKET:48,SEMICOLON:59},o=[s.ENTER,s.TAB,s.SPACE,s.PERIOD,s.QUESTION,s.EXCLAMATION,s.COMMA,s.LEFT_BRACKET,s.RIGHT_BRACKET,s.SEMICOLON],u=null,a=null,f=null,l=null;Varnam.init=function(e){u=CodeMirror.fromTextArea(e.textArea,{mode:e.mode,lineNumbers:e.lineNumbers,lineWrapping:!0,onChange:x,extraKeys:{"Ctrl-Space":function(e){y()}},onKeyEvent:g}),a=e.textChangedCallback,c(),Varnam.editor=u,Varnam.setLanguage(e.language),l=e.errorCallback},Varnam.setLanguage=function(e){f=e};var h={}})();var converter=new Showdown.converter;window.onbeforeunload=function(e){e=e||window.event;if($.trim(myCodeMirror.getValue())!=="")return e&&(e.returnValue="You will loose the text. Are you sure?"),"You will loose the text. Are you sure?"},$("button").click(function(){var e=$(this).data("preview");switch(e){case"editor":$("#editor_div").removeClass("span6").addClass("span12"),$("#preview_div").hide(),$("#editor_div").show();break;case"both":$("#editor_div").removeClass("span12").addClass("span6"),$("#preview_div").show(),$("#editor_div").show(),$("#preview_div").css("margin-left",$("#reserve").css("margin-left")),$("#preview_div").removeClass("span12").addClass("span6"),updatePreview();break;case"preview":$("#editor_div").hide(),$("#preview_div").show(),$("#preview_div").removeClass("span6").addClass("span12"),$("#preview_div").css("margin-left","0"),updatePreview()}savePreviewMode(e)}),$("#printBtn").click(function(){updatePreview(!0),window.print()}),$(".lang").click(function(){$(".dropdown-toggle").html($(this).text()+" <span class='caret'></span>"),$("#selected_lang").data("lang",$(this).data("lang")),Varnam.setLanguage($(this).data("lang"));if(typeof Storage=="undefined")return;localStorage.language=JSON.stringify({name:$(this).text(),code:$(this).data("lang")})}),$("#network-error-close").click(function(){toggleErrorMessageVisibility(!1)});