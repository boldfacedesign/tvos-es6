export default class base_model {
	consrtructor() {
		this._type = "model";
	}
	on(event, fn) {
		this._callbacks = this._callbacks || {};
		(this._callbacks['$' + event] = this._callbacks['$' + event] || [])
		.push(fn);
		return this;
	}
	emit(event) {
		this._callbacks = this._callbacks || {};
		var args = [].slice.call(arguments, 1),
		    callbacks = this._callbacks['$' + event];

		if (callbacks) {
			callbacks = callbacks.slice(0);
			for (var i = 0, len = callbacks.length; i < len; ++i) {
				callbacks[i].apply(this, args);
			}
		}

		return this;
	}
	listeners(event) {
		this._callbacks = this._callbacks || {};
		return this._callbacks['$' + event] || [];
	}
}