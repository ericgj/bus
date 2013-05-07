
module.exports = Bus;

function Bus() { 
  if (!(this instanceof Bus)) return new Bus();
  return this;
}
   
Bus.prototype.from = function(emitter,evt){
  this._from = [emitter, evt];
  if (this._to) this._bind()
  return this;
}

Bus.prototype.to = function(receiver,meth){
  this._to = receiver[meth].bind(receiver);
  if (this._from) this._bind()
  return this;
}

Bus.prototype.reset =
Bus.prototype.route = function(){
  this._from = null;  this._to = null;
  return this;
}

Bus.prototype.handle = function(fn){
  this._to = fn;
  if (this._from) this._bind()
  return this;
}

Bus.prototype._bind = function(){
  this._from[0].on(this._from[1], this._to);
}

