'use strict';

var prime = require('prime'),
	$ = require('elements'),
	forOwn = require('mout/object/forOwn'),
	isObject = require('mout/lang/isObject'),
	FieldBase = require('informal').fields.base;

var Builder = require('builder');

var FieldZoneBuilder = prime({
	inherits: FieldBase,

	constructor: function(spec, value){
		if (!(this instanceof FieldZoneBuilder)){
			return new FieldZoneBuilder(spec, value);
		}
		FieldBase.call(this, spec, value);
	},

	build: function(template){
		if (this.wrap) return;

		var li = document.createElement('li');
		li.innerHTML = '<div class="builder">' +
			'<div class="builder--template">' +
			'</div>' +
			'<div class="builder--block-types">' +
				'<ul>' +
					'<li data-block-type="content">Content</li>' +
				'</ul>' +
			'</div>' +
		'</div>';

		this.wrap = $(li);

		this.builder = new Builder(li.querySelector('.builder'));

		if (template){
			this.builder.setTemplate(template);
			if (isObject(this.value)){
				var self = this, i;
				forOwn(this.value, function(blocks, zoneName){
					for (i = 0; i < blocks.length; i++){
						self.builder.addBlock(zoneName, blocks[i].type, blocks[i].style, blocks[i].properties);
					}
				});
			}
		}
	},

	notify: function(name, value){
		if (name == 'template'){
			if (this.builder){
				this.builder.setTemplate(value);
			} else {
				this.build(value);
			}
		}
	},

	serialize: function(){
		return this.builder.serialize();
	}
});

module.exports = FieldZoneBuilder;
