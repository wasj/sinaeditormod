//一些默认值
if (!window.SinaEditor) {
    SinaEditor = {};
}

if (!SinaEditor.CONF) {
    SinaEditor.CONF = {};
}

//撤销重做的次数
SinaEditor.CONF.redoConf = 100;

//弹出的浮层按钮样式(style)
SinaEditor.CONF.bubbleStyles = ['.se_bubble {',
	'background-color:#E0ECFF;',
	'font-family:Arial,sans-serif,sans;',
	'font-size:13px;',
	'position:absolute;',
	'border:1px solid #99C0FF;',
	'padding:3px;',
	'z-index:1000;',
	'-moz-border-radius: 5px;',
	'-khtml-border-radius: 5px;',
	'-webkit-border-radius: 5px;',
	'border-radius: 5px;',
'}'].join('');
SinaEditor.CONF.bubbleClassName = 'se_bubble';

//需要在这里指明路径,下面的两句就可以不要了。
var href = window.location.href;
var loc = href.substring(0,href.lastIndexOf('/'));
SinaEditor.CONF.STYLELOC = loc+'/style/';
SinaEditor.CONF.transparentIMG = SinaEditor.CONF.STYLELOC+"imgs/SG_line.gif";
SinaEditor.CONF.fakeFLASH = SinaEditor.CONF.STYLELOC+"imgs/fake_flash.png";

//链接点击后弹出的URL
SinaEditor.CONF.aBubbleTemplete = ['<div class="se_bubble_a_panel">',
									'<div>',
										'<div>',
											'<span>转到链接：</span>',
											'<span style="color: black;">',
												'<a class="se_bubble_a_link" href="#{src}" target="_blank">',
													'#{srcstr}',
												'</a>',
											'</span>',
											'<span>',
												'&nbsp;&nbsp;',
												'<span class="se_bubble_a_link" id="#{modifyid}">更改</span>',
											'</span>',
											'<span>',
												'&nbsp;&nbsp;',
												'<span class="se_bubble_a_link" id="#{deleteid}">删除</span>',
											'</span>',
										'</div>',
									'</div>',
								'</div>'].join('');
SinaEditor.CONF.mailBubbleTemplete = ['<div class="se_bubble_a_panel">',
									'<div>',
										'<div>',
											'<span id="tr_link-text" style="color: black;">',
												'#{srcstr}',
											'</span>',
											'<span>',
												'&nbsp;&nbsp;',
												'<span class="se_bubble_a_link" id="#{modifyid}">更改</span>',
											'</span>',
											'<span>',
												'&nbsp;&nbsp;',
												'<span class="se_bubble_a_link" id="#{deleteid}">删除</span>',
											'</span>',
										'</div>',
									'</div>',
								'</div>'].join('');
SinaEditor.CONF.imgBubbleTemplete = ['<div class="se_bubble_a_panel">',
									'<div>',
										'<div>',
											'<span>',
												'<span class="se_bubble_a_link" id="#{modifyid}">更改图片</span>',
											'</span>',
											'<span>',
												'&nbsp;&nbsp;',
												'<span class="se_bubble_a_link" id="#{deleteid}">删除图片</span>',
											'</span>',
										'</div>',
									'</div>',
								'</div>'].join('');
SinaEditor.CONF.flashBubbleTemplete = ['<div class="se_bubble_a_panel">',
									'<div>',
										'<div style="float:left;">',
											'<span>',
												'<span class="se_bubble_a_link" id="#{seeid}">查看影片&nbsp;-&nbsp;</span>',
											'</span>',
											'<span>',
												'<span class="se_bubble_a_link" id="#{deleteid}">删除影片</span>',
											'</span>',
											'<div style="border:1px solid;display:none;" id="#{showflash}"></div>',
										'</div>',
										'<img id="#{closeid}" src="',SinaEditor.CONF.STYLELOC,'imgs/bubble_closebox.gif" style="padding:3px;float:left;">',
									'</div>',
								'</div>'].join('');

//拖放大小的CSS样式

//链接点击的样式
SinaEditor.CONF.aBubbleStyles = ['.se_bubble_a_panel{',
'}',
'.se_bubble_a_link{',
	'color:#0000CC;',
	'cursor:pointer;',
	'font-size:100%;',
'}'].join('');

if (!SinaEditor.STATE) {
    SinaEditor.STATE = {};
}

//编辑器的当前状态
SinaEditor.STATE.CREATING = 1;
SinaEditor.STATE.CREATED = 2;
SinaEditor.STATE.EDITING = 3;
SinaEditor.STATE.SHOWSOURCE = 4;


//节点的类型
if (!SinaEditor.NODETYPE) {
    SinaEditor.NODETYPE = {};
}
SinaEditor.NODETYPE.ELEMENT = 1;
SinaEditor.NODETYPE.TEXT = 3;
//CTRL+A：就造就了选中body的情况。
SinaEditor.NODETYPE.HTMLELEMENT = 9;


//鼠标点击事件
if (!SinaEditor.MOUSEKEY) {
    SinaEditor.MOUSEKEY = {};
}

SinaEditor.MOUSEKEY.LEFT = 1;
SinaEditor.MOUSEKEY.MID = 2;
SinaEditor.MOUSEKEY.RIGHT = 3;

//按钮的状态
if (!SinaEditor.BUTTONSTATE) {
    SinaEditor.BUTTONSTATE = {};
}
SinaEditor.BUTTONSTATE.NORMAL = 1;
SinaEditor.BUTTONSTATE.DISABLED = 2;
SinaEditor.BUTTONSTATE.CLICKED = 3;

//按钮响应的事件
if (!SinaEditor.BUTTON) {
    SinaEditor.BUTTON = {};
}

//默认的事件触发方式
SinaEditor.BUTTON['default'] = function(btn) {
	switch(this.getState()) {
		case SinaEditor.STATE.CREATING :
			btn.setState(SinaEditor.BUTTONSTATE.DISABLED);
			break;
		case SinaEditor.STATE.EDITING :
			btn.setState(SinaEditor.BUTTONSTATE.NORMAL);
			break;
		case SinaEditor.STATE.SHOWSOURCE :
			btn.setState(SinaEditor.BUTTONSTATE.DISABLED);
			break;
		default :
			btn.setState(SinaEditor.BUTTONSTATE.DISABLED);
	}
};

//一些Range要使用的定义
if (!SinaEditor.RANGE) {
    SinaEditor.RANGE = {};
}

//
SinaEditor.RANGE.BLOCKTAGS = {
    "DIV": "1",
    "P": "1",
    "TD": "1",
    "LI": "1",
    "OL": "1",
    "NOBR": "1",
	"BODY" : "1"
};

SinaEditor.RANGE.STYLEOBJECTELEMENTS = {
	"IMG":1,
	"HR":1,
	"LI":1,
	"TABLE":1,
	"TR":1,
	"TD":1,
	"TH":1,
	"EMBED":1,
	"OBJECT":1,
	"OL":1,
	"UL":1,
	"A":1,
	"INPUT":1,
	"FORM":1,
	"SELECT":1,
	"TEXTAREA":1,
	"BUTTON":1,
	"FIELDSET":1,
	"THREAD":1,
	"TFOOT":1
};

//range遍历时要跳过的节点
SinaEditor.RANGE.SKIPTAGS = {
    "IMG": "1",
    "BR": "1",
    "TABLE": "1",
    "CAPTION": "1",
    "COL": "1",
    "COLGROUP": "1",
    "TBODY": "1",
    "TFOOT": "1",
    "TH": "1",
    "THREAD": "1",
    "TR": "1",
    "UL": "1"
};

/*
 * Anything whose display computed style is block, list-item, table,
 * table-row-group, table-header-group, table-footer-group, table-row,
 * table-column-group, table-column, table-cell, table-caption, or whose node
 * name is hr, br (when enterMode is br only) is a block boundary.
 */
SinaEditor.RANGE.blockBoundaryDisplayMatch = {
	'block' : 1,
	'list-item' : 1,
	'table' : 1,
	'table-row-group' : 1,
	'table-header-group' : 1,
	'table-footer-group' : 1,
	'table-row' : 1,
	'table-column-group' : 1,
	'table-column' : 1,
	'table-cell' : 1,
	'table-caption' : 1
};

//一些工具的默认配置
if (!SinaEditor.TOOLCONF) {
    SinaEditor.TOOLCONF = {};
}

SinaEditor.TOOLCONF.COLOR = {
	'000000' : '黑',
	'800000' : '褐红',
	'8B4513' : '深褐',
	'2F4F4F' : '墨绿',
	'008080' : '绿松石',
	'000080' : '海军蓝',
	'4B0082' : '靛蓝',
	'696969' : '暗灰',
	'B22222' : '砖红',
	'A52A2A' : '褐',
	'DAA520' : '金黄',
	'006400' : '深绿',
	'40E0D0' : '蓝绿',
	'0000CD' : '中蓝',
	'800080' : '紫',
	'808080' : '灰',
	'F00' : '红',
	'FF8C00' : '深橙',
	'FFD700' : '金',
	'008000' : '绿',
	'0FF' : '青',
	'00F' : '蓝',
	'EE82EE' : '紫罗兰',
	'A9A9A9' : '深灰',
	'FFA07A' : '亮橙',
	'FFA500' : '橙',
	'FFFF00' : '黄',
	'00FF00' : '水绿',
	'AFEEEE' : '粉蓝',
	'ADD8E6' : '亮蓝',
	'DDA0DD' : '梅红',
	'D3D3D3' : '淡灰',
	'FFF0F5' : '淡紫红',
	'FAEBD7' : '古董白',
	'FFFFE0' : '淡黄',
	'F0FFF0' : '蜜白',
	'F0FFFF' : '天蓝',
	'F0F8FF' : '淡蓝',
	'E6E6FA' : '淡紫',
	'FFF' : '白'
};

//配置字体的样式
SinaEditor.TOOLCONF.FONTFAMILYDEF = '字体';
SinaEditor.TOOLCONF.FONTFAMILYCONF = [{
    'html': '宋体'
}, {
    'html': '黑体'
}, {
    'html': '隶书'
}, {
    'html': '楷体',
    'style': '楷体_GB2312,楷体'
}, {
    'html': '幼圆'
}, {
    'html': 'Arial'
}, {
    'html': 'Impact'
}, {
    'html': 'Georgia'
}, {
    'html': 'Verdana'
}, {
    'html': 'Courier New'
}, {
    'html': 'Times New Roman'
}];

//配置字体的大小
SinaEditor.TOOLCONF.FONTSIZEDEF = '字号';
SinaEditor.TOOLCONF.FONTSIZECONF = [{
    'html': '10px'
}, {
    'html': '12px'
}, {
    'html': '14px'
}, {
    'html': '16px'
}, {
    'html': '18px'
}, {
    'html': '20px'
}, {
    'html': '22px'
}, {
    'html': '24px'
}, {
    'html': '32px'
}, {
    'html': '56px'
}];

//链接的弹出浮层
SinaEditor.TOOLCONF.linkTemplate = ['<div class="linkItemContent">',
	'<div class="row1" id="#{hidden}" style="display:none">文字:',
		'<input class="fm1" id="#{text}">',
	'</div>',
	'<div class="row2">链接:',
		'<input value="http://" class="fm1" id="#{link}">',
	'</div>',
	'<div class="row3">',
		'<a onclick="return false" id="#{ok}" href="#" class="SG_aBtn SG_aBtnB"><cite>确定</cite></a>',
		'<a onclick="return false" id="#{cancel}" href="#" class="SG_aBtn SG_aBtnB"><cite>取消</cite></a>',
	'</div>',
'</div>'].join('');

//符合要求可直接添加进链接
SinaEditor.TOOLCONF.addLinkNow = /.*(http|ftp|https|mailto)\:\/\/.*/i;

//上传图片的类型
SinaEditor.TOOLCONF.imgType = /.*\.(gif|bmp|png|jpg)$/i;
//类型错误的MSG
SinaEditor.TOOLCONF.imgErrTypeMSG = '上传类型仅仅支持gif,bmp,png,jpg';

//图片上传的浮层
SinaEditor.TOOLCONF.imgTemplate = ['<div class="insetPhotoContent insetPhotoContent_l">',
	'<div id="headerTab" class="headerTab">',
	'<h4>图片来源：</h4>',
	'<ul><li class="cur" id="#{tabMy}"><a href="#" onclick="return false;">我的电脑</a></li><li id="#{tabWeb}" class=""><a href="#" onclick="return false;">网上图片</a></li></ul></div>',
	'<div style="display:none" id="#{errTips}" class="errTips"></div>',
	'<!--出错提示-->',
	'<div id="#{useClient}" class="urlPath">',
		'<div id="#{clientView}">',
			'<span>选择本地图片：</span>',
			'<div id="#{clientUploadDiv}" class="clientUploadDiv" >',
				//TODO 这里需要配置上传的地址。
				'<form target="#{clientIframe}" id="#{clientForm}" action="postImg.php" method="POST" enctype="multipart/form-data">',
					'<input type="file" name="imgFile" class="imgFile" id="#{clientFile}">',
					'<textarea name="imgValue" style="display:none" id="#{clientFileDrag}"></textarea>',
				'</form>',
				'<div>点击这里选择文件。请配置上传地址，否则上传会失败。<span id="#{clientMoreUp}" style="display:none;">你也可以拖拽上传</span></div>',
			'</div>',
			'<iframe id="#{clientIframe}" name="#{clientIframe}" style="display:none" ></iframe>',
		'</div>',
		'<div id="#{contentLoading}" style="display:none">',
			'<div class="loading"></div>',
			'<a class="SG_aBtn SG_aBtnB SG_aBtn_sub" href="#" onclick="return false;">',
				'<cite id="#{cancleClient}">取消上传</cite>',
			'</a>',
		'</div>',
		'<div id="#{clientResult}" style="display:none">',
			'<div class="clientImg">',
				'<img id="#{resultPic}">',
			'</div>',
			'<a class="SG_aBtn SG_aBtnB SG_aBtn_sub" href="#" onclick="return false;">',
				'<cite id="#{addClientPic}">添加</cite>',
			'</a>',
			'<a class="SG_aBtn SG_aBtnB SG_aBtn_sub" href="#" onclick="return false;">',
				'<cite id="#{resetClient}">重新上传</cite>',
			'</a>',
		'</div>',
	'</div>',
	'<div style="display: none;" id="#{webContent}" class="urlPath">',
		'<div>',
			'<span>输入图片地址：</span>',
			'<input type="text" class="fmTxt" value="http://" id="#{webUrl}" maxlength="400">',
			'<a id="#{webAdd}" style="display:none;" class="SG_aBtn SG_aBtnB" href="#" onclick="return false;">',
				'<cite>添加</cite>',
			'</a>',
		'</div>',
		'<div class="webImg" style="display:none;">',
			'<img id="#{webPic}">',
		'</div>',
		'<div id="#{webPicLoading}" class="webImgLoad" style="display:none;"></div>',
	'</div>',
'</div>'].join('');

SinaEditor.TOOLCONF.flashTemplate = ['<div class="linkItemContent">',
	'<div class="row1">HTML代码:',
		'<input class="fm1" style="width:100%;margin-top:3px" id="#{flashSrc}">',
	'</div>',
	'<div class="row1">',
		'<span style="color:red;display:none" id="#{flashErrTip}">*请输入flash代码</span>',
	'</div>',
	'<div class="row3">',
		'<a onclick="return false" href="#" class="SG_aBtn SG_aBtnB"><cite id="#{ok}">确定</cite></a>',
		'<a onclick="return false" href="#" class="SG_aBtn SG_aBtnB"><cite id="#{cancel}">取消</cite></a>',
	'</div>',
'</div>'].join('');

SinaEditor.TOOLCONF.tableTemplate = ['<div id="#{panel}" class="se_tab_tableContent">',
	'<div id="#{eventContent}" class="se_tab_eventContent">',
		'<div style="width: 100%; height: 100%;">',
			'<div class="se_tab_mainContent"></div>',
			'<div id="#{baseContent}" class="se_tab_baseContent"></div>',
			'<div id="#{chooseContent}" class="se_tab_chooseContent"></div>',
		'</div>',
	'</div>',
	'<div class="num" id="#{tabNums}"> 0 x 0 </div>',
'</div>'].join('');

SinaEditor.TOOLCONF.faceTemplate = '<div class="se_face_bubble" id="#{panel}"></div>';

// ==ClosureCompiler==
// @output_file_name default.js
// @compilation_level SIMPLE_OPTIMIZATIONS
// ==/ClosureCompiler==

SinaEditor.TOOLCONF.faceSrc = [
	{'src':'http://www.sinaimg.cn/uc/myshow/blog/misc/gif/E___7400ZH00SIGG.gif' , 'title':'左哼哼'},
	{'src':'http://www.sinaimg.cn/uc/myshow/blog/misc/gif/E___7401ZH00SIGG.gif' , 'title': '右哼哼'},
	{'src':'http://www.sinaimg.cn/uc/myshow/blog/misc/gif/E___7402ZH00SIGG.gif' },
	{'src':'http://www.sinaimg.cn/uc/myshow/blog/misc/gif/E___7403ZH00SIGG.gif'},
	{'src':'http://www.sinaimg.cn/uc/myshow/blog/misc/gif/E___7404ZH00SIGG.gif'},
	{'src':'http://www.sinaimg.cn/uc/myshow/blog/misc/gif/E___7405ZH00SIGG.gif'},
	{'src':'http://www.sinaimg.cn/uc/myshow/blog/misc/gif/E___7406ZH00SIGG.gif'},
	{'src':'http://www.sinaimg.cn/uc/myshow/blog/misc/gif/E___7407ZH00SIGG.gif'},
	{'src':'http://www.sinaimg.cn/uc/myshow/blog/misc/gif/E___7408ZH00SIGG.gif'},
	{'src':'http://www.sinaimg.cn/uc/myshow/blog/misc/gif/E___7409ZH00SIGG.gif'},
	{'src':'http://www.sinaimg.cn/uc/myshow/blog/misc/gif/E___7410ZH00SIGG.gif'},
	{'src':'http://www.sinaimg.cn/uc/myshow/blog/misc/gif/E___7411ZH00SIGG.gif'},
	{'src':'http://www.sinaimg.cn/uc/myshow/blog/misc/gif/E___7412ZH00SIGG.gif'},
	{'src':'http://www.sinaimg.cn/uc/myshow/blog/misc/gif/E___7413ZH00SIGG.gif'},
	{'src':'http://www.sinaimg.cn/uc/myshow/blog/misc/gif/E___7414ZH00SIGG.gif'},
	{'src':'http://www.sinaimg.cn/uc/myshow/blog/misc/gif/E___7415ZH00SIGG.gif'},
	{'src':'http://www.sinaimg.cn/uc/myshow/blog/misc/gif/E___7416ZH00SIGG.gif'},
	{'src':'http://www.sinaimg.cn/uc/myshow/blog/misc/gif/E___7417ZH00SIGG.gif'},
	{'src':'http://www.sinaimg.cn/uc/myshow/blog/misc/gif/E___7418ZH00SIGG.gif'},
	{'src':'http://www.sinaimg.cn/uc/myshow/blog/misc/gif/E___7419ZH00SIGG.gif'},
	{'src':'http://www.sinaimg.cn/uc/myshow/blog/misc/gif/E___7420ZH00SIGG.gif'}
];

//历史数据编辑
//最多保存多少历史数据
SinaEditor.TOOLCONF.historyMax = 5;
SinaEditor.TOOLCONF.historyTemplate = '<div class="se_history_bubble" id="#{panel}"></div>';

