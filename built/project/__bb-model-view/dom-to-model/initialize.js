define(["require","exports","module","lodash","./update","./bind-input"],function(e,t,n){var r=e("lodash"),i=e("./update"),s=e("./bind-input");n.exports=function(){this.$els={},r.each(this.map,r.bind(function(e,t){s.call(this,e,t)},this));var t=r(this.$els).mapValues(function(e,t){return e.is(":input")?t.replace(/\s*->.*$/,""):!1}).values().compact().join(", ");this.$el.on("change",t,r.bind(i,this))}});