window.console||(console={log:function(){}});window.SinaEditor||(SinaEditor={});if(!SinaEditor.env)SinaEditor.env={};
(function(a){var b=navigator.userAgent.toLowerCase();a.$IE=/msie/.test(b);a.$OPERA=/opera/.test(b);a.$GENKO=/gecko\//.test(b);a.$WEBKIT=/applewebkit/.test(b);a.$IE5=/msie 5 /.test(b);a.$IE6=/msie 6/.test(b);a.$IE7=/msie 7/.test(b);a.$IE8=/msie 8/.test(b);a.$winXP=/windows nt 5.1/.test(b);a.$winVista=/windows nt 6.0/.test(b);a.$FF=/firefox/i.test(b);a.$CHROME=/chrome/i.test(b);a.$SAFARI=/safari/.test(b)&&!a.$CHROME;a.$TT=/tencenttraveler/.test(b);a.$360=/360se/.test(b);a.$Maxthon=!1;try{a.$Maxthon=
window.external.max_version?!0:!1}catch(c){}a.isCustomDomain=function(){var b=document.domain,a=window.location.hostname;return this.ie&&b!==a&&b!=="["+a+"]"}()})(SinaEditor.env);window.SinaEditor||(SinaEditor={});SinaEditor.ev={};
(function(a){var b={};a.customEvent={};var c={},d={},e={},f=function(b,c,e){var f=d[b];return function(b,d){var g=f[b.type]||[],i=0,d=d||e;d.unshift(a.fixEvent(b));for(i=0;g[i];i++)g[i].func.apply(c,d);d.pop()}},g=function(a,c,d){b[c]||(a.removeEventListener?a.removeEventListener(c,d,!1):a.detachEvent?a.detachEvent("on"+c,d,!1):a["on"+c]=null)},h=function(b){var a=null;for(a in c)if(c[a]===b)return a;return null};a.fixEvent=function(b){if(!b.target){try{if(b.target=b.srcElement,b.button)switch(b.button){case 1:b.which=
SinaEditor.MOUSEKEY.LEFT;break;case 4:b.which=SinaEditor.MOUSEKEY.MID;break;case 2:b.which=SinaEditor.MOUSEKEY.RIGHT}}catch(a){}b.pageX=b.x;b.pageY=b.y}if(typeof b.layerX==="undefined")b.layerX=b.offsetX;if(typeof b.layerY==="undefined")b.layerY=b.offsetY;return b};a.stopEvent=function(b){b.cancelBubble=!0;b.returnValue=!1};if(!SinaEditor.env.$IE)a.stopEvent=function(b){b.preventDefault();b.stopPropagation()};a.add=function(a,g,k,o){o=o||{};o.content=o.content||a;var j=h(a);j||(j=SinaEditor.util.uniqueKey(),
c[j]=a,d[j]={});var m=d[j];if(!m[g]){m[g]=[];o.args=o.args||[];if(Object.prototype.toString.apply(o.args)!=="[object Array]")throw new Exception("opt.args \u5fc5\u987b\u662f\u6570\u7ec4");e[j]=f(j,o.content,o.args);b[g]||(a.addEventListener?a.addEventListener(g,e[j],!1):a.attachEvent?a.attachEvent("on"+g,e[j],!1):a["on"+g]=e[j])}if(m[g].length&&o.once)return-1;a=SinaEditor.util.uniqueKey();m[g].push({func:k,id:a});return a};a.remove=function(b,a,c,e){var f=h(b);if(f)if(f=d[f],c){var m=f[a];if(m){var n=
typeof c==="function"?"func":"id",q;for(q=0;m[q];q++)if(m[q][n]===c){f[a].splice(q,1);break}SinaEditor.util.isEmptyObject(f[a])&&(delete f[a],g(b,a,c,e))}}else delete f[a],g(b,a,c,e)};a.fire=function(a,c,d){if(b[c]){if(d=d||{},a=h(a))e[a]({type:c},d.args)}else a.fireEvent?a.fireEvent("on"+c):(d=a.ownerDocument.createEvent("HTMLEvents"),d.initEvent(c,!0,!0),a.dispatchEvent(d))};a.$regEvent=function(c,d){var e,f,g,h,n;if(a.customEvent[c]&&(b[c]||(b[c]={}),b[c][d.option.id]||(b[c][d.option.id]=[]),SinaEditor.util.uniqueKey(),
e=a.customEvent[c](d)))for(h=0;e[h];h++)for(n in f=e[h],g=f.events,g)g.hasOwnProperty(n)&&a.add(f.enty,n,g[n])}})(SinaEditor.ev);window.SinaEditor||(SinaEditor={});
(function(){function a(b){function a(){}a.prototype=b;return new a}Function.prototype.$define=function(b){for(var a in b)b.hasOwnProperty(a)&&(this.prototype[a]=b[a]);if(this.__interface__)for(a in this.prototype)if(this.prototype[a]==="NI")throw Error("\u7c7b\u5b9a\u4e49\u9519\u8bef\uff0c\u63a5\u53e3\u65b9\u6cd5["+a+"]\u672a\u5b9e\u73b0");this.prototype.constructor=this;this.$extends=this.$define=this.$implements=function(){throw Error("$define\u8bed\u53e5\u5b9a\u4e49\u540e\u9762\u4e0d\u80fd\u518d\u4f5c\u5176\u5b83\u5b9a\u4e49");
};return this};Function.prototype.$extends=function(){var b=this,c,d;if(arguments.length===0)throw Error("$extends\u8bed\u53e5\u9519\u8bef\uff1a\u672a\u6307\u5b9a\u7236\u7c7b");c=arguments[0];d=function(){c.apply(this,arguments);b.apply(this,arguments)};d.prototype=a(c.prototype);d.prototype.constructor=d;d.$super=c.prototype;return d};Function.prototype.$implements=function(){for(var b=Array.prototype.slice.call(arguments,0),a=b.length,d;a--;){if(typeof b[a]!=="object")throw Error("$implements\u8bed\u53e5\u9519\u8bef\uff1a\u53c2\u6570\u5fc5\u987b\u4e3aobject\u7c7b\u578b");
for(d in b[a])typeof this.prototype[d]==="undefined"&&(this.prototype[d]="NI")}this.__interface__=!0;this.$extends=function(){throw Error("$extends\u8bed\u53e5\u9519\u8bef:$extends\u8bed\u53e5\u4e0d\u80fd\u51fa\u73b0\u5728$implements\u5b9a\u4e49\u4e4b\u540e");};return this}})();window.SinaEditor||(SinaEditor={});SinaEditor.pkg=function(a,b){if(!a||!a.length)return null;var c=a.split("."),d=SinaEditor,e;for(e=c[0]=="SinaEditor"?1:0;e<c.length;++e)d[c[e]]=d[c[e]]||{},d=d[c[e]];b&&b(d);return d};SinaEditor.pkg("SinaEditor.operation");
if(!SinaEditor.util)SinaEditor.util={};
SinaEditor.pkg("SinaEditor.util",function(a){a.isEmptyObject=function(b){for(var a in b)return!1;return!0};a.uniqueKey=function(){var b=+new Date+"",a=b.length;return parseInt(Math.random()*1E4,10)+""+b.substring(a/2,a-1)};a.trim=function(b){for(var b=b.replace(/^\s\s*/,""),a=/\s/,d=b.length;a.test(b.charAt(--d)););return b.slice(0,d+1)};a.o2s=function(b){var a=[],d=arguments.callee;switch(Object.prototype.toString.call(b)){case "[object Array]":var e;a.push("[");e=0;for(len=b.length;e<len;e++)a.push(d(b[e])),
a.push(",");a[1]&&a.pop();a.push("]");return a.join("");case "[object Object]":a.push("{");for(e in b)a.push(d(e)),a.push(":"),a.push(d(b[e])),a.push(",");a[1]&&a.pop();a.push("}");return a.join("");case "[object String]":return a.push('"'),a.push(b.replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(/"/g,'\\"')),a.push('"'),a.join("");case "[object Number]":case "[object Boolean]":return b;default:return b.toString?b.toString():"[unsupported]"}};a.mix=function(a,c){if(c)for(var d in c)a[d]=c[d];return a};
a.s2o=function(a){try{return eval("("+a+")")}catch(c){return null}}});
SinaEditor.util.styleHTML=function(a,b,c){var d;d=new function(){this.pos=0;this.token="";this.current_mode="CONTENT";this.tags={parent:"parent1",parentcount:1,parent1:""};this.token_text=this.last_token=this.last_text=this.token_type=this.tag_type="";this.Utils={whitespace:"\n\r\t ".split(""),single_token:"br,input,link,meta,!doctype,basefont,base,area,hr,wbr,param,img,isindex,?xml,embed".split(","),extra_liners:"head,body,/html".split(","),in_array:function(a,b){var d;for(d=0;d<b.length;d++)if(a===
b[d])return!0;return!1}};this.get_content=function(){for(var a="",b=[],d=!1;this.input.charAt(this.pos)!=="<";){if(this.pos>=this.input.length)return b.length?b.join(""):["","TK_EOF"];a=this.input.charAt(this.pos);this.pos++;this.line_char_count++;if(this.Utils.in_array(a,this.Utils.whitespace))b.length&&(d=!0),this.line_char_count--;else{if(d){if(this.line_char_count>=this.max_char){b.push("\n");for(d=0;d<this.indent_level;d++)b.push(this.indent_string);this.line_char_count=0}else b.push(" "),this.line_char_count++;
d=!1}b.push(a)}}return b.length?b.join(""):""};this.get_script=function(){var a="",b=[],a=RegExp("<\/script>","igm");a.lastIndex=this.pos;for(var d=(a=a.exec(this.input))?a.index:this.input.length;this.pos<d;){if(this.pos>=this.input.length)return b.length?b.join(""):["","TK_EOF"];a=this.input.charAt(this.pos);this.pos++;b.push(a)}return b.length?b.join(""):""};this.record_tag=function(a){this.tags[a+"count"]?this.tags[a+"count"]++:this.tags[a+"count"]=1;this.tags[a+this.tags[a+"count"]]=this.indent_level;
this.tags[a+this.tags[a+"count"]+"parent"]=this.tags.parent;this.tags.parent=a+this.tags[a+"count"]};this.retrieve_tag=function(a){if(this.tags[a+"count"]){for(var b=this.tags.parent;b;){if(a+this.tags[a+"count"]===b)break;b=this.tags[b+"parent"]}if(b)this.indent_level=this.tags[a+this.tags[a+"count"]],this.tags.parent=this.tags[b+"parent"];delete this.tags[a+this.tags[a+"count"]+"parent"];delete this.tags[a+this.tags[a+"count"]];this.tags[a+"count"]==1?delete this.tags[a+"count"]:this.tags[a+"count"]--}};
this.get_tag=function(){var a="",b=[],d=!1;do{if(this.pos>=this.input.length)return b.length?b.join(""):["","TK_EOF"];a=this.input.charAt(this.pos);this.pos++;this.line_char_count++;if(this.Utils.in_array(a,this.Utils.whitespace))d=!0,this.line_char_count--;else{if(a==="'"||a==='"')if(!b[1]||b[1]!=="!")a+=this.get_unformatted(a),d=!0;a==="="&&(d=!1);if(b.length&&b[b.length-1]!=="="&&a!==">"&&d)this.line_char_count>=this.max_char?(this.print_newline(!1,b),this.line_char_count=0):(b.push(" "),this.line_char_count++),
d=!1;b.push(a)}}while(a!==">");a=b.join("");d=a.indexOf(" ")!=-1?a.indexOf(" "):a.indexOf(">");d=a.substring(1,d).toLowerCase();a.charAt(a.length-2)==="/"||this.Utils.in_array(d,this.Utils.single_token)?this.tag_type="SINGLE":d==="script"?(this.record_tag(d),this.tag_type="SCRIPT"):d==="style"?(this.record_tag(d),this.tag_type="STYLE"):d==="a"?(a=this.get_unformatted("</a>",a),b.push(a),this.tag_type="SINGLE"):d.charAt(0)==="!"?d.indexOf("[if")!=-1?(a.indexOf("!IE")!=-1&&(a=this.get_unformatted("--\>",
a),b.push(a)),this.tag_type="START"):d.indexOf("[endif")!=-1?(this.tag_type="END",this.unindent()):(a=d.indexOf("[cdata[")!=-1?this.get_unformatted("]]\>",a):this.get_unformatted("--\>",a),b.push(a),this.tag_type="SINGLE"):(d.charAt(0)==="/"?(this.retrieve_tag(d.substring(1)),this.tag_type="END"):(this.record_tag(d),this.tag_type="START"),this.Utils.in_array(d,this.Utils.extra_liners)&&this.print_newline(!0,this.output));return b.join("")};this.get_unformatted=function(a,b){if(b&&b.indexOf(a)!=-1)return"";
var d="",c="",i=!0;do{d=this.input.charAt(this.pos);this.pos++;if(this.Utils.in_array(d,this.Utils.whitespace)){if(!i){this.line_char_count--;continue}if(d==="\n"||d==="\r"){c+="\n";for(d=0;d<this.indent_level;d++)c+=this.indent_string;i=!1;this.line_char_count=0;continue}}c+=d;this.line_char_count++;i=!0}while(c.indexOf(a)==-1);return c};this.get_token=function(){var a;if(this.last_token==="TK_TAG_SCRIPT"){a=this.get_script();if(typeof a!=="string")return a;a=js_beautify(a,{indent_size:this.indent_size,
indent_char:this.indent_character,indent_level:this.indent_level});return[a,"TK_CONTENT"]}if(this.current_mode==="CONTENT")return a=this.get_content(),typeof a!=="string"?a:[a,"TK_CONTENT"];if(this.current_mode==="TAG")return a=this.get_tag(),typeof a!=="string"?a:[a,"TK_TAG_"+this.tag_type]};this.printer=function(a,b,d,c){this.input=a||"";this.output=[];this.indent_character=b||" ";this.indent_string="";this.indent_size=d||2;this.indent_level=0;this.max_char=c||70;for(a=this.line_char_count=0;a<
this.indent_size;a++)this.indent_string+=this.indent_character;this.print_newline=function(a,b){this.line_char_count=0;if(b&&b.length){if(!a)for(;this.Utils.in_array(b[b.length-1],this.Utils.whitespace);)b.pop();b.push("\n");var d;for(d=0;d<this.indent_level;d++)b.push(this.indent_string)}};this.print_token=function(a){this.output.push(a)};this.indent=function(){this.indent_level++};this.unindent=function(){this.indent_level>0&&this.indent_level--}};return this};for(d.printer(a,c,b);;){a=d.get_token();
d.token_text=a[0];d.token_type=a[1];if(d.token_type==="TK_EOF")break;switch(d.token_type){case "TK_TAG_START":case "TK_TAG_SCRIPT":case "TK_TAG_STYLE":d.print_newline(!1,d.output);d.print_token(d.token_text);d.indent();d.current_mode="CONTENT";break;case "TK_TAG_END":d.print_newline(!0,d.output);d.print_token(d.token_text);d.current_mode="CONTENT";break;case "TK_TAG_SINGLE":d.print_newline(!1,d.output);d.print_token(d.token_text);d.current_mode="CONTENT";break;case "TK_CONTENT":d.token_text!==""&&
(d.print_newline(!1,d.output),d.print_token(d.token_text)),d.current_mode="TAG"}d.last_token=d.token_type;d.last_text=d.token_text}return d.output.join("")};if(!SinaEditor.util)SinaEditor.util={},SinaEditor.util.dom={};
SinaEditor.pkg("SinaEditor.util.dom",function(a){function b(a,c){var f=a.scrollLeft;if(c)return a.offsetParent?a.offsetLeft+b(a.offsetParent,c)-f:a.offsetLeft-f;return a.offsetParent?a.offsetLeft+b(a.offsetParent,c):a.offsetLeft}function c(a,b){var f=a.scrollTop;if(b)return a.offsetParent?a.offsetTop+c(a.offsetParent,b)-f:a.offsetTop-f;return a.offsetParent?a.offsetTop+c(a.offsetParent,b):a.offsetTop}a.createDom=function(a,b){var b=b||{},c=(b.ownerDocument||document).createElement(a),g;if(b.attributes)for(g in b.attributes)c.setAttribute(g,
b.attributes[g]);if(b.properties)for(g in b.properties)c[g]=b.properties[g];return c};a.containsNode=function(a,b){if(a==b)return!0;return a.contains?a.contains(b):!!(a.compareDocumentPosition(b)&16)};a.getFirst=function(b){return(b=b.firstChild)&&b.nodeType!=SinaEditor.NODETYPE.ELEMENT?a.getNext(b):b};a.getNext=function(a){do a=a.nextSibling;while(a&&a.nodeType!=1);return a};a.parents=function(a){for(var b=[],a=a.parentNode;a.tagName.toUpperCase()!="HTML";)b[b.length]=a,a=a.parentNode;return b};
a.createDomFromHTML=function(b,c){var f=a.createDom("DIV",{ownerDocument:c});f.innerHTML=b;return f.removeChild(f.firstChild)};a.outerHTML=function(a){if(a.outerHTML)return console.log("\u539f\u751fouterHTML"),a.outerHTML;var b=a.ownerDocument.createElement("div");b.appendChild(a.cloneNode(!0));return b.innerHTML};a.replaceNode=SinaEditor.env.$IE?function(a,b){return b.replaceNode(a)}:function(a,b){return b.parentNode.replaceChild(a,b)};a.delElement=function(a){var b=a.parentNode;return b?b.removeChild(a):
null};a.removeTag=function(a){if(a.nodeType==1){for(var b=a.parentNode,c=a.childNodes;c[0];)b.insertBefore(c[0],a);b.removeChild(a)}};a.getBlockParent=function(b){var b=a.parents(b),c=null,f;for(f=0;b[f];f++){if(SinaEditor.RANGE.BLOCKTAGS[b[f].tagName.toUpperCase()])break;c=b[f]}return c};a.insertBefore=function(a,b){b.parentNode.insertBefore(a,b)};a.insertAfter=function(a,b){var c=b.parentNode;c.lastChild==b?c.appendChild(a):c.insertBefore(a,b.nextSibling)};a.getScrollPos=function(a){var a=a||document,
b=a.compatMode==="BackCompat"?a.body:a.documentElement;return[b.scrollTop||a.body.scrollTop,b.scrollLeft||a.body.scrollLeft,b.scrollWidth,b.scrollHeight]};a.$E=function(a,b){var c=typeof a=="string"?(b||document).getElementById(a):a;if(c)return c;return null};a.getXY=function(d,e){if(!e)return[b(d),c(d)];var f,g,h=[0,0],i=!0;f=d.ownerDocument;f.parentWindow?g=(f=f.parentWindow.frameElement)&&f.ownerDocument.parentWindow.frameElement:(g=(f=f.defaultView.frameElement)&&f.ownerDocument.defaultView.frameElement,
i=!1);for(;f;)h[0]+=a.styleInteger(f,"borderLeftWidth"),h[1]+=a.styleInteger(f,"borderTopWidth"),g?(h[0]+=b(f,!0),h[1]+=c(f,!0),f=g,g=i?f.ownerDocument.parentWindow.frameElement:f.ownerDocument.defaultView.frameElement):(h[0]+=b(f),h[1]+=c(f),f=g);return[h[0]+b(d,!0),h[1]+c(d,!0)]};a.getChildren=function(b,c){c=c||{};c.eleArr=c.eleArr||[];if(b.nodeType==3&&!c.onlyElement)c.eleArr.push(b);else for(var f=b.childNodes,g=0;f[g];){var h=f[g];if(h.nodeType==1){if(c.all&&(h.childNodes.length!=1||h.childNodes.length==
1&&h.childNodes[0].nodeType!=3))c.eleArr=a.getChildren(h,c);c.eleArr.push(h)}else c.onlyElement||c.eleArr.push(h);g++}return c.eleArr}});
SinaEditor.pkg("SinaEditor.util.dom",function(a){a.addStyles=function(b,c){var d,e;e=(c||document).getElementsByTagName("head")[0];d=a.createDom("style",{ownerDocument:c,attributes:{type:"text/css"}});try{d.appendChild((c||document).createTextNode(b))}catch(f){d.styleSheet.cssText=b}e.appendChild(d)};a.addLink=function(b,c){var d,e;e=(c||document).getElementsByTagName("head")[0];d=a.createDom("link",{ownerDocument:c,attributes:{rel:"stylesheet",type:"text/css",href:b}});e.appendChild(d)};a.styleInteger=
function(b,c){var d=a.getStyle(b,c);try{return parseInt(d.replace(/[^\d]/g,""),10)||0}catch(e){return 0}};a.getStyle=function(a,c){if(!a)return"";switch(a.nodeType){case SinaEditor.NODETYPE.HTMLELEMENT:return"";case SinaEditor.NODETYPE.TEXT:a=a.parentNode}if(!a||a.tagName.toUpperCase()==="BODY")return"";switch(c){case "opacity":var d=100;try{d=a.filters["DXImageTransform.Microsoft.Alpha"].opacity}catch(e){try{d=a.filters("alpha").opacity}catch(f){}}return d/100;default:return c==="float"&&(c="styleFloat"),
d=a.currentStyle?a.currentStyle[c]:null,a.style[c]||d}};if(!SinaEditor.env.$IE)a.getStyle=function(a,c){if(!a)return"";switch(a.nodeType){case SinaEditor.NODETYPE.HTMLELEMENT:return"";case SinaEditor.NODETYPE.TEXT:a=a.parentNode}if(!a||a.tagName.toUpperCase()==="BODY")return"";c=="float"&&(c="cssFloat");var d=a.ownerDocument.defaultView.getComputedStyle(a,"");return a.style[c]||d?d[c]:null};a.removeStyle=function(a,c){var c=c.replace(/([A-Z])/,"-$1").toLowerCase(),d=a.style.cssText.toLowerCase().split(";"),
e;for(e=0;d[e];e++)if(d[e].indexOf(c)!=-1){d.splice(e,1);break}a.style.cssText=d.join(";");return d.length-1};a.setStyle=function(){var b=arguments[0];if(arguments.length==2){var c,d,e=arguments[1];for(d in e){c=d.split("-");for(var f=c[0],g=void 0,g=1;g<c.length;g++)f+=c[g].charAt(0).toUpperCase()+c[g].substring(1);c=f;a.setStyle(b,c,e[d])}}else if(arguments.length==3)if(d=arguments[1],e=arguments[2],SinaEditor.env.$IE)switch(d){case "opacity":b.style.filter="alpha(opacity="+e*100+")";if(!b.currentStyle||
!b.currentStyle.hasLayout)b.style.zoom=1;break;case "float":break;default:b.style[d]=e}else d=="float"&&(d="cssFloat"),b.style[d]=e}});if(!SinaEditor.range)SinaEditor.range={};
SinaEditor.pkg("SinaEditor.range",function(a){function b(a,b,d){var e=a.entyDoc.createRange(),a=c.createDom(d.useTagName,{ownerDocument:a.entyDoc});if(d.style)a.style[d.style]=d.value;var f=b.parentNode;if(f.tagName.toUpperCase()===d.useTagName){console.log("\u5b83\u7684\u7236\u8282\u70b9\u662fspan!");if(SinaEditor.util.trim(f.textContent)!=SinaEditor.util.trim(b.data))return e.selectNode(b),e.surroundContents(a),a;if(d.style)f.style[d.style]=d.value;return f}if(f.tagName.toUpperCase()=="BODY")return console.log("\u5b83\u7684\u7236\u8282\u70b9\u662fBody!"),
e.selectNode(b),e.surroundContents(a),a;else if(SinaEditor.RANGE.BLOCKTAGS[b.parentNode.tagName.toUpperCase()])return console.log("\u662f\u5757\u72b6\u6807\u7b7e"),e.selectNode(b),e.surroundContents(a),a;else{console.log("\u975e\u5757\u72b6\u6807\u7b7e");var g=f.parentNode;if(g&&g.nodeType===SinaEditor.NODETYPE.ELEMENT&&g.tagName.toUpperCase()==d.useTagName)if(console.log("\u5b83\u7684\u7236\u8282\u70b9\u7684\u7236\u8282\u70b9\u662fspan"),SinaEditor.util.trim(g.textContent)==SinaEditor.util.trim(b.data)){if(d.style)g.style[d.style]=
d.value;return g}else return e.selectNode(b),e.surroundContents(a),a;else return console.log("\u5b83\u7684\u7236\u8282\u70b9\u7684\u7236\u8282\u70b9\u4e0d\u662fspan\uff0c\u662f:"),console.log(g),SinaEditor.util.trim(f.textContent)==SinaEditor.util.trim(b.data)?e.selectNode(f):e.selectNode(b),e.surroundContents(a),a}}var c=SinaEditor.util.dom,d={};a.getCurrentRanges=function(a){var b=a.getSelection();if(!b)return[];var c=[],d=b.rangeCount;if(!d){b=a.document.createRange();if(!a.document.body.firstChild)a.document.body.innerHTML=
"&#x200b;";b.selectNode(a.document.body.firstChild);b.collapse(!0);return[b]}for(var f,a=0;a<d;a++){f=b.getRangeAt(a);if(!f.collapsed){for(var g=f.cloneRange(),h=f.startContainer,i=e(h);i;){f.setStartBefore(i);if(f.toString()!==g.toString())break;h=i;i=e(h)}h===g.startContainer?f.setStart(h,g.startOffset):f.setStartBefore(h);h=f.endContainer;for(i=e(h);i;){f.setEndAfter(i);if(f.toString()!==g.toString())break;h=i;i=e(h)}h===g.endContainer?f.setEnd(h,g.endOffset):f.setEndAfter(h);g.detach()}c.push(f)}return c};
var e=function(a){var b,a=a.parentNode;if(!a||a.nodeType===SinaEditor.NODETYPE.HTMLELEMENT||a.tagName.toUpperCase()==="HTML"||a.tagName.toUpperCase()==="BODY")return null;if((b=a.parentNode)&&a){b=b.childNodes;for(var c=0;b[c];c++)if(b[c]===a)return a}return null};a.applyRanges=function(a,b){if(b){var c=a.getSelection();c.removeAllRanges();if(b.push){var d;for(d=0;b[d];d++)c.addRange(b[d])}else c.addRange(b)}};a.focusNode=function(a,b){var c=null;if(SinaEditor.env.$IE){c=a.document.selection.createRange();
c=c.item?c.item(0):c.parentElement();if(b&&c.nodeType!=1)return c.parentNode;return c}for(var c=a.getSelection(),d=c.rangeCount;0<d;){c=c.getRangeAt(0).commonAncestorContainer;if(b&&c.nodeType!=1)return c.parentNode;return c}return null};a.getReferNode=function(b,c){c=c||a.getCurrentRanges(b)[0];if(!c)return null;var d=c.startContainer;switch(d.nodeType){case SinaEditor.NODETYPE.ELEMENT:switch(d.tagName.toUpperCase()){case "BODY":return SinaEditor.util.dom.getFirst(d);default:return d.parentNode}case SinaEditor.NODETYPE.TEXT:console.log("SinaEditor.NODETYPE.TEXT");
var e=d.parentNode;e.normalize();if(e.childNodes.length==1)return e;return d}};a.focus=function(a,b){var c=a.ownerDocument.parentWindow|a.ownerDocument.defaultView,d=c.getSelection(),c=c.document.createRange();b?c.selectNodeContents(a):c.selectNode(a);d.removeAllRanges();d.addRange(c);return d};a.setStartBefore=function(a,b){var c=a.getSelection(),d=a.document.createRange();d.setStartBefore(b);c.removeAllRanges();c.addRange(d);return c};a.insertNode=function(a,b){var c=a.getSelection();(c.rangeCount>
0?c.getRangeAt(0):a.document.createRange()).insertNode(b);return c};a.compareBoundaryPoints=function(a,b,c){if(!a)return-1;if(!b)return 1;c=c||Range.START_TO_END;return a.compareBoundaryPoints(c,b)};a.applyStyle=function(d,e){e.useTagName=e.useTagName||"span";var g=a.getCurrentRanges(d.entyWin)[0];d.entyDoc.normalize();if(g.collapsed){var j=null,j=g.startContainer;if(!(j.nodeType===SinaEditor.NODETYPE.ELEMENT&&j.tagName.toUpperCase()===e.useTagName.toUpperCase()&&j.innerHTML==="\u200b"))j=c.createDom(e.useTagName,
{ownerDocument:d.entyDoc}),j.innerHTML="&#x200b;",g.insertNode(j);if(e.style)j.style[e.style]=e.value;g.selectNodeContents(j);g.collapse(!1)}else j=h(d,{range:g}),j.end&&i.call(d,j.end),i.call(d,j.start),f(j.start,j.end,function(a){if(a.nodeType==3&&a.data)b(d,a,{useTagName:e.useTagName.toUpperCase(),style:e.style,value:e.value});else if(a.nodeType==1&&(a.textContent||a.innerText)&&!SinaEditor.RANGE.SKIPTAGS[a.tagName.toUpperCase()]){var f={useTagName:e.useTagName.toUpperCase(),style:e.style,value:e.value};
console.log("\u662f\u4e00\u4e2aDOM\u8282\u70b9");console.log(a);if(!SinaEditor.RANGE.SKIPTAGS[a.tagName.toUpperCase()]){var g=d.entyDoc.createRange(),h=c.createDom(f.useTagName,{ownerDocument:d.entyDoc});if(f.style)h.style[f.style]=f.value;c.getChildren(a,{all:!0,onlyElement:!0});if(a.tagName.toUpperCase()===f.useTagName){console.log("\u662fspan");g=c.getChildren(a,{all:!0,onlyElement:!0});for(h=0;g[h];){if(g[h].tagName.toUpperCase()===f.useTagName&&!g[h].style.cssText){var i=d.entyDoc.createRange();
i.selectNode(g[h]);var j=d.entyDoc.createTextNode(i.extractContents().textContent);i.insertNode(j);i.detach()}h++}if(f.style)a.style[f.style]=f.value}else if(SinaEditor.RANGE.BLOCKTAGS[a.tagName.toUpperCase()])if(console.log("\u662f\u5757\u72b6\u6807\u7b7e"),i=a.childNodes,i.length===SinaEditor.NODETYPE.ELEMENT&&i[0].nodeType==SinaEditor.NODETYPE.ELEMENT&&i[0].tagName.toUpperCase()==f.useTagName){if(console.log("\u53ea\u6709\u4e00\u4e2a\u5b50\u8282\u70b9,\u4e14\u4e3aspan"),f.style)i[0].style[f.style]=
f.value}else console.log("\u65e0\u5b50\u8282\u70b9\u6216\u5b50\u8282\u70b9\u4e0d\u662fspan\u6807\u7b7e"),g.selectNodeContents(a),g.surroundContents(h);else if(console.log("\u975e\u5757\u72b6\u6807\u7b7e"),(i=a.parentNode)&&i.tagName.toUpperCase()==f.useTagName){if(console.log("\u6709\u7236\u8282\u70b9\u4e14\u662fspan"),f.style)i.style[f.style]=f.value}else console.log("\u65e0\u7236\u8282\u70b9\u6216\u4e0d\u662fspan\u6807\u7b7e"),g.selectNode(a),g.surroundContents(h)}}}),j.end&&(g.setEndBefore(j.end),
j.end.parentNode.removeChild(j.end)),g.setStartAfter(j.start),j.start.parentNode.removeChild(j.start);a.applyRanges(d.entyWin,g);d.focus()};a.queryCommandState=function(b,c){if(!c)return!1;c=c.toLowerCase();if(d[c])return d[c](a.getReferNode(b.defaultView||b.parentWindow));return b.queryCommandState(c)};a.regQueryCommandState=function(a,b){a=a.toLowerCase();d[a]||(d[a]=b)};a.removeStyle=function(b,d,e){d.useTagName=d.useTagName||"span";var g={};if(typeof d.useTagName==="string")g[d.useTagName.toUpperCase()]=
"1";else{var m;for(m=0;d.useTagName[m];m++)g[d.useTagName[m].toUpperCase()]="1"}m=a.getCurrentRanges(b.entyWin)[0];if(!m.collapsed){var n=h(b,{range:m});b.entyDoc.normalize();e||(i.call(b,n.end),i.call(b,n.start));f(n.start,n.end,function(a){a.nodeType===SinaEditor.NODETYPE.ELEMENT&&g[a.tagName.toUpperCase()]&&(d.style?SinaEditor.util.dom.removeStyle(a,d.style)===0&&c.removeTag(a):c.removeTag(a))});n.end&&(m.setEndBefore(n.end),n.end.parentNode.removeChild(n.end));m.setStartAfter(n.start);n.start.parentNode.removeChild(n.start);
a.applyRanges(b.entyWin,m)}b.focus()};var f=function(a,b,c){for(a=g(a,!0);a&&a!=b;){var d=a,a=g(a);(d.nodeType===SinaEditor.NODETYPE.TEXT||d.nodeType===SinaEditor.NODETYPE.ELEMENT&&!SinaEditor.util.dom.containsNode(d,b))&&c(d)}},g=function(a,b){if(a.hasChildNodes()&&!b){var c=a.firstChild;if(c)return c}for(c=a.nextSibling;!c;){c=a.parentNode;if(c.tagName.toUpperCase()=="HTML")throw"\u786e\u5b9a\u5728\u904d\u5386\u8282\u70b9\u65f6\u6709\u7ed3\u675f\u6807\u8bb0\u7684\u8282\u70b9?";a=c;c=a.nextSibling}return c},
h=function(b,d){var d=d||{},e,f;e=c.createDom("span",{ownerDocument:b.entyDoc,properties:{innerHTML:"&nbsp;"},attributies:{_se_mark:1}});e.style.color="#FF0000";d.range=d.range||b.entyDoc.createRange();if(!d.range.collapsed){f=c.createDom("span",{ownerDocument:b.entyDoc,properties:{innerHTML:"&nbsp;"},attributies:{_se_mark:2}});f.style.color="#FF0000";var g=d.range.cloneRange();g.collapse(!1);g.insertNode(f)}g=d.range.cloneRange();g.collapse(!0);g.insertNode(e);f?(d.range.setStartAfter(e),d.range.setEndBefore(f)):
(d.range.setStartAfter(e),d.range.collapse(!0));a.applyRanges(b.entyWin,d.range);return{start:e,end:f}},i=function(a){var b=c.getBlockParent(a);if(!b)return!1;var d=this.entyDoc.createRange();d.setStartAfter(a);d.setEndAfter(b);b=d.extractContents();d.insertNode(c.delElement(a));c.insertAfter(b,a);return!0}});SinaEditor.ev.customEvent.ctrlb=function(a){return[{enty:a.entyDoc,events:{keydown:function(b){b.ctrlKey&&b.keyCode==66&&(SinaEditor.ev.stopEvent(b),SinaEditor.ev.fire(a,"ctrlb"))}}}]};
SinaEditor.ev.customEvent.ctrli=function(a){return[{enty:a.entyDoc,events:{keydown:function(b){b.ctrlKey&&b.keyCode==73&&(SinaEditor.ev.stopEvent(b),SinaEditor.ev.fire(a,"ctrli"))}}}]};SinaEditor.ev.customEvent.ctrls=function(a){return[{enty:a.entyDoc,events:{keydown:function(b){b.ctrlKey&&b.keyCode==83&&(SinaEditor.ev.stopEvent(b),SinaEditor.ev.fire(a,"ctrls"))}}}]};
SinaEditor.ev.customEvent.ctrly=function(a){return[{enty:a.entyDoc,events:{keydown:function(b){b.ctrlKey&&b.keyCode==89&&(SinaEditor.ev.stopEvent(b),SinaEditor.ev.fire(a,"ctrly"))}}}]};SinaEditor.ev.customEvent.ctrlz=function(a){return[{enty:a.entyDoc,events:{keydown:function(b){b.ctrlKey&&b.keyCode==90&&(SinaEditor.ev.stopEvent(b),SinaEditor.ev.fire(a,"ctrlz"))}}}]};SinaEditor.ev.customEvent.editorHasSelection=function(){};SinaEditor.ev.customEvent.editorOnladed=function(){};
SinaEditor.ev.customEvent.editorSelectionChange=function(a){var b=function(b){a.entyWin.clearTimeout(a._.editorHasSelectionBufferTimmer);a._.editorHasSelectionBufferTimmer=a.entyWin.setTimeout(function(){var e=SinaEditor.range.getCurrentRanges(a.entyWin),f=e[0],g;a._.oldRange?(g=a._.oldRange[0],(f||g)&&SinaEditor.range.compareBoundaryPoints(f,g)!==0&&c.call(a,b,f)):c.call(a,b,f);a._.oldRange=e},400)},c=function(b,c){SinaEditor.ev.fixEvent(b);SinaEditor.ev.fire(a,"editorSelectionChange",{args:[c,SinaEditor.range.getReferNode(this.entyWin,
c)]})};return[{enty:a.entyDoc,events:{mouseup:b,keyup:b}}]};SinaEditor.ev.customEvent.editorStateChange=function(){};SinaEditor.ev.customEvent.redoAndUndoChanged=function(){};if(!SinaEditor.$abstract)SinaEditor.$abstract={};
SinaEditor.$abstract.$BaseBubble=function(){this.enbad=SinaEditor.util.dom.createDom("div");this.enbad.style.display="none";var a=this;document.body?document.body.appendChild(a.enbad):SinaEditor.ev.add(window,"load",function(){document.body.appendChild(a.enbad)})}.$define({showBubble:function(a,b){typeof a=="string"?this.enbad.innerHTML=a:this.enbad.appendChild(a);this.enbad.style.left=b.x+"px";var c=SinaEditor.util.dom.styleInteger(this.enbad,"paddingTop")+SinaEditor.util.dom.styleInteger(this.enbad,
"paddingBottom")+SinaEditor.util.dom.styleInteger(this.enbad,"marginTop")+SinaEditor.util.dom.styleInteger(this.enbad,"marginBottom")+SinaEditor.util.dom.styleInteger(this.enbad,"borderTopWidth")+SinaEditor.util.dom.styleInteger(this.enbad,"borderBottomWidth");this.enbad.style.top=b.y-c+"px";return this},hiddenBubble:function(){this.enbad.style.display="none";this.enbad.innerHTML="";return this},id:function(a){return this.enbad.ownerDocument.getElementById(a)}});
if(!SinaEditor.$abstract)SinaEditor.$abstract={};
SinaEditor.$abstract.$BaseButton=function(a){this.option=a;this._customSetStatus=a.setState}.$define({eventInit:function(a,b){var c=this,d=a.editorChangeType||"default",e=0;a.init&&a.init.call(this);if(a.events)for(e=0;a.events[e];e++)SinaEditor.ev.add(this.$,a.events[e].name,a.events[e].callback);if(a.mouseoverClass){var f=this;SinaEditor.ev.add(this.$,"mouseover",function(){if(f._state!=SinaEditor.BUTTONSTATE.CLICKED&&f._state!=SinaEditor.BUTTONSTATE.DISABLED)f.$.className=f.option.mouseoverClass,
f.option.mouseover&&f.option.mouseover(f.$)});SinaEditor.ev.add(this.$,"mouseout",function(){f.setState(f._state)})}if(!a.unselected)SinaEditor.env.$GENKO?this.$.style.MozUserSelect="none":SinaEditor.env.$WEBKIT?this.$.style.WebkitUserSelect="none":this.$.setAttribute("unselectable","on");this.setState(a.state||SinaEditor.BUTTONSTATE.NORMAL);SinaEditor.ev.add(b,"editorStateChange",function(){SinaEditor.BUTTON[d].call(this,c)})},setState:function(a){this._state=a;this._customSetStatus&&this._customSetStatus.apply(this,
arguments);var b=this.option;if(!b.noEvent)for(var c in SinaEditor.BUTTONSTATE)if(SinaEditor.BUTTONSTATE[c]==a){c=c.toLowerCase();this.$.className=b[c+"Class"];if(b[c])b[c](this.$);break}},getState:function(){return this._state}});if(!SinaEditor.$abstract)SinaEditor.$abstract={};
SinaEditor.$abstract.Storage=function(){var a={},b=window.localStorage||window.globalStorage&&globalStorage[location.host];b?(a.setItem=function(a,d){try{return b.setItem(a,SinaEditor.util.o2s(d)),!0}catch(e){return!1}},a.length=function(){return b.length},a.key=function(a){return(a=b.key(a))?SinaEditor.util.s2o(a):a},a.getItem=function(a){return(a=b.getItem(a))?SinaEditor.util.s2o(a):a},a.removeItem=function(a){b.removeItem(a)},a.clear=function(){if(b.clear)b.clear();else for(;b.length;)a.removeItem(a.key(0))}):
(b=document.createElement("div"),b.addBehavior("#default#userData"),document.body.appendChild(b),b.load("SinaEditor"),a.setItem=function(a,d){try{var e=!1,f=SinaEditor.util.s2o(b.getAttribute("saveObj"))||[],g;for(g=0;f[g];g++)f[g][a]&&(f[g][a]=d,e=!0);e||(e={},e[a]=d,f.push(e));b.setAttribute("saveObj",SinaEditor.util.o2s(f));b.save("SinaEditor");return!0}catch(h){return!1}},a.length=function(){return(SinaEditor.util.s2o(b.getAttribute("saveObj"))||[]).length},a.key=function(a){var d=SinaEditor.util.s2o(b.getAttribute("saveObj"))||
[];if(d[a])for(var e in d[a])return e;return null},a.getItem=function(a){var d=SinaEditor.util.s2o(b.getAttribute("saveObj"))||[],e;for(e=0;d[e];e++)if(d[e][a])return d[e][a];return null},a.removeItem=function(a){var d=SinaEditor.util.s2o(b.getAttribute("saveObj"))||[],e;for(e=0;d[e];e++)if(d[e][a]){d.splice(e,1);b.setAttribute("saveObj",SinaEditor.util.o2s(d));b.save("SinaEditor");break}},a.clear=function(){b.setAttribute("saveObj",SinaEditor.util.o2s([]));b.save("SinaEditor")});return a}();
if(!SinaEditor.$abstract)SinaEditor.$abstract={};SinaEditor.$abstract.Template=function(a){this.tmpl=a;this.pattern=/(#\{([^\}]+)(?=\})})/g};
SinaEditor.$abstract.Template.prototype={evaluate:function(a){return this.tmpl.replace(this.pattern,function(b,c,d){return a[d]||""})},evaluateMulti:function(a,b){var c=[],d=this;this.__foreach(a,function(e,f){f=b?a.length-f:f;c[f]=d.evaluate(e)});return c.join("")},__foreach:function(a,b){if(a===null&&a.constructor!==Array)return[];for(var c=0,d=a.length,e=[];c<d;){var f=b(a[c],c);f!==null&&(e[e.length]=f);c++}return e}};if(!SinaEditor.$abstract)SinaEditor.$abstract={};
SinaEditor.$abstract.BaseBubbleImpl=function(a){a&&SinaEditor.util.dom.addStyles(a);this.enbad.className=SinaEditor.CONF.bubbleClassName}.$extends(SinaEditor.$abstract.$BaseBubble).$define({showBubble:function(a,b){this.enbad.style.display="none";this.constructor.$super.showBubble.call(this,a,b);this.enbad.style.display="";return this},hiddenBubble:function(){this.constructor.$super.hiddenBubble.call(this);return this},id:function(a){return this.constructor.$super.id.call(this,a)}});
SinaEditor.baseBubble=new SinaEditor.$abstract.BaseBubbleImpl(SinaEditor.CONF.bubbleStyles);
(function(){var a={},b={};SinaEditor.$abstract.BaseBubblePlugin=function(c){a[c.tagName.toUpperCase()]=c.showBubble;return function(){var d=this;return b[d.option.id]?{initialize:function(){},events:[]}:(b[d.option.id]=1,{initialize:function(){c.applyStyles&&SinaEditor.util.dom.addStyles(c.applyStyles)},events:[{element:d.entyDoc,events:{mouseup:function(b){b=SinaEditor.ev.fixEvent(b);b=b.target;if(b.nodeType==3)b=b.parentNode;for(;b&&b.tagName;){if(a[b.tagName.toUpperCase()]){if(b.getAttribute("_se_flash"))a.FLASH(b,
d);else a[b.tagName.toUpperCase()](b,d);return}b=b.parentNode}SinaEditor.baseBubble.hiddenBubble()},keydown:function(){SinaEditor.baseBubble.hiddenBubble()}}},{element:d.entyWin,events:{scroll:function(){SinaEditor.baseBubble.hiddenBubble()}}},{element:d,events:{editorStateChange:function(){this.getState()!=SinaEditor.STATE.EDITING&&SinaEditor.baseBubble.hiddenBubble()}}}]})}}})();if(!SinaEditor.$abstract)SinaEditor.$abstract={};
SinaEditor.$abstract.baseEditor=function(a){this._state=SinaEditor.STATE.CREATING;this.option=a||{};this.option.eventBlackList=this.option.eventBlackList||"";this._jobTable=[];this._jobTableIndex={};this.entyArea=this.entyBody=this.entyDoc=this.entyWin=this.enty=null;this.hasAddEvent=!1;this.btns={};this.panels={};this._={};this.errorMsg=[];this.operation={};this.operateState={}}.$define({error:function(a){console.error(a);this.errorMsg.push(a)},add:function(a){this._jobTable.push(a)},start:function(){if(this.option.onStart)this.option.onStart();
this.queue(this._jobTable)},queue:function(a){var b=this,c=a.length,d=0;b.callPlugin(a[d]);var e=window.setInterval(function(){d++;if(d>=c)clearInterval(e),e=null,SinaEditor.ev.fire(b,"editorOnladed");else if(b.entyWin){if(!b.hasAddEvent){b.hasAddEvent=!0;var f=null;for(f in SinaEditor.ev.customEvent)b.option.eventBlackList.indexOf(f)<0?SinaEditor.ev.$regEvent(f,b):console.log(b.option.id+"\u5728\u9ed1\u540d\u5355\u4e2d\uff1a"+f)}b.callPlugin(a[d]);b.setState(SinaEditor.STATE.CREATED);b.setState(SinaEditor.STATE.EDITING)}else console.log("\u7b49\u4e00\u4e0b"),
d--},10)},callPlugin:function(a){var b=SinaEditor.plugins.get(a.name);if(b){var c=b.call(this,a.args||{})||{};console.log(this.option.id+"\u6dfb\u52a0job:"+a.name);var b=c.initialize,d=c.events;if(typeof c=="undefined")this.error("<b>Job["+a.name+"] is undefiend!!!</b>");else try{if(d)for(c=c=0;d[c];c++){var e=d[c],f=e.element,g=e.events,h=null;f||console.error("!!!!!+"+h+"+\u7ed1\u5b9a\u5931\u8d25...");for(h in g)console.log(f+"\u7ed1\u5b9a"+h),SinaEditor.ev.add(f,h,g[h],{srcEditor:this})}b&&b.call(this)}catch(i){throw this.error("<b>Job["+
a.name+"] failed!!!</b>"+i.message+""),i;}finally{}}else console.log(a),console.log("---------------------------plugin not found:")},focus:function(){this.entyWin.focus()},setState:function(a){this._state=a;SinaEditor.ev.fire(this,"editorStateChange")},getState:function(){return this._state}});SinaEditor.createEditor=function(a){var b=new (eval("("+a.editorName+")"))(a),c=a.plugns;b.add(a.initType);a.filter&&b.add(a.filter);for(a=0;c[a];a++)b.add(c[a]);b.start();return b};
if(!SinaEditor.plugins)SinaEditor.plugins={},SinaEditor.plugins.add=function(a,b){if(!this._pluginObj)this._pluginObj={};this._pluginObj[a]=b},SinaEditor.plugins.get=function(a){return this._pluginObj[a]};if(!SinaEditor.$abstract)SinaEditor.$abstract={};
SinaEditor.$abstract.BtnBubble=function(){this.isHidden=!0}.$extends(SinaEditor.$abstract.$BaseBubble).$define({showBubble:function(a,b){if(b.className)this.enbad.className=b.className;this.enbad.style.display="none";this.constructor.$super.showBubble.call(this,a,b);this.enbad.style.display="";SinaEditor.ev.add(document,"mouseup",this._handleClick);this.isHidden=!1;return this},hiddenBubble:function(){this.constructor.$super.hiddenBubble.call(this);SinaEditor.ev.remove(document,"mouseup",this._handleClick);
this.isHidden=!0;return this},_handleClick:function(a){a=SinaEditor.ev.fixEvent(a);SinaEditor.util.dom.containsNode(SinaEditor.btnBubble.enbad,a.target)||SinaEditor.btnBubble.isHidden||SinaEditor.btnBubble.hiddenBubble()},id:function(a){return this.enbad.ownerDocument.getElementById(a)}});SinaEditor.btnBubble=new SinaEditor.$abstract.BtnBubble;if(!SinaEditor.$abstract)SinaEditor.$abstract={};
SinaEditor.$abstract.ButtonFactory=function(){this.buttonObjs={}}.$define({createButton:function(a,b){this.buttonObjs[b.option.id]||(this.buttonObjs[b.option.id]=[]);var c=null;switch(a.btnType||"div"){case "div":c=new SinaEditor.$abstract.divButton(a,b);break;case "custom":c=new SinaEditor.$abstract.customButton(a,b)}c.noAppend||this._addBtn(c,a,b);return c},_addBtn:function(a,b,c){var d=c.option.id+"_"+(b.group||"g"+(new Date).getTime()),b=!1,e=this.buttonObjs[c.option.id],f;for(f=0;e[f];f++)e[f][d]&&
(b=!0,e[f][d].push(a));b||(b={},b[d]=[a],this.buttonObjs[c.option.id].push(b));var g=this;c.getState()<=SinaEditor.STATE.CREATED?SinaEditor.ev.add(c,"editorOnladed",function(){var a=g.buttonObjs[this.option.id],b,c,e;for(c=0;a[c];c++){b=a[c];var f=SinaEditor.util.dom.createDom("div",{properties:{className:"se_ico_group",id:d}});for(id in b)for(e=0;b[id][e];e++)f.appendChild(b[id][e].$);document.getElementById(this.option.toolBase).appendChild(f)}},{once:!0}):(b=document.getElementById(d)||SinaEditor.util.dom.createDom("div",
{properties:{className:"se_ico_group",id:d}}),b.appendChild(a.$),document.getElementById(c.option.toolBase).appendChild(b))}});SinaEditor.ButtonFactory=new SinaEditor.$abstract.ButtonFactory;if(!SinaEditor.$abstract)SinaEditor.$abstract={};SinaEditor.$abstract.customButton=function(a,b){this.$=this.option.entyBtn;this.noAppend=!0;a.noEvent||this.eventInit(a,b)}.$extends(SinaEditor.$abstract.$BaseButton).$define({});if(!SinaEditor.$abstract)SinaEditor.$abstract={};
SinaEditor.$abstract.divButton=function(a,b){a.attributes=a.attributes||{};a.properties=a.properties||{};if(!a.attributes.id)a.attributes.id="b_"+(new Date).getTime();if(!a.properties.innerHTML)a.properties.innerHTML="&nbsp;";this.$=SinaEditor.util.dom.createDom("div",{attributes:a.attributes,properties:a.properties});if(a.title)this.$.title=a.title;a.noEvent||this.eventInit(a,b);this.noAppend=!1}.$extends(SinaEditor.$abstract.$BaseButton).$define({});
if(!SinaEditor.$abstract)SinaEditor.$abstract={};
SinaEditor.$abstract.redoManager=function(){this.maxLan=SinaEditor.CONF.redoConf||100;this.points={};this.cache={}}.$define({addEditor:function(a){SinaEditor.ev.remove(a,"redoAndUndoChanged");SinaEditor.ev.$regEvent("redoAndUndoChanged",a);this.points[a.option.id]=0;this.cache[a.option.id]=[{html:a.entyBody.innerHTML}];this.save(a)},save:function(a){console.log("\u4fdd\u5b58:"+a.option.id);var b=this.cache[a.option.id].length,c=this.points[a.option.id],d=this.cache[a.option.id][c].html,e=a.entyBody.innerHTML,
f=this._converToBookMark(SinaEditor.range.getCurrentRanges(a.entyWin));if(d!==e){console.log("\u6570\u636e\u4e0d\u4e00\u6837\uff0c\u4fdd\u5b58");if(c+1!=b)console.log("\u6e05\u9664\u5386\u53f2\u5206\u652f"),this.cache[a.option.id].splice(c+1,b),b=this.cache[a.option.id].length;b==this.maxLan&&(console.log("\u5230\u8fbe\u6700\u540e\u8bb0\u5f55\u70b9"),this.cache[a.option.id].shift(),b--);this.cache[a.option.id].push({html:e,ranges:f});this.points[a.option.id]=b}else console.log("\u66f4\u65b0\u5f53\u524drange"),
this.cache[a.option.id][c].ranges=f;this._fireEvent(a)},redo:function(a){console.log("\u91cd\u505a:"+a.option.id);var b=this.points[a.option.id];if(b+1==this.cache[a.option.id].length)console.log("\u5df2\u7ecf\u91cd\u505a\u5230\u5c3d\u5934");else{this.points[a.option.id]=++b;var c=this.cache[a.option.id][b],d=this;setTimeout(function(){a.entyBody.innerHTML=c.html;SinaEditor.range.applyRanges(a.entyWin,d._converToRange(a.entyDoc,c.ranges));a.focus();d._fireEvent(a)},0)}},undo:function(a){console.log("\u56de\u9000:"+
a.option.id);var b=this.points[a.option.id];if(b<=0)console.log("\u5df2\u7ecf\u56de\u9000\u5230\u5c3d\u5934");else{this.points[a.option.id]=--b;var c=this.cache[a.option.id][b],d=this;setTimeout(function(){a.entyBody.innerHTML=c.html;SinaEditor.range.applyRanges(a.entyWin,d._converToRange(a.entyDoc,c.ranges));a.focus();d._fireEvent(a)},0)}},_converToBookMark:function(a){var b=[],c;for(c=0;a[c];c++){var d={};d.startOffset=a[c].startOffset;d.endOffset=a[c].endOffset;d.start=this._setPath(a[c].startContainer);
d.end=this._setPath(a[c].endContainer);b.push(d)}return b},_converToRange:function(a,b){for(var c=0,d=[];b[c];){var e=b[c],f=a.createRange();console.log(this._getPath(a.body,e.start));console.log(e.startOffset);f.setStart(this._getPath(a.body,e.start),e.startOffset);f.setEnd(this._getPath(a.body,e.end),e.endOffset);d.push(f);c++}return d},_setPath:function(a){for(var b=[],c=a,a=a.parentNode;a&&a.nodeType!==SinaEditor.NODETYPE.HTMLELEMENT;){var d=a.childNodes,e;for(e=0;d[e];e++)if(d[e]==c){b.push(e);
break}c=a;a=a.parentNode}return b},_getPath:function(a,b){for(var c=a,d=b.length-1;d>=0;)c=c.childNodes[b[d]],d--;return c},_fireEvent:function(a){var b=this.points[a.option.id];a._.hasRedo=b==this.cache[a.option.id].length-1?!1:!0;a._.hasUndo=b===0?!1:!0;SinaEditor.ev.fire(a,"redoAndUndoChanged")}});SinaEditor.redoManager=new SinaEditor.$abstract.redoManager;
SinaEditor.plugins.add("addContent",function(){var a=this;a.operation.addNode=function(c,d){a.operation.save(a);var e=SinaEditor.range.getCurrentRanges(a.entyWin)[0];e.collapsed||e.deleteContents();e.insertNode(c);d||b(c,e);a.operation.save(a)};a.operation.addContent=function(c,d){a.operation.save(a);var e=SinaEditor.range.getCurrentRanges(a.entyWin)[0];e.collapsed||e.deleteContents();var f=a.entyDoc.createTextNode(c);e.insertNode(f);d||b(f,e);a.operation.save(a)};var b=function(b,d){d.selectNode(b);
d.collapse(!1);SinaEditor.range.applyRanges(a.entyWin,d);a.focus()}});
SinaEditor.plugins.add("backcolor",function(a){var b=this;b.btns.backcolor=null;b.panels.backcolor=null;a.customerPanel||b.callPlugin({name:"backcolorPanel",args:a});a.customerBtn||b.callPlugin({name:"backcolorBtn",args:a});SinaEditor.range.regQueryCommandState("backcolor",function(a){return SinaEditor.util.dom.getStyle(a,"backgroundColor")});b.operation.backcolor=function(a){b.operation.save(b);console.log("\u80cc\u666f\u989c\u8272\u4fee\u6539");SinaEditor.range.applyStyle(b,{useTagName:"span",style:"backgroundColor",
value:a});b.btns.backcolor.setState(SinaEditor.BUTTONSTATE.NORMAL,a);b.operation.save(b)}});
SinaEditor.plugins.add("backcolorBtn",function(a){var b=this,c={title:"\u80cc\u666f\u989c\u8272",normalClass:"ico_hilitecolor_1",disabledClass:"ico_hilitecolor_4",clickedClass:"ico_hilitecolor_3",mouseoverClass:"ico_hilitecolor_2",state:SinaEditor.BUTTONSTATE.DISABLED,group:"common",setState:function(a,b){switch(a){case SinaEditor.BUTTONSTATE.DISABLED:this.$.style.backgroundColor="#FFFFFF";break;default:this.$.style.backgroundColor=b}}},c=SinaEditor.util.mix(c,a.btnConf),a=SinaEditor.ButtonFactory.createButton(c,
b);b.btns.backcolor=a;return{events:[{element:a.$,events:{click:function(){if(b.btns.backcolor.getState()===SinaEditor.BUTTONSTATE.DISABLED)return!1;b.panels.backcolor.show(this);return!1}}},{element:b,events:{editorSelectionChange:function(){var a=SinaEditor.range.queryCommandState(this.entyDoc,"backColor");a==="transparent"&&(a="#FFFFFF");b.btns.backcolor.setState(SinaEditor.BUTTONSTATE.NORMAL,a)}}}]}});
SinaEditor.plugins.add("backcolorPanel",function(a){var b=this,c=SinaEditor.util.dom.createDom("div",{properties:{className:"se_forecolor_bubble"}});b.panels.backcolor=function(){var d=a.colors||SinaEditor.TOOLCONF.COLOR;c.style.display="none";document.body.appendChild(c);var e=[],f;for(f in d)e.push('<span onmouseover="this.className=\'color_focus\'" onmouseout="this.className=\'\'"><span class="j_single_color" title="'),e.push(d[f]),e.push('" style="background-color:#'),e.push(f),e.push(';"></span></span>');
c.innerHTML=e.join("");return{show:function(a){a=SinaEditor.util.dom.getXY(a);c.style.display="";c.style.top=a[1]+b.btns.backcolor.$.offsetHeight+"px";c.style.left=a[0]+"px"},hidden:function(){c.style.display="none"}}}();return{events:[{element:b,events:{editorSelectionChange:function(){b.panels.backcolor.hidden()}}},{element:c,events:{click:function(a){a=a.target;a.className==="j_single_color"&&(b.operation.backcolor(SinaEditor.util.dom.getStyle(a,"backgroundColor")),b.panels.backcolor.hidden())}}},
{element:document,events:{click:function(a){a=a.target;SinaEditor.util.dom.containsNode(b.btns.backcolor.$,a)||SinaEditor.util.dom.containsNode(c,a)||b.panels.backcolor.hidden()}}}]}});
SinaEditor.plugins.add("bold",function(a){var b=this;a.customerBtn||b.callPlugin({name:"boldBtn",args:a});var c=b.btns.bold;b.operation.bold=function(){var a=SinaEditor.range.getCurrentRanges(b.entyWin);if(a=a[0])b.operation.save(b),(a=b.operateState.bold)?(console.log("\u6267\u884c\u53bb\u52a0\u7c97\u64cd\u4f5c"),SinaEditor.range.removeStyle(b,{useTagName:["strong","b"]}),c.setState(SinaEditor.BUTTONSTATE.NORMAL)):(console.log("\u6267\u884c\u52a0\u7c97\u64cd\u4f5c"),SinaEditor.range.applyStyle(b,
{useTagName:"strong"}),c.setState(SinaEditor.BUTTONSTATE.CLICKED)),b.operateState.bold=!a,b.operation.save(b)};return{events:[{element:b,events:{editorSelectionChange:function(){var a=SinaEditor.range.queryCommandState(this.entyDoc,"bold");a?c.setState(SinaEditor.BUTTONSTATE.CLICKED):c.setState(SinaEditor.BUTTONSTATE.NORMAL);this.operateState.bold=a},ctrlb:function(){b.operation.bold(this)}}}]}});
SinaEditor.plugins.add("boldBtn",function(a){var b=this,c={title:"\u52a0\u7c97",normalClass:"ico_bold_1",disabledClass:"ico_bold_4",clickedClass:"ico_bold_3",mouseoverClass:"ico_bold_2",state:SinaEditor.BUTTONSTATE.DISABLED,group:"common"},c=SinaEditor.util.mix(c,a.btnConf),a=SinaEditor.ButtonFactory.createButton(c,b);b.btns.bold=a;return{events:[{element:a.$,events:{click:function(){b.operation.bold(b)}}}]}});
SinaEditor.plugins.add("faceUI",function(a){var b=this;a.customerBtn||b.callPlugin({name:"faceUIBtn",args:a});a.customerPanel||b.callPlugin({name:"faceUIPanel",args:a});b.operation.addFace=function(a){a&&(b.operation.save(b),a=SinaEditor.util.dom.createDom("img",{ownerDocument:b.entyDoc,attributes:{_se_type:"face"},properties:{src:a}}),b.operation.addNode(a),b.operation.save(b))}});
SinaEditor.plugins.add("faceUIBtn",function(a){var b=this,c={title:"\u8868\u60c5",normalClass:"ico_face_1",disabledClass:"ico_face_4",clickedClass:"ico_face_3",mouseoverClass:"ico_face_2",state:SinaEditor.BUTTONSTATE.NORMAL,group:"richdata"},c=SinaEditor.util.mix(c,a.btnConf),d=SinaEditor.ButtonFactory.createButton(c,b);b.btns.faceUI=d;return{events:[{element:d.$,events:{click:function(){var a=b.panels.faceUI;if(d.getState()===SinaEditor.BUTTONSTATE.DISABLED)return!1;var c=SinaEditor.util.dom.getXY(d.$);
a.setPosition({x:c[0],y:c[1]+d.$.offsetHeight});a.show()}}}]}});
SinaEditor.plugins.add("faceUIPanel",function(a){var b=this,c=new SinaEditor._.Panel;c.setTemplate(SinaEditor.TOOLCONF.faceTemplate);var d=c.nodes.panel,a=a.faceSrc||SinaEditor.TOOLCONF.faceSrc,e=[],f,g;for(f=0;a[f];f++){e.push("<img ");for(g in a[f])e.push(g),e.push('="'),e.push(a[f][g]),e.push('"');e.push('" onmouseout="this.className=\'\'" onmouseover="this.className=\'face_focus\'" ');e.push("/>")}d.innerHTML=e.join("");b.panels.faceUI=c;return{events:[{element:b,events:{editorSelectionChange:function(){c.hidden()}}},
{element:d,events:{click:function(a){a=a.target;a.tagName.toUpperCase()=="IMG"&&(b.operation.addFace(a.src),c.hidden())}}},{element:document,events:{click:function(a){a=a.target;SinaEditor.util.dom.containsNode(b.btns.faceUI.$,a)||SinaEditor.util.dom.containsNode(d,a)||c.hidden()}}}]}});
SinaEditor.plugins.add("flashBubble",function(){return SinaEditor.$abstract.BaseBubblePlugin({tagName:"FLASH",applyStyles:SinaEditor.CONF.aBubbleStyles,showBubble:function(a,b){var c=(new Date).getTime(),d,e="f_se_b_"+c,f="f_d_b_"+c,g="f_s_b_"+c,h="f_c_b_"+c;d={seeid:e,deleteid:f,showflash:g,closeid:h};var c=new SinaEditor.$abstract.Template(SinaEditor.CONF.flashBubbleTemplete),i=SinaEditor.util.dom.getXY(a,!0),p=SinaEditor.util.dom.getXY(b.enty);p[1]>i[1]&&(i[1]=p[1]);var k=SinaEditor.baseBubble.showBubble(c.evaluate(d),
{x:i[0],y:i[1]});k.id(e).onclick=function(){var b=k.id(g);k.id(e).style.display="none";b.innerHTML=decodeURIComponent(a.getAttribute("_se_flash"));if(SinaEditor.env.$CHROME){var c=b.getElementsByTagName("embed")[0];c.setAttribute("wmode","transparent");b.innerHTML=SinaEditor.util.dom.outerHTML(c)}b.style.display=""};k.id(h).onclick=function(){SinaEditor.baseBubble.hiddenBubble();b.focus()};k.id(f).onclick=function(){b.operation.save(b);SinaEditor.range.setStartBefore(b.entyWin,a);a.parentNode.removeChild(a);
SinaEditor.baseBubble.hiddenBubble();b.focus();b.operation.save(b)}}})}());
SinaEditor.plugins.add("flashUI",function(a){var b=this;a.customerBtn||b.callPlugin({name:"flashUIBtn",args:a});a.customerPanel||b.callPlugin({name:"flashUIPanel",args:a});b.operation.insertFlash=function(a,d){typeof a==="string"&&(a=SinaEditor.util.dom.createDomFromHTML(a,b.entyDoc));var e=SinaEditor.util.dom.createDomFromHTML('<img src="'+SinaEditor.CONF.transparentIMG+'" _se_flash="'+encodeURIComponent(SinaEditor.util.dom.outerHTML(a))+'" width="'+(a.width||480)+'" height="'+(a.height||370)+'" style="background:url(\''+
SinaEditor.CONF.fakeFLASH+"') no-repeat scroll center center transparent;border:1px solid #A9A9A9;\" >",b.entyDoc);b.operation.addNode(e,d)}});
SinaEditor.plugins.add("flashUIBtn",function(a){var b=this,c={title:"\u63d2\u5165flash",normalClass:"ico_video_1",disabledClass:"ico_video_4",clickedClass:"ico_video_3",mouseoverClass:"ico_video_2",state:SinaEditor.BUTTONSTATE.DISABLED,group:"richdata"},c=SinaEditor.util.mix(c,a.btnConf),d=SinaEditor.ButtonFactory.createButton(c,b);b.btns.flashUI=d;return{events:[{element:d.$,events:{click:function(){if(d.getState()===SinaEditor.BUTTONSTATE.DISABLED)return!1;b.panels.flashUI.show();return!1}}}]}});
SinaEditor.plugins.add("flashUIPanel",function(){var a=this,b=SinaEditor.winDialog.create({title:"\u6dfb\u52a0flash",content:SinaEditor.TOOLCONF.flashTemplate,funcClose:function(){g()}}),c=b.nodes.flashSrc,d=b.nodes.ok,e=b.nodes.cancel,f=b.nodes.flashErrTip,g=function(){c.value="";f.style.display="none"};a.panels.flashUI=b;return{events:[{element:e,events:{click:function(){g();b.hidden()}}},{element:d,events:{click:function(){f.style.display="none";var d=SinaEditor.util.trim(c.value);d?(a.operation.insertFlash(d),
g(),b.hidden()):f.style.display=""}}}]}});SinaEditor.plugins.add("fontSize",function(a){var b=this;SinaEditor.range.regQueryCommandState("fontsize",function(a){return SinaEditor.util.dom.getStyle(a,"fontSize")});a.customerBtn||b.callPlugin({name:"fontSizeBtn",args:a});a.customerBtn||b.callPlugin({name:"fontSizePanel",args:a});b.operation.setFontSize=function(a){b.operation.save(b);SinaEditor.range.applyStyle(b,{useTagName:"span",style:"fontSize",value:a});b.operation.save(b)}});
SinaEditor.plugins.add("fontSizeBtn",function(a){var b={title:"\u6587\u5b57\u5927\u5c0f",normalClass:"ico_fontsize_1",properties:{innerHTML:"<span>"+SinaEditor.TOOLCONF.FONTSIZEDEF+"</span>"},disabledClass:"ico_fontsize_4",clickedClass:"ico_fontsize_3",mouseoverClass:"ico_fontsize_2",state:SinaEditor.BUTTONSTATE.NORMAL,group:"common"},b=SinaEditor.util.mix(b,a.btnConf);this.btns.fontSize=SinaEditor.ButtonFactory.createButton(b,this)});
SinaEditor.plugins.add("fontSizePanel",function(a){var b=this,c=b.btns.fontSize,d=a.conf||SinaEditor.TOOLCONF.FONTSIZECONF,e=function(a){var d,e;for(d=0;a[d];d++)if((e=a[d].className)&&e=="fontItem")a[d].onclick=function(a){var a=a||window.event,a=SinaEditor.ev.fixEvent(a).target,d=a.style.fontSize;c.$.innerHTML="<span>"+a.innerHTML+"</span>";b.operation.setFontSize(d);SinaEditor.btnBubble.hiddenBubble();return!1}};return{events:[{element:b,events:{editorSelectionChange:function(){SinaEditor.btnBubble.hiddenBubble()},
editorSelectionChange:function(){var a=SinaEditor.range.queryCommandState(this.entyDoc,"fontsize");console.log(a);var b="<span>"+SinaEditor.TOOLCONF.FONTSIZEDEF+"</span>",e,i;for(i=0;d[i];i++)if(e=d[i].style||d[i].html,a.indexOf(e)!=-1){b="<span>"+d[i].html+"</span>";break}c.$.innerHTML=b}}},{element:c.$,events:{click:function(){if(b.getState()==SinaEditor.STATE.EDITING){var a=SinaEditor.util.dom.getXY(c.$),g=SinaEditor.util.dom.createDom("div"),h;h=['<div class="fontItemTitle">\u5b57\u53f7</div>'];
var i,p,k;for(k=0;d[k];k++)i=d[k].html,p=d[k].style||i,h.push('<div class="fontItem" style="font-size:'),h.push(p),h.push('">'),h.push(i),h.push("</div>");h=h.join("");g.innerHTML=h;e(g.childNodes);SinaEditor.btnBubble.showBubble(g,{x:a[0],y:a[1]+c.$.offsetHeight+SinaEditor.util.dom.styleInteger(c.$,"paddingTop")+SinaEditor.util.dom.styleInteger(c.$,"marginTop"),className:"se_fontfamily_bubble"});return!1}}}}]}});
SinaEditor.plugins.add("fontFamily",function(a){var b=this;if(!SinaEditor._fontConf)SinaEditor._fontConf={};a.customerBtn||b.callPlugin({name:"fontFamilyBtn",args:a});a.customerPanel||b.callPlugin({name:"fontFamilyPanel",args:a});b.operation.setFontFamily=function(a){b.operation.save(b);SinaEditor.range.applyStyle(b,{useTagName:"span",style:"fontFamily",value:a});b.operation.save(b)}});
SinaEditor.plugins.add("fontFamilyBtn",function(a){var b=this,c=a.conf||SinaEditor.TOOLCONF.FONTFAMILYCONF,d={title:"\u5b57\u4f53",normalClass:"ico_family_1",properties:{innerHTML:"<span>"+SinaEditor.TOOLCONF.FONTFAMILYDEF+"</span>"},disabledClass:"ico_family_4",clickedClass:"ico_family_3",mouseoverClass:"ico_family_2",state:SinaEditor.BUTTONSTATE.NORMAL,group:"common"},d=SinaEditor.util.mix(d,a.btnConf),e=SinaEditor.ButtonFactory.createButton(d,b);b.btns.fontFamily=e;var f=function(a){var c;for(c=
0;a[c];c++){var d=a[c].className;if(d&&d=="fontItem")a[c].onclick=function(a){var a=a||window.event,a=SinaEditor.ev.fixEvent(a).target,c=a.style.fontFamily;e.$.innerHTML='<span style="font-family:'+c+'">'+a.innerHTML+"</span>";b.operation.setFontFamily(c);SinaEditor.btnBubble.hiddenBubble();return!1}}};return{events:[{element:e.$,events:{click:function(){if(b.getState()==SinaEditor.STATE.EDITING){var a=SinaEditor.util.dom.getXY(e.$),d=SinaEditor.util.dom.createDom("div"),i;i=['<div class="fontItemTitle">\u5b57\u4f53</div>'];
var p,k,o;for(o=0;c[o];o++)p=c[o].html,k=c[o].style||p,i.push('<div class="fontItem" style="font-family:'),i.push(k),i.push('">'),i.push(p),i.push("</div>");i=i.join("");d.innerHTML=i;f(d.childNodes);SinaEditor.btnBubble.showBubble(d,{x:a[0],y:a[1]+e.$.offsetHeight+SinaEditor.util.dom.styleInteger(e.$,"paddingTop")+SinaEditor.util.dom.styleInteger(e.$,"marginTop"),className:"se_fontfamily_bubble"});return!1}}}},{element:b,events:{editorSelectionChange:function(a,b,d){var a=SinaEditor.util.dom.getStyle(d,
"fontFamily"),b="<span>"+SinaEditor.TOOLCONF.FONTFAMILYDEF+"</span>",f;for(f=0;c[f];f++)if(d=c[f].style||c[f].html,a.indexOf(d)!=-1){b='<span style="font-family:'+d+'">'+c[f].html+"</span>";break}e.$.innerHTML=b}}}]}});SinaEditor.plugins.add("fontFamilyPanel",function(){return{events:[{element:this,events:{editorSelectionChange:function(){SinaEditor.btnBubble.hiddenBubble()}}}]}});
SinaEditor.plugins.add("forecolor",function(a){var b=this;a.customerPanel||b.callPlugin({name:"forecolorPanel",args:a});a.customerBtn||b.callPlugin({name:"forecolorBtn",args:a});var c=b.btns.forecolor;SinaEditor.range.regQueryCommandState("forecolor",function(a){console.log(SinaEditor.util.dom.getStyle(a,"color")||"#CCC");return SinaEditor.util.dom.getStyle(a,"color")});b.operation.forecolor=function(a){b.operation.save(b);console.log("\u6587\u5b57\u989c\u8272\u4fee\u6539");SinaEditor.range.applyStyle(b,
{useTagName:"span",style:"color",value:a});c.setState(SinaEditor.BUTTONSTATE.NORMAL,a);b.operation.save(b)}});
SinaEditor.plugins.add("forecolorBtn",function(a){var b=this,c={title:"\u6587\u5b57\u989c\u8272",normalClass:"ico_forecolor_1",disabledClass:"ico_forecolor_4",clickedClass:"ico_forecolor_3",mouseoverClass:"ico_forecolor_2",state:SinaEditor.BUTTONSTATE.DISABLED,group:"common",setState:function(a,b){switch(a){case SinaEditor.BUTTONSTATE.DISABLED:this.$.style.backgroundColor="#000000";break;default:this.$.style.backgroundColor=b}}},c=SinaEditor.util.mix(c,a.btnConf),d=SinaEditor.ButtonFactory.createButton(c,
b);b.btns.forecolor=d;return{events:[{element:b,events:{editorSelectionChange:function(){var a=SinaEditor.range.queryCommandState(this.entyDoc,"forecolor");a||(a="#000000");d.setState(SinaEditor.BUTTONSTATE.NORMAL,a)}}},{element:d.$,events:{click:function(){if(b.btns.backcolor.getState()===SinaEditor.BUTTONSTATE.DISABLED)return!1;b.panels.forecolor.show(this);return!1}}}]}});
SinaEditor.plugins.add("forecolorPanel",function(a){var b=this,c=SinaEditor.util.dom.createDom("div",{properties:{className:"se_forecolor_bubble"}}),d=function(){var d=a.colors||SinaEditor.TOOLCONF.COLOR;c.style.display="none";document.body.appendChild(c);var f=[],g;for(g in d)f.push('<span onmouseover="this.className=\'color_focus\'" onmouseout="this.className=\'\'"><span class="j_single_color" title="'),f.push(d[g]),f.push('" style="background-color:#'),f.push(g),f.push(';"></span></span>');c.innerHTML=
f.join("");return{show:function(a){a=SinaEditor.util.dom.getXY(a);c.style.display="";c.style.top=a[1]+b.btns.forecolor.$.offsetHeight+"px";c.style.left=a[0]+"px"},hidden:function(){c.style.display="none"}}}();b.panels.forecolor=d;return{events:[{element:c,events:{click:function(a){a=a.target;a.className==="j_single_color"&&(b.operation.forecolor(SinaEditor.util.dom.getStyle(a,"backgroundColor")),d.hidden())}}},{element:document,events:{click:function(a){a=a.target;SinaEditor.util.dom.containsNode(b.btns.forecolor.$,
a)||SinaEditor.util.dom.containsNode(c,a)||d.hidden()}}},{element:b,events:{editorSelectionChange:function(){d.hidden()}}}]}});
SinaEditor.plugins.add("historyUI",function(a){var b=this,c="";a.customerBtn||b.callPlugin({name:"historyUIBtn",args:a});a.customerPanel||b.callPlugin({name:"historyUIPanel",args:a});var d=a.id||0,e=SinaEditor.$abstract.Storage;b.operation.saveData=function(){var a=b.entyBody.innerHTML;if(c===a)return!1;var f=e.getItem("SinaEditorData"+d)||[],g=+new Date;f.unshift(g);if(f.length>SinaEditor.TOOLCONF.historyMax){var h=f.splice(0,SinaEditor.TOOLCONF.historyMax),j;for(j=0;f[j];j++)e.removeItem("data_"+
d+"_"+f[j]);f=h}return e.setItem("data_"+d+"_"+g,encodeURIComponent(a))&&e.setItem("SinaEditorData"+d,f)?(c=a,b.panels.historyUI.updataData(),!0):(e.removeItem("data_"+d+"_"+f[0]),f.shift(),e.setItem("SinaEditorData"+d,f),!1)};b.operation.loadData=function(a){if(!a)return e.getItem("SinaEditorData"+d);return decodeURIComponent(e.getItem("data_"+d+"_"+a))};b.operation.putData=function(a){if(a=this.loadData(a))a.join&&(a=this.loadData(a[0])),b.entyBody.innerHTML=a,b.operation.clearRU()};var f=function(){},
g=function(){};if(!a.closeAutoSave)var h,f=function(){h=setInterval(function(){b.operation.saveData()},6E5)},g=function(){clearInterval(h)};return{events:[{element:b,events:{editorStateChange:function(){switch(this.getState()){case SinaEditor.STATE.CREATED:b.panels.historyUI.updataData();b.operation.putData(0);f();break;case SinaEditor.STATE.EDITING:clearInterval(h);f();break;case SinaEditor.STATE.SHOWSOURCE:g()}},ctrls:function(){b.operation.saveData()}}}]}});
SinaEditor.plugins.add("historyUIBtn",function(a){var b=this,c={title:"\u5386\u53f2\u7248\u672c",normalClass:"ico_quicksave_1",disabledClass:"ico_quicksave_4",clickedClass:"ico_quicksave_3",mouseoverClass:"ico_quicksave_2",state:SinaEditor.BUTTONSTATE.NORMAL,group:"richdata"},c=SinaEditor.util.mix(c,a.btnConf),d=SinaEditor.ButtonFactory.createButton(c,b);b.btns.historyUI=d;return{events:[{element:d.$,events:{click:function(){if(d.getState()===SinaEditor.BUTTONSTATE.DISABLED)return!1;var a=b.panels.historyUI,
c=SinaEditor.util.dom.getXY(d.$);a.setPosition({x:c[0],y:c[1]+d.$.offsetHeight});a.show()}}}]}});
SinaEditor.plugins.add("historyUIPanel",function(){var a=this,b=new SinaEditor._.Panel;b.setTemplate(SinaEditor.TOOLCONF.historyTemplate);var c=b.nodes.panel,d=function(a){return a<10?"0"+a:a};a.panels.historyUI=b;a.panels.historyUI.updataData=function(){var b=a.operation.loadData()||[];if(b.length){var f=[],g,h;for(h=0;b[h];h++)g=new Date(b[h]),f.push('<div time="'),f.push(b[h]),f.push('" >'),f.push(g.getFullYear()),f.push("-"),f.push(d(g.getMonth()+1)),f.push("-"),f.push(d(g.getDate())),f.push("&nbsp;"),
f.push(d(g.getHours())),f.push(":"),f.push(d(g.getMinutes())),f.push(":"),f.push(d(g.getSeconds())),f.push("</div>");c.innerHTML=f.join("")}};return{events:[{element:a,events:{editorSelectionChange:function(){b.hidden()}}},{element:c,events:{click:function(c){var c=c.target,d=c.getAttribute("time");c.tagName.toUpperCase()=="DIV"&&d&&(a.operation.putData(d),b.hidden())}}},{element:document,events:{click:function(d){d=d.target;d!==a.btns.historyUI.$&&(SinaEditor.util.dom.containsNode(c,d)||b.hidden())}}}]}});
SinaEditor.plugins.add("imgBubble",function(){return SinaEditor.$abstract.BaseBubblePlugin({tagName:"IMG",applyStyles:SinaEditor.CONF.aBubbleStyles,showBubble:function(a,b){if(!a.getAttribute("_se_type")){var c=(new Date).getTime(),d,e,f="i_m_b_"+c,c="i_d_b_"+c;e={modifyid:f,deleteid:c};d=new SinaEditor.$abstract.Template(SinaEditor.CONF.imgBubbleTemplete);var g=SinaEditor.util.dom.getXY(a,!0),h=SinaEditor.util.dom.getXY(b.enty,!0);h[1]>g[1]&&(g[1]=h[1]);d=SinaEditor.baseBubble.showBubble(d.evaluate(e),
{x:g[0],y:g[1]});SinaEditor.CONF.imgBubbleModify?d.id(f).onclick=function(){SinaEditor.CONF.imgBubbleModify(a)||SinaEditor.baseBubble.hiddenBubble();return!1}:d.id(f).style.display="none";SinaEditor.CONF.imgBubbleDelete?d.id(c).onclick=function(){SinaEditor.CONF.imgBubbleDelete(a)||SinaEditor.baseBubble.hiddenBubble();return!1}:d.id(c).style.display="none"}}})}());
SinaEditor.plugins.add("imgUI",function(a){var b=this;a.customerBtn||b.callPlugin({name:"imgUIBtn",args:a});a.customerPanel||b.callPlugin({name:"imgUIPanel",args:a});if(!SinaEditor.CONF.imgBubbleModify)SinaEditor.CONF.imgBubbleModify=function(a){var d=b.panels.imgUI;d.fromBubble=!0;d.tmpNode=a;b.panels.imgUI.show()};if(!SinaEditor.CONF.imgBubbleDelete)SinaEditor.CONF.imgBubbleDelete=function(a){b.operation.save(b);a.parentNode.removeChild(a);b.operation.save(b);b.focus()}});
SinaEditor.plugins.add("imgUIBtn",function(a){var b=this,c={title:"\u63d2\u5165\u56fe\u7247",normalClass:"ico_img_1",disabledClass:"ico_img_4",clickedClass:"ico_img_3",mouseoverClass:"ico_img_2",state:SinaEditor.BUTTONSTATE.NORMAL,group:"richdata"},c=SinaEditor.util.mix(c,a.btnConf),d=SinaEditor.ButtonFactory.createButton(c,b);b.btns.imgUI=d;return{events:[{element:d.$,events:{click:function(){if(d.getState()===SinaEditor.BUTTONSTATE.DISABLED)return!1;b.panels.imgUI.show();return!1}}}]}});
SinaEditor.plugins.add("imgUIPanel",function(){var a=this,b=SinaEditor.winDialog.create({title:"\u6dfb\u52a0\u56fe\u7247",content:SinaEditor.TOOLCONF.imgTemplate,funcClose:function(){v?A():B()}}),c=b.nodes.useClient,d=b.nodes.clientView,e=b.nodes.clientFile,f=b.nodes.contentLoading,g=b.nodes.cancleClient,h=b.nodes.resultPic,i=b.nodes.addClientPic,p=b.nodes.webContent,k=b.nodes.webUrl,o=b.nodes.clientResult,j=b.nodes.errTips,m=b.nodes.clientIframe,n=b.nodes.resetClient,q=b.nodes.clientUploadDiv,y=
b.nodes.clientMoreUp,E=b.nodes.clientForm,z=b.nodes.tabMy,C=b.nodes.tabWeb,s=b.nodes.webAdd,t=b.nodes.webPic,w=t.parentNode,x=b.nodes.webPicLoading,F=b.nodes.clientFileDrag,v=!0,G=null,D="http://";b.fromBubble=!1;b.tmpNode=null;var H=function(a){if(v!==!!a)a?(A(!0),z.className="cur",p.style.display="none",C.className="",c.style.display=""):(B(!0),z.className="",c.style.display="none",C.className="cur",p.style.display=""),v=!v},r=function(a){f.style.display="none";d.style.display="none";o.style.display=
"none";a.style.display=""},u={showErr:function(a,b){j.innerHTML=a;j.style.display="";if(b){var c=this;setTimeout(function(){c.hiddenErr()},b*1E3)}},hiddenErr:function(){j.style.display="none"}},I=function(a){if(a.src){a.removeAttribute("width");a.removeAttribute("height");var b=a.width,c=a.height;if(!(b<630&&c<442))630/442<b/c?a.width=630:a.height=442}},A=function(a){r(d);u.hiddenErr();if(!a)b.fromBubble=!1,b.tmpNode=null;h.src=""},B=function(a){D="http://";k.value="http://";s.style.display="none";
w.style.display="none";x.style.display="none";u.hiddenErr();if(!a)b.fromBubble=!1,b.tmpNode=null;s.src=""},J=function(a){if(!SinaEditor.TOOLCONF.imgType.test(a||""))return u.showErr(SinaEditor.TOOLCONF.imgErrTypeMSG,3),!1;return!0};SinaEditor.ev.add(q,"dragenter",function(){y.style.display="";q.style.borderStyle="dashed"});SinaEditor.ev.add(q,"dragover",function(a){SinaEditor.ev.stopEvent(a)});SinaEditor.ev.add(q,"drop",function(a){SinaEditor.ev.stopEvent(a);q.style.borderStyle="solid";y.style.display=
"none";a=a.dataTransfer.files;a.length&&(a=a[0]);if(J(a.name)){var b=new FileReader;b.onload=function(a){F.value=a.target.result;E.submit();r(f);F.value=""};b.readAsDataURL(a)}});SinaEditor.ev.add(q,"dragleave",function(){q.style.borderStyle="solid";y.style.display="none"});a.panels.imgUI=b;return{events:[{element:k,events:{focus:function(){G=setInterval(function(){var a=k.value;if(a!=D){D=a;w.style.display="none";x.style.display="";var b=new Image;b.onload=function(){t.src=b.src;setTimeout(function(){I(t);
u.hiddenErr();x.style.display="none";w.style.display="";s.style.display=""},1)};b.onerror=function(){s.style.display="none";u.showErr("\u60a8\u8f93\u5165\u7684\u56fe\u7247\u4e0d\u662f\u6b63\u786e\u7684\u5730\u5740\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\u3002");w.style.display="none";x.style.display="none"};b.src=k.value}},1E3)},blur:function(){clearInterval(G)}}},{element:z,events:{click:function(){H(!0)}}},{element:C,events:{click:function(){H(!1)}}},{element:i,events:{click:function(){if(b.fromBubble)b.tmpNode.src=
h.src;else{var c=SinaEditor.util.dom.createDom("img",{ownerDocument:a.entyDoc,properties:{src:h.src}});a.operation.addNode(c,!0)}b.hidden();A()}}},{element:s,events:{click:function(){if(b.fromBubble)b.tmpNode.src=t.src;else{var c=SinaEditor.util.dom.createDom("img",{ownerDocument:a.entyDoc,properties:{src:t.src}});a.operation.addNode(c,!0)}b.hidden();B()}}},{element:n,events:{click:function(){h.src="";r(d)}}},{element:q,events:{mousemove:function(a){var b=SinaEditor.util.dom.getXY(q),c=SinaEditor.util.dom.getScrollPos();
e.style.left=a.clientX-b[0]-10+c[1]+"px";e.style.top=a.clientY-b[1]-15+c[0]+"px"}}},{element:g,events:{click:function(){m.src="";r(d)}}},{element:m,events:{load:function(){console.log(".......\u5ba2\u6237\u7aef\u7684\u534e\u4e3d\u5bb6\u5728\uff01\uff01\uff01");try{var a=m.contentWindow.document.body.innerHTML;if(a){r(o);m.contentWindow.document.body.innerHTML="";var b=new Image;b.onload=function(){h.src=a;setTimeout(function(){I(h)},1)};b.src=a}else console.log("\u6ca1\u6709\u52a0\u8f7d\u4e1c\u897f\uff01\u865a\u62a5")}catch(c){}}}},
{element:e,events:{change:function(){J(e.value)&&(E.submit(),r(f))}}}]}});SinaEditor.plugins.add("indent",function(a){var b=this;a.customerBtn||b.callPlugin({name:"indentBtn",args:a});b.operation.indent=function(){b.focus();b.operation.save(b);b.entyDoc.execCommand("indent",!1,"");b.operation.save(b);b.focus()}});
SinaEditor.plugins.add("indentBtn",function(a){var b=this,c={title:"\u589e\u52a0\u7f29\u8fdb",normalClass:"ico_indent_1",disabledClass:"ico_indent_4",clickedClass:"ico_indent_3",mouseoverClass:"ico_indent_2",state:SinaEditor.BUTTONSTATE.DISABLED,group:"composing"},c=SinaEditor.util.mix(c,a.btnConf),d=SinaEditor.ButtonFactory.createButton(c,b);b.btns.indent=d;return{initialize:function(){},events:[{element:d.$,events:{click:function(){if(d.getState()===SinaEditor.BUTTONSTATE.DISABLED)return!1;b.operation.indent();
return!1}}}]}});
SinaEditor.plugins.add("initFromStatic",function(a){var b=this,c="document.open();"+(SinaEditor.env.isCustomDomain?'document.domian="'+document.domain+'";':"")+"document.close();",c=SinaEditor.util.dom.createDomFromHTML('<iframe style="width:100%;height:100%;z-index:999;" frameBorder="0" src="'+(SinaEditor.env.$IE?"javascript:void(function(){"+encodeURIComponent(c)+"}())":"")+'" allowTransparency="true"></iframe>');b.enty=c;SinaEditor.ev.add(c,"load",function(){b.entyWin=b.enty.contentWindow;b.entyDoc=
b.entyWin.document;b.entyBody=b.entyDoc.body;b.entyBody.spellcheck=!!b.option.disableNativeSpellChecker;SinaEditor.env.$IE?(b.entyBody.hideFocus=!0,b.entyBody.disabled=!0,b.entyBody.contentEditable=!0,b.entyBody.removeAttribute("disabled")):setTimeout(function(){SinaEditor.env.$GENKO?(b.entyBody.contentEditable=!0,SinaEditor.ev.add(b.enty,"DOMAttrModified",function(a){a=a.attrName.toUpperCase();if(a=="CLASS"||a=="STYLE")b.entyBody.contentEditable=!1,b.entyBody.contentEditable=!0,b.entyWin.blur(),
b.entyWin.focus()})):SinaEditor.env.$WEBKIT?b.entyBody.parentNode.contentEditable=!0:b.entyDoc.designMode="on"},0);setTimeout(function(){try{b.entyDoc.execCommand("enableObjectResizing",!1,!b.option.disableObjectResizing)}catch(a){}try{b.entyDoc.execCommand("enableInlineTableEditing",!1,!b.option.disableNativeTableHandles)}catch(c){}SinaEditor.env.$IE&&setTimeout(function(){var a=b.entyDoc;if(a)a=a.body,a.runtimeStyle.marginBottom="0px",a.runtimeStyle.marginBottom=""},1E3)},0);if(SinaEditor.env.$IE){var a=
SinaEditor.util.dom.createDom("script",{ownerDocument:b.entyDoc,attributes:{type:"text/javascript",src:"http://test.sina.com.cn/editor/ierange-m2.js"}});b.entyDoc.getElementsByTagName("head")[0].appendChild(a)}if(b.option.styleLinks){var a=b.option.styleLinks,c;for(c=0;a[c];c++)SinaEditor.util.dom.addLink(a[c],b.entyDoc)}b.option.styles&&SinaEditor.util.dom.addStyles(b.option.styles,b.entyDoc)});a.parent.appendChild(c)});
SinaEditor.plugins.add("italic",function(a){var b=this;a.customerBtn||b.callPlugin({name:"italicBtn",args:a});var c=b.btns.italic;b.operation.italic=function(){var a=SinaEditor.range.getCurrentRanges(b.entyWin);if(a=a[0])b.operation.save(b),(a=b.operateState.italic)?(console.log("\u6267\u884c\u53bb\u659c\u4f53\u64cd\u4f5c"),SinaEditor.range.removeStyle(b,{useTagName:["i","em"]}),SinaEditor.range.removeStyle(b,{useTagName:"span",style:"fontStyle"}),c.setState(SinaEditor.BUTTONSTATE.NORMAL)):(console.log("\u6267\u884c\u659c\u4f53\u64cd\u4f5c"),
SinaEditor.range.applyStyle(b,{useTagName:"em"}),c.setState(SinaEditor.BUTTONSTATE.CLICKED)),b.operateState.italic=!a,b.operation.save(b)};return{events:[{element:b,events:{editorSelectionChange:function(){var a=SinaEditor.range.queryCommandState(this.entyDoc,"italic");a?c.setState(SinaEditor.BUTTONSTATE.CLICKED):c.setState(SinaEditor.BUTTONSTATE.NORMAL);this.operateState.italic=a},ctrli:function(){b.operation.italic(this)}}}]}});
SinaEditor.plugins.add("italicBtn",function(a){var b=this,c={title:"\u659c\u4f53",normalClass:"ico_italic_1",disabledClass:"ico_italic_4",clickedClass:"ico_italic_3",mouseoverClass:"ico_italic_2",state:SinaEditor.BUTTONSTATE.DISABLED,group:"common"},c=SinaEditor.util.mix(c,a.btnConf),a=SinaEditor.ButtonFactory.createButton(c,b);b.btns.italic=a;return{events:[{element:a.$,events:{click:function(){if(b.btns.italic.getState()===SinaEditor.BUTTONSTATE.DISABLED)return!1;b.operation.italic();return!1}}}]}});
SinaEditor.plugins.add("justifycenter",function(a){var b=this;a.customerBtn||b.callPlugin({name:"justifycenterBtn",args:a});b.operation.justifycenter=function(){b.operation.save(b);b.entyDoc.execCommand("Justifycenter","","");b.operation.save(b)}});
SinaEditor.plugins.add("justifycenterBtn",function(a){var b=this,c={title:"\u5c45\u4e2d",normalClass:"ico_justifycenter_1",disabledClass:"ico_justifycenter_4",clickedClass:"ico_justifycenter_3",mouseoverClass:"ico_justifycenter_2",state:SinaEditor.BUTTONSTATE.DISABLED,group:"composing"},c=SinaEditor.util.mix(c,a.btnConf),d=SinaEditor.ButtonFactory.createButton(c,b);b.btns.justifycenter=d;return{initialize:function(){},events:[{element:d.$,events:{click:function(){if(d.getState()===SinaEditor.BUTTONSTATE.DISABLED)return!1;
b.operation.justifycenter();return!1}}}]}});SinaEditor.plugins.add("justifyleft",function(a){var b=this;a.customerBtn||b.callPlugin({name:"justifyleftBtn",args:a});b.operation.justifyleft=function(){b.operation.save(b);b.entyDoc.execCommand("Justifyleft","","");b.operation.save(b)}});
SinaEditor.plugins.add("justifyleftBtn",function(a){var b=this,c={title:"\u5c45\u5de6",normalClass:"ico_justifyleft_1",disabledClass:"ico_justifyleft_4",clickedClass:"ico_justifyleft_3",mouseoverClass:"ico_justifyleft_2",state:SinaEditor.BUTTONSTATE.DISABLED,group:"composing"},c=SinaEditor.util.mix(c,a.btnConf),d=SinaEditor.ButtonFactory.createButton(c,b);b.btns.justifyleft=d;return{initialize:function(){},events:[{element:d.$,events:{click:function(){if(d.getState()===SinaEditor.BUTTONSTATE.DISABLED)return!1;
b.operation.justifyleft();return!1}}}]}});SinaEditor.plugins.add("justifyright",function(a){var b=this;a.customerBtn||b.callPlugin({name:"justifyrightBtn",args:a});b.operation.justifyright=function(){b.operation.save(b);b.entyDoc.execCommand("justifyright","","");b.operation.save(b)}});
SinaEditor.plugins.add("justifyrightBtn",function(a){var b=this,c={title:"\u5c45\u53f3",normalClass:"ico_justifyright_1",disabledClass:"ico_justifyright_4",clickedClass:"ico_justifyright_3",mouseoverClass:"ico_justifyright_2",state:SinaEditor.BUTTONSTATE.DISABLED,group:"composing"},c=SinaEditor.util.mix(c,a.btnConf),d=SinaEditor.ButtonFactory.createButton(c,b);b.btns.justifyright=d;return{events:[{element:d.$,events:{click:function(){if(d.getState()===SinaEditor.BUTTONSTATE.DISABLED)return!1;b.operation.justifyright();
return!1}}}]}});
(function(){function a(a){var c=[],d=a.length;return d>30?(c.push(a.substring(0,15)),c.push(a.substring(d-15,d)),c.join("...")):a}SinaEditor.plugins.add("linkBubble",SinaEditor.$abstract.BaseBubblePlugin({tagName:"A",applyStyles:SinaEditor.CONF.aBubbleStyles,showBubble:function(b,c){var d=b.href;if(d){var e=(new Date).getTime(),f,g,h="a_m_b_"+e,e="a_d_b_"+e;g={modifyid:h,deleteid:e};var i=d.match(/^mailto:(.*$)/i);i?(f=new SinaEditor.$abstract.Template(SinaEditor.CONF.mailBubbleTemplete),g.srcstr=
a(i[1])):(f=new SinaEditor.$abstract.Template(SinaEditor.CONF.aBubbleTemplete),g.src=decodeURI(d),g.srcstr=a(decodeURI(d)));d=SinaEditor.util.dom.getXY(b,!0);i=SinaEditor.util.dom.getXY(c.enty,!0);d[1]-=b.offsetHeight;i[1]>d[1]&&(d[1]=i[1]);f=SinaEditor.baseBubble.showBubble(f.evaluate(g),{x:d[0],y:d[1]});SinaEditor.CONF.aBubbleModify?f.id(h).onclick=function(){SinaEditor.CONF.aBubbleModify(b)||SinaEditor.baseBubble.hiddenBubble();return!1}:f.id(h).style.display="none";SinaEditor.CONF.aBubbleDelete?
f.id(e).onclick=function(){SinaEditor.CONF.aBubbleDelete(b)||SinaEditor.baseBubble.hiddenBubble();return!1}:f.id(e).style.display="none"}}}))})();
SinaEditor.plugins.add("link",function(a){var b=this;a.customerPanel||b.callPlugin({name:"linkPanel",args:a});a.customerBtn||b.callPlugin({name:"linkBtn",args:a});b.operation.link=function(a){var d=a.range||SinaEditor.range.getCurrentRanges(b.entyWin)[0],e=a.link,f=a.str||e;if(!e&&!d)console.log("2a.\u4e0d\u4f20\u9012\uff1a\u4e0d\u505a\u4efb\u4f55\u64cd\u4f5c\u3002");else{b.operation.save(b);if(a.elm)e=a.elm,a.link?(e.href=encodeURI(a.link),d.selectNodeContents(e),SinaEditor.range.applyRanges(b.entyWin,
d)):SinaEditor.util.dom.removeTag(e);else if(a=SinaEditor.util.dom.createDom("a",{ownerDocument:b.entyDoc,properties:{target:"_blank"}}),!d||d&&d.collapsed)a.innerHTML=f,a.href=encodeURI(e),d?d.insertNode(a):b.entyBody.appendChild(a),d.selectNodeContents(a),SinaEditor.range.applyRanges(b.entyWin,d);else if(b.entyDoc.execCommand("unlink",!1,""),e){a.href=encodeURI(e);d=SinaEditor.range.getCurrentRanges(b.entyWin)[0];try{d.surroundContents(a)}catch(g){e=d.extractContents(),a.appendChild(e),d.insertNode(a)}d.selectNodeContents(a);
SinaEditor.range.applyRanges(b.entyWin,d)}b.operation.save(b)}}});
SinaEditor.plugins.add("linkBtn",function(a){var b=this,c=b.panels.link,d=c.nodes.hidden,e={title:" \u63d2\u5165\u94fe\u63a5",normalClass:"ico_link_1",disabledClass:"ico_link_4",clickedClass:"ico_link_3",mouseoverClass:"ico_link_2",state:SinaEditor.BUTTONSTATE.DISABLED,group:"common"},e=SinaEditor.util.mix(e,a.btnConf),a=SinaEditor.ButtonFactory.createButton(e,b);b.btns.link=a;return{events:[{element:a.$,events:{click:function(){if(b.btns.link.getState()===SinaEditor.BUTTONSTATE.DISABLED)return!1;
var a=SinaEditor.range.getCurrentRanges(b.entyWin)[0],e=a.toString();if(SinaEditor.TOOLCONF.addLinkNow&&SinaEditor.TOOLCONF.addLinkNow.test(e))b.operation.link({link:e,range:a});else{if(a.collapsed)d.style.display="";c.show()}return!1}}}]}});
SinaEditor.plugins.add("linkPanel",function(){var a=this,b=SinaEditor.winDialog.create({title:"\u6dfb\u52a0\u94fe\u63a5",content:SinaEditor.TOOLCONF.linkTemplate,funcClose:function(){i()}});b.setMiddle();b.setFixed(!0);var c=b.nodes.ok,d=b.nodes.cancel,e=b.nodes.text,f=b.nodes.hidden,g=b.nodes.link,h,i=function(){f.style.display="none";h=null;e.value="";g.value="http://"};a.panels.link=b;SinaEditor.CONF.aBubbleModify=function(a){g.value=decodeURI(a.href);h=a;b.show()};SinaEditor.CONF.aBubbleDelete=
function(b){a.operation.link({elm:b})};return{events:[{element:c,events:{click:function(){var c=SinaEditor.range.getCurrentRanges(a.entyWin)[0];a.operation.link({link:g.value,str:e.value,range:c,elm:h});i();b.hidden()}}},{element:d,events:{click:function(){i();b.hidden()}}}]}});
SinaEditor.plugins.add("markList",function(a){var b=this;a.customerBtn||b.callPlugin({name:"markListBtn",args:a});b.operation.markList=function(){b.operation.save(b);b.entyDoc.execCommand("insertunorderedlist","","");b.focus();b.operation.save(b)}});
SinaEditor.plugins.add("markListBtn",function(a){var b=this,c={title:"\u9879\u76ee\u7b26\u53f7",normalClass:"ico_marklist_1",disabledClass:"ico_marklist_4",clickedClass:"ico_marklist_3",mouseoverClass:"ico_marklist_2",state:SinaEditor.BUTTONSTATE.DISABLED,group:"composing"},c=SinaEditor.util.mix(c,a.btnConf),d=SinaEditor.ButtonFactory.createButton(c,b);b.btns.markList=d;return{events:[{element:d.$,events:{click:function(){if(d.getState()===SinaEditor.BUTTONSTATE.DISABLED)return!1;b.operation.markList();
return!1}}}]}});SinaEditor.plugins.add("numberList",function(a){var b=this;a.customerBtn||b.callPlugin({name:"numberListBtn",args:a});b.operation.numberList=function(){b.operation.save(b);b.focus();b.entyDoc.execCommand("insertorderedlist","","");b.operation.save(b)}});
SinaEditor.plugins.add("numberListBtn",function(a){var b=this,c={title:"\u6570\u5b57\u7b26\u53f7",normalClass:"ico_numberlist_1",disabledClass:"ico_numberlist_4",clickedClass:"ico_numberlist_3",mouseoverClass:"ico_numberlist_2",state:SinaEditor.BUTTONSTATE.DISABLED,group:"composing"},c=SinaEditor.util.mix(c,a.btnConf),d=SinaEditor.ButtonFactory.createButton(c,b);b.btns.numberList=d;return{events:[{element:d.$,events:{click:function(){if(d.getState()===SinaEditor.BUTTONSTATE.DISABLED)return!1;b.operation.numberList();
return!1}}}]}});SinaEditor.plugins.add("outdent",function(a){var b=this;a.customerBtn||b.callPlugin({name:"outdentBtn",args:a});b.operation.outdent=function(){b.focus();b.operation.save(b);b.entyDoc.execCommand("outdent","","");b.operation.save(b);b.focus()}});
SinaEditor.plugins.add("outdentBtn",function(a){var b=this,c={title:"\u51cf\u5c11\u7f29\u8fdb",normalClass:"ico_outdent_1",disabledClass:"ico_outdent_4",clickedClass:"ico_outdent_3",mouseoverClass:"ico_outdent_2",state:SinaEditor.BUTTONSTATE.DISABLED,group:"composing"},c=SinaEditor.util.mix(c,a.btnConf),d=SinaEditor.ButtonFactory.createButton(c,b);b.btns.outdent=d;return{events:[{element:d.$,events:{click:function(){if(d.getState()===SinaEditor.BUTTONSTATE.DISABLED)return!1;b.operation.outdent();
return!1}}}]}});
SinaEditor.plugins.add("pasteFilter",function(){var a=this;a.operation.pasteFilter=function(){var c=a.option.filter.args,e=0,f=c.tagName;if(f)for(var f=f.split("|"),g;f[e];){for(g=a.entyDoc.getElementsByTagName(f[e]);g[0];)SinaEditor.util.dom.delElement(g[0]);e++}if(e=c.attribute)e=e.split("|"),b(a.entyDoc.body,e);e=0;for(c=a.entyDoc.getElementsByTagName("img");c[e];e++)c[e].src.indexOf("file:///")===0&&(SinaEditor.util.dom.delElement(c[e]),e--)};var b=function(a,c){if(a.nodeType===SinaEditor.NODETYPE.ELEMENT){for(var f=
0;c[f];)a.removeAttribute(c[f]),f++;f=0;if(a.hasChildNodes())for(var g=a.childNodes;g[f];)b(g[f],c),f++}},c=function(b){for(var c;b[0];)c=SinaEditor.util.dom.createDomFromHTML('<img src="'+SinaEditor.CONF.transparentIMG+'" _se_flash="'+encodeURIComponent(SinaEditor.util.dom.outerHTML(b[0]))+'" width="'+b[0].width+'" height="'+b[0].height+'" style="background:url(\''+SinaEditor.CONF.fakeFLASH+"') no-repeat scroll center center transparent;border:1px solid #A9A9A9;\" >",a.entyDoc),b[0].parentNode.replaceChild(c,
b[0])};return{events:[{element:a.entyBody,events:{paste:function(){setTimeout(function(){var b=0,e;a.operation.pasteFilter();c(a.entyDoc.getElementsByTagName("object"));c(a.entyDoc.getElementsByTagName("embed"));e=a.entyDoc.getElementsByTagName("td");for(b=0;e[b];b++)if(!e[b].textContent&&!e[b].textContent)e[b].innerHTML="&nbsp;"},10)}}},{element:a,events:{editorStateChange:function(){var b=this.getState();if(b==SinaEditor.STATE.EDITING)c(this.entyDoc.getElementsByTagName("object")),c(this.entyDoc.getElementsByTagName("embed"));
else if(b==SinaEditor.STATE.SHOWSOURCE)for(var b=a.entyDoc.getElementsByTagName("img"),e,f=0;b[f];)(e=b[f].getAttribute("_se_flash"))?(e=SinaEditor.util.dom.createDomFromHTML(decodeURIComponent(e),a.entyDoc),b[f].parentNode.replaceChild(e,b[f])):f++}}}]}});
SinaEditor.plugins.add("redoManager",function(a){var b=this;SinaEditor.redoManager.addEditor(b);b._.doManagerBuffer=500;b.operation.redo=function(){SinaEditor.redoManager.redo(b)};b.operation.undo=function(){SinaEditor.redoManager.undo(b)};b.operation.save=function(){SinaEditor.redoManager.save(b)};b.operation.clearRU=function(){SinaEditor.redoManager.addEditor(b)};a.customerBtnU||b.callPlugin({name:"undoBtn",args:a});a.customerBtnR||b.callPlugin({name:"redoBtn",args:a});return{events:[{element:b,
events:{ctrly:function(){SinaEditor.redoManager.redo(b)},ctrlz:function(){SinaEditor.redoManager.undo(b)}}},{element:b.entyDoc,events:{keydown:function(){setTimeout(function(){b.entyWin.clearTimeout(b._.doManagerBufferTimmer);b._.doManagerBufferTimmer=b.entyWin.setTimeout(function(){console.log("\u7a7a\u95f2"+b._.doManagerBuffer+"\u6beb\u79d2\u5c31\u4fdd\u5b58");SinaEditor.redoManager.save(b)},b._.doManagerBuffer)},0)}}}]}});
SinaEditor.plugins.add("redoBtn",function(a){var b=this,c={title:"\u91cd\u505a",normalClass:"ico_redo_1",disabledClass:"ico_redo_4",clickedClass:"ico_redo_3",state:SinaEditor.BUTTONSTATE.DISABLED,group:"redoAndUndo"},c=SinaEditor.util.mix(c,a.btnConf),d=SinaEditor.ButtonFactory.createButton(c,b);b.btns.redo=d;return{events:[{element:b,events:{redoAndUndoChanged:function(){b._.hasRedo?d.setState(SinaEditor.BUTTONSTATE.NORMAL):d.setState(SinaEditor.BUTTONSTATE.DISABLED)}}},{element:d.$,events:{click:function(){b.getState()==
SinaEditor.STATE.EDITING&&SinaEditor.redoManager.redo(b)},mouseover:function(){if(b._.hasRedo&&d.getState()===SinaEditor.BUTTONSTATE.NORMAL)this.className="ico_redo_2"},mouseout:function(){this.className="ico_redo_4";if(b._.hasRedo&&d.getState()===SinaEditor.BUTTONSTATE.NORMAL)this.className="ico_redo_1"}}}]}});
SinaEditor.plugins.add("showSource",function(a){var b=this;b.entyArea=a.entyArea;if(!b.entyArea){var c=SinaEditor.util.dom.createDom("textarea",{attributes:{id:b.option.id+"_area_"+ +new Date}});c.style.cssText="width:100%;height:100%;display:none;resize:none;";b.entyArea=c;b.enty.parentNode.appendChild(c)}b.customerBtn||b.callPlugin({name:"showSourceBtn",args:a});b.operation.swapData=function(a){var c=b.operation.pasteFilter||function(){};a?(b.setState(SinaEditor.STATE.SHOWSOURCE),c(),b.entyArea.value=
SinaEditor.util.styleHTML(b.entyBody.innerHTML,1,"\t"),b.entyBody.innerHTML=""):(b.entyBody.innerHTML=b.entyArea.value.replace(/\u200B|\t|\n|\r/g,""),c(),b.setState(SinaEditor.STATE.EDITING))};return{initialize:function(){b.entyArea.style.display="none";b.enty.style.display="";b.focus();SinaEditor.redoManager.addEditor(b)}}});
SinaEditor.plugins.add("showSourceBtn",function(a){var b=this;SinaEditor.BUTTON.source=function(a){switch(this.getState()){case SinaEditor.STATE.CREATING:a.setState(SinaEditor.BUTTONSTATE.DISABLED);break;default:a.setState(SinaEditor.BUTTONSTATE.NORMAL)}};var c={title:"\u67e5\u770b\u6e90\u4ee3\u7801",normalClass:"ico_showsrc_1",disabledClass:"ico_showsrc_4",clickedClass:"ico_showsrc_3",mouseoverClass:"ico_showsrc_2",state:SinaEditor.BUTTONSTATE.DISABLED,editorChangeType:"source",group:"common"},c=
SinaEditor.util.mix(c,a.btnConf),a=SinaEditor.ButtonFactory.createButton(c,b);b.btns.showSource=a;return{events:[{element:a.$,events:{click:function(){var a=b.getState();if(a===SinaEditor.STATE.EDITING)b.operation.save(b),b.enty.style.display="none",b.entyArea.style.display="",b.operation.swapData(!0),b.entyArea.focus();else if(a===SinaEditor.STATE.SHOWSOURCE)b.operation.swapData(!1),b.entyArea.style.display="none",b.enty.style.display="",b.focus(),b.operation.save(b)}}}]}});
SinaEditor.plugins.add("submit",function(){var a=this;a.operation.submit=function(){var b="";swapData=a.operation.swapData||function(){};swapData(!0);b=a.entyArea.value;swapData(!1);return b}});
SinaEditor.plugins.add("tableUI",function(a){var b=this;a.customerBtn||b.callPlugin({name:"tableUIBtn",args:a});a.customerPanel||b.callPlugin({name:"tableUIPanel",args:a});b.operation.tableCreate=function(a,d){if(!(a<=0||d<=0)){b.operation.save(b);var e=['<table cellspacing="1" cellpadding="3" style="width:80%;text-align:center;" border="1" >'],f,g;for(f=0;f<d;f++){e.push("<tr>");for(g=0;g<a;g++)e.push("<td>&nbsp;</td>");e.push("</tr>")}e.push("</table>");e=SinaEditor.util.dom.createDomFromHTML(e.join(""),
b.entyDoc);b.operation.addNode(e);b.operation.save(b)}}});
SinaEditor.plugins.add("tableUIBtn",function(a){var b=this,c={title:"\u63d2\u5165\u8868\u683c",normalClass:"ico_table_1",disabledClass:"ico_table_4",clickedClass:"ico_table_3",mouseoverClass:"ico_table_2",state:SinaEditor.BUTTONSTATE.DISABLED,group:"richdata"},c=SinaEditor.util.mix(c,a.btnConf),d=SinaEditor.ButtonFactory.createButton(c,b);b.btns.tableUI=d;b.btns.tableUI.PANELX=0;b.btns.tableUI.PANELY=0;return{events:[{element:d.$,events:{click:function(){if(d.getState()===SinaEditor.BUTTONSTATE.DISABLED)return!1;
var a=b.panels.tableUI;SinaEditor.util.dom.getScrollPos();var c=SinaEditor.util.dom.getXY(d.$);a.setPosition({x:c[0],y:c[1]+d.$.offsetHeight});a.nodes.chooseContent.style.width="0em";a.nodes.chooseContent.style.height="0em";a.show();a=SinaEditor.util.dom.getXY(a.nodes.panel);b.btns.tableUI.PANELX=a[0];b.btns.tableUI.PANELY=a[1];return!1}}}]}});
SinaEditor.plugins.add("tableUIPanel",function(){var a=this,b=new SinaEditor._.Panel;b.setTemplate(SinaEditor.TOOLCONF.tableTemplate);var c=b.nodes.panel,d=b.nodes.eventContent,e=b.nodes.baseContent,f=b.nodes.chooseContent,g=b.nodes.tabNums;a.panels.tableUI=b;return{events:[{element:d,events:{mousemove:function(b){var c=a.btns.tableUI,p=SinaEditor.util.dom.getScrollPos(),k=parseInt((b.clientX-c.PANELX+p[1])/16,10)||1,b=parseInt((b.clientY-c.PANELY+p[0])/16,10)||1,k=k>20?20:k,b=b>20?20:b;f.style.width=
k+"em";f.style.height=b+"em";c=(k<5?5:k)+"em";e.style.width=c;e.style.height=(b<5?5:b)+"em";d.style.width=c;g.innerHTML=[k," * "+b].join("")}}},{element:document,events:{click:function(d){d=d.target;SinaEditor.util.dom.containsNode(a.btns.tableUI.$,d)||SinaEditor.util.dom.containsNode(c,d)||b.hidden()}}},{element:f,events:{click:function(){var c=g.innerHTML.split("*");a.operation.tableCreate(parseInt(c[0],10),parseInt(c[1],10));b.hidden()}}},{element:a,events:{editorSelectionChange:function(){b.hidden()}}}]}});
SinaEditor.plugins.add("underline",function(a){var b=this;a.customerBtn||b.callPlugin({name:"underlineBtn",args:a});var c=b.btns.underline;b.operation.underline=function(){var a=SinaEditor.range.getCurrentRanges(b.entyWin);if(a=a[0])b.operation.save(b),(a=b.operateState.underline)?(console.log("\u6267\u884c\u53bb\u4e0b\u5212\u7ebf\u64cd\u4f5c"),SinaEditor.range.removeStyle(b,{useTagName:"span",style:"textDecoration"}),c.setState(SinaEditor.BUTTONSTATE.NORMAL)):(console.log("\u6267\u884c\u52a0\u4e0b\u5212\u7ebf\u64cd\u4f5c"),
SinaEditor.range.applyStyle(b,{useTagName:"span",style:"textDecoration",value:"underline"}),c.setState(SinaEditor.BUTTONSTATE.CLICKED)),b.operateState.underline=!a,b.operation.save(b)};return{events:[{element:b,events:{editorSelectionChange:function(){var a=SinaEditor.range.queryCommandState(this.entyDoc,"underline");a?c.setState(SinaEditor.BUTTONSTATE.CLICKED):c.setState(SinaEditor.BUTTONSTATE.NORMAL);this.operateState.underline=a},ctrlu:function(){b.operation.isUnderline(this)}}}]}});
SinaEditor.plugins.add("underlineBtn",function(a){var b=this,c={title:"\u4e0b\u5212\u7ebf",normalClass:"ico_underline_1",disabledClass:"ico_underline_4",clickedClass:"ico_underline_3",mouseoverClass:"ico_underline_2",state:SinaEditor.BUTTONSTATE.DISABLED,group:"common"},c=SinaEditor.util.mix(c,a.btnConf),a=SinaEditor.ButtonFactory.createButton(c,b);b.btns.underline=a;return{events:[{element:a.$,events:{click:function(){b.operation.underline(b)}}}]}});
SinaEditor.plugins.add("undoBtn",function(a){var b=this,c={title:"\u64a4\u9500",normalClass:"ico_undo_1",disabledClass:"ico_undo_4",clickedClass:"ico_undo_3",state:SinaEditor.BUTTONSTATE.DISABLED,group:"redoAndUndo"},c=SinaEditor.util.mix(c,a.btnConf),d=SinaEditor.ButtonFactory.createButton(c,b);b.btns.undo=d;return{events:[{element:b,events:{redoAndUndoChanged:function(){b._.hasUndo?d.setState(SinaEditor.BUTTONSTATE.NORMAL):d.setState(SinaEditor.BUTTONSTATE.DISABLED)}}},{element:d.$,events:{click:function(){b.getState()==
SinaEditor.STATE.EDITING&&SinaEditor.redoManager.undo(b)},mouseover:function(){console.log("112233");if(b._.hasUndo&&d.getState()===SinaEditor.BUTTONSTATE.NORMAL)this.className="ico_undo_2"},mouseout:function(){this.className="ico_undo_4";if(b._.hasUndo&&d.getState()===SinaEditor.BUTTONSTATE.NORMAL)this.className="ico_undo_1"}}}]}});if(!SinaEditor.$abstract)SinaEditor.$abstract={};
SinaEditor.$abstract.baseEditor=function(a){this._state=SinaEditor.STATE.CREATING;this.option=a||{};this.option.eventBlackList=this.option.eventBlackList||"";this._jobTable=[];this._jobTableIndex={};this.entyArea=this.entyBody=this.entyDoc=this.entyWin=this.enty=null;this.hasAddEvent=!1;this.btns={};this.panels={};this._={};this.errorMsg=[];this.operation={};this.operateState={}}.$define({error:function(a){console.error(a);this.errorMsg.push(a)},add:function(a){this._jobTable.push(a)},start:function(){if(this.option.onStart)this.option.onStart();
this.queue(this._jobTable)},queue:function(a){var b=this,c=a.length,d=0;b.callPlugin(a[d]);var e=window.setInterval(function(){d++;if(d>=c)clearInterval(e),e=null,SinaEditor.ev.fire(b,"editorOnladed");else if(b.entyWin){if(!b.hasAddEvent){b.hasAddEvent=!0;var f=null;for(f in SinaEditor.ev.customEvent)b.option.eventBlackList.indexOf(f)<0?SinaEditor.ev.$regEvent(f,b):console.log(b.option.id+"\u5728\u9ed1\u540d\u5355\u4e2d\uff1a"+f)}b.callPlugin(a[d]);b.setState(SinaEditor.STATE.CREATED);b.setState(SinaEditor.STATE.EDITING)}else console.log("\u7b49\u4e00\u4e0b"),
d--},10)},callPlugin:function(a){var b=SinaEditor.plugins.get(a.name);if(b){var c=b.call(this,a.args||{})||{};console.log(this.option.id+"\u6dfb\u52a0job:"+a.name);var b=c.initialize,d=c.events;if(typeof c=="undefined")this.error("<b>Job["+a.name+"] is undefiend!!!</b>");else try{if(d)for(c=c=0;d[c];c++){var e=d[c],f=e.element,g=e.events,h=null;f||console.error("!!!!!+"+h+"+\u7ed1\u5b9a\u5931\u8d25...");for(h in g)console.log(f+"\u7ed1\u5b9a"+h),SinaEditor.ev.add(f,h,g[h],{srcEditor:this})}b&&b.call(this)}catch(i){throw this.error("<b>Job["+
a.name+"] failed!!!</b>"+i.message+""),i;}finally{}}else console.log(a),console.log("---------------------------plugin not found:")},focus:function(){this.entyWin.focus()},setState:function(a){this._state=a;SinaEditor.ev.fire(this,"editorStateChange")},getState:function(){return this._state}});SinaEditor.createEditor=function(a){var b=new (eval("("+a.editorName+")"))(a),c=a.plugns;b.add(a.initType);a.filter&&b.add(a.filter);for(a=0;c[a];a++)b.add(c[a]);b.start();return b};SinaEditor._={};
if(!SinaEditor._)SinaEditor._={};SinaEditor._.entyimpl={};SinaEditor._.entyimpl.normalEditor=function(){}.$extends(SinaEditor.$abstract.baseEditor).$define({});SinaEditor._.IRenderer={setCanShow:function(){},setCanHidden:function(){},show:function(){},hidden:function(){},addEventListener:function(){},removeEventListener:function(){}};
SinaEditor._.OpacityRenderer=function(){this.__canHidden=this.__canShow=!0;this.__node=null;this.__tween=new SinaEditor._.TweenStrategy(0,0,0.6,SinaEditor._.Transition.strongEaseOut);this.__lastState=this.__state="";this.__value=0;this.__node=null;this.__eventDispatcher=new SinaEditor._.EventDispatcher(this);this.__initTweenEvent()}.$implements(SinaEditor._.IRenderer).$define({setCanShow:function(a){this.__canShow=!!a},setCanHidden:function(a){this.__canHidden=!!a},show:function(a){var b=this.__tween;
b.stop();SinaEditor.util.dom.setStyle(a,"opacity",this.__value);a.style.display="";this.__node=a;this.__state="show";this.__eventDispatcher.dispatchEvent("beforeShow");if(this.__canShow)b.startValue=this.__value,b.endValue=1,b.start();return this},hidden:function(a){var b=this.__tween;b.stop();this.__node=a;this.__state="hidden";this.__eventDispatcher.dispatchEvent("beforeHidden");if(this.__canHidden)b.startValue=this.__value,b.endValue=0,b.start();return this},addEventListener:function(a,b){this.__eventDispatcher.addEventListener(a,
b);return this},removeEventListener:function(a,b){this.__eventDispatcher.removeEventListener(a,b);return this},__initTweenEvent:function(){var a=this;this.__tween.addEventListener("tween",function(b){a.__value=b;SinaEditor.util.dom.setStyle(a.__node,"opacity",b)});this.__tween.addEventListener("end",function(){if(a.__node&&a.__node.style.filter)a.__node.style.filter="";if(a.__state!==""&&a.__state!==a.__lastState)a.__lastState=a.__state,a.__eventDispatcher.dispatchEvent(a.__state);if(a.__state===
"hidden")a.__node.style.display="none"})}});
SinaEditor._.SimpleRenderer=function(){this.__canHidden=this.__canShow=!0;this.__eventDispatcher=new SinaEditor._.EventDispatcher(this)}.$implements(SinaEditor._.IRenderer).$define({setCanShow:function(a){this.__canShow=!!a},setCanHidden:function(a){this.__canHidden=!!a},show:function(a){this.__eventDispatcher.dispatchEvent("beforeShow");if(this.__canShow)a.style.display="",this.__eventDispatcher.dispatchEvent("show");return this},hidden:function(a){this.__eventDispatcher.dispatchEvent("beforeHidden");if(this.__canHidden)a.style.display=
"none",this.__eventDispatcher.dispatchEvent("hidden");return this},addEventListener:function(a,b){this.__eventDispatcher.addEventListener(a,b);return this},removeEventListener:function(a,b){this.__eventDispatcher.removeEventListener(a,b);return this}});
SinaEditor._.Transition={simple:function(a,b,c,d){return c*a/d+b},backEaseIn:function(a,b,c,d){return c*(a/=d)*a*(2.70158*a-1.70158)+b},backEaseOut:function(a,b,c,d){return c*((a=a/d-1)*a*(2.70158*a+1.70158)+1)+b},backEaseInOut:function(a,b,c,d){var e=1.70158;if((a/=d/2)<1)return c/2*a*a*(((e*=1.525)+1)*a-e)+b;return c/2*((a-=2)*a*(((e*=1.525)+1)*a+e)+2)+b},bounceEaseOut:function(a,b,c,d){return(a/=d)<1/2.75?c*7.5625*a*a+b:a<2/2.75?c*(7.5625*(a-=1.5/2.75)*a+0.75)+b:a<2.5/2.75?c*(7.5625*(a-=2.25/2.75)*
a+0.9375)+b:c*(7.5625*(a-=2.625/2.75)*a+0.984375)+b},bounceEaseIn:function(a,b,c,d){return c-Transition.bounceEaseOut(d-a,0,c,d)+b},bounceEaseInOut:function(a,b,c,d){return a<d/2?Transition.bounceEaseIn(a*2,0,c,d)*0.5+b:Transition.bounceEaseOut(a*2-d,0,c,d)*0.5+c*0.5+b},regularEaseIn:function(a,b,c,d){return c*(a/=d)*a+b},regularEaseOut:function(a,b,c,d){return-c*(a/=d)*(a-2)+b},regularEaseInOut:function(a,b,c,d){if((a/=d/2)<1)return c/2*a*a+b;return-c/2*(--a*(a-2)-1)+b},strongEaseIn:function(a,b,
c,d){return c*(a/=d)*a*a*a*a+b},strongEaseOut:function(a,b,c,d){return c*((a=a/d-1)*a*a*a*a+1)+b},strongEaseInOut:function(a,b,c,d){if((a/=d/2)<1)return c/2*a*a*a*a*a+b;return c/2*((a-=2)*a*a*a*a+2)+b},elasticEaseIn:function(a,b,c,d){var e,f;if(a===0)return b;if((a/=d)==1)return b+c;f=d*0.3;!e||e<Math.abs(c)?(e=c,c=f/4):c=f/(2*Math.PI)*Math.asin(c/e);return-(e*Math.pow(2,10*(a-=1))*Math.sin((a*d-c)*2*Math.PI/f))+b},elasticEaseOut:function(a,b,c,d){var e,f,g;if(a===0)return b;if((a/=d)==1)return b+
c;f||(f=d*0.3);!e||e<Math.abs(c)?(e=c,g=f/4):g=f/(2*Math.PI)*Math.asin(c/e);return e*Math.pow(2,-10*a)*Math.sin((a*d-g)*2*Math.PI/f)+c+b},elasticEaseInOut:function(a,b,c,d){var e,f,g;if(a===0)return b;if((a/=d/2)==2)return b+c;f||(f=d*0.3*1.5);!e||e<Math.abs(c)?(e=c,g=f/4):g=f/(2*Math.PI)*Math.asin(c/e);if(a<1)return-0.5*e*Math.pow(2,10*(a-=1))*Math.sin((a*d-g)*2*Math.PI/f)+b;return e*Math.pow(2,-10*(a-=1))*Math.sin((a*d-g)*2*Math.PI/f)*0.5+c+b}};
SinaEditor._.TweenStrategy=function(a,b,c,d){this.startValue=a||0;this.endValue=b||0;this.duration=c||0;this.motion=d||SinaEditor._.Transition.simple;this.__eventDispatcher=new SinaEditor._.EventDispatcher(this)}.$define({motion:null,duration:0,startValue:0,endValue:0,_itvID:0,_isTweenning:!1,addEventListener:function(a,b){this.__eventDispatcher.addEventListener(a,b);return this},removeEventListener:function(a,b){this.__eventDispatcher.removeEventListener(a,b);return this},start:function(){if(!this._isTweenning){this._isTweenning=
!0;var a=this,b,c=this.startValue,d=this.endValue,e=this.duration,f,g=(new Date).getTime();this._itvID=window.setInterval(function(){b=((new Date).getTime()-g)/1E3;if(b>a.duration)b=a.duration;f=a.motion(b,c,d-c,e);if(a.onTween)a.onTween(f);a.__eventDispatcher.dispatchEvent("tween",f);b===a.duration&&a.stop()},25);return this}},stop:function(){window.clearInterval(this._itvID);this._isTweenning=!1;if(this.onEnd)this.onEnd();this.__eventDispatcher.dispatchEvent("end");return this},onTween:function(){},
onEnd:function(){}});SinaEditor._.IDragger={addEventListener:function(){},removeEventListener:function(){},setDrag:function(){},setLock:function(){},setArea:function(){},destroy:function(){}};
SinaEditor._.BorderDragger=function(){this.__drag=null;this.__isBindEvent=!1;this.__dragNode=this.__border=null;this.__isCreated=!1;this.__tweenX=new SinaEditor._.TweenStrategy(0,0,0.5,SinaEditor._.Transition.strongEaseOut);this.__tweenY=new SinaEditor._.TweenStrategy(0,0,0.5,SinaEditor._.Transition.strongEaseOut);this.__eventDispatcher=new SinaEditor._.EventDispatcher(this)}.$implements(SinaEditor._.IDragger).$define({addEventListener:function(a,b){a.toLowerCase()==="afterdrag"?this.__eventDispatcher.addEventListener(a,
b):this.__drag.addEventListener(a,b);return this},removeEventListener:function(a,b){a.toLowerCase()==="afterdrag"?this.__eventDispatcher.removeEventListener(a,b):this.__drag.removeEventListener(a,b);return this},setDrag:function(a,b,c){this.__isCreated||(this.__createBorder(b),this.__initTweenEvent(b));this.__drag=new SinaEditor._.Drag(a,this.__border,c);this.__dragNode=b;this.__initDragEvent();return this},setLock:function(a){this.__drag.isLock=!!a;return this},setArea:function(a){this.__drag.lockArea=
a;return this},destroy:function(){this.__drag.destroy()},__createBorder:function(){this.__border=SinaEditor.util.dom.createDom("div");var a=this.__border.style;a.border="2px dashed #BCC4D0";a.position="absolute";a.display="none";a.backgroundColor="transparent";a.MozUserSelect="none";document.body.appendChild(this.__border);this.__isCreated=!0},__initDragEvent:function(){if(!this.__isBindEvent){var a=this,b=this.__border.style,c=this.__dragNode.style,d=this.__tweenX,e=this.__tweenY;this.__drag.addEventListener("beforeDrag",
function(){b.zIndex=c.zIndex+1;b.position=c.position;b.width=a.__dragNode.offsetWidth-4+"px";b.height=a.__dragNode.offsetHeight-4+"px";b.left=parseInt(c.left,10)+"px";b.top=parseInt(c.top,10)+"px";b.display=""});this.__drag.addEventListener("afterDrag",function(){SinaEditor.env.$IE6?(c.left=parseInt(b.left,10)+"px",c.top=parseInt(b.top,10)+"px",b.display="none",a.__eventDispatcher.dispatchEvent("afterDrag")):(d.startValue=parseInt(c.left,10),d.endValue=parseInt(b.left,10),e.startValue=parseInt(c.top,
10),e.endValue=parseInt(b.top,10),d.start(),e.start())});this.__isBindEvent=!0}},__initTweenEvent:function(a){var b=a.style,c=this.__border.style,d=this;this.__tweenX.addEventListener("tween",function(a){b.left=a+"px"});this.__tweenY.addEventListener("tween",function(a){b.top=a+"px"});this.__tweenX.addEventListener("end",function(){c.display="none";d.__eventDispatcher.dispatchEvent("afterDrag")})}});
SinaEditor._.SimpleDragger=function(){this.__drag=null;this.__eventDispatcher=new SinaEditor._.EventDispatcher(this)}.$implements(SinaEditor._.IDragger).$define({addEventListener:function(a,b){a.toLowerCase()==="afterdrag"?this.__eventDispatcher.addEventListener(a,b):this.__drag.addEventListener(a,b);return this},removeEventListener:function(a,b){a.toLowerCase()==="afterdrag"?this.__eventDispatcher.removeEventListener(a,b):this.__drag.removeEventListener(a,b);return this},setDrag:function(a,b,c){var d=
this;this.__drag=new SinaEditor._.Drag(a,b,c);this.__drag.addEventListener("afterDrag",function(){d.__eventDispatcher.dispatchEvent("afterDrag")});return this},setLock:function(a){this.__drag.isLock=!!a;return this},setArea:function(a){this.__drag.lockArea=a;return this},destroy:function(){this.__drag.destroy()}});
(function(){function a(a){return typeof a!=="string"&&String.prototype.slice.call(a,0,8)=="function"}function b(a,b){var e=b.call(a);return typeof e==="string"||typeof e==="number"?e:null}SinaEditor._.defineGetter=function(c,d,e){if(d instanceof Array&&e instanceof Array)for(var f=Math.min(d.length,e.length);f--;)typeof d[f]==="string"&&a(e[f])&&(c[d[f]]={valueOf:function(a){return function(){return b(c,e[a])}}(f),toString:this.valueOf});else typeof d==="string"&&a(e)&&(c[d]={valueOf:function(){return b(c,
e)},toString:this.valueOf})}})();
SinaEditor._.DisplayObject=function(a,b){SinaEditor._.defineGetter(this,["x","y","z","width","height"],[this.__getX,this.__getY,this.__getZ,this.__getWidth,this.__getHeight]);this.__renderer=null;this.__entity=b;this.__isInited=!1;this.__parent=a||document.body;var c=this.__eventDispatcher=new SinaEditor._.EventDispatcher(this);this.__onBeforeShow=function(){c.dispatchEvent("beforeShow")};this.__onShow=function(){c.dispatchEvent("show")};this.__onBeforeHidden=function(){c.dispatchEvent("beforeHidden")};this.__onHidden=
function(){c.dispatchEvent("hidden")};this.__updateRenderer(SinaEditor._.SimpleRenderer)}.$define({setPosition:function(a){this.__isInited||this.__initEntity();if(typeof a.x!=="undefined")this.__entity.style.left=a.x+"px";if(typeof a.y!=="undefined")this.__entity.style.top=a.y+"px";if(typeof a.z!=="undefined")this.__entity.style.zIndex=a.z;return this},setSize:function(a){this.__isInited||this.__initEntity();if(typeof a.width!=="undefined")this.__entity.style.width=a.width+"px";if(typeof a.height!==
"undefined")this.__entity.style.height=a.height+"px";return this},setRenderer:function(a){this.__isInited||this.__initEntity();this.__updateRenderer(a);return this},show:function(a){this.__isInited||this.__initEntity();this.__updateRenderer(a);this.__renderer.show(this.__entity);return this},hidden:function(a){this.__isInited||this.__initEntity();this.__updateRenderer(a);this.__renderer.hidden(this.__entity);return this},setCanShow:function(a){this.__renderer.setCanShow(a);return this},setCanHidden:function(a){this.__renderer.setCanHidden(a);
return this},addEventListener:function(a,b){this.__eventDispatcher.addEventListener(a,b);return this},removeEventListener:function(a,b){this.__eventDispatcher.removeEventListener(a,b);return this},destroy:function(){if(this.__entity)this.__isInited||this.__initEntity(),this.__entity.parentNode&&this.__entity.parentNode.removeChild(this.__entity),this.__entity=null},__initEntity:function(){var a;if(!this.__entity)this.__entity=SinaEditor.util.dom.createDom("div");a=this.__entity.style;a.position="absolute";
a.left=0;a.top=0;a.zIndex=0;this.__entity.parentNode||this.__parent.appendChild(this.__entity);this.__isInited=!0},__updateRenderer:function(a){if(a){var b=function(){this.__renderer.addEventListener("beforeShow",this.__onBeforeShow).addEventListener("show",this.__onShow).addEventListener("beforeHidden",this.__onBeforeHidden).addEventListener("hidden",this.__onHidden)};if(this.__renderer){if(this.__renderer.constructor!==a)this.__renderer.removeEventListener("beforeShow",this.__onBeforeShow).removeEventListener("show",
this.__onShow).removeEventListener("beforeHidden",this.__onBeforeHidden).removeEventListener("hidden",this.__onHidden),this.__renderer=new a,b.call(this)}else this.__renderer=new a,b.call(this)}},__getX:function(){this.__isInited||this.__initEntity();return parseInt(this.__entity.style.left,10)},__getY:function(){this.__isInited||this.__initEntity();return parseInt(this.__entity.style.top,10)},__getZ:function(){this.__isInited||this.__initEntity();return parseInt(this.__entity.style.zIndex,10)},__getWidth:function(){this.__isInited||
this.__initEntity();return this.__getSize(this.__entity,"offsetWidth")},__getHeight:function(){this.__isInited||this.__initEntity();return this.__getSize(this.__entity,"offsetHeight")},__getSize:function(a,b){var c,d=a.style.visibility;a.style.display=="none"?(a.style.visibility="hidden",a.style.display="",c=a[b],a.style.display="none",a.style.visibility=d):c=a[b];return c}});
SinaEditor._.Drag=function(a,b,c){var d=this;this.canDrag=!0;this.isLock=!1;this.lockArea={left:0,right:0,top:0,bottom:0};this.__captureNode=a;this.__dragNodes=[];this.__deltaX=[];this.__deltaY=[];this.__eventDispatcher=new SinaEditor._.EventDispatcher(this);this.__isDraging=!1;this.__canDragY=this.__canDragX=!0;this.__dragHandle=function(){d.__drag()};this.__mouseDownHandle=function(){d.__isDraging=!0;d.__eventDispatcher.dispatchEvent("beforeDrag");d.__setCapture(!0)};this.__mouseUpHandle=function(){d.__isDraging&&
d.__eventDispatcher.dispatchEvent("afterDrag");d.__isDraging=!1;d.__setCapture(!1)};this.__initNodes(a,b,c);this.__initCaputerNode()}.$define({addEventListener:function(a,b){this.__eventDispatcher.addEventListener(a,b);return this},__getEvent:function(){if(window.event)return window.event;for(var a=arguments.callee.caller,b,c=0;a!==null&&c<40;){if((b=a.arguments[0])&&(b.constructor==Event||b.constructor==MouseEvent))break;c++;a=a.caller}return b},removeEventListener:function(a,b){this.__eventDispatcher.removeEventListener(a,
b);return this},destroy:function(){SinaEditor.ev.remove(this.__captureNode,"mousedown",this.__mouseDownHandle);SinaEditor.ev.remove(document,"mouseup",this.__mouseUpHandle);this.__dragNodes=this.__captureNode=null},__initNodes:function(a,b,c){b?(b instanceof Array?this.__dragNodes=b:this.__dragNodes.push(b),(typeof c==="undefined"||c)&&this.__dragNodes.push(this.__captureNode)):this.__dragNodes.push(this.__captureNode);a=this.__dragNodes;for(b=a.length;b--;){if(!a[b].style.position)a[b].style.position=
"absolute";if(!a[b].style.left)a[b].style.left=0;if(!a[b].style.top)a[b].style.top=0}},__initCaputerNode:function(){SinaEditor.ev.add(this.__captureNode,"mousedown",this.__mouseDownHandle);SinaEditor.ev.add(document,"mouseup",this.__mouseUpHandle)},__setCapture:function(a){for(var b=this.__captureNode,c=this.__dragNodes,d=this.__getEvent(),e=c.length;e--;)this.__deltaX[e]=d.clientX-parseInt(c[e].style.left,10),this.__deltaY[e]=d.clientY-parseInt(c[e].style.top,10);a?SinaEditor.env.$IE?(b.setCapture(),
SinaEditor.ev.add(b,"mousemove",this.__dragHandle)):SinaEditor.ev.add(document,"mousemove",this.__dragHandle):SinaEditor.env.$IE?(b.releaseCapture(),SinaEditor.ev.remove(b,"mousemove",this.__dragHandle)):SinaEditor.ev.remove(document,"mousemove",this.__dragHandle)},__drag:function(){if(this.canDrag){var a=this.__dragNodes,b=this.__getEvent(),c=a.length,d=this.lockArea,e=0,f=0;for(this.__eventDispatcher.dispatchEvent("drag");c--;)e=b.clientX-this.__deltaX[c],f=b.clientY-this.__deltaY[c],this.isLock&&
(e=Math.min(Math.max(e,d.left),d.right),f=Math.min(Math.max(f,d.top),d.bottom)),a[c].style.left=e+"px",a[c].style.top=f+"px"}}});
SinaEditor._.EventDispatcher=function(a){this.__target=a;this.__events={}}.$define({addEventListener:function(a,b){if(this.__checkFunction(b)){var c=this.__events,a=a.toLowerCase();c[a]||(c[a]=[]);c[a].push(b)}},removeEventListener:function(a,b){var c=this.__events[a];a.toLowerCase();if(this.__checkFunction(b)&&c&&c.length)for(var d=0,d=c.length-1;d>=0;d--)c[d]===b&&c.splice(d,1)},dispatchEvent:function(a){var a=a.toLowerCase(),b=this.__events[a];if(b&&b.length){var c=Array.prototype.slice.call(arguments,
0),d=0;c.shift();d=0;for(l=b.length;d<l;d++)b[d].apply(this.__target,c)}},__checkFunction:function(a){return typeof a!=="string"&&String.prototype.slice.call(a,0,8)=="function"}});
SinaEditor._.IE6FixedController=function(){var a=this;this.iframeNode=this.node=null;this.__orgY=this.__orgX=0;this.__isBindScroll=!1;this.__fixedHandle=function(){if(a.node)a.node.style.left=document.documentElement.scrollLeft+a.__orgX+"px",a.node.style.top=document.documentElement.scrollTop+a.__orgY+"px";if(a.iframeNode)a.iframeNode.style.left=a.node.style.left,a.iframeNode.style.top=a.node.style.top}}.$define({setFixed:function(a,b){this.updateOrgPosition();if(b&&!this.__isBindScroll)SinaEditor.ev.add(window,
"scroll",this.__fixedHandle),this.__isBindScroll=!0;if(!b&&this.__isBindScroll)SinaEditor.ev.remove(window,"scroll",this.__fixedHandle),this.__isBindScroll=!1},setPosition:function(a,b,c){if(typeof c.x!=="undefined")b?(a.style.left=c.x+document.documentElement.scrollLeft+"px",this.__orgX=parseInt(this.node.style.left,10)-document.documentElement.scrollLeft):a.style.left=c.x+"px";if(typeof c.y!=="undefined")b?(a.style.top=c.y+document.documentElement.scrollTop+"px",this.__orgY=parseInt(this.node.style.top,
10)-document.documentElement.scrollTop):a.style.top=c.y+"px";if(typeof c.z!=="undefined")a.style.zIndex=c.z},getX:function(a,b){return b?parseInt(a.style.left,10)-document.documentElement.scrollLeft:parseInt(a.style.left,10)},getY:function(a,b){return b?parseInt(a.style.top,10)-document.documentElement.scrollTop:parseInt(a.style.top,10)},updateIframe:function(a){this.setFixed(this.iframeNode,a);a&&this.__fixedHandle()},updateOrgPosition:function(){if(this.node)this.__orgX=parseInt(this.node.style.left,
10)-document.documentElement.scrollLeft,this.__orgY=parseInt(this.node.style.top,10)-document.documentElement.scrollTop},destroy:function(){SinaEditor.ev.remove(window,"scroll",this.__fixedHandle);this.__isBindScroll=!1;this.iframeNode=this.node=null}});
SinaEditor._.Panel=function(){this.nodes={};this.uniqueID=this.__getUniqueID();this.__iframe=this.entity=null;this.__isSetAdamant=!1;this.__templateNodesIDs=[];this.__isFixed=!1;if(SinaEditor.env.$IE6)this.__ie6FixedController=new SinaEditor._.IE6FixedController}.$extends(SinaEditor._.DisplayObject).$define({setTemplate:function(a){var b=SinaEditor.util.dom.createDom("div",{properties:{innerHTML:(new SinaEditor.$abstract.Template(a)).evaluate(this.__getNodes(a,"i"))}});b.style.display="none";this.__parent.appendChild(b);
this.__updateTemplate(b);this.nodes=this.__getNodes(a);this.entity=this.__entity;this.nodes.panel=this.entity;return this},setFixed:function(a){this.__isInited||this.__initEntity();var b=parseInt(this.__entity.style.left,10),c=parseInt(this.__entity.style.top,10);if(SinaEditor.env.$IE6)this.__ie6FixedController.setFixed(this.__entity,a),this.__isSetAdamant&&this.__ie6FixedController.setFixed(this.__iframe,a);else{if(a&&!this.__isFixed)this.setPosition({x:b-Math.max(document.documentElement.scrollLeft,
document.body.scrollLeft),y:c-Math.max(document.documentElement.scrollTop,document.body.scrollTop)}),this.__entity.style.position="fixed";if(!a&&this.__isFixed)this.setPosition({x:b+Math.max(document.documentElement.scrollLeft,document.body.scrollLeft),y:c+Math.max(document.documentElement.scrollTop,document.body.scrollTop)}),this.__entity.style.position="absolute"}this.__isFixed=!!a;this.__updateIframe();return this},setAdamant:function(a){(this.__isSetAdamant=!!a)&&!this.__iframe&&this.__createIframe();
this.__updateIframe();return this},destroy:function(){this.__entity&&(SinaEditor._.Panel.$super.destroy.call(this),this.__ie6FixedController&&this.__ie6FixedController.destroy(),this.__iframe&&this.__iframe.parentNode.removeChild(this.__iframe))},setPosition:function(a){this.__isInited||this.__initEntity();SinaEditor.env.$IE6?this.__ie6FixedController.setPosition(this.__entity,this.__isFixed,a):SinaEditor._.Panel.$super.setPosition.call(this,a);this.__updateIframe();return this},setSize:function(a){SinaEditor._.Panel.$super.setSize.call(this,
a).__updateIframe();return this},show:function(a){SinaEditor._.Panel.$super.show.call(this,a).__updateIframe();return this},hidden:function(a){SinaEditor._.Panel.$super.hidden.call(this,a).__updateIframe();return this},__getX:function(){this.__isInited||this.__initEntity();return SinaEditor.env.$IE6?this.__ie6FixedController.getX(this.__entity,this.__isFixed):parseInt(this.__entity.style.left,10)},__getY:function(){this.__isInited||this.__initEntity();return SinaEditor.env.$IE6?this.__ie6FixedController.getY(this.__entity,
this.__isFixed):parseInt(this.__entity.style.top,10)},__createIframe:function(){this.__iframe=SinaEditor.util.dom.createDom("iframe",{attributes:{frameBorder:"none"}});this.__parent.insertBefore(this.__iframe,this.__entity);SinaEditor.util.dom.setStyle(this.__iframe,"opacity",0);if(this.__ie6FixedController)this.__ie6FixedController.iframeNode=this.__iframe;this.__updateIframe()},__updateIframe:function(){if(this.__iframe){var a=this.__iframe.style;a.backgroundColor="#ffffff";a.left=this.x+"px";a.top=
this.y+"px";a.width=this.width+"px";a.height=this.height+"px";a.position=this.__entity.style.position;a.display=this.__entity.style.display;a.zIndex=this.__entity.style.zIndex;SinaEditor.env.$IE6&&this.__ie6FixedController.updateIframe(this.__isFixed)}},__updateIE6FCOrgPosition:function(){this.__ie6FixedController&&this.__ie6FixedController.updateOrgPosition()},__updateTemplate:function(a){var b,c,d,e,f,g=this.__entity;g?(g.parentNode&&g.parentNode.removeChild(g),b=g.style.left,c=g.style.top,d=g.style.zIndex,
e=g.style.position,f=g.style.display):f="none";g=this.__entity=SinaEditor.util.dom.$E("_"+this.uniqueID+"_panel");if(!g)g=this.__entity=SinaEditor.util.dom.$E("_"+this.uniqueID+"_entity");if(!g)throw Error("[Panel Error]there missing identifier #{panel} in panel template");g.style.left=b||0;g.style.top=c||0;g.style.zIndex=d||0;g.style.position=e||"absolute";g.style.display=f;this.__parent.replaceChild(g,a);if(this.__ie6FixedController)this.__ie6FixedController.node=this.__entity},__getNodes:function(a,
b){var c=b||"o",d,e={},f,g;if(f=this.__templateNodesIDs=a.match(/\{[^\}]+(?=\})/g))for(d=f.length;d--;)switch(g=f[d].replace("{",""),c){case "o":e[g]=SinaEditor.util.dom.$E("_"+this.uniqueID+"_"+g);break;case "i":e[g]="_"+this.uniqueID+"_"+g}return e},__getUniqueID:function(){return parseInt(Math.random()*1E3,10).toString()+(new Date).getTime().toString()},setContent:function(a){if(this.nodes.content)this.nodes.content.innerHTML=a}});
SinaEditor._.Dialog=function(){var a=this;this.__dragger=null;this.__isBindUpdateIE6AreaEvent=this.__isBindUpadateAreaEvent=!1;this.__beforeDragHandle=function(){a.__updateDraggerArea();a.__eventDispatcher.dispatchEvent("beforedrag")};this.__dragHandle=function(){a.__isSetAdamant&&a.__updateIframe();a.__eventDispatcher.dispatchEvent("drag")};this.__afterDragHandle=function(){a.__isFixed&&SinaEditor.env.$IE6&&a.__updateIE6FCOrgPosition();a.__eventDispatcher.dispatchEvent("afterdrag")};this.__updateDraggerAreaHandle=
function(){setTimeout(function(){a.__updateDraggerArea()},1)};this.__setMiddleHandle=function(){a.setMiddle()}}.$extends(SinaEditor._.Panel).$define({setTemplate:function(a){SinaEditor._.Dialog.$super.setTemplate.call(this,a);this.__initTitleBar();this.setDragger(SinaEditor._.SimpleDragger);return this},setContent:function(a){if(!this.nodes.content)return this;this.nodes.content.innerHTML=(new SinaEditor.$abstract.Template(a)).evaluate(this.__getNodes(a,"i"));this.__addContentNodes(this.__getNodes(a));
return this},setFixed:function(a){SinaEditor._.Dialog.$super.setFixed.call(this,a);a?SinaEditor.ev.add(window,"resize",this.__setMiddleHandle):SinaEditor.ev.remove(window,"resize",this.__setMiddleHandle);this.__updateDraggerArea();return this},setMiddle:function(){var a=this.__getDocumentSize().height-this.height,b=(Math.sqrt(5)-1)/2,a=a*b/(b+1),b=this.__getDocumentSize().width/2-this.width/2;this.__isFixed||(a+=Math.max(document.documentElement.scrollTop,document.body.scrollTop),b+=Math.max(document.documentElement.scrollLeft,
document.body.scrollLeft));this.setPosition({x:Math.max(b,0),y:Math.max(a,0)});return this},setAreaLocked:function(a){if(!this.__dragger)return this;this.__dragger.setLock(a);return this},setSize:function(a){this.__isInited||this.__initEntity();if(this.nodes.content){if(typeof a.width!=="undefined")this.nodes.content.style.width=a.width+"px";if(typeof a.height!=="undefined")this.nodes.content.style.height=a.height+"px"}else{if(typeof a.width!=="undefined")this.__entity.style.width=a.width+"px";if(typeof a.height!==
"undefined")this.__entity.style.height=a.height+"px"}return this},setDragger:function(a){if(!this.nodes.titleBar||!a)return this;if(this.__dragger){if(this.__dragger.constructor===a)return this}else this.__dragger=new a;this.__updateDragger(a);return this},destroy:function(){this.__entity&&(SinaEditor._.Dialog.$super.destroy.call(this),SinaEditor.ev.remove(window,"resize",this.__updateDraggerAreaHandle),SinaEditor.ev.remove(window,"resize",this.__setMiddleHandle))},__addContentNodes:function(a){var b=
this.nodes,c;for(c in a)b[c]=a[c]},__updateDragger:function(a){if(this.__dragger.constructor!==a)this.__dragger.removeEventListener("beforedrag",this.__beforeDragHandle).removeEventListener("drag",this.__dragHandle).removeEventListener("afterdrag",this.__afterDragHandle),this.__dragger.destroy(),this.__dragger=new a;this.__dragger.setDrag(this.nodes.titleBar,this.__entity,!1);this.__dragger.addEventListener("beforedrag",this.__beforeDragHandle).addEventListener("drag",this.__dragHandle).addEventListener("afterdrag",
this.__afterDragHandle)},__updateDraggerArea:function(){var a,b,c,d;this.__isFixed?(a=SinaEditor.env.$IE6?document.documentElement.scrollLeft:0,b=SinaEditor.env.$IE6?document.documentElement.scrollTop:0,c=SinaEditor.env.$IE6?document.documentElement.scrollLeft+this.__getDocumentSize().width-this.width:this.__getDocumentSize().width-this.width,d=SinaEditor.env.$IE6?document.documentElement.scrollTop+this.__getDocumentSize().height-this.height:this.__getDocumentSize().height-this.height):(b=a=0,c=document.documentElement.scrollWidth-
this.width,d=document.documentElement.scrollHeight-this.height);this.__dragger.setArea({left:a,top:b,right:c,bottom:d})},__initTitleBar:function(){if(this.nodes.titleBar){var a=this.nodes.titleBar;a.style.cursor="move";SinaEditor.env.$IE?SinaEditor.ev.add(a,"selectstart",function(){return!1}):a.style.MozUserSelect="none"}},__getDocumentSize:function(){return{width:document.documentElement.clientWidth||document.body.clientWidth,height:document.documentElement.clientHeight||document.body.clientHeight}}});
SinaEditor._.ModuleDialog=function(a,b,c){this.__dialog=this.__bgShadow=null;this.__isInitBgShadow=!1;this.__tplConfig=a;this.__iconSet=b;this.__dialogQueue=[];this.__zIndex=1024;this.__cfg=c||{}}.$define({alert:function(a,b){var b=b||{},c=this.__createMessageDialog(this.__tplConfig.alert,b);if(c.nodes.text)c.nodes.text.innerHTML=a||"";c.show(b.renderer||this.__cfg.renderer).addEventListener("hidden",function(){this.destroy()});c.nodes.linkOk&&c.nodes.linkOk.style.display!=="none"&&c.nodes.linkOk.focus();
return c},confirm:function(a,b){var b=b||{},c=this.__createMessageDialog(this.__tplConfig.confirm,b),d=this;if(c.nodes.text)c.nodes.text.innerHTML=a||"";if(c.nodes.btnCancel)c.nodes.btnCancel.innerHTML=b.textCancel||"\u53d6\u6d88",SinaEditor.ev.add(c.nodes.btnCancel,"click",function(a){b.funcCancel&&b.funcCancel.call(c);c.hidden(b.renderer||d.__cfg.renderer);SinaEditor.ev.stopEvent(a)}),c.nodes.linkCancel&&SinaEditor.ev.add(c.nodes.linkCancel,"keydown",function(){d.__getEvent().keyCode=="13"&&(b.funcCancel&&
b.funcCancel.call(c),c.hidden(b.renderer||d.__cfg.renderer))});c.show(b.renderer||d.__cfg.renderer).addEventListener("hidden",function(){this.destroy()});parseInt(b.defaultButton,10)===0?c.nodes.linkCancel&&c.nodes.linkCancel.style.display!=="none"&&c.nodes.linkCancel.focus():c.nodes.linkOk&&c.nodes.linkOk.style.display!=="none"&&c.nodes.linkOk.focus();return c},create:function(a){var a=a||{},b=new SinaEditor._.Dialog;b.setTemplate(a.tpl||this.__tplConfig.customs);a.content&&b.setContent(a.content);
a.width&&!isNaN(a.width)&&b.setSize({width:a.width});a.height&&!isNaN(a.height)&&b.setSize({height:a.height});return this.__initDialog(b,a)},__createMessageDialog:function(a,b){var c=new SinaEditor._.Dialog,d=this;c.setTemplate(a);b.width&&!isNaN(b.width)&&c.setSize({width:b.width});b.height&&!isNaN(b.height)&&c.setSize({height:b.height});if(c.nodes.subText)c.nodes.subText.innerHTML=b.subText||"";if(c.nodes.icon)c.nodes.icon.className=this.__iconSet[b.icon||"01"]["class"],c.nodes.icon.alt=this.__iconSet[b.icon||
"01"].alt;if(c.nodes.btnOk)c.nodes.btnOk.innerHTML=b.textOk||"\u786e\u5b9a",SinaEditor.ev.add(c.nodes.btnOk,"click",function(a){c.hidden(b.renderer||d.__cfg.renderer);b.funcOk&&b.funcOk.call(c);SinaEditor.ev.stopEvent(a)});c.nodes.linkOk&&SinaEditor.ev.add(c.nodes.linkOk,"keydown",function(){d.__getEvent().keyCode=="13"&&(c.hidden(b.renderer||d.__cfg.renderer),b.funcOk&&b.funcOk.call(c))});c.setDragger(b.dragger||d.__cfg.dragger).setFixed(!0).setAreaLocked(!0);return this.__initDialog(c,b)},__initDialog:function(a,
b){var c=this;if(a.nodes.titleName)a.nodes.titleName.innerHTML=b.title||"\u63d0\u793a";a.nodes.btnClose&&(SinaEditor.ev.add(a.nodes.btnClose,"click",function(){var c=!0;b.funcBeforeClose&&(c=b.funcBeforeClose.call(a)!==!1);b.funcClose&&b.funcClose.call(a);c&&a.hidden()}),SinaEditor.ev.add(a.nodes.btnClose,"mousedown",function(a){SinaEditor.ev.stopEvent(a)}));a.setPosition({z:c.__zIndex}).setRenderer(b.renderer||this.__cfg.renderer).setDragger(b.dragger||this.__cfg.dragger).setMiddle().addEventListener("beforeHidden",
function(){c.__updateDialogQueue(this,"remove")}).addEventListener("beforeShow",function(){var a=this;c.__isInitBgShadow||c.__initBGShadow(this,b.isAdamant||c.__cfg.isAdamant);c.__setBGShadowOpacity(b.bgShadowOpacity!==0?b.bgShadowOpacity||0.4:b.bgShadowOpacity);window.setTimeout(function(){c.__bgShadow.show();c.__updateDialogQueue(a,"add")},1)});a.setTitle=function(a){if(this.nodes.titleName)this.nodes.titleName.innerHTML=a};a.setHelp=function(a){if(this.nodes.btnHelp)this.nodes.btnHelp.href=a};
a.close=function(){this.hidden()};a.getNodes=function(){return this.nodes};a.getX=function(){return this.x};a.getY=function(){return this.y};a.getWidth=function(){return this.width};a.getHeight=function(){return this.height};return a},__initBGShadow:function(a,b){var c=this.__getDocumentSize().width,d=this.__getDocumentSize().height,e=this;this.__bgShadow=new SinaEditor._.Panel;this.__bgShadow.setTemplate('<div id="#{panel}" style="background-color:black"></div>').setSize({width:c,height:d}).setAdamant(b).setFixed(!0).setPosition({x:0,
y:0,z:e.__zIndex});SinaEditor.ev.add(window,"resize",function(){e.__bgShadow.setPosition({x:0,y:0}).setSize({width:e.__getDocumentSize().width,height:e.__getDocumentSize().height})});this.__bgShadow.nodes.panel.parentNode.insertBefore(this.__bgShadow.nodes.panel,a.nodes.panel);this.__isInitBgShadow=!0},__updateDialogQueue:function(a,b){var c;if(b==="add")this.__dialogQueue.push(a);else if(b==="remove")for(c=this.__dialogQueue.length;c--;)this.__dialogQueue[c]===a&&this.__dialogQueue.splice(c,1);this.__dialogQueue.length===
0?this.__bgShadow.hidden():(c=this.__dialogQueue[this.__dialogQueue.length-1],c.nodes.panel.parentNode.appendChild(c.nodes.panel),this.__bgShadow.nodes.panel.parentNode.insertBefore(this.__bgShadow.nodes.panel,c.nodes.panel),this.__bgShadow.__iframe&&this.__bgShadow.__iframe.parentNode.insertBefore(this.__bgShadow.__iframe,this.__bgShadow.nodes.panel),c.nodes.linkOk&&c.nodes.linkOk.style.display!=="none"&&c.nodes.linkOk.focus())},__setBGShadowOpacity:function(a){a=isNaN(a)?0:Math.max(Math.min(a,1),
0);SinaEditor.util.dom.setStyle(this.__bgShadow.nodes.panel,"opacity",a)},__getDocumentSize:function(){return{width:document.documentElement.clientWidth||document.body.clientWidth,height:document.documentElement.clientHeight||document.body.clientHeight}},__getEvent:function(){if(window.event)return window.event;for(var a=arguments.callee.caller,b,c=0;a!==null&&c<40;){if((b=a.arguments[0])&&(b.constructor==Event||b.constructor==MouseEvent))break;c++;a=a.caller}return b}});SinaEditor.winDialog={};
(function(){var a={alert:'<table id="#{panel}" class="CP_w"><thead id="#{titleBar}"><tr><th class="tLeft"><span></span></th><th class="tMid"><div class="bLyTop"><strong id="#{titleName}">\u63d0\u793a\u6807\u9898</strong><cite><a id="#{btnClose}" href="#" onclick="return false;" class="CP_w_shut" title="\u5173\u95ed">\u5173\u95ed</a></cite></div></th><th class="tRight"><span></span></th></tr></thead><tfoot><tr><td class="tLeft"><span></span></td><td class="tMid"><span></span></td><td class="tRight"><span></span></td></tr></tfoot><tbody><tr><td class="tLeft"><span></span></td><td class="tMid"><div id="#{content}" class="CP_layercon1"><div class="CP_prompt"><img id="#{icon}" class="SG_icon SG_icon201" width="50" height="50" align="absmiddle"/><table class="CP_w_ttl"><tr><td id="#{text}"></td></tr></table><div id="#{subText}" class="CP_w_cnt SG_txtb"></div><p class="CP_w_btns_Mid"><a id="#{linkOk}" class="SG_aBtn SG_aBtnB" href="#" onclick="return false;"><cite id="#{btnOk}"> </cite></a></p></div></div></td><td class="tRight"><span></span></td></tr></tbody></table>',
confirm:['<table id="#{panel}" class="CP_w"><thead id="#{titleBar}"><tr><th class="tLeft"><span></span></th><th class="tMid"><div class="bLyTop"><strong id="#{titleName}">\u63d0\u793a\u6807\u9898</strong><cite><a id="#{btnClose}" href="#" onclick="return false;" class="CP_w_shut" title="\u5173\u95ed">\u5173\u95ed</a></cite></div></th><th class="tRight"><span></span></th></tr></thead><tfoot><tr><td class="tLeft"><span></span></td><td class="tMid"><span></span></td><td class="tRight"><span></span></td></tr></tfoot><tbody><tr><td class="tLeft"><span></span></td><td class="tMid"><div id="#{content}" class="CP_layercon1"><div class="CP_prompt"><img id="#{icon}" class="SG_icon SG_icon201" src="',
SinaEditor.CONF.transparentIMG,'" width="50" height="50" align="absmiddle"/><table class="CP_w_ttl"><tr><td id="#{text}"></td></tr></table><div id="#{subText}" class="CP_w_cnt SG_txtb"></div><p class="CP_w_btns"><a  id="#{linkOk}" class="SG_aBtn SG_aBtnB" href="#" onclick="return false;"><cite id="#{btnOk}"></cite></a><a style="margin-left:5px;" id="#{linkCancel}" class="SG_aBtn SG_aBtnB" href="#" onclick="return false;"><cite id="#{btnCancel}"> <span id="#{cancel}"></span> </cite></a></p></div></div></td><td class="tRight"><span></span></td></tr></tbody></table>'].join(""),
customs:'<table id="#{panel}" class="CP_w"><thead id="#{titleBar}"><tr><th class="tLeft"><span></span></th><th class="tMid"><div class="bLyTop"><strong id="#{titleName}">\u63d0\u793a\u6807\u9898</strong><cite><a id="#{btnClose}" href="#" onclick="return false;" class="CP_w_shut" title="\u5173\u95ed">\u5173\u95ed</a></cite></div></th><th class="tRight"><span></span></th></tr></thead><tfoot><tr><td class="tLeft"><span></span></td><td class="tMid"><span></span></td><td class="tRight"><span></span></td></tr></tfoot><tbody><tr><td class="tLeft"><span></span></td><td class="tMid" id="#{content}"></td><td class="tRight"><span></span></td></tr></tbody></table>'};
SinaEditor.winDialog=new SinaEditor._.ModuleDialog(a,{1:{"class":"SG_icon SG_icon201",alt:"\u8b66\u544a"},2:{"class":"SG_icon SG_icon202",alt:"\u5931\u8d25"},3:{"class":"SG_icon SG_icon203",alt:"\u6210\u529f"},4:{"class":"SG_icon SG_icon204",alt:"\u8be2\u95ee"}},{renderer:SinaEditor._.OpacityRenderer,dragger:SinaEditor._.BorderDragger,isAdamant:SinaEditor.env.$IE6})})